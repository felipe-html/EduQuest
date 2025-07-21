"use client";

import { challenges, challengesOptions } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import Confetti from "react-confetti";
import { QuestionBubble } from "./question-bublle";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import { useVidasModal } from "@/store/use-vidas-modal";
import { usePraticeModal } from "@/store/use-pratice-modal";

type Props = {
    initialPercentage: number;
    initialHearts:number; 
    initialLessonId:number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean; 
        challengesOptions: typeof challengesOptions.$inferSelect[];
    })[];
    userSubscripstion: any;
}


export const Quiz = (({initialPercentage, initialHearts,initialLessonId, initialLessonChallenges, userSubscripstion } :Props )=> {

    const { open: openPracticeModal} = usePraticeModal();
    const { open: openVidasModal} = useVidasModal();
    const [pending, startTransition] = useTransition();
    const router = useRouter();
    const [vidas, setVidas] = useState(initialHearts);
    const [lessonId,setLessonId] =useState(initialLessonId);
    const [percentage, setPercentage] = useState(() => {return initialPercentage === 100 ? 0 : initialPercentage});
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [status, setStatus] = useState<"certo"|"errado"|"nenhum">("nenhum"); 
    const [selectedOption, setSelectedOption] = useState<number>();
    const challenge = challenges[activeIndex];
    

    const onSelect = (id:number) => {
        if(status !=="nenhum") return; 

        setSelectedOption(id);
    }
    const options = challenge?.challengesOptions ?? [];

        if(!challenge){
        return(
            <>
                <Confetti recycle={false} numberOfPieces={500} tweenDuration={10000} width={1000} height={1000}/>
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image src="/party.svg" alt="Final" className="hidden lg:block" height={100} width={100}/>

                    <Image src="/party.svg" alt="Final" className="block lg:hidden" height={50} width={50}/>
                    <h1 className="text-xl lg:text-3xl font-bold text-purple-700">Parabéns <br/> Únidade Finalizada com sucesso</h1>

                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard variant="pontos" value={challenges.length * 10}/>                        
                        <ResultCard variant="vidas" value={vidas}/>
                    </div>
                </div>
                <Footer lessonId={lessonId} status="completo" onCheck={() => router.push("/learn")}/>
            </>
        )
    }
    const title = challenge.type === "ASSIST"?"Selecione a resposta correta": challenge.question;


    const onNext = () => {
        setActiveIndex ((current)=> current+1);
    };

    const onContinue = () => {
        if(!selectedOption) return; 

        if(status ==="errado"){
            setStatus("nenhum");
            setSelectedOption(undefined);
            return;
        }

        if(status ==="certo"){
            onNext();
            setStatus("nenhum");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option) => option.correct);

        if(!correctOption){
            return;
        }

        if(correctOption.id === selectedOption){
            startTransition(()=> {
                upsertChallengeProgress(challenge.id).then((response) =>{
                    if(response?.error === "vidas"){
                        openVidasModal();
                        return;
                    }
                    setStatus("certo");
                    setPercentage((prev) => +100/challenges.length);

                    if(initialPercentage === 100){
                        setVidas((prev) => Math.min(prev +1, 10))
                    }
                }).catch(() => toast.error("Algo deu errado. Por favor tente de novo"))
            })
        }else{
            startTransition(() => {
                reduceHearts(challenge.id).then((response) => {
                    if(response?.error ==="vidas"){
                        openVidasModal();
                        return;
                    }

                    setStatus("errado");

                    if(!response?.error){
                        setVidas((prev)=> Math.max(prev-1,0)); 
                    }
                }).catch(() => toast.error("Algo deu errado - Tente novamente mais tarde"))
            });
        }
    }
    
    return(
        <>
            <Header vidas={vidas} percentage={percentage} hasActiveSubscription={!!userSubscripstion?.isActive} />

            <div className="flex-1">
                <div className="h-full flex items-center justify-center ">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">{title}</h1>
                        <div>
                            {challenge.type === "ASSIST" &&(
                                <QuestionBubble question={challenge.question}/>
                            )}

                            <Challenge options={options} onSelect={onSelect}
                                status={status} selectedOption={selectedOption} disabled={pending} type={challenge.type}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer disabled ={pending || !selectedOption} status={status} onCheck={onContinue}/>
        </>
)
})