"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
    pontos: number;
}

export const Promo = ({pontos}:Props) =>{
    return(
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="space-y-2">
                <div className="flex items-center gap-x-2">
                    <Image src="/points.svg" alt="Pro" height={30} width={30}/>
                    <h3>{pontos} Utilize seus pontos</h3>
                </div>
                <p className="text-muted-foreground">Compre emblemas, vidas e mais...</p>
            </div>
            <Button variant="super">
                <Link href="/shop">
                     Comprar
                </Link>
            </Button>
        </div>
    )
}