"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { User, Settings, Award, Calendar, Star, Fingerprint } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function ProfilePage() {
  const t = useTranslations('Profile');

  return (
    <div className="container mx-auto max-w-6xl">
      <header className="text-center mb-8">
        <User className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
          <TabsTrigger value="disability">{t('tabs.disability')}</TabsTrigger>
          <TabsTrigger value="travel">{t('tabs.travel')}</TabsTrigger>
          <TabsTrigger value="rewards">{t('tabs.rewards')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t('overview.personalInfo.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('overview.personalInfo.name')}</p>
                  <p className="font-medium">John Doe</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('overview.personalInfo.email')}</p>
                  <p className="font-medium">john@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('overview.personalInfo.phone')}</p>
                  <p className="font-medium">+1-555-123-4567</p>
                </div>
                <Button variant="outline" className="w-full">{t('overview.personalInfo.edit')}</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fingerprint className="h-5 w-5" />
                  {t('overview.digitalPassport.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{t('overview.digitalPassport.description')}</p>
                <Button className="w-full" asChild>
                  <a href="/passport">{t('overview.digitalPassport.view')}</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="disability">
          <Card>
          <CardHeader>
          <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {t('disability.title')}
          </CardTitle>
          </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t('disability.type')}</p>
                <p className="font-medium">Wheelchair user</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t('disability.assistiveDevices')}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">Wheelchair</span>
                  <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">Hearing aids</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t('disability.preferences')}</p>
                <p className="text-sm">Step-free access, Visual alerts, Accessible restrooms</p>
              </div>
              <Button variant="outline" className="w-full">{t('disability.edit')}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="travel">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t('travel.history.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('travel.history.description')}</p>
                <div className="mt-4 space-y-3">
                  {[1, 2, 3].map((trip) => (
                    <div key={trip} className="p-3 border rounded-lg">
                      <p className="font-medium">Trip to Doha, Qatar</p>
                      <p className="text-sm text-muted-foreground">March 2024</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  {t('travel.reviews.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('travel.reviews.description')}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                {t('rewards.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-primary mb-2">1,250</p>
                <p className="text-sm text-muted-foreground">{t('rewards.points')}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{t('rewards.nextLevel')}</span>
                    <span>2,000 {t('rewards.points')}</span>
                  </div>
                  <Progress value={62.5} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 border rounded-lg text-center">
                    <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium">{t('rewards.badges')}</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium">{t('rewards.reviews')}</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium">{t('rewards.trips')}</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

