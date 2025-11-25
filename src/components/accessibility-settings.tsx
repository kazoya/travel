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
import { Accessibility, Volume2, Type, Eye, Keyboard, Ear, EarOff } from "lucide-react";

export function AccessibilitySettings() {
  const t = useTranslations('Accessibility');
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [hearingAid, setHearingAid] = useState(false);
  const [visualAid, setVisualAid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedFontSize = localStorage.getItem('accessibility-fontSize');
    const savedHighContrast = localStorage.getItem('accessibility-highContrast');
    const savedTextToSpeech = localStorage.getItem('accessibility-textToSpeech');
    const savedHearingAid = localStorage.getItem('accessibility-hearingAid');
    const savedVisualAid = localStorage.getItem('accessibility-visualAid');

    if (savedFontSize) setFontSize(Number(savedFontSize));
    if (savedHighContrast === 'true') setHighContrast(true);
    if (savedTextToSpeech === 'true') setTextToSpeech(true);
    if (savedHearingAid === 'true') setHearingAid(true);
    if (savedVisualAid === 'true') setVisualAid(true);
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
    if (textToSpeech && 'speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      // Add click handlers to read text
      const readText = (element: HTMLElement) => {
        const text = element.innerText || element.textContent || '';
        if (text && text.trim()) {
          window.speechSynthesis.cancel(); // Cancel previous speech
          const utterance = new SpeechSynthesisUtterance(text);
          const lang = document.documentElement.lang || 'ar';
          utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
          utterance.rate = 0.9;
          utterance.pitch = 1;
          window.speechSynthesis.speak(utterance);
        }
      };

      // Add event listeners to interactive elements
      const handleClick = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.getAttribute('role') === 'button') {
          readText(target);
        }
      };

      // Add listeners to all interactive elements
      document.addEventListener('click', handleClick, true);
      
      // Cleanup function
      return () => {
        document.removeEventListener('click', handleClick, true);
        window.speechSynthesis.cancel();
      };
    } else if (!textToSpeech) {
      window.speechSynthesis.cancel();
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

          {/* Hearing Aid Support */}
          <div className="flex items-center justify-between">
            <Label htmlFor="hearing-aid" className="flex items-center gap-2">
              {hearingAid ? <Ear className="h-4 w-4" /> : <EarOff className="h-4 w-4" />}
              {t('hearingAid')}
            </Label>
            <Switch
              id="hearing-aid"
              checked={hearingAid}
              onCheckedChange={(checked) => {
                setHearingAid(checked);
                localStorage.setItem('accessibility-hearingAid', checked.toString());
                // Enable visual indicators for hearing impaired
                if (checked) {
                  document.documentElement.setAttribute('data-hearing-aid', 'true');
                } else {
                  document.documentElement.removeAttribute('data-hearing-aid');
                }
              }}
            />
          </div>

          {/* Visual Aid Support */}
          <div className="flex items-center justify-between">
            <Label htmlFor="visual-aid" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {t('visualAid')}
            </Label>
            <Switch
              id="visual-aid"
              checked={visualAid}
              onCheckedChange={(checked) => {
                setVisualAid(checked);
                localStorage.setItem('accessibility-visualAid', checked.toString());
                // Enable screen reader optimizations
                if (checked) {
                  document.documentElement.setAttribute('data-visual-aid', 'true');
                  // Increase focus indicators
                  const style = document.createElement('style');
                  style.id = 'visual-aid-styles';
                  style.textContent = `
                    *:focus-visible {
                      outline: 3px solid hsl(var(--primary)) !important;
                      outline-offset: 3px !important;
                    }
                  `;
                  document.head.appendChild(style);
                } else {
                  document.documentElement.removeAttribute('data-visual-aid');
                  const style = document.getElementById('visual-aid-styles');
                  if (style) style.remove();
                }
              }}
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

