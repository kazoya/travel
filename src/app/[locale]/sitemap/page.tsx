"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Home, Plane, Bot, MapPin, BookUser, HeartHandshake, Hand, Fingerprint, Globe, Luggage, Calendar, AlertTriangle, Award, GraduationCap, UserPlus, User, Eye } from "lucide-react";

export default function SitemapPage() {
  const t = useTranslations('Sitemap');

  const categories = [
    {
      id: "main",
      title: t('categories.main.title'),
      icon: <Home className="h-5 w-5" />,
      pages: [
        { href: "/", label: t('categories.main.home'), icon: <Home /> },
        { href: "/profile", label: t('categories.main.profile'), icon: <User /> },
      ]
    },
    {
      id: "planning",
      title: t('categories.planning.title'),
      icon: <Plane className="h-5 w-5" />,
      pages: [
        { href: "/trip-planner", label: t('categories.planning.tripPlanner'), icon: <Plane /> },
        { href: "/assistant", label: t('categories.planning.assistant'), icon: <Bot /> },
        { href: "/maps", label: t('categories.planning.maps'), icon: <MapPin /> },
        { href: "/destinations-360", label: t('categories.planning.destinations360'), icon: <Eye /> },
        { href: "/travel-bag", label: t('categories.planning.travelBag'), icon: <Luggage /> },
      ]
    },
    {
      id: "support",
      title: t('categories.support.title'),
      icon: <BookUser className="h-5 w-5" />,
      pages: [
        { href: "/support", label: t('categories.support.supportDirectory'), icon: <BookUser /> },
        { href: "/hosts", label: t('categories.support.hosts'), icon: <HeartHandshake /> },
        { href: "/emergency", label: t('categories.support.emergency'), icon: <AlertTriangle /> },
        { href: "/passport", label: t('categories.support.passport'), icon: <Fingerprint /> },
      ]
    },
    {
      id: "communication",
      title: t('categories.communication.title'),
      icon: <Globe className="h-5 w-5" />,
      pages: [
        { href: "/translate", label: t('categories.communication.translate'), icon: <Hand /> },
        { href: "/cultural-communication", label: t('categories.communication.cultural'), icon: <Globe /> },
      ]
    },
    {
      id: "services",
      title: t('categories.services.title'),
      icon: <Calendar className="h-5 w-5" />,
      pages: [
        { href: "/booking", label: t('categories.services.booking'), icon: <Calendar /> },
        { href: "/training", label: t('categories.services.training'), icon: <GraduationCap /> },
        { href: "/companion-auth", label: t('categories.services.companion'), icon: <UserPlus /> },
        { href: "/academy", label: t('categories.services.academy'), icon: <Award /> },
      ]
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl">
      <header className="text-center mb-8">
        <Map className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground text-lg">{t('description')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                {category.icon}
                <CardTitle>{category.title}</CardTitle>
              </div>
              <CardDescription>{t(`categories.${category.id}.description`)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <nav aria-label={category.title}>
                <ul className="space-y-2">
                  {category.pages.map((page) => (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        <span className="text-muted-foreground">{page.icon}</span>
                        <span>{page.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t('accessibility.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{t('accessibility.description')}</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>{t('accessibility.keyboard')}</li>
            <li>{t('accessibility.screenReader')}</li>
            <li>{t('accessibility.highContrast')}</li>
            <li>{t('accessibility.responsive')}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

