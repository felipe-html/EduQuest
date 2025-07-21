import { Button } from "@/components/ui/button"
import { ClerkLoaded, SignedIn } from "@clerk/nextjs"
import Image from "next/image"

export const Footer = () =>{
    return(

        <ClerkLoaded>
        <SignedIn>
            
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size="lg" variant="ghost" >
                    <Image src="/adm.svg" alt="Administracao" height={32} width={40} className="mr-4 rounded-md"/>
                    Administração
                </Button>

                <Button size="lg" variant="ghost">
                    <Image src="/com.svg" alt="Comunicacao" height={32} width={40} className="mr-4 rounded-md"/>
                    Comunicação
                </Button>

                <Button size="lg" variant="ghost" >
                    <Image src="/comercio.svg" alt="Comercio" height={32} width={40} className="mr-4 rounded-md"/>
                    Comercio
                </Button>

                <Button size="lg" variant="ghost" >
                    <Image src="/sec.svg" alt="Administração" height={32} width={40} className="mr-4 rounded-md"/>
                    Segurança
                </Button>

                <Button size="lg" variant="ghost">
                    <Image src="/tec.svg" alt="Administração" height={32} width={40} className="mr-4 rounded-md"/>
                    Tecnologia
                </Button>
            </div>
        </footer>
      </SignedIn>

    </ClerkLoaded>
    )
}