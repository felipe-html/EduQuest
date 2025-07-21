"use server";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server"; 
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challengeId: number) => {
    const {userId} = await auth();

    if(!userId){
        throw new Error("Não autorizado");
    }

    const currentUserProgress = await getUserProgress();

    if(!currentUserProgress){
        throw new Error("Histórico de úsuario não encontrado")
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    });

    if(!challenge){
        throw new Error("Desafio não encontrado")
    }

    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        ),
    });

    const isPractice = !!existingChallengeProgress;

    if(currentUserProgress.vidas === 0 && !isPractice){
        return {error: "vidas"}
    }

    if(isPractice){
        await db.update(challengeProgress).set({
            completed:true,
        }).where(eq(challengeProgress.id, existingChallengeProgress.id));
    }

    await db.insert(challengeProgress).values({
        challengeId, 
        userId, 
        completed:true,
    });

    await db.update(userProgress).set({
        vidas:Math.min(currentUserProgress.vidas+1,10),
        pontos: currentUserProgress.pontos +10, 
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/lesson"); 
    revalidatePath("/quests");    
    revalidatePath("/leaderboard");    
    revalidatePath(`/lesson/${lessonId}`);

    return;
}