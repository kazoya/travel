"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { GraduationCap, PlayCircle, BookOpen, Award, Clock, Users, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AcademyPage() {
  const t = useTranslations('Academy');
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [lessonsState, setLessonsState] = useState<{ [key: number]: boolean }>({
    1: true, // الدرس الأول مكتمل
  });

  const handleLessonClick = (lessonId: number) => {
    setSelectedLesson(lessonId);
  };

  const handleCompleteLesson = (lessonId: number) => {
    setLessonsState(prev => ({ ...prev, [lessonId]: true }));
    setSelectedLesson(null);
  };

  const lessons = [
    {
      id: 1,
      title: t('lessons.planning.title'),
      description: t('lessons.planning.description'),
      duration: "15 min",
      type: "video",
      completed: lessonsState[1] || false,
      category: "travel",
      content: t('lessons.planning.content') || "هذا الدرس يغطي أساسيات تخطيط الرحلة. سوف تتعلم كيفية اختيار الوجهة المناسبة، حجز التذاكر، وتنظيم الجدول الزمني لرحلة ناجحة."
    },
    {
      id: 2,
      title: t('lessons.packing.title'),
      description: t('lessons.packing.description'),
      duration: "10 min",
      type: "interactive",
      completed: lessonsState[2] || false,
      category: "travel",
      content: t('lessons.packing.content') || "تعلم كيفية تحضير حقيبتك بشكل صحيح. نصائح حول ما يجب إحضاره، كيفية تنظيم الأمتعة، والأشياء المهمة التي يجب ألا تنساها."
    },
    {
      id: 3,
      title: t('lessons.rights.title'),
      description: t('lessons.rights.description'),
      duration: "20 min",
      type: "video",
      completed: lessonsState[3] || false,
      category: "rights",
      content: t('lessons.rights.content') || "تعرف على حقوقك كمسافر من ذوي الإعاقة. القوانين الدولية والمحلية التي تحميك، وكيفية المطالبة بحقوقك عند السفر."
    },
    {
      id: 4,
      title: t('lessons.safety.title'),
      description: t('lessons.safety.description'),
      duration: "12 min",
      type: "interactive",
      completed: lessonsState[4] || false,
      category: "safety",
      content: t('lessons.safety.content') || "كيفية البقاء آمناً أثناء السفر. نصائح حول السلامة الشخصية، التعامل مع حالات الطوارئ، وحماية نفسك وممتلكاتك."
    },
    {
      id: 5,
      title: t('lessons.interaction.title'),
      description: t('lessons.interaction.description'),
      duration: "18 min",
      type: "video",
      completed: lessonsState[5] || false,
      category: "interaction",
      content: t('lessons.interaction.content') || "تعلم أفضل الممارسات للتواصل والتفاعل مع أشخاص ذوي الإعاقة. كيفية تقديم المساعدة بطريقة محترمة، وفهم احتياجاتهم المختلفة."
    },
    {
      id: 6,
      title: t('lessons.communication.title'),
      description: t('lessons.communication.description'),
      duration: "14 min",
      type: "interactive",
      completed: lessonsState[6] || false,
      category: "interaction",
      content: t('lessons.communication.content') || "طرق التواصل المناسبة مع مختلف أنواع الإعاقات. تعلم كيفية التواصل بشكل فعال مع الأشخاص ذوي الإعاقات البصرية، السمعية، والحركية."
    },
    {
      id: 7,
      title: t('lessons.assistance.title'),
      description: t('lessons.assistance.description'),
      duration: "16 min",
      type: "video",
      completed: lessonsState[7] || false,
      category: "interaction",
      content: t('lessons.assistance.content') || "كيفية تقديم المساعدة بطريقة محترمة ومفيدة. متى وكيف تقدم المساعدة، وما يجب تجنبه عند التعامل مع الأشخاص ذوي الإعاقة."
    },
    {
      id: 8,
      title: t('lessons.respect.title'),
      description: t('lessons.respect.description'),
      duration: "12 min",
      type: "interactive",
      completed: lessonsState[8] || false,
      category: "interaction",
      content: t('lessons.respect.content') || "مبادئ الاحترام والكرامة في التعامل مع ذوي الإعاقة. أهمية التعامل مع الجميع بكرامة واحترام، وتجنب التحيز والتمييز."
    }
  ];

  const achievements = [
    { id: 1, title: t('achievements.firstLesson'), icon: <Award className="h-5 w-5" />, earned: true },
    { id: 2, title: t('achievements.halfway'), icon: <Award className="h-5 w-5" />, earned: false },
    { id: 3, title: t('achievements.complete'), icon: <Award className="h-5 w-5" />, earned: false },
  ];

  // Update lessons with current state
  const updatedLessons = lessons.map(lesson => ({
    ...lesson,
    completed: lessonsState[lesson.id] || false
  }));

  const completedCount = updatedLessons.filter(l => l.completed).length;
  const progress = (completedCount / updatedLessons.length) * 100;
  
  const currentLesson = selectedLesson ? updatedLessons.find(l => l.id === selectedLesson) : null;

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
            <p className="text-3xl font-bold">{updatedLessons.filter(l => l.type === 'video').length}</p>
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
            <p className="text-3xl font-bold">{updatedLessons.length}</p>
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
        
        {/* قسم دورات السفر */}
        <div className="mb-8">
          <h3 className="text-xl font-bold font-headline mb-4 text-primary">{t('categories.travel')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {updatedLessons.filter(l => l.category === 'travel').map((lesson) => (
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
                  <Button 
                    className="w-full" 
                    variant={lesson.completed ? "outline" : "default"}
                    onClick={() => handleLessonClick(lesson.id)}
                  >
                    {lesson.completed ? t('review') : t('start')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* قسم دورات التعامل مع ذوي الإعاقة */}
        <div className="mb-8">
          <h3 className="text-xl font-bold font-headline mb-4 text-primary">{t('categories.interaction')}</h3>
          <Card className="mb-4 bg-primary/5">
            <CardHeader>
              <CardTitle>{t('interactionIntro.title')}</CardTitle>
              <CardDescription>{t('interactionIntro.description')}</CardDescription>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {updatedLessons.filter(l => l.category === 'interaction').map((lesson) => (
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
                  <Button 
                    className="w-full" 
                    variant={lesson.completed ? "outline" : "default"}
                    onClick={() => handleLessonClick(lesson.id)}
                  >
                    {lesson.completed ? t('review') : t('start')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* باقي الدروس */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {updatedLessons.filter(l => l.category !== 'travel' && l.category !== 'interaction').map((lesson) => (
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

      {/* Dialog for Lesson Content */}
      <Dialog open={selectedLesson !== null} onOpenChange={(open) => !open && setSelectedLesson(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline flex items-center gap-2">
              {currentLesson?.type === 'video' ? (
                <PlayCircle className="h-6 w-6 text-primary" />
              ) : (
                <BookOpen className="h-6 w-6 text-primary" />
              )}
              {currentLesson?.title}
            </DialogTitle>
            <DialogDescription className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4" />
                {currentLesson?.duration}
              </span>
              <span className="flex items-center gap-1 text-sm">
                {currentLesson?.type === 'video' ? t('video') : t('interactive')}
              </span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">{currentLesson?.description}</p>
            
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-3">{t('lessonContent') || 'محتوى الدرس'}</h3>
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {currentLesson?.content || t('lessonContentPlaceholder') || 'محتوى الدرس سيظهر هنا...'}
              </p>
            </div>

            {currentLesson?.type === 'video' && (
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <p className="text-sm flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 text-primary" />
                  {t('videoNote') || 'هذا درس فيديو. سيتم عرض الفيديو هنا عند توفر المحتوى.'}
                </p>
              </div>
            )}

            {currentLesson?.type === 'interactive' && (
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <p className="text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  {t('interactiveNote') || 'هذا درس تفاعلي. يمكنك التفاعل مع المحتوى والإجابة على الأسئلة.'}
                </p>
              </div>
            )}

            {!currentLesson?.completed && (
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={() => currentLesson && handleCompleteLesson(currentLesson.id)}
                  className="flex-1"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  {t('markComplete') || 'إكمال الدرس'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedLesson(null)}
                >
                  {t('close') || 'إغلاق'}
                </Button>
              </div>
            )}

            {currentLesson?.completed && (
              <div className="flex gap-2 pt-4">
                <div className="flex items-center gap-2 text-primary flex-1">
                  <Award className="h-5 w-5" />
                  <span className="text-sm font-medium">{t('completed') || 'مكتمل'}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedLesson(null)}
                >
                  {t('close') || 'إغلاق'}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

