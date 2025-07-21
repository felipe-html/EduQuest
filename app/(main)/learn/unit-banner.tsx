import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
    title:string; 
    description:string;
}

export const UnitBanner = ({title,description}:Props) => {
    return(
        <div className="w-full rounded-xl bg-blue-500 p-5 text-white flex items-center justify-between ">
            <div className="space-y-2.5">
                <h1>{title}</h1>
                <p className="text-lg">{description}</p>
            </div>

            <Link href="/lesson">
                <Button size="lg"  variant="primary" className="border-2 border-b-4">
                    <NotebookText className="mr-2"/>
                    Exercicio
                </Button>
            </Link>
        </div>
    )
}