"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations, useLocale } from 'next-intl';
import { Calendar, MapPin, Users, Wheelchair, CheckCircle2 } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

export default function BookingPage() {
  const t = useTranslations('Booking');
  const locale = useLocale();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);

  const samplePlaces = [
    {
      id: 1,
      name: t('samplePlaces.hotel1.name'),
      location: t('samplePlaces.hotel1.location'),
      accessibility: [t('samplePlaces.hotel1.wheelchair'), t('samplePlaces.hotel1.visual')],
      rating: 4.8,
      price: 150
    },
    {
      id: 2,
      name: t('samplePlaces.hotel2.name'),
      location: t('samplePlaces.hotel2.location'),
      accessibility: [t('samplePlaces.hotel2.wheelchair'), t('samplePlaces.hotel2.hearing')],
      rating: 4.6,
      price: 120
    }
  ];

  return (
    <div className="container mx-auto max-w-6xl">
      <header className="text-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t('searchForm.title')}</CardTitle>
          <CardDescription>{t('searchForm.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>{t('searchForm.destination')}</Label>
              <Input placeholder={t('searchForm.destinationPlaceholder')} />
            </div>
            <div>
              <Label>{t('searchForm.checkIn')}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PPP", { locale: locale === 'ar' ? ar : enUS }) : t('searchForm.selectDate')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>{t('searchForm.checkOut')}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PPP", { locale: locale === 'ar' ? ar : enUS }) : t('searchForm.selectDate')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>{t('searchForm.guests')}</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  className="text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setGuests(guests + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <Button className="w-full mt-4">{t('searchForm.searchButton')}</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {samplePlaces.map((place) => (
          <Card key={place.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{place.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4" />
                    {place.location}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${place.price}</p>
                  <p className="text-sm text-muted-foreground">{t('perNight')}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(place.rating) ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{place.rating}</span>
              </div>
              <div className="space-y-2 mb-4">
                {place.accessibility.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {feature}
                  </div>
                ))}
              </div>
              <Button className="w-full">{t('bookNow')}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

