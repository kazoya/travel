"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from 'next-intl';
import { UserPlus, LogIn, User, Mail, Phone, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CompanionAuthPage() {
  const t = useTranslations('CompanionAuth');
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container mx-auto max-w-2xl">
      <header className="text-center mb-8">
        <UserPlus className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">{t('login.title')}</TabsTrigger>
          <TabsTrigger value="register">{t('register.title')}</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogIn className="h-5 w-5" />
                {t('login.title')}
              </CardTitle>
              <CardDescription>{t('login.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="login-email">{t('login.email')}</Label>
                <Input id="login-email" type="email" placeholder={t('login.emailPlaceholder')} />
              </div>
              <div>
                <Label htmlFor="login-password">{t('login.password')}</Label>
                <Input id="login-password" type="password" placeholder={t('login.passwordPlaceholder')} />
              </div>
              <Button className="w-full">{t('login.submitButton')}</Button>
              <p className="text-sm text-center text-muted-foreground">
                {t('login.forgotPassword')} <Button variant="link" className="p-0 h-auto">{t('login.resetLink')}</Button>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                {t('register.title')}
              </CardTitle>
              <CardDescription>{t('register.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="register-name">{t('register.name')}</Label>
                  <Input id="register-name" placeholder={t('register.namePlaceholder')} />
                </div>
                <div>
                  <Label htmlFor="register-phone">{t('register.phone')}</Label>
                  <Input id="register-phone" type="tel" placeholder={t('register.phonePlaceholder')} />
                </div>
              </div>
              <div>
                <Label htmlFor="register-email">{t('register.email')}</Label>
                <Input id="register-email" type="email" placeholder={t('register.emailPlaceholder')} />
              </div>
              <div>
                <Label htmlFor="register-location">{t('register.location')}</Label>
                <Input id="register-location" placeholder={t('register.locationPlaceholder')} />
              </div>
              <div>
                <Label htmlFor="register-languages">{t('register.languages')}</Label>
                <Input id="register-languages" placeholder={t('register.languagesPlaceholder')} />
              </div>
              <div>
                <Label htmlFor="register-experience">{t('register.experience')}</Label>
                <Input id="register-experience" placeholder={t('register.experiencePlaceholder')} />
              </div>
              <div>
                <Label htmlFor="register-password">{t('register.password')}</Label>
                <Input id="register-password" type="password" placeholder={t('register.passwordPlaceholder')} />
              </div>
              <Button className="w-full">{t('register.submitButton')}</Button>
              <p className="text-xs text-center text-muted-foreground">
                {t('register.terms')}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{t('benefits.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {[t('benefits.benefit1'), t('benefits.benefit2'), t('benefits.benefit3'), t('benefits.benefit4')].map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

