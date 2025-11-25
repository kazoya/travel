"use client"

import { Link, usePathname, useRouter } from "@/navigation";
import { ThemeToggle } from "./theme-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { AlertTriangle, Languages, Sun, Accessibility } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserButton } from "@/components/user-button";
import { AccessibilitySettings } from "@/components/accessibility-settings";
import { UserRegistration } from "@/components/user-registration";
import Image from "next/image";


export function SiteHeader() {
  const t = useTranslations('SiteHeader');
  const tSos = useTranslations('SOS');
  const handleSosConfirm = () => {
    // In a real app, this would trigger a Firebase function or API call.
    console.log("SOS Confirmed. Sending alert...");
    // Here you might show a success toast, but instructions say toasts for errors only.
  };

  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (locale: string) => {
    router.push(pathname, { locale });
  };


  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <SidebarTrigger className="md:hidden" />
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image
                src="/app/logo.jpeg"
                alt="سفر بلا حدود - Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold font-headline text-lg">{t('title')}</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <AccessibilitySettings />
          <UserButton />
          <UserRegistration />
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>
                العربية
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('de')}>
                Deutsch
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
                Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="hidden sm:inline">{tSos('sosButton')}</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{tSos('title')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {tSos('description')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tSos('cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleSosConfirm}>{tSos('confirm')}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  );
}
