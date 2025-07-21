import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignIn, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image"
import Link from "next/link";


export default function Home() {

  return(
<div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 lg:gap-2">
  <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] lg:mb-0 mb-8">
    <Image src="/pingo.svg" fill alt="Time" sizes="(max-width: 1024px) 240px, 424px" />
  </div>
  <div className="flex flex-col items-center gap-y-8">
    <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">Estudar, viver e aprender</h1>
  </div>
  <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
    <ClerkLoading>
      <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
    </ClerkLoading>
    <ClerkLoaded>
      <SignedOut>
        <SignUpButton
        mode="modal">
          <Button size="lg" variant="primary" className="w-full">Acessar</Button>
        </SignUpButton>

       <SignInButton
        mode="modal">
          <Button size="lg" variant="primaryOutline" className="w-full">Já tenho uma conta</Button>
        </SignInButton>

      </SignedOut>
      <SignedIn>
        <Button size="lg" variant="primary" className="w-full">
          <Link href="/learn">Continuar aprendendo</Link> </Button>
      </SignedIn>
    </ClerkLoaded>
  </div>
</div>
  )

}
