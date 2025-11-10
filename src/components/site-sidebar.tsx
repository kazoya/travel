"use client";

import { usePathname, Link } from "@/navigation";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import {
  Bot,
  BookUser,
  Fingerprint,
  Hand,
  HeartHandshake,
  Home,
  Map,
  Plane,
} from "lucide-react";
import { useTranslations } from 'next-intl';


export function SiteSidebar() {
  const pathname = usePathname();
  const t = useTranslations('Sidebar');

  const links = [
    { href: "/", label: t('home'), icon: <Home /> },
    { href: "/trip-planner", label: t('tripPlanner'), icon: <Plane /> },
    { href: "/assistant", label: t('smartAssistant'), icon: <Bot /> },
    { href: "/maps", label: t('accessibleMaps'), icon: <Map /> },
    { href: "/support", label: t('supportDirectory'), icon: <BookUser /> },
    { href: "/hosts", label: t('solidarityHosts'), icon: <HeartHandshake /> },
    { href: "/translate", label: t('signTranslator'), icon: <Hand /> },
    { href: "/passport", label: t('healthPassport'), icon: <Fingerprint /> },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <SidebarContent>
      <SidebarMenu>
        {links.map((link) => (
          <SidebarMenuItem key={link.href}>
            <Link href={link.href} passHref>
              <SidebarMenuButton
                isActive={isLinkActive(link.href)}
                tooltip={link.label}
              >
                {link.icon}
                <span>{link.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
