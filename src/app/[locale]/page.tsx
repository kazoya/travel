import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Plane,
  Bot,
  Map,
  HeartHandshake,
  Fingerprint,
  Luggage,
  Star,
  Users,
  Gift,
} from "lucide-react";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Image from "next/image";
import { HomeSearchBox } from "@/components/home-search-box";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  // Main 6 features with larger icons
  const mainFeatures = [
    {
      icon: <Plane className="h-12 w-12 text-primary" />,
      title: t('features.tripPlanner.title'),
      href: "/trip-planner",
    },
    {
      icon: <Map className="h-12 w-12 text-primary" />,
      title: t('features.accessibleMaps.title'),
      href: "/maps",
    },
    {
      icon: <Bot className="h-12 w-12 text-primary" />,
      title: t('features.smartAssistant.title'),
      href: "/assistant",
    },
    {
      icon: <Luggage className="h-12 w-12 text-primary" />,
      title: t('features.luggage.title'),
      href: "/travel-bag",
    },
    {
      icon: <HeartHandshake className="h-12 w-12 text-primary" />,
      title: t('features.solidarityHosts.title'),
      href: "/hosts",
    },
    {
      icon: <Fingerprint className="h-12 w-12 text-primary" />,
      title: t('features.healthPassport.title'),
      href: "/passport",
    },
  ];

  // Sample destinations - Jordan heritage sites
  const destinations = [
    { name: "البتراء", rating: 4.9, image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400" },
    { name: "وادي رم", rating: 4.7, image: "https://images.unsplash.com/photo-1544966503-7cc49efe91a3?w=400" },
    { name: "جرش", rating: 4.8, image: "https://images.unsplash.com/photo-1711378154447-97f7b0379c87?w=400" },
  ];

  // Sample experiences - Jordan travelers
  const experiences = [
    { author: "أحمد محمد - عمان", text: "تجربة رائعة! المنصة ساعدتني في التخطيط لرحلتي إلى البتراء بسهولة. كل شيء كان مجهزاً لكرسيي المتحرك." },
    { author: "فاطمة علي - إربد", text: "خدمة ممتازة، خاصة للمساعدة في العثور على أماكن مهيأة في وادي رم. استمتعت برحلة لا تُنسى." },
    { author: "خالد حسن - الزرقاء", text: "جواز السفر الرقمي سهل حياتي كثيراً في مطار الملكة علياء. الطاقم كان متفهماً ومتعاوناً." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Travel Image */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070"
            alt={t('heroImageAlt')}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t('mainHeading')}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {t('subheading')}
          </p>
          
          {/* Smart Search Box */}
          <HomeSearchBox />
        </div>
      </section>

      {/* Main Features - 6 Large Buttons */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {mainFeatures.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary p-6 flex flex-col items-center justify-center gap-4 min-h-[180px]">
                <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <CardTitle className="text-center text-base md:text-lg font-headline">
                  {feature.title}
                </CardTitle>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Accessible Destinations */}
      <section className="container mx-auto px-4 py-12 bg-muted/30">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">
          {t('destinationsTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{dest.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{dest.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Traveler Experiences */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">
          {t('experiencesTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-bold">{exp.author}</p>
                  <p className="text-sm text-muted-foreground">مسافر</p>
                </div>
              </div>
              <p className="text-muted-foreground">{exp.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Recommendations & Discounts */}
      <section className="container mx-auto px-4 py-12 bg-primary/5">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">
          {t('recommendationsTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <Gift className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">{t('discountsTitle')}</h3>
            <p className="text-muted-foreground">
              احصل على خصومات حصرية للمستخدمين النشطين في المنصة
            </p>
          </Card>
          <Card className="p-6">
            <Star className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">خدمات مضمونة</h3>
            <p className="text-muted-foreground">
              جميع الوجهات والخدمات مضمونة الوصول لذوي الإعاقة
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
