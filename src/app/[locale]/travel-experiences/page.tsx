"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from 'next-intl';
import { Video, Upload, Play, MapPin, Calendar, User, Star, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/firebase/provider";
import { collection, addDoc, query, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import Image from "next/image";

interface TravelExperience {
  id: string;
  userId: string;
  userName: string;
  destination: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  rating: number;
  disabilityType: string;
  createdAt: Timestamp;
  likes: number;
}

export default function TravelExperiencesPage() {
  const t = useTranslations('TravelExperiences');
  const auth = useAuth();
  const [experiences, setExperiences] = useState<TravelExperience[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    description: "",
    disabilityType: "",
    rating: 5,
    videoFile: null as File | null,
  });

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const q = query(collection(db, 'travelExperiences'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const loadedExperiences = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as TravelExperience[];
      setExperiences(loadedExperiences);
    } catch (error) {
      console.error('Error loading experiences:', error);
    }
  };

  const handleSubmit = async () => {
    if (!auth.currentUser) {
      alert('يجب تسجيل الدخول أولاً');
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, upload video to Firebase Storage first
      const experienceData = {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || 'مستخدم',
        destination: formData.destination,
        description: formData.description,
        disabilityType: formData.disabilityType,
        rating: formData.rating,
        likes: 0,
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, 'travelExperiences'), experienceData);
      
      setFormData({
        destination: "",
        description: "",
        disabilityType: "",
        rating: 5,
        videoFile: null,
      });
      setIsDialogOpen(false);
      loadExperiences();
    } catch (error) {
      console.error('Error submitting experience:', error);
      alert('حدث خطأ أثناء إضافة التجربة');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (experienceId: string) => {
    // In a real app, update likes count in Firestore
    setExperiences(prev => prev.map(exp => 
      exp.id === experienceId ? { ...exp, likes: exp.likes + 1 } : exp
    ));
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <header className="text-center mb-8">
        <Video className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>

      <div className="mb-6 flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              {t('shareExperience')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t('shareExperience')}</DialogTitle>
              <DialogDescription>{t('shareDescription')}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-2 block">{t('destination')}</label>
                <Input
                  placeholder={t('destinationPlaceholder')}
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{t('disabilityType')}</label>
                <Input
                  placeholder={t('disabilityTypePlaceholder')}
                  value={formData.disabilityType}
                  onChange={(e) => setFormData({ ...formData, disabilityType: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{t('description')}</label>
                <Textarea
                  placeholder={t('descriptionPlaceholder')}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{t('video')}</label>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFormData({ ...formData, videoFile: e.target.files?.[0] || null })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{t('rating')}</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 cursor-pointer ${
                        star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                      onClick={() => setFormData({ ...formData, rating: star })}
                    />
                  ))}
                </div>
              </div>
              <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
                {isLoading ? t('uploading') : t('submit')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience) => (
          <Card key={experience.id} className="overflow-hidden">
            {experience.videoUrl && (
              <div className="relative h-48 w-full bg-muted">
                <video
                  src={experience.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {experience.destination}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <User className="h-3 w-3" />
                    {experience.userName}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{experience.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{experience.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{experience.disabilityType}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(experience.id)}
                  className="gap-2"
                >
                  <Heart className="h-4 w-4" />
                  {experience.likes}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-12">
          <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">{t('noExperiences')}</p>
        </div>
      )}
    </div>
  );
}

