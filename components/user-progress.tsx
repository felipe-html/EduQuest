import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

import {InfinityIcon, Infinity} from "lucide-react";
import { courses } from "@/db/schema";

type Props = {
    activeCourse: typeof courses.$inferSelect;
    vidas:number;
    pontos:number;
    hasActiveSubscription: boolean;
}

export const UserProgress = ({activeCourse, pontos,vidas, hasActiveSubscription}: Props) =>{
    return(
        <div className="flex items-center justify-betweengap-x-2 w-full">
            <Link href="/courses">
                <Button variant="ghost">
                    <Image src={activeCourse.imageSrc} alt={activeCourse.title}
                    className="rounded-md border" width={32} height={32}/>
                </Button>
            </Link>

            <Link href="/shop">
                <Button variant="ghost" className="text-orange-500">
                    <Image src="/points.svg" height={28} width={28} alt="Pontos" className="mr-2"/>
                    {pontos}
                </Button>
            </Link>

            <Link href="/shop">
                <Button variant="ghost" className="text-rose-500">
                    <Image src="/heart.svg" height={22} width={22} alt="Hearts" className="mr-2"/>
                    {hasActiveSubscription?<InfinityIcon className="h-4 w-4 stroke-[3]"/>:vidas}
                </Button>
            </Link>
        </div>
    )
}