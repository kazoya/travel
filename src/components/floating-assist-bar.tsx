"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { AlertTriangle, MessageCircle } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export function FloatingAssistBar() {
  const t = useTranslations('FloatingAssistant');

  const handleSOS = () => {
    // In a real app, this would trigger emergency services
    console.log("SOS activated from floating bar");
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 bg-background border rounded-full shadow-lg p-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="lg" className="rounded-full gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="hidden sm:inline">{t('sos')}</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('sosDialog.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('sosDialog.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('sosDialog.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleSOS} className="bg-destructive">
              {t('sosDialog.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        variant="outline"
        size="lg"
        className="rounded-full gap-2"
        asChild
      >
        <a href="/assistant">
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">{t('assistant')}</span>
        </a>
      </Button>

    </div>
  );
}

