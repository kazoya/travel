"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { AlertTriangle, Phone, MapPin, Globe, FileText, User } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function EmergencyPage() {
  const t = useTranslations('Emergency');
  const [location, setLocation] = useState<string>("");

  return (
    <div className="container mx-auto max-w-4xl">
      <header className="text-center mb-8">
        <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-destructive">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-destructive" />
              {t('location.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{t('location.current')}</p>
            <p className="font-mono text-sm bg-muted p-2 rounded">
              {location || t('location.fetching')}
            </p>
            <Button 
              variant="outline" 
              className="mt-2 w-full"
              onClick={() => {
                navigator.geolocation.getCurrentPosition(
                  (pos) => setLocation(`${pos.coords.latitude}, ${pos.coords.longitude}`),
                  () => setLocation(t('location.error'))
                );
              }}
            >
              {t('location.update')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {t('healthStatus.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('healthStatus.description')}</p>
            <Button variant="outline" className="mt-4 w-full" asChild>
              <a href="/passport">{t('healthStatus.viewPassport')}</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            {t('language.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{t('language.description')}</p>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm">العربية</Button>
            <Button variant="outline" size="sm">English</Button>
            <Button variant="outline" size="sm">Français</Button>
            <Button variant="outline" size="sm">Español</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">{t('quickContacts.title')}</CardTitle>
          <CardDescription>{t('quickContacts.description')}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="destructive" className="w-full" asChild>
            <a href="tel:999">
              <Phone className="h-4 w-4 mr-2" />
              {t('quickContacts.police')}
            </a>
          </Button>
          <Button variant="destructive" className="w-full" asChild>
            <a href="tel:997">
              <Phone className="h-4 w-4 mr-2" />
              {t('quickContacts.hospital')}
            </a>
          </Button>
          <Button variant="destructive" className="w-full" asChild>
            <a href="tel:4444">
              <Phone className="h-4 w-4 mr-2" />
              {t('quickContacts.embassy')}
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {t('digitalPassport.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{t('digitalPassport.description')}</p>
          <Button className="w-full" asChild>
            <a href="/passport">{t('digitalPassport.viewButton')}</a>
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="lg" variant="destructive" className="text-lg px-8 py-6">
              <AlertTriangle className="h-6 w-6 mr-2" />
              {t('sosButton')}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('sosDialog.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('sosDialog.description')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('sosDialog.cancel')}</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => {
                  // In a real app, this would send emergency alert
                  console.log("Emergency SOS activated");
                }}
                className="bg-destructive"
              >
                {t('sosDialog.confirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

