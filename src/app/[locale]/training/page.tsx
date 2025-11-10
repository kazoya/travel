"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { GraduationCap, Video, BookOpen, Award, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function TrainingPage() {
  const t = useTranslations('Training');

  const courses = [
    {
      id: 1,
      title: t('courses.basics.title'),
      description: t('courses.basics.description'),
      duration: t('courses.basics.duration'),
      progress: 0,
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      id: 2,
      title: t('courses.hotel.title'),
      description: t('courses.hotel.description'),
      duration: t('courses.hotel.duration'),
      progress: 45,
      icon: <Video className="h-6 w-6" />
    },
    {
      id: 3,
      title: t('courses.transport.title'),
      description: t('courses.transport.description'),
      duration: t('courses.transport.duration'),
      progress: 0,
      icon: <GraduationCap className="h-6 w-6" />
    }
  ];

  return (
    <div className="container mx-auto max-w-6xl">
      <header className="text-center mb-8">
        <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              {t('features.videos.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('features.videos.description')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {t('features.materials.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('features.materials.description')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              {t('features.certification.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('features.certification.description')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-headline">{t('availableCourses')}</h2>
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    {course.icon}
                  </div>
                  <div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="mt-1">{course.description}</CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">{t('duration')}: {course.duration}</p>
                  </div>
                </div>
                <Button>{course.progress > 0 ? t('continue') : t('start')}</Button>
              </div>
            </CardHeader>
            {course.progress > 0 && (
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('progress')}</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            {t('benefits.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {[t('benefits.benefit1'), t('benefits.benefit2'), t('benefits.benefit3')].map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

