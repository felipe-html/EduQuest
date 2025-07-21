import { CheckCircle, CheckSquareIcon, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


type Props = {
    onCheck:() => void; 
    status: "certo" |"errado"|"nenhum"|"completo";
    disabled?:boolean;
    lessonId?:number;
};

export const Footer = ({onCheck,status,disabled,lessonId}: Props) => {
    return(
        <footer className={cn("lg:-h[140px] h-[100px] border-t-2", 
            status ==="certo" && "border-transparent bg-green-100", 
            status ==="errado" && "border-transparent bg-rose-100",
         )}>
            <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
                {status === "certo" &&(
                <div className="text-green-500 font-bold text-base lg:text-2xl flex">
                    <CheckSquareIcon className="h-6 w-6 lg:h-10 lg:w-10 mr-4"/> Certa resposta !
                </div>)}

                {status === "errado" &&(
                <div className="text-rose-500 font-bold text-base lg:text-2xl flex">
                    <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"/> Resposta errada - Tente de novo 
                </div>)}

                {status === "completo" &&(
                    <Button variant="default" onClick={() => window.location.href = `/lesson/${lessonId}`}>
                        Pratique novamente
                    </Button>
                )}

                <Button disabled={disabled} className="ml-auto"
                onClick={onCheck} variant={status === "errado" ? "danger": "primary"}>
                    {status ==="nenhum" && "Confirmar"}
                    {status ==="certo" && "Continuar"}
                    {status ==="errado" && "Tentar novamente"}
                    {status ==="completo" && "Proximo Modulo"}


                </Button>
            </div>
        </footer>
    )
}