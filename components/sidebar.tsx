"use client";
import { cn } from "@/lib/utils";
import { ClerkLoading, ClerkLoaded, UserButton, useUser } from '@clerk/nextjs';
import Image from "next/image";
import { SidebarItem } from "./sidebar-item";
import Link from "next/link";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const { isLoaded, user } = useUser();

  return (
    <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/penguin.svg" height={60} width={60} alt={"Mascot"} />
          <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">Edu Quest</h1>
        </div>
      </Link>

      <SidebarItem label="aprender" href="/courses" iconSrc="/learn.svg"/>
      <SidebarItem label="Trilha" href="/learn" iconSrc="/learnboard.svg"/>
      <SidebarItem label="Rank" href="/rank" iconSrc="/quests.svg"/>
      <SidebarItem label="Loja" href="/shop" iconSrc="/shop.svg"/>

      <div className="p-4 mt-auto">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
        </ClerkLoading>

        <ClerkLoaded>
          <div className="flex items-center gap-x-2">
            <UserButton afterSignOutUrl="/" />
            {isLoaded && user && (
              <span className="text-sm font-medium text-gray-700 truncate">
                {user.firstName} {user.lastName}
              </span>
            )}
          </div>
        </ClerkLoaded>
      </div>
    </div>
  );
};