import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Plane,
  Bot,
  Map,
  BookUser,
  HeartHandshake,
  Hand,
  Fingerprint,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from 'next-intl/server';
import Image from "next/image";
import { UserButton } from "@/components/user-button";


export default async function Home() {
  const t = await getTranslations('Home');

  const features = [
    {
      icon: <Plane className="h-8 w-8 text-primary" />,
      title: t('features.tripPlanner.title'),
      description: t('features.tripPlanner.description'),
      href: "/trip-planner",
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: t('features.smartAssistant.title'),
      description: t('features.smartAssistant.description'),
      href: "/assistant",
    },
    {
      icon: <Map className="h-8 w-8 text-primary" />,
      title: t('features.accessibleMaps.title'),
      description: t('features.accessibleMaps.description'),
      href: "/maps",
    },
    {
      icon: <BookUser className="h-8 w-8 text-primary" />,
      title: t('features.supportDirectory.title'),
      description: t('features.supportDirectory.description'),
      href: "/support",
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-primary" />,
      title: t('features.solidarityHosts.title'),
      description: t('features.solidarityHosts.description'),
      href: "/hosts",
    },
    {
      icon: <Hand className="h-8 w-8 text-primary" />,
      title: t('features.signTranslator.title'),
      description: t('features.signTranslator.description'),
      href: "/translate",
    },
    {
      icon: <Fingerprint className="h-8 w-8 text-primary" />,
      title: t('features.healthPassport.title'),
      description: t('features.healthPassport.description'),
      href: "/passport",
    },
  ];

  return (
    <div className="flex flex-col items-center">
       <section className="relative w-full text-center py-20 md:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070"
            alt="An inspiring landscape showing a person looking over a vast lake and mountains, representing travel and adventure."
            fill
            className="object-cover"
            priority
            data-ai-hint="travel landscape"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
            {t('mainHeading')}
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-gray-200 md:text-xl">
            {t('subheading')}
          </p>
          <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                  <Link href="/trip-planner">{t('planTripButton')} <ArrowRight className="mx-2 h-5 w-5"/></Link>
              </Button>
              <UserButton />
          </div>
        </div>
      </section>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-12 px-4 md:px-0">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.title} className="group">
            <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-xl group-hover:-translate-y-2">
              <CardHeader className="flex flex-col items-start gap-4 p-4">
                {feature.icon}
                <div>
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                    <CardDescription className="mt-1">{feature.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
