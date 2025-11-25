"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from 'next-intl';
import { MapPin, Search, Star, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CityRating {
  name: string;
  country: string;
  overallRating: number;
  factors: {
    sidewalks: number;
    noise: number;
    bathrooms: number;
    transportation: number;
    hotels: number;
  };
}

const cityRatings: CityRating[] = [
  {
    name: "عمان",
    country: "الأردن",
    overallRating: 72,
    factors: {
      sidewalks: 65,
      noise: 70,
      bathrooms: 75,
      transportation: 68,
      hotels: 80,
    },
  },
  {
    name: "دبي",
    country: "الإمارات العربية المتحدة",
    overallRating: 91,
    factors: {
      sidewalks: 95,
      noise: 88,
      bathrooms: 92,
      transportation: 90,
      hotels: 95,
    },
  },
  {
    name: "إسطنبول",
    country: "تركيا",
    overallRating: 55,
    factors: {
      sidewalks: 50,
      noise: 45,
      bathrooms: 60,
      transportation: 55,
      hotels: 65,
    },
  },
  {
    name: "الرياض",
    country: "السعودية",
    overallRating: 78,
    factors: {
      sidewalks: 75,
      noise: 80,
      bathrooms: 80,
      transportation: 75,
      hotels: 82,
    },
  },
];

export default function CityRatingsPage() {
  const t = useTranslations('CityRatings');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = cityRatings.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRatingColor = (rating: number) => {
    if (rating >= 80) return "text-green-600";
    if (rating >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getRatingBgColor = (rating: number) => {
    if (rating >= 80) return "bg-green-500";
    if (rating >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <header className="text-center mb-8">
        <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCities.map((city) => (
          <Card key={city.name} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {city.name}
                  </CardTitle>
                  <CardDescription>{city.country}</CardDescription>
                </div>
                <div className={`text-3xl font-bold ${getRatingColor(city.overallRating)}`}>
                  {city.overallRating}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{t('overallRating')}</span>
                  <span className="text-sm text-muted-foreground">{city.overallRating} {t('outOf')}</span>
                </div>
                <Progress value={city.overallRating} className="h-2" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{t('factors.sidewalks')}</span>
                    <span className="text-sm font-medium">{city.factors.sidewalks}%</span>
                  </div>
                  <Progress value={city.factors.sidewalks} className="h-1" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{t('factors.noise')}</span>
                    <span className="text-sm font-medium">{city.factors.noise}%</span>
                  </div>
                  <Progress value={city.factors.noise} className="h-1" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{t('factors.bathrooms')}</span>
                    <span className="text-sm font-medium">{city.factors.bathrooms}%</span>
                  </div>
                  <Progress value={city.factors.bathrooms} className="h-1" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{t('factors.transportation')}</span>
                    <span className="text-sm font-medium">{city.factors.transportation}%</span>
                  </div>
                  <Progress value={city.factors.transportation} className="h-1" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{t('factors.hotels')}</span>
                    <span className="text-sm font-medium">{city.factors.hotels}%</span>
                  </div>
                  <Progress value={city.factors.hotels} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCities.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">لم يتم العثور على نتائج</p>
        </div>
      )}
    </div>
  );
}

