"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { useExitModal } from "@/store/use-exit-modal";
import { useRouter } from "next/navigation";
import {useEffect,useState} from "react";
import Image from "next/image";

export const ExitModal = () => {
    const router = useRouter();
    const [isClient,setIsClient] = useState(false);
    const {isOpen, close} = useExitModal();

    useEffect(() => setIsClient(true),[]);

    if(!isClient){
        return null; 
    }


    return(
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/penguin-sad.svg" alt="Penguin" height={80} width={80}/>
                    </div>
                    <DialogTitle className="text-center text-2xl text-blue-700">
                        Voce ainda não terminou sua lição
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Você prefere continuar a lição depois ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" className="w-full" size="lg" onClick={close}>Continuar a lição</Button>
                        <Button variant="primaryOutline" className="w-full" size="lg" onClick={() => {close(); router.push("/learn")}}>Continuar Depois</Button>

                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}