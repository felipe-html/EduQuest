"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
    texto: string;
    texto2:string;
}

export const Quests = ({texto,texto2}:Props) =>{
    return(
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="text-muted-foreground text-lg">
                    {texto} 
                </h3>
                <Button size="sm" variant="primaryOutline"> 
                    {texto2} 
                </Button>

            </div>
        </div>
    )
}