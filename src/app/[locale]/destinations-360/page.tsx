"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { Globe, MapPin, Star, Eye } from "lucide-react";

export default function Destinations360Page() {
  const t = useTranslations('Destinations360');

  const destinations = [
    {
      id: 1,
      name: t('destinations.doha.name'),
      location: t('destinations.doha.location'),
      rating: 4.8,
      accessibility: [t('destinations.doha.wheelchair'), t('destinations.doha.visual'), t('destinations.doha.hearing')],
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2070"
    },
    {
      id: 2,
      name: t('destinations.dubai.name'),
      location: t('destinations.dubai.location'),
      rating: 4.7,
      accessibility: [t('destinations.dubai.wheelchair'), t('destinations.dubai.visual')],
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070"
    },
    {
      id: 3,
      name: t('destinations.istanbul.name'),
      location: t('destinations.istanbul.location'),
      rating: 4.6,
      accessibility: [t('destinations.istanbul.wheelchair'), t('destinations.istanbul.hearing')],
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071"
    }
  ];

  return (
    <div className="container mx-auto max-w-6xl">
      <header className="text-center mb-8">
        <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Card key={destination.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative h-48 bg-muted">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Button size="sm" variant="secondary" className="gap-2">
                  <Eye className="h-4 w-4" />
                  {t('view360')}
                </Button>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{destination.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4" />
                    {destination.location}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium">{t('accessibilityFeatures')}:</p>
                {destination.accessibility.map((feature, idx) => (
                  <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="h-2 w-2 bg-primary rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>
              <Button className="w-full">{t('explore')}</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t('howItWorks.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-medium mb-2">{t('howItWorks.step1.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('howItWorks.step1.description')}</p>
            </div>
            <div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-medium mb-2">{t('howItWorks.step2.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('howItWorks.step2.description')}</p>
            </div>
            <div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-medium mb-2">{t('howItWorks.step3.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('howItWorks.step3.description')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

