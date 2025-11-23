import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, MapPin, Building, Umbrella, AlertCircle, Heart, Navigation } from "lucide-react";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const locations = [
  {
    id: "amman",
    name: "عمان",
    mapImageId: "map_amman",
    pointsOfInterest: [
      "مسارات مهيأة للكراسي المتحركة في وسط البلد ",
      "منحدرات ومصاعد في المدرج الروماني",
      "جولات مصحوبة بمرشدين بلغة الإشارة في جبل القلعة",
    ],
  },
  {
    id: "petra",
    name: "البتراء",
    mapImageId: "map_petra",
    pointsOfInterest: [
      "مسار السيق ممهد للكراسي المتحركة",
      "عربات كهربائية متاحة للتنقل داخل الموقع",
      "حمامات مهيأة عند مركز الزوار والخزنة",
    ],
  },
  {
    id: "wadi_rum",
    name: "وادي رم",
    mapImageId: "map_wadi_rum",
    pointsOfInterest: [
      "مخيمات سياحية مع خيام مهيأة",
      "جولات بسيارات الدفع الرباعي يمكن تكييفها",
      "مسارات ممهدة حول مناطق المشاهدة الرئيسية",
    ],
  },
  {
    id: "jerash",
    name: "جرش",
    mapImageId: "map_jerash",
    pointsOfInterest: [
        "مسارات واسعة ومستوية عبر معظم الموقع الأثري",
        "مناطق استراحة مظللة يمكن الوصول إليها",
        "لوحات إرشادية واضحة و كبيرة",
    ],
  },
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function MapsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Maps');
  return (
    <div className="container mx-auto max-w-6xl">
      <header className="text-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>

      {/* Smart Maps Features - Stress & Comfort */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              {t('nearestRestroom')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('nearestRestroomDesc')}</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              {t('findNow')}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              {t('accessibleRoutes')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('accessibleRoutesDesc')}</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              {t('viewRoutes')}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Umbrella className="h-5 w-5 text-primary" />
              {t('restAreas')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('restAreasDesc')}</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              {t('findRest')}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-primary/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Heart className="h-5 w-5 text-destructive" />
              {t('needRestNow')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('needRestNowDesc')}</p>
            <Button variant="destructive" size="sm" className="mt-2 w-full">
              {t('findNearest')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stress Level Indicator */}
      <Card className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {t('stressLevel')}
          </CardTitle>
          <CardDescription>{t('stressLevelDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span>{t('currentLevel')}</span>
                <Badge variant="outline">متوسط</Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/2 transition-all"></div>
              </div>
            </div>
            <Button variant="outline">{t('updateLevel')}</Button>
          </div>
        </CardContent>
      </Card>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {locations.map((location) => {
          const mapImage = PlaceHolderImages.find(img => img.id === location.mapImageId);
          return (
            <AccordionItem value={location.id} key={location.id} className="border rounded-lg overflow-hidden bg-card transition-all hover:shadow-lg hover:border-primary/50">
              <AccordionTrigger className="text-xl font-headline hover:no-underline px-6 py-4 data-[state=open]:bg-muted/50">
                 <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    <span>{location.name}</span>
                 </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="font-headline text-lg mb-4">{t('keyFeatures')}</h3>
                    <ul className="space-y-3">
                      {location.pointsOfInterest.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 ml-2 mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {mapImage && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
                        <Image
                            src={mapImage.imageUrl}
                            alt={mapImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={mapImage.imageHint}
                        />
                      </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
