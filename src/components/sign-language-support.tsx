"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from 'next-intl';
import { Hand, Video, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SignLanguageSupportProps {
  text?: string;
  autoShow?: boolean;
}

export function SignLanguageSupport({ text, autoShow = false }: SignLanguageSupportProps) {
  const t = useTranslations('SignLanguage');
  const [isOpen, setIsOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if sign language is enabled
    const checkSignLanguage = () => {
      const enabled = document.documentElement.getAttribute('data-sign-language') === 'true';
      setIsEnabled(enabled);
      if (enabled && autoShow && text) {
        setIsOpen(true);
      }
    };

    checkSignLanguage();

    // Watch for changes
    const observer = new MutationObserver(checkSignLanguage);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-sign-language'],
    });

    return () => observer.disconnect();
  }, [autoShow, text]);

  if (!isEnabled) {
    return null;
  }

  // In a real implementation, this would use a sign language video library
  // or AI-generated sign language videos
  const getSignLanguageVideoUrl = (text: string): string | null => {
    // Placeholder: In production, this would map text to sign language video URLs
    // For now, return null to show text-based sign language
    return null;
  };

  const videoUrl = text ? getSignLanguageVideoUrl(text) : null;

  return (
    <>
      {text && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="gap-2"
          data-sign-text={text}
        >
          <Hand className="h-4 w-4" />
          {t('showSignLanguage')}
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Hand className="h-5 w-5" />
              {t('title')}
            </DialogTitle>
            <DialogDescription>{t('description')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {videoUrl ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                />
              </div>
            ) : (
              <Card className="sign-language-video">
                <CardHeader>
                  <CardTitle>{t('textTranslation')}</CardTitle>
                  <CardDescription>{t('textTranslationDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-lg font-medium mb-2">{t('originalText')}</p>
                      <p className="text-muted-foreground">{text}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
                      <p className="text-lg font-medium mb-2">{t('signLanguageTranslation')}</p>
                      <p className="text-primary font-semibold">
                        {t('signLanguagePlaceholder', { text })}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {t('signLanguageNote')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                {t('close')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Hook to add sign language support to any text element
export function useSignLanguage(text: string) {
  const [showSignLanguage, setShowSignLanguage] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const checkSignLanguage = () => {
      const enabled = document.documentElement.getAttribute('data-sign-language') === 'true';
      setIsEnabled(enabled);
    };

    checkSignLanguage();

    const observer = new MutationObserver(checkSignLanguage);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-sign-language'],
    });

    return () => observer.disconnect();
  }, []);

  return {
    isEnabled,
    showSignLanguage,
    setShowSignLanguage,
    SignLanguageButton: isEnabled ? (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowSignLanguage(true)}
        className="gap-1"
        data-sign-text={text}
      >
        <Hand className="h-3 w-3" />
      </Button>
    ) : null,
  };
}

