import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { getTranslations } from 'next-intl/server';

const locations = [
  {
    id: "doha",
    name: "الدوحة",
    mapImageId: "map_doha",
    pointsOfInterest: [
      "مداخل سوق واقف مهيأة للكراسي المتحركة",
      "أرصفة ذات ملمس خاص على الكورنيش",
      "أدلة صوتية في متحف الفن الإسلامي",
    ],
  },
  {
    id: "katara",
    name: "قرية كتارا الثقافية",
    mapImageId: "map_katara",
    pointsOfInterest: [
      "منحدرات وصول إلى جميع مستويات المسرح",
      "حمامات مهيأة في جميع الأنحاء",
      "مواقف ذات أولوية بالقرب من الأماكن الرئيسية",
    ],
  },
  {
    id: "msheireb",
    name: "مشيرب قلب الدوحة",
    mapImageId: "map_msheireb",
    pointsOfInterest: [
      "شبكة ترام مهيأة بالكامل",
      "غرف حسية في مناطق هادئة مخصصة",
      "لافتات بلغة بريل في متاحف مشيرب",
    ],
  },
  {
    id: "pearl",
    name: "لؤلؤة قطر",
    mapImageId: "map_pearl",
    pointsOfInterest: [
      "وصول بدون عوائق إلى جميع المحلات التجارية والمطاعم",
      "تاكسي مائي مع إمكانية الوصول للكراسي المتحركة",
      "منتزهات شاطئية مهيأة",
    ],
  },
];

export default async function MapsPage() {
  const t = await getTranslations('Maps');
  return (
    <div className="container mx-auto max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>
      
      <Accordion type="single" collapsible className="w-full">
        {locations.map((location) => {
          const mapImage = PlaceHolderImages.find(img => img.id === location.mapImageId);
          return (
            <AccordionItem value={location.id} key={location.id}>
              <AccordionTrigger className="text-xl font-headline hover:no-underline">
                {location.name}
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-headline text-lg mb-4">{t('keyFeatures')}</h3>
                        <ul className="space-y-2">
                          {location.pointsOfInterest.map((point, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-green-500 ml-2 mt-0.5 shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {mapImage && (
                         <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
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
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
