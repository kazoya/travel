"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from 'next-intl';
import { MessageCircle, Users, Globe, Heart } from "lucide-react";

export default function CulturalCommunicationPage() {
  const t = useTranslations('CulturalCommunication');

  return (
    <div className="container mx-auto max-w-6xl">
      <header className="text-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <Globe className="h-8 w-8 text-primary mb-2" />
            <CardTitle>{t('features.culturalExchange.title')}</CardTitle>
            <CardDescription>{t('features.culturalExchange.description')}</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-primary mb-2" />
            <CardTitle>{t('features.localConnections.title')}</CardTitle>
            <CardDescription>{t('features.localConnections.description')}</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <MessageCircle className="h-8 w-8 text-primary mb-2" />
            <CardTitle>{t('features.languageSupport.title')}</CardTitle>
            <CardDescription>{t('features.languageSupport.description')}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('connectForm.title')}</CardTitle>
            <CardDescription>{t('connectForm.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder={t('connectForm.namePlaceholder')} />
            <Input placeholder={t('connectForm.emailPlaceholder')} type="email" />
            <Textarea placeholder={t('connectForm.messagePlaceholder')} className="min-h-[120px]" />
            <Button className="w-full">{t('connectForm.submitButton')}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('community.title')}</CardTitle>
            <CardDescription>{t('community.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Heart className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{t('community.shareExperience')}</p>
                  <p className="text-sm text-muted-foreground">{t('community.shareDescription')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{t('community.findCompanion')}</p>
                  <p className="text-sm text-muted-foreground">{t('community.findDescription')}</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">{t('community.joinButton')}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

