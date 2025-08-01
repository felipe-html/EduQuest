import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";

type Props = {
    id:number;
    imageSrc:string | null ;
    audioSrc:string | null ; 
    text: string; 
    shortcut:string;
    selected?:boolean; 
    onClick:()=>void; 
    status?: "certo"|"errado" |"nenhum";
    disabled?:boolean;
    type:typeof challenges.$inferSelect["type"];
};



export const Card =({id,imageSrc,audioSrc, text, shortcut,selected,onClick,status, disabled,type}:Props) => {
    const handleClick = useCallback(() => {
    if(disabled) return;

    onClick();
    },[disabled,onclick]);
    
    return(
        <div onClick={handleClick} className={cn
        ("h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
            selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
            selected && status === "certo" && "border-green-300 bg-green-200 hover:bg-green-100",
            selected && status === "errado" && "border-rose-300 bg-rose-100 hover:bg-rose-100",
            disabled &&"pointer-events-none hover:bg-white",type==="ASSIST" && "lg:p-3 w-full"

        )}>
            {imageSrc &&(
                <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
                    <Image src={imageSrc} alt={text} fill />
                </div>
            )}
            <div className={cn("flex items-center justify-between", type ==="ASSIST" && "flex-row-reverse")}>
                {type === "ASSIST" && <div/>}
                <p className={cn("text-neutral-600 text-sm lg:text-base", selected && "text-sky-500", selected && status === "certo" && "text-green-500", selected && status ==="errado" && "text-rose-500")}>
                    {text}
                </p>

                <div className={cn("lg:w-[30px] lg:h-[30px] w-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold",
                     selected && "text-sky-500 border-sky-500", selected && status === "certo" && "border-green-500 text-green-500", selected && status ==="errado" && "border-rose-500 text-rose-500")}>
                    {shortcut}
                </div>
            </div>
        </div>
    )
}