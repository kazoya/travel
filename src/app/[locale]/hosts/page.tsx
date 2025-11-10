import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, MessageCircle } from "lucide-react";
import { getTranslations } from 'next-intl/server';

const hosts = [
  {
    id: "1",
    name: "أليكس جونسون",
    location: "الدوحة، قطر",
    languages: ["الإنجليزية", "العربية"],
    imageId: "host1",
  },
  {
    id: "2",
    name: "ماريا غارسيا",
    location: "مشيرب، قطر",
    languages: ["الإسبانية", "الإنجليزية"],
    imageId: "host2",
  },
  {
    id: "3",
    name: "تشين وي",
    location: "اللؤلؤة، قطر",
    languages: ["الماندرين", "الإنجليزية"],
    imageId: "host3",
  },
  {
    id: "4",
    name: "فاطمة آل ثاني",
    location: "كتارا، قطر",
    languages: ["العربية", "الفرنسية", "الإنجليزية"],
    imageId: "host4",
  },
  {
    id: "5",
    name: "ديفيد سميث",
    location: "الدوحة، قطر",
    languages: ["الإنجليزية"],
    imageId: "host5",
  },
  {
    id: "6",
    name: "صوفيا روسي",
    location: "لوسيل، قطر",
    languages: ["الإيطالية", "الإنجليزية"],
    imageId: "host6",
  },
];

export default async function HostsPage() {
  const t = await getTranslations('Hosts');
  return (
    <div className="container mx-auto max-w-5xl">
      <header className="text-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hosts.map((host) => {
          const hostImage = PlaceHolderImages.find(img => img.id === host.imageId);
          return (
            <Card key={host.id} className="flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                {hostImage && (
                  <Image
                    src={hostImage.imageUrl}
                    alt={hostImage.description}
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-primary"
                    data-ai-hint={hostImage.imageHint}
                  />
                )}
                <div>
                    <CardTitle className="font-headline">{host.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{host.location}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                 <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MessageCircle className="h-4 w-4 ml-2" />
                    <span>{t('speaks')}:</span>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {host.languages.map(lang => (
                        <Badge key={lang} variant="secondary">{lang}</Badge>
                    ))}
                 </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{t('connect')}</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
