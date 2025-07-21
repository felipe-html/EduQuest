import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  value: number;
  variant: "pontos" | "vidas";
};

export const ResultCard = ({ value, variant }: Props) => {

    const imageSrc = variant === "vidas"? "/heart.svg" : "/points.svg";

  return (
    <div className={cn(
      "rounded-2xl border-2", // Adicionado border-2 para consistência
      variant === "pontos" && "border-blue-500",
      variant === "vidas" && "border-rose-500",
    )}>
      <div className={cn(
        "p-2 text-white rounded-t-xl font-bold text-center uppercase text-xs", // Aumentado padding para p-2
        variant === "vidas" && "bg-rose-500", // Corrigido para rose-500 para combinar
        variant === "pontos" && "bg-blue-500"
      )}>
        {variant === "vidas" ? "Vidas Restantes" : "Total de Pontos"}
      </div>

      <div className={cn(
        "rounded-b-xl bg-white flex justify-center items-center p-4 font-bold text-lg", // Ajustado padding para p-4
        variant === "pontos" && "text-blue-500", // Adicionado cor de texto temática
        variant === "vidas" && "text-rose-500"
      )}>
        <Image alt="Icon" src={imageSrc} height={40} width={40} className="mr-1.5"/>
        {value}
      </div>
    </div>
  );
};