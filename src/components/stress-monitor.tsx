"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { Activity, AlertTriangle, MapPin, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/firebase/provider";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";

interface StressData {
  level: number; // 0-100
  timestamp: Date;
  factors: {
    voiceTone?: number;
    touchSpeed?: number;
    handMovement?: number;
    vibration?: number;
  };
}

export function StressMonitor() {
  const t = useTranslations('StressMonitor');
  const auth = useAuth();
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [currentStress, setCurrentStress] = useState<StressData | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (microphoneRef.current) {
        microphoneRef.current.mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startMonitoring = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);

      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      setIsMonitoring(true);

      // Monitor every 5 seconds
      intervalRef.current = setInterval(() => {
        measureStress();
      }, 5000);

      // Initial measurement
      measureStress();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('لا يمكن الوصول إلى الميكروفون. يرجى التحقق من الصلاحيات.');
    }
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (microphoneRef.current) {
      microphoneRef.current.mediaStream.getTracks().forEach(track => track.stop());
    }
  };

  const measureStress = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Analyze voice tone (pitch variation)
    const average = dataArray.reduce((a, b) => a + b) / bufferLength;
    const variance = dataArray.reduce((sum, val) => sum + Math.pow(val - average, 2), 0) / bufferLength;
    const voiceToneStress = Math.min(100, variance / 10);

    // Simulate other measurements (in a real app, these would use actual sensors)
    const touchSpeed = Math.random() * 30 + 20; // Simulated
    const handMovement = Math.random() * 25 + 15; // Simulated
    const vibration = Math.random() * 20 + 10; // Simulated

    const totalStress = Math.min(100, (voiceToneStress + touchSpeed + handMovement + vibration) / 4);

    const stressData: StressData = {
      level: totalStress,
      timestamp: new Date(),
      factors: {
        voiceTone: voiceToneStress,
        touchSpeed,
        handMovement,
        vibration,
      },
    };

    setCurrentStress(stressData);
    generateSuggestions(totalStress);
    saveStressData(stressData);
  };

  const generateSuggestions = (stressLevel: number) => {
    const newSuggestions: string[] = [];

    if (stressLevel > 70) {
      newSuggestions.push('مستوى التوتر مرتفع - يُنصح بالبحث عن مكان راحة قريب');
      newSuggestions.push('اقتراح: مسار بدون ضوضاء');
    } else if (stressLevel > 50) {
      newSuggestions.push('مستوى التوتر متوسط - قد تحتاج إلى استراحة قريباً');
    }

    if (stressLevel > 60) {
      newSuggestions.push('اقتراح: محلات بإنارة منخفضة');
      newSuggestions.push('اقتراح: مسارات واسعة للكراسي المتحركة');
    }

    setSuggestions(newSuggestions);
  };

  const saveStressData = async (data: StressData) => {
    if (!auth.currentUser) return;

    try {
      await addDoc(collection(db, 'stressReadings'), {
        userId: auth.currentUser.uid,
        level: data.level,
        factors: data.factors,
        timestamp: Timestamp.now(),
        location: await getCurrentLocation(),
      });
    } catch (error) {
      console.error('Error saving stress data:', error);
    }
  };

  const getCurrentLocation = async (): Promise<string> => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(`${position.coords.latitude}, ${position.coords.longitude}`);
          },
          () => resolve('غير متاح')
        );
      } else {
        resolve('غير متاح');
      }
    });
  };

  const getStressColor = (level: number) => {
    if (level >= 70) return 'text-red-600';
    if (level >= 50) return 'text-orange-600';
    if (level >= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStressBgColor = (level: number) => {
    if (level >= 70) return 'bg-red-500';
    if (level >= 50) return 'bg-orange-500';
    if (level >= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStressLabel = (level: number) => {
    if (level >= 70) return 'عالي';
    if (level >= 50) return 'متوسط';
    if (level >= 30) return 'منخفض';
    return 'طبيعي';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          مراقبة الإجهاد العصبي والنفسي
        </CardTitle>
        <CardDescription>
          قياس مستوى التوتر أثناء الرحلة باستخدام نبرة الصوت وحركة اليد
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isMonitoring ? (
          <Button onClick={startMonitoring} className="w-full">
            <Activity className="h-4 w-4 mr-2" />
            بدء المراقبة
          </Button>
        ) : (
          <div className="space-y-4">
            {currentStress && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">مستوى التوتر الحالي</span>
                    <Badge className={getStressBgColor(currentStress.level)}>
                      {getStressLabel(currentStress.level)}
                    </Badge>
                  </div>
                  <Progress value={currentStress.level} className="h-3" />
                  <div className="flex justify-between mt-1">
                    <span className={`text-sm font-bold ${getStressColor(currentStress.level)}`}>
                      {Math.round(currentStress.level)}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {currentStress.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">نبرة الصوت:</span>
                    <span className="ml-2 font-medium">
                      {Math.round(currentStress.factors.voiceTone || 0)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">سرعة اللمس:</span>
                    <span className="ml-2 font-medium">
                      {Math.round(currentStress.factors.touchSpeed || 0)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">حركة اليد:</span>
                    <span className="ml-2 font-medium">
                      {Math.round(currentStress.factors.handMovement || 0)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">الاهتزاز:</span>
                    <span className="ml-2 font-medium">
                      {Math.round(currentStress.factors.vibration || 0)}%
                    </span>
                  </div>
                </div>

                {suggestions.length > 0 && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-600" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                          اقتراحات:
                        </p>
                        {suggestions.map((suggestion, index) => (
                          <p key={index} className="text-xs text-yellow-700 dark:text-yellow-300">
                            • {suggestion}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            <Button onClick={stopMonitoring} variant="destructive" className="w-full">
              إيقاف المراقبة
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

