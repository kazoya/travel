"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from 'next-intl';
import { Globe, MessageCircle, Users, Search, MapPin, Heart, Languages } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function CulturalTravelPage() {
  const t = useTranslations('CulturalTravel');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDisabilityType, setSelectedDisabilityType] = useState("");

  // بيانات وهمية للمستخدمين من دول أخرى
  const culturalConnections = [
    {
      id: 1,
      name: "أحمد محمد",
      country: "مصر",
      countryCode: "eg",
      disabilityType: "mobility",
      languages: ["العربية", "English"],
      interests: ["السياحة الثقافية", "المتاحف", "الطعام"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
      bio: "مسافر من مصر، أحب استكشاف الثقافات المختلفة والتواصل مع أشخاص من ذوي الإعاقة حول العالم.",
      status: "online"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      country: "United States",
      countryCode: "us",
      disabilityType: "visual",
      languages: ["English", "Español"],
      interests: ["Music", "Art", "Food"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "Traveler from the US, passionate about cultural exchange and accessibility advocacy.",
      status: "online"
    },
    {
      id: 3,
      name: "محمد علي",
      country: "المغرب",
      countryCode: "ma",
      disabilityType: "hearing",
      languages: ["العربية", "Français"],
      interests: ["التاريخ", "الطبيعة", "الفن"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
      bio: "مسافر من المغرب، أبحث عن فرص للتواصل الثقافي وتبادل الخبرات.",
      status: "away"
    },
    {
      id: 4,
      name: "Maria Garcia",
      country: "Spain",
      countryCode: "es",
      disabilityType: "mobility",
      languages: ["Español", "English", "Français"],
      interests: ["Architecture", "Beaches", "Food"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      bio: "Traveler from Spain, love connecting with people with disabilities worldwide.",
      status: "online"
    },
    {
      id: 5,
      name: "Fatima Al-Zahra",
      country: "UAE",
      countryCode: "ae",
      disabilityType: "cognitive",
      languages: ["العربية", "English"],
      interests: ["التسوق", "المطاعم", "الفعاليات الثقافية"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
      bio: "مسافرة من الإمارات، أستمتع بالتواصل مع أشخاص من ثقافات مختلفة.",
      status: "online"
    },
    {
      id: 6,
      name: "Jean-Pierre",
      country: "France",
      countryCode: "fr",
      disabilityType: "visual",
      languages: ["Français", "English"],
      interests: ["Museums", "Wine", "History"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean",
      bio: "Voyageur français, passionné par les échanges culturels et l'accessibilité.",
      status: "away"
    }
  ];

  const countries = [
    { value: "", label: t('allCountries') },
    { value: "eg", label: "مصر" },
    { value: "us", label: "United States" },
    { value: "ma", label: "المغرب" },
    { value: "es", label: "Spain" },
    { value: "ae", label: "UAE" },
    { value: "fr", label: "France" },
  ];

  const disabilityTypes = [
    { value: "", label: t('allDisabilities') },
    { value: "mobility", label: t('disabilityTypes.mobility') },
    { value: "visual", label: t('disabilityTypes.visual') },
    { value: "hearing", label: t('disabilityTypes.hearing') },
    { value: "cognitive", label: t('disabilityTypes.cognitive') },
  ];

  const filteredConnections = culturalConnections.filter(connection => {
    const matchesSearch = !searchQuery || 
      connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = !selectedCountry || connection.countryCode === selectedCountry;
    const matchesDisability = !selectedDisabilityType || connection.disabilityType === selectedDisabilityType;
    
    return matchesSearch && matchesCountry && matchesDisability;
  });

  return (
    <div className="container mx-auto max-w-6xl">
      <header className="text-center mb-8">
        <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>

      {/* شريط البحث والفلترة */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {t('searchAndFilter')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectCountry')} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedDisabilityType} onValueChange={setSelectedDisabilityType}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectDisabilityType')} />
                </SelectTrigger>
                <SelectContent>
                  {disabilityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {t('totalConnections')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{culturalConnections.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              {t('countries')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{new Set(culturalConnections.map(c => c.countryCode)).size}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              {t('onlineNow')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{culturalConnections.filter(c => c.status === 'online').length}</p>
          </CardContent>
        </Card>
      </div>

      {/* قائمة الاتصالات الثقافية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnections.map((connection) => (
          <Card key={connection.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={connection.avatar} />
                    <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{connection.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{connection.country}</span>
                      <Badge 
                        variant={connection.status === 'online' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {connection.status === 'online' ? t('online') : t('away')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{connection.bio}</p>
              
              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  {t('languages')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {connection.languages.map((lang, index) => (
                    <Badge key={index} variant="outline">{lang}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  {t('interests')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {connection.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">{interest}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Badge variant="outline" className="text-xs">
                  {t(`disabilityTypes.${connection.disabilityType}`)}
                </Badge>
              </div>

              <Button className="w-full" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                {t('connect')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredConnections.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground">{t('noResults')}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

