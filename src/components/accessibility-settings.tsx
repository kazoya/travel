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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from 'next-intl';
import { 
  Accessibility, Volume2, Type, Eye, Keyboard, Ear, EarOff, Hand, 
  Contrast, Sun, Moon, Waves, Move, Palette, Captions 
} from "lucide-react";

type ContrastMode = 'default' | 'high' | 'medium' | 'low-light';

export function AccessibilitySettings() {
  const t = useTranslations('Accessibility');
  const [fontSize, setFontSize] = useState(16);
  const [contrastMode, setContrastMode] = useState<ContrastMode>('default');
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [hearingAid, setHearingAid] = useState(false);
  const [visualAid, setVisualAid] = useState(false);
  const [signLanguage, setSignLanguage] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [reducedNoise, setReducedNoise] = useState(false);
  const [colorBlind, setColorBlind] = useState(false);
  const [audioCaptions, setAudioCaptions] = useState(false);
  const [visualSoundIndicators, setVisualSoundIndicators] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const loadPreferences = () => {
      const savedFontSize = localStorage.getItem('accessibility-fontSize');
      const savedContrastMode = localStorage.getItem('accessibility-contrastMode') as ContrastMode;
      const savedTextToSpeech = localStorage.getItem('accessibility-textToSpeech');
      const savedHearingAid = localStorage.getItem('accessibility-hearingAid');
      const savedVisualAid = localStorage.getItem('accessibility-visualAid');
      const savedSignLanguage = localStorage.getItem('accessibility-signLanguage');
      const savedReducedMotion = localStorage.getItem('accessibility-reducedMotion');
      const savedReducedNoise = localStorage.getItem('accessibility-reducedNoise');
      const savedColorBlind = localStorage.getItem('accessibility-colorBlind');
      const savedAudioCaptions = localStorage.getItem('accessibility-audioCaptions');
      const savedVisualSoundIndicators = localStorage.getItem('accessibility-visualSoundIndicators');

      if (savedFontSize) setFontSize(Number(savedFontSize));
      if (savedContrastMode) setContrastMode(savedContrastMode);
      if (savedTextToSpeech === 'true') setTextToSpeech(true);
      if (savedHearingAid === 'true') setHearingAid(true);
      if (savedVisualAid === 'true') setVisualAid(true);
      if (savedSignLanguage === 'true') setSignLanguage(true);
      if (savedReducedMotion === 'true') setReducedMotion(true);
      if (savedReducedNoise === 'true') setReducedNoise(true);
      if (savedColorBlind === 'true') setColorBlind(true);
      if (savedAudioCaptions === 'true') setAudioCaptions(true);
      if (savedVisualSoundIndicators === 'true') setVisualSoundIndicators(true);
    };

    loadPreferences();

    // Listen for changes from floating-assist-bar
    const handleModeChange = (event: CustomEvent) => {
      const mode = event.detail.mode;
      if (mode === 'audio') {
        setHearingAid(true);
        setVisualAid(false);
        setSignLanguage(false);
      } else if (mode === 'visual') {
        setVisualAid(true);
        setHearingAid(false);
        setSignLanguage(false);
      } else if (mode === 'sign') {
        setSignLanguage(true);
        setHearingAid(false);
        setVisualAid(false);
      } else {
        setHearingAid(false);
        setVisualAid(false);
        setSignLanguage(false);
      }
    };

    window.addEventListener('accessibility-mode-changed', handleModeChange as EventListener);
    
    return () => {
      window.removeEventListener('accessibility-mode-changed', handleModeChange as EventListener);
    };
  }, []);

  useEffect(() => {
    // Apply font size
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('accessibility-fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    // Apply contrast mode
    document.documentElement.classList.remove('high-contrast', 'medium-contrast', 'low-light');
    
    if (contrastMode === 'high') {
      document.documentElement.classList.add('high-contrast');
    } else if (contrastMode === 'medium') {
      document.documentElement.classList.add('medium-contrast');
    } else if (contrastMode === 'low-light') {
      document.documentElement.classList.add('low-light');
    }
    
    localStorage.setItem('accessibility-contrastMode', contrastMode);
  }, [contrastMode]);

  useEffect(() => {
    // Text-to-speech setup
    if (textToSpeech && 'speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      // Add click handlers to read text
      const readText = (element: HTMLElement) => {
        const text = element.innerText || element.textContent || '';
        const ariaLabel = element.getAttribute('aria-label');
        const altText = element.getAttribute('alt');
        const finalText = ariaLabel || altText || text;
        
        if (finalText && finalText.trim()) {
          window.speechSynthesis.cancel(); // Cancel previous speech
          const utterance = new SpeechSynthesisUtterance(finalText);
          const lang = document.documentElement.lang || 'ar';
          utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
          utterance.rate = 0.9;
          utterance.pitch = 1;
          utterance.volume = 1;
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

  useEffect(() => {
    // Apply sign language support
    if (signLanguage) {
      document.documentElement.setAttribute('data-sign-language', 'true');
      document.body.setAttribute('data-sign-language', 'true');
    } else {
      document.documentElement.removeAttribute('data-sign-language');
      document.body.removeAttribute('data-sign-language');
    }
    localStorage.setItem('accessibility-signLanguage', signLanguage.toString());
  }, [signLanguage]);

  useEffect(() => {
    // Apply reduced motion
    if (reducedMotion) {
      document.documentElement.setAttribute('data-reduced-motion', 'true');
    } else {
      document.documentElement.removeAttribute('data-reduced-motion');
    }
    localStorage.setItem('accessibility-reducedMotion', reducedMotion.toString());
  }, [reducedMotion]);

  useEffect(() => {
    // Apply reduced noise
    if (reducedNoise) {
      document.documentElement.setAttribute('data-reduced-noise', 'true');
    } else {
      document.documentElement.removeAttribute('data-reduced-noise');
    }
    localStorage.setItem('accessibility-reducedNoise', reducedNoise.toString());
  }, [reducedNoise]);

  useEffect(() => {
    // Apply color blind support
    if (colorBlind) {
      document.documentElement.setAttribute('data-color-blind', 'true');
    } else {
      document.documentElement.removeAttribute('data-color-blind');
    }
    localStorage.setItem('accessibility-colorBlind', colorBlind.toString());
  }, [colorBlind]);

  useEffect(() => {
    // Apply audio captions (for hearing impaired)
    if (audioCaptions) {
      // Enable captions for all audio/video elements
      const audioElements = document.querySelectorAll('audio, video');
      audioElements.forEach((el) => {
        if (el instanceof HTMLAudioElement || el instanceof HTMLVideoElement) {
          el.setAttribute('data-captions', 'true');
        }
      });
    }
    localStorage.setItem('accessibility-audioCaptions', audioCaptions.toString());
  }, [audioCaptions]);

  useEffect(() => {
    // Apply visual sound indicators
    if (visualSoundIndicators) {
      // Mark elements with audio
      const audioElements = document.querySelectorAll('audio, video, [data-has-audio]');
      audioElements.forEach((el) => {
        el.setAttribute('data-has-audio', 'true');
      });
    }
    localStorage.setItem('accessibility-visualSoundIndicators', visualSoundIndicators.toString());
  }, [visualSoundIndicators]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Accessibility className="h-5 w-5" />
          <span className="sr-only">{t('openSettings')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Visual Settings Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {t('visualSettings')}
            </h3>
            
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
                max={28}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                className="w-full"
              />
            </div>

            {/* Contrast Mode */}
            <div className="space-y-2">
              <Label htmlFor="contrast-mode" className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                {t('contrastMode')}
              </Label>
              <Select value={contrastMode} onValueChange={(value) => setContrastMode(value as ContrastMode)}>
                <SelectTrigger id="contrast-mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">{t('contrastDefault')}</SelectItem>
                  <SelectItem value="high">{t('contrastHigh')}</SelectItem>
                  <SelectItem value="medium">{t('contrastMedium')}</SelectItem>
                  <SelectItem value="low-light">{t('contrastLowLight')}</SelectItem>
                </SelectContent>
              </Select>
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
                  if (checked) {
                    document.documentElement.setAttribute('data-visual-aid', 'true');
                    document.body.setAttribute('data-visual-aid', 'true');
                  } else {
                    document.documentElement.removeAttribute('data-visual-aid');
                    document.body.removeAttribute('data-visual-aid');
                  }
                }}
              />
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="flex items-center gap-2">
                <Move className="h-4 w-4" />
                {t('reducedMotion')}
              </Label>
              <Switch
                id="reduced-motion"
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>

            {/* Reduced Visual Noise */}
            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-noise" className="flex items-center gap-2">
                <Waves className="h-4 w-4" />
                {t('reducedNoise')}
              </Label>
              <Switch
                id="reduced-noise"
                checked={reducedNoise}
                onCheckedChange={setReducedNoise}
              />
            </div>

            {/* Color Blind Support */}
            <div className="flex items-center justify-between">
              <Label htmlFor="color-blind" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                {t('colorBlind')}
              </Label>
              <Switch
                id="color-blind"
                checked={colorBlind}
                onCheckedChange={setColorBlind}
              />
            </div>
          </div>

          {/* Audio Settings Section */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Ear className="h-5 w-5" />
              {t('audioSettings')}
            </h3>

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
                  if (checked) {
                    document.documentElement.setAttribute('data-hearing-aid', 'true');
                    document.body.setAttribute('data-hearing-aid', 'true');
                  } else {
                    document.documentElement.removeAttribute('data-hearing-aid');
                    document.body.removeAttribute('data-hearing-aid');
                  }
                }}
              />
            </div>

            {/* Audio Captions */}
            <div className="flex items-center justify-between">
              <Label htmlFor="audio-captions" className="flex items-center gap-2">
                <Captions className="h-4 w-4" />
                {t('audioCaptions')}
              </Label>
              <Switch
                id="audio-captions"
                checked={audioCaptions}
                onCheckedChange={setAudioCaptions}
              />
            </div>

            {/* Visual Sound Indicators */}
            <div className="flex items-center justify-between">
              <Label htmlFor="visual-sound" className="flex items-center gap-2">
                <Waves className="h-4 w-4" />
                {t('visualSoundIndicators')}
              </Label>
              <Switch
                id="visual-sound"
                checked={visualSoundIndicators}
                onCheckedChange={setVisualSoundIndicators}
              />
            </div>
          </div>

          {/* Sign Language Section */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Hand className="h-5 w-5" />
              {t('signLanguageSettings')}
            </h3>

            {/* Sign Language Support */}
            <div className="flex items-center justify-between">
              <Label htmlFor="sign-language" className="flex items-center gap-2">
                <Hand className="h-4 w-4" />
                {t('signLanguage')}
              </Label>
              <Switch
                id="sign-language"
                checked={signLanguage}
                onCheckedChange={setSignLanguage}
              />
            </div>
          </div>

          {/* Keyboard Navigation Info */}
          <div className="rounded-lg border p-4 bg-muted/50 border-t pt-4">
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

