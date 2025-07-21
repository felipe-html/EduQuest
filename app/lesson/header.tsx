import { Progress } from "@/components/ui/progress"; // Ajuste conforme seu caminho real
import { useExitModal } from "@/store/use-exit-modal";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";

type Props = {
    vidas: number;
    percentage: number; // (0 a 100)
    hasActiveSubscription: boolean;
    onClose?: () => void; // Nova prop para handler de fechar
};

export const Header = ({
    vidas, 
    percentage, 
    hasActiveSubscription,
    onClose = () => {} // Valor padrão
}: Props) => {

    const {open} = useExitModal();
    return (
        <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
            <X 
                onClick={open}
                className="text-slate-600 hover:opacity-75 transition cursor-pointer"
                aria-label="Fechar"
                role="button"
            />

            <Progress 
                value={percentage} 
                aria-label={`Progresso: ${percentage}%`}
            />
            
            <div className="text-rose-600 flex items-center font-bold">
                <Image 
                    src="/heart.svg" 
                    height={30} 
                    width={30} 
                    alt="Vidas" 
                    className="mr-2"
                />
                {hasActiveSubscription ? (
                    <InfinityIcon className="h-6 w-6 stroke-[3]" />
                ) : (
                    <span aria-label={`${vidas} vidas restantes`}>
                        {vidas}
                    </span>
                )}
            </div>
        </header>
    );
};