"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { usePraticeModal } from "@/store/use-pratice-modal";
import { useRouter } from "next/navigation";
import {useEffect,useState} from "react";
import Image from "next/image";

export const PraticeModal = () => {
    const router = useRouter();
    const [isClient,setIsClient] = useState(false);
    const {isOpen, close} = usePraticeModal();

    useEffect(() => setIsClient(true),[]);

    if(!isClient){
        return null; 
    }


    return(
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="heart.svg" alt="Penguin" height={100} width={100}/>
                    </div>
                    <DialogTitle className="text-center text-2xl text-blue-700">
                        Pratique Novamente
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Espere suas vidas recarregarem pra continuar
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primaryOutline" className="w-full" size="lg" onClick={() => {close();}}>OK</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}