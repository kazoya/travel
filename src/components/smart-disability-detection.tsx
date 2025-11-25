"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { Mic, Hand, Brain, CheckCircle2, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth, useFirestore } from "@/firebase/provider";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface DetectionResult {
  disabilityType?: string;
  confidence: number;
  detectedFeatures: string[];
}

export function SmartDisabilityDetection() {
  const t = useTranslations('DisabilityDetection');
  const auth = useAuth();
  const db = useFirestore();
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionStep, setDetectionStep] = useState<'speech' | 'touch' | 'complete'>('speech');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [hasDetected, setHasDetected] = useState(false);
  const recognitionRef = useRef<any>(null);
  const touchStartTimeRef = useRef<number>(0);
  const touchCountRef = useRef<number>(0);

  useEffect(() => {
    // Check if user has already been detected
    checkExistingDetection();
    
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'ar-SA';
    }
  }, []);

  const checkExistingDetection = async () => {
    if (!auth.currentUser) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists() && userDoc.data().disabilityDetected) {
        setHasDetected(true);
        setResult(userDoc.data().detectionResult);
      }
    } catch (error) {
      console.error('Error checking detection:', error);
    }
  };

  const analyzeSpeech = (text: string): DetectionResult => {
    const detectedFeatures: string[] = [];
    let disabilityType = '';
    let confidence = 0;

    // Simple pattern matching for speech disorders
    const speechPatterns = {
      stutter: /(.)\1{2,}/g, // Repeated characters
      slow: text.length < 20, // Very short responses
      unclear: /[^a-zA-Z\u0600-\u06FF\s]/g.test(text), // Many non-alphabetic characters
    };

    if (speechPatterns.stutter.test(text)) {
      detectedFeatures.push('اضطراب في النطق');
      disabilityType = 'speech';
      confidence += 40;
    }

    if (speechPatterns.slow) {
      detectedFeatures.push('بطء في الكلام');
      confidence += 20;
    }

    return { disabilityType, confidence, detectedFeatures };
  };

  const analyzeTouch = (touchData: { duration: number; count: number }): DetectionResult => {
    const detectedFeatures: string[] = [];
    let disabilityType = '';
    let confidence = 0;

    // Analyze touch patterns
    if (touchData.duration > 1000) {
      detectedFeatures.push('لمس طويل');
      disabilityType = 'mobility';
      confidence += 30;
    }

    if (touchData.count < 3) {
      detectedFeatures.push('عدد لمسات قليل');
      confidence += 20;
    }

    if (touchData.duration > 500 && touchData.duration < 1000) {
      detectedFeatures.push('صعوبة في التحكم الدقيق');
      confidence += 25;
    }

    return { disabilityType, confidence, detectedFeatures };
  };

  const startSpeechDetection = () => {
    if (!recognitionRef.current) {
      alert('ميزة التعرف على الصوت غير متاحة في متصفحك');
      return;
    }

    setIsDetecting(true);
    setDetectionStep('speech');

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const speechResult = analyzeSpeech(transcript);
      
      setTimeout(() => {
        setDetectionStep('touch');
        startTouchDetection(speechResult);
      }, 1000);
    };

    recognitionRef.current.onerror = () => {
      setIsDetecting(false);
      alert('حدث خطأ في التعرف على الصوت');
    };

    recognitionRef.current.start();
  };

  const startTouchDetection = (speechResult: DetectionResult) => {
    touchStartTimeRef.current = Date.now();
    touchCountRef.current = 0;

    const handleTouchStart = () => {
      touchCountRef.current++;
    };

    const handleTouchEnd = () => {
      const duration = Date.now() - touchStartTimeRef.current;
      const touchResult = analyzeTouch({ duration, count: touchCountRef.current });
      
      // Combine results
      const combinedResult: DetectionResult = {
        disabilityType: touchResult.disabilityType || speechResult.disabilityType,
        confidence: Math.min(100, speechResult.confidence + touchResult.confidence),
        detectedFeatures: [...speechResult.detectedFeatures, ...touchResult.detectedFeatures],
      };

      setResult(combinedResult);
      setDetectionStep('complete');
      setIsDetecting(false);
      saveDetectionResult(combinedResult);

      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    // Auto-complete after 5 seconds
    setTimeout(() => {
      if (isDetecting) {
        handleTouchEnd();
      }
    }, 5000);
  };

  const saveDetectionResult = async (result: DetectionResult) => {
    if (!auth.currentUser) return;

    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        disabilityDetected: true,
        detectionResult: result,
        detectedAt: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error('Error saving detection:', error);
    }
  };

  if (hasDetected && result) {
    return (
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            تم التعرف على احتياجاتك
          </CardTitle>
          <CardDescription>
            نوع الإعاقة المقترح: {result.disabilityType || 'غير محدد'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">مستوى الثقة</span>
              <span className="text-sm font-medium">{result.confidence}%</span>
            </div>
            <Progress value={result.confidence} className="h-2" />
            {result.detectedFeatures.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">الميزات المكتشفة:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {result.detectedFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>التعرف الذكي على الإعاقة</CardTitle>
        <CardDescription>
          دعنا نتعرف على احتياجاتك من خلال تحليل طريقة كلامك ولمسك للشاشة
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isDetecting ? (
          <Button onClick={startSpeechDetection} className="w-full">
            <Brain className="h-4 w-4 mr-2" />
            ابدأ التعرف
          </Button>
        ) : (
          <div className="space-y-4">
            {detectionStep === 'speech' && (
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-sm">يرجى التحدث الآن...</p>
                <Mic className="h-12 w-12 text-primary mx-auto mt-4" />
              </div>
            )}
            {detectionStep === 'touch' && (
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-sm">يرجى لمس الشاشة عدة مرات...</p>
                <Hand className="h-12 w-12 text-primary mx-auto mt-4" />
              </div>
            )}
            {detectionStep === 'complete' && result && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">مستوى الثقة</span>
                  <span className="text-sm font-medium">{result.confidence}%</span>
                </div>
                <Progress value={result.confidence} className="h-2" />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

