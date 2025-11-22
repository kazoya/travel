"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslations } from 'next-intl';
import { Accessibility, Volume2, Type, Eye, Keyboard } from "lucide-react";

export function AccessibilitySettings() {
  const t = useTranslations('Accessibility');
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedFontSize = localStorage.getItem('accessibility-fontSize');
    const savedHighContrast = localStorage.getItem('accessibility-highContrast');
    const savedTextToSpeech = localStorage.getItem('accessibility-textToSpeech');

    if (savedFontSize) setFontSize(Number(savedFontSize));
    if (savedHighContrast === 'true') setHighContrast(true);
    if (savedTextToSpeech === 'true') setTextToSpeech(true);
  }, []);

  useEffect(() => {
    // Apply font size
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('accessibility-fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('accessibility-highContrast', highContrast.toString());
  }, [highContrast]);

  useEffect(() => {
    // Text-to-speech setup
    if (textToSpeech) {
      // Enable text-to-speech functionality
      const enableTTS = () => {
        if ('speechSynthesis' in window) {
          // Add click handlers to read text
          const readText = (element: HTMLElement) => {
            const text = element.innerText || element.textContent || '';
            if (text) {
              const utterance = new SpeechSynthesisUtterance(text);
              utterance.lang = document.documentElement.lang || 'ar';
              window.speechSynthesis.speak(utterance);
            }
          };

          // Add event listeners to interactive elements
          document.querySelectorAll('button, a, [role="button"]').forEach(el => {
            el.addEventListener('click', (e) => {
              readText(e.target as HTMLElement);
            });
          });
        }
      };
      enableTTS();
    }
    localStorage.setItem('accessibility-textToSpeech', textToSpeech.toString());
  }, [textToSpeech]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Accessibility className="h-5 w-5" />
          <span className="sr-only">{t('openSettings')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="font-size" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                {t('fontSize')}
              </Label>
              <span className="text-sm text-muted-foreground">{fontSize}px</span>
            </div>
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
              className="w-full"
            />
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {t('highContrast')}
            </Label>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>

          {/* Text-to-Speech */}
          <div className="flex items-center justify-between">
            <Label htmlFor="text-to-speech" className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              {t('textToSpeech')}
            </Label>
            <Switch
              id="text-to-speech"
              checked={textToSpeech}
              onCheckedChange={setTextToSpeech}
            />
          </div>

          {/* Keyboard Navigation Info */}
          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="flex items-start gap-2">
              <Keyboard className="h-4 w-4 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">{t('keyboardNavigation')}</p>
                <p className="text-xs text-muted-foreground">{t('keyboardNavigationDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

