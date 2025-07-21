"use server";

import db from "@/db/drizzle";
import { getCoursesById, getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";

export const upsertUserProgress = async(courseId: number) =>{
    const {userId} = await auth();
    const user = await currentUser();

    if(!userId || !user){
        throw new Error("Usuario não autorizado");
  
    }

    const course = await getCoursesById(courseId);

        if(!course){
        throw new Error("Curso não encontrado");  
    }

//    if(!course.units.lenght || !course.units[0].lessons.lenght){
//        throw new Error ("Não existe lições nesse curto");
//    }

const existingUserProgress = await getUserProgress();

if(existingUserProgress){
    await db.update(userProgress).set({
        activeCourseId:courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/penguin.svg"
    })
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn")
}

await db.insert(userProgress).values({
    userId,
    activeCourseId:courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/penguin.svg"

})

revalidatePath("/courses");
revalidatePath("/learn");
redirect("/learn")
}

export const reduceHearts = async (challengeId:number) =>{
    const {userId} = await auth();


    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId), // Corrigido para "challengeId"
    });


    if(!challenge){
    throw new Error("Desafio não encontrado")
    }

    const lessonId = challenge.lessonId;

    if(!userId){
        throw new Error("Não autorizado"); 
    }

    const currentUserProgress = await getUserProgress(); 

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId) // Agora challengeId existe
        ),
    });

    const isPractice = !!existingChallengeProgress;

    if(isPractice){
        return {error:"pratice"};
    }

    if(!currentUserProgress){
        throw new Error("Progresso do usuario não encontrado")
    }

    if(currentUserProgress.vidas === 0){
        return {error: "vidas"}
    }

    await db.update(userProgress).set({
        vidas: Math.max(currentUserProgress.vidas -1,0),
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests"); 
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`)
};

export const getUserSubscription = cache(async () => {
    const {userId} = await auth();

    if(!userId) return null;

  //  const data = await db.query.userSubscription.findFirst({
    //    where: eq(getUserSubscription.userId, userId),
  //  });

 //   if(!data) return null;

})

export const getTopTenUser = cache(async() =>{

});
