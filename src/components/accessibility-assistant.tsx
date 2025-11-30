"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { Ear, Hand, X, VolumeX, Play, Pause } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AccessibilityAssistant() {
  const t = useTranslations('AccessibilityAssistant');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isSignLanguageActive, setIsSignLanguageActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
    
    // Set background image to Petra from public folder
    setBackgroundImage("/petra.jpg");

    return () => {
      // Cleanup: stop any ongoing speech
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Function to extract text from the current page
  const extractPageContent = () => {
    if (typeof document === 'undefined') return '';
    
    // Get main content
    const main = document.querySelector('main');
    if (!main) return '';
    
    // Remove script and style elements
    const clone = main.cloneNode(true) as HTMLElement;
    const scripts = clone.querySelectorAll('script, style, nav, header, footer');
    scripts.forEach(el => el.remove());
    
    // Get text content
    let text = clone.textContent || '';
    
    // Clean up text
    text = text.replace(/\s+/g, ' ').trim();
    
    // Limit length for better UX
    if (text.length > 1000) {
      text = text.substring(0, 1000) + '...';
    }
    
    return text || t('defaultContent');
  };

  const startVoiceAssistant = () => {
    if (!synthRef.current) {
      alert(t('voiceNotSupported'));
      return;
    }

    setIsVoiceActive(true);
    setIsPaused(false);
    
    const content = extractPageContent();
    setCurrentText(content);
    
    // Stop any ongoing speech
    synthRef.current.cancel();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(content);
    
    // Set language based on current locale
    const currentLocale = typeof document !== 'undefined' ? document.documentElement.lang || 'ar' : 'ar';
    utterance.lang = currentLocale === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onend = () => {
      setIsVoiceActive(false);
      setIsPaused(false);
    };
    
    utterance.onerror = () => {
      setIsVoiceActive(false);
      setIsPaused(false);
    };
    
    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const stopVoiceAssistant = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsVoiceActive(false);
    setIsPaused(false);
    utteranceRef.current = null;
  };

  const pauseResumeVoice = () => {
    if (!synthRef.current || !utteranceRef.current) return;
    
    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    } else {
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  const startSignLanguageAssistant = () => {
    setIsSignLanguageActive(true);
  };

  const stopSignLanguageAssistant = () => {
    setIsSignLanguageActive(false);
  };

  // Get page title and description for sign language
  const getPageInfo = () => {
    if (typeof document === 'undefined') return { title: '', description: '' };
    
    const title = document.title || t('defaultTitle');
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const description = metaDescription || extractPageContent().substring(0, 200);
    
    return { title, description };
  };

  const pageInfo = getPageInfo();

  // Get current locale for RTL/LTR support
  const locale = typeof document !== 'undefined' ? document.documentElement.lang || 'ar' : 'ar';
  const isRTL = locale === 'ar';

  return (
    <>
      {/* Floating Buttons */}
      <div className={`fixed bottom-20 z-50 flex flex-col gap-3 ${isRTL ? 'left-4' : 'right-4'}`}>
        {/* Voice Assistant Button */}
        <Button
          onClick={isVoiceActive ? stopVoiceAssistant : startVoiceAssistant}
          size="lg"
          className={`rounded-full h-14 w-14 shadow-lg ${
            isVoiceActive 
              ? 'bg-primary text-primary-foreground animate-pulse' 
              : 'bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
          }`}
          aria-label={t('voiceButtonLabel')}
        >
          {isVoiceActive ? (
            <VolumeX className="h-6 w-6" />
          ) : (
            <Ear className="h-6 w-6" />
          )}
        </Button>

        {/* Sign Language Button */}
        <Button
          onClick={isSignLanguageActive ? stopSignLanguageAssistant : startSignLanguageAssistant}
          size="lg"
          className={`rounded-full h-14 w-14 shadow-lg ${
            isSignLanguageActive 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
          }`}
          aria-label={t('signLanguageButtonLabel')}
        >
          <Hand className="h-6 w-6" />
        </Button>
      </div>

      {/* Voice Assistant Dialog */}
      <Dialog open={isVoiceActive} onOpenChange={setIsVoiceActive}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ear className="h-5 w-5" />
              {t('voiceAssistant.title')}
            </DialogTitle>
            <DialogDescription>
              {t('voiceAssistant.description')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('voiceAssistant.currentContent')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground max-h-40 overflow-y-auto">
                  {currentText || t('voiceAssistant.reading')}
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-2 justify-center">
              <Button
                onClick={pauseResumeVoice}
                variant="outline"
                disabled={!isVoiceActive}
              >
                {isPaused ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    {t('voiceAssistant.resume')}
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    {t('voiceAssistant.pause')}
                  </>
                )}
              </Button>
              <Button
                onClick={stopVoiceAssistant}
                variant="destructive"
              >
                <X className="h-4 w-4 mr-2" />
                {t('voiceAssistant.stop')}
              </Button>
            </div>

            <div className="text-sm text-muted-foreground text-center">
              {t('voiceAssistant.instructions')}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign Language Assistant Dialog */}
      <Dialog open={isSignLanguageActive} onOpenChange={setIsSignLanguageActive}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Hand className="h-5 w-5" />
              {t('signLanguageAssistant.title')}
            </DialogTitle>
            <DialogDescription>
              {t('signLanguageAssistant.description')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Background Image */}
            {backgroundImage && (
              <div 
                className="w-full h-64 rounded-lg overflow-hidden relative"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black/30" />
              </div>
            )}

            {/* Sign Language Character Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>{t('signLanguageAssistant.characterTitle')}</CardTitle>
                <CardDescription>
                  {t('signLanguageAssistant.characterDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center min-h-[300px] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border-2 border-dashed border-primary/20">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                      <Hand className="h-16 w-16 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{pageInfo.title}</h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        {pageInfo.description}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t('signLanguageAssistant.placeholder')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Page Information */}
            <Card>
              <CardHeader>
                <CardTitle>{t('signLanguageAssistant.pageInfo')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <strong>{t('signLanguageAssistant.pageTitle')}:</strong>
                  <p className="text-sm text-muted-foreground mt-1">{pageInfo.title}</p>
                </div>
                <div>
                  <strong>{t('signLanguageAssistant.pageDescription')}:</strong>
                  <p className="text-sm text-muted-foreground mt-1">{pageInfo.description}</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                onClick={stopSignLanguageAssistant}
                variant="outline"
              >
                <X className="h-4 w-4 mr-2" />
                {t('signLanguageAssistant.close')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

