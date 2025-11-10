"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { GraduationCap, PlayCircle, BookOpen, Award, Clock, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AcademyPage() {
  const t = useTranslations('Academy');

  const lessons = [
    {
      id: 1,
      title: t('lessons.planning.title'),
      description: t('lessons.planning.description'),
      duration: "15 min",
      type: "video",
      completed: true
    },
    {
      id: 2,
      title: t('lessons.packing.title'),
      description: t('lessons.packing.description'),
      duration: "10 min",
      type: "interactive",
      completed: false
    },
    {
      id: 3,
      title: t('lessons.rights.title'),
      description: t('lessons.rights.description'),
      duration: "20 min",
      type: "video",
      completed: false
    },
    {
      id: 4,
      title: t('lessons.safety.title'),
      description: t('lessons.safety.description'),
      duration: "12 min",
      type: "interactive",
      completed: false
    }
  ];

  const achievements = [
    { id: 1, title: t('achievements.firstLesson'), icon: <Award className="h-5 w-5" />, earned: true },
    { id: 2, title: t('achievements.halfway'), icon: <Award className="h-5 w-5" />, earned: false },
    { id: 3, title: t('achievements.complete'), icon: <Award className="h-5 w-5" />, earned: false },
  ];

  const completedCount = lessons.filter(l => l.completed).length;
  const progress = (completedCount / lessons.length) * 100;

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
              <PlayCircle className="h-5 w-5 text-primary" />
              {t('stats.videos')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{lessons.filter(l => l.type === 'video').length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {t('stats.lessons')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{lessons.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              {t('stats.progress')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{Math.round(progress)}%</p>
            <Progress value={progress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 mb-8">
        <h2 className="text-2xl font-bold font-headline">{t('lessonsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      {lesson.type === 'video' ? (
                        <PlayCircle className="h-6 w-6 text-primary" />
                      ) : (
                        <BookOpen className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <CardTitle>{lesson.title}</CardTitle>
                      <CardDescription className="mt-1">{lesson.description}</CardDescription>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {lesson.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {lesson.type === 'video' ? t('video') : t('interactive')}
                        </span>
                      </div>
                    </div>
                  </div>
                  {lesson.completed && (
                    <Award className="h-5 w-5 text-primary" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant={lesson.completed ? "outline" : "default"}>
                  {lesson.completed ? t('review') : t('start')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            {t('achievementsTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 border rounded-lg ${achievement.earned ? 'bg-primary/5 border-primary' : 'opacity-50'}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {achievement.icon}
                  <span className="font-medium">{achievement.title}</span>
                </div>
                {achievement.earned && (
                  <p className="text-sm text-muted-foreground">{t('earned')}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

