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
  Globe,
  Luggage,
  AlertTriangle,
  Calendar,
  GraduationCap,
  UserPlus,
  Award,
  User,
  Eye,
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
    { href: "/destinations-360", label: t('destinations360'), icon: <Eye /> },
    { href: "/support", label: t('supportDirectory'), icon: <BookUser /> },
    { href: "/hosts", label: t('solidarityHosts'), icon: <HeartHandshake /> },
    { href: "/translate", label: t('signTranslator'), icon: <Hand /> },
    { href: "/passport", label: t('healthPassport'), icon: <Fingerprint /> },
    { href: "/cultural-communication", label: t('culturalCommunication'), icon: <Globe /> },
    { href: "/travel-bag", label: t('travelBag'), icon: <Luggage /> },
    { href: "/booking", label: t('booking'), icon: <Calendar /> },
    { href: "/emergency", label: t('emergency'), icon: <AlertTriangle /> },
    { href: "/academy", label: t('academy'), icon: <Award /> },
    { href: "/training", label: t('training'), icon: <GraduationCap /> },
    { href: "/companion-auth", label: t('companionAuth'), icon: <UserPlus /> },
    { href: "/profile", label: t('profile'), icon: <User /> },
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
