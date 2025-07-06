"use client";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { DashboardUserButton } from "./dashboard-user-button";

export default function DashbaordSidebar() {
  const pathname = usePathname();
  const firstSection = [
    {
      icon: VideoIcon,
      label: "Meetings",
      link: "/meetings",
    },
    {
      icon: BotIcon,
      label: "Agents",
      link: "/agents",
    },
  ];
  const secondSection = [
    {
      icon: StarIcon,
      label: "Upgrade",
      link: "/upgrade",
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground flex items-center">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <div className="flex items-center gap-2 ">
            <div className="bg-radial from-blue-700 to-blue-900 rounded-full p-1.5">
              <Image
                src="/logo.svg"
                alt="Login"
                width={24}
                height={24}
                className=""
              />
            </div>

            <p className="text-2xl font-semibold">
              Convoo
              <span className="text-primary">.ai</span>
            </p>
          </div>
        </Link>
      </SidebarHeader>
      <Separator className="" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 hover:bg-gray-100 border border-transparent from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                      pathname === item.link &&
                        "bg-primary text-white hover:bg-primary/90 hover:text-white"
                    )}
                  >
                    <a href={item.link}>
                      <div className="bg-blue-200 p-1.5 rounded-md text-blue-600">
                        <item.icon className="size-4" />
                      </div>
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator className="" />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 border border-transparent transition-colors",
                      pathname === item.link
                        ? "bg-gradient-to-r from-sidebar-accent via-sidebarto-sidebar text-white hover:bg-primary/90"
                        : "hover:bg-gray-100"
                    )}
                  >
                    <a href={item.link}>
                      <div className="bg-blue-200 p-1.5 rounded-md text-blue-600">
                        <item.icon className="size-4" />
                      </div>
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
