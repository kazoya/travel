"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { Ear, Volume2, Captions, Waves, AlertCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AudioAccessibilityProps {
  audioElement?: HTMLAudioElement | HTMLVideoElement;
  autoGenerateCaptions?: boolean;
}

export function AudioAccessibility({ audioElement, autoGenerateCaptions = false }: AudioAccessibilityProps) {
  const t = useTranslations('AudioAccessibility');
  const [isEnabled, setIsEnabled] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [captions, setCaptions] = useState<string[]>([]);
  const [currentCaption, setCurrentCaption] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | HTMLVideoElement | null>(audioElement || null);

  useEffect(() => {
    const checkHearingAid = () => {
      const enabled = document.documentElement.getAttribute('data-hearing-aid') === 'true';
      setIsEnabled(enabled);
      if (enabled && autoGenerateCaptions) {
        setShowCaptions(true);
      }
    };

    checkHearingAid();

    const observer = new MutationObserver(checkHearingAid);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-hearing-aid'],
    });

    return () => observer.disconnect();
  }, [autoGenerateCaptions]);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    // In a real implementation, this would use Web Speech API or a transcription service
    // to generate captions from audio
    const generateCaptions = async () => {
      if (showCaptions && audio) {
        // Placeholder: In production, this would transcribe audio to text
        // For now, show a placeholder message
        setCaptions([
          t('captionPlaceholder1'),
          t('captionPlaceholder2'),
          t('captionPlaceholder3'),
        ]);
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    if (showCaptions) {
      generateCaptions();
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [showCaptions, t]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Visual Sound Indicator */}
      {isPlaying && (
        <Card className="border-primary border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Waves className="h-4 w-4 animate-pulse text-primary" />
              {t('audioPlaying')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-1 h-8 bg-primary rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '0.6s',
                    }}
                  />
                ))}
              </div>
              <Badge variant="outline" className="ml-auto">
                <Ear className="h-3 w-3 mr-1" />
                {t('hearingMode')}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Captions Display */}
      {showCaptions && (
        <Card className="caption border-primary border-2">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Captions className="h-4 w-4" />
              {t('captions')}
            </CardTitle>
            <CardDescription>{t('captionsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 min-h-[100px] p-4 bg-muted rounded-lg">
              {currentCaption ? (
                <p className="text-lg font-medium">{currentCaption}</p>
              ) : (
                <div className="space-y-2">
                  {captions.map((caption, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {caption}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCaptions(!showCaptions)}
              >
                {showCaptions ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    {t('hideCaptions')}
                  </>
                ) : (
                  <>
                    <Captions className="h-4 w-4 mr-2" />
                    {t('showCaptions')}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
          </CardContent>
        </Card>
      )}

      {/* Visual Alert for Important Audio */}
      {isEnabled && (
        <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg border border-primary">
          <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">{t('hearingAidActive')}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {t('hearingAidDescription')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Hook to add audio accessibility to any audio/video element
export function useAudioAccessibility(element: HTMLAudioElement | HTMLVideoElement | null) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const checkHearingAid = () => {
      const enabled = document.documentElement.getAttribute('data-hearing-aid') === 'true';
      setIsEnabled(enabled);
      
      if (enabled && element) {
        element.setAttribute('data-has-audio', 'true');
        element.setAttribute('data-captions', 'true');
      }
    };

    checkHearingAid();

    const observer = new MutationObserver(checkHearingAid);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-hearing-aid'],
    });

    return () => observer.disconnect();
  }, [element]);

  return { isEnabled };
}

