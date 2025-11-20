"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from 'next-intl';
import { Luggage, Plus, CheckCircle2, MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TravelBagPage() {
  const t = useTranslations('TravelBag');
  const [items, setItems] = useState<Record<string, boolean>>({});
  const [newItem, setNewItem] = useState("");
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);

  const jordanDestinations = [
    {
      id: "amman",
      name: t('jordanDestinations.amman.name'),
      description: t('jordanDestinations.amman.description'),
      image: "https://images.unsplash.com/photo-1677967574127-e5a46ef804df?w=800&h=600&fit=crop",
      accessibility: t('jordanDestinations.amman.accessibility'),
    },
    {
      id: "petra",
      name: t('jordanDestinations.petra.name'),
      description: t('jordanDestinations.petra.description'),
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      accessibility: t('jordanDestinations.petra.accessibility'),
    },
    {
      id: "wadirum",
      name: t('jordanDestinations.wadirum.name'),
      description: t('jordanDestinations.wadirum.description'),
      image: "https://images.unsplash.com/photo-1597245476963-1df51ad92718?w=800&h=600&fit=crop",
      accessibility: t('jordanDestinations.wadirum.accessibility'),
    },
    {
      id: "jerash",
      name: t('jordanDestinations.jerash.name'),
      description: t('jordanDestinations.jerash.description'),
      image: "https://images.unsplash.com/photo-1711378154447-97f7b0379c87?w=800&h=600&fit=crop",
      accessibility: t('jordanDestinations.jerash.accessibility'),
    },
    {
      id: "deadsea",
      name: t('jordanDestinations.deadsea.name'),
      description: t('jordanDestinations.deadsea.description'),
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop",
      accessibility: t('jordanDestinations.deadsea.accessibility'),
    },
    {
      id: "aqaba",
      name: t('jordanDestinations.aqaba.name'),
      description: t('jordanDestinations.aqaba.description'),
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      accessibility: t('jordanDestinations.aqaba.accessibility'),
    },
  ];

  const categories = [
    {
      id: "documents",
      title: t('categories.documents.title'),
      items: [
        t('categories.documents.passport'),
        t('categories.documents.visa'),
        t('categories.documents.healthPassport'),
        t('categories.documents.insurance'),
        t('categories.documents.emergencyContacts'),
      ]
    },
    {
      id: "medical",
      title: t('categories.medical.title'),
      items: [
        t('categories.medical.medications'),
        t('categories.medical.prescriptions'),
        t('categories.medical.medicalRecords'),
        t('categories.medical.firstAid'),
        t('categories.medical.assistiveDevices'),
      ]
    },
    {
      id: "clothing",
      title: t('categories.clothing.title'),
      items: [
        t('categories.clothing.underwear'),
        t('categories.clothing.comfortableShoes'),
        t('categories.clothing.weatherAppropriate'),
        t('categories.clothing.extraClothes'),
      ]
    },
    {
      id: "accessibility",
      title: t('categories.accessibility.title'),
      items: [
        t('categories.accessibility.wheelchair'),
        t('categories.accessibility.hearingAids'),
        t('categories.accessibility.visualAids'),
        t('categories.accessibility.chargers'),
      ]
    }
  ];

  const toggleItem = (item: string) => {
    setItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const addCustomItem = () => {
    if (newItem.trim()) {
      setItems(prev => ({ ...prev, [newItem]: false }));
      setNewItem("");
    }
  };

  const allChecked = Object.values(items).filter(Boolean).length;
  const totalItems = Object.keys(items).length;

  return (
    <div className="container mx-auto max-w-6xl">
      <header className="text-center mb-8">
        <Luggage className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
        {totalItems > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-lg font-medium">
              {allChecked} / {totalItems} {t('completed')}
            </span>
          </div>
        )}
        <div className="mt-6">
          <Dialog open={isDestinationsOpen} onOpenChange={setIsDestinationsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <MapPin className="h-5 w-5" />
                {t('jordanDestinations.button')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t('jordanDestinations.title')}</DialogTitle>
                <DialogDescription>{t('jordanDestinations.description')}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {jordanDestinations.map((destination) => (
                  <Card key={destination.id} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{destination.name}</CardTitle>
                      <CardDescription>{destination.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        <strong>{t('jordanDestinations.accessibilityLabel')}:</strong> {destination.accessibility}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {category.items.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={item}
                    checked={items[item] || false}
                    onCheckedChange={() => toggleItem(item)}
                  />
                  <label
                    htmlFor={item}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('customItems.title')}</CardTitle>
          <CardDescription>{t('customItems.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder={t('customItems.placeholder')}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
            />
            <Button onClick={addCustomItem}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {Object.keys(items)
            .filter(item => !categories.some(cat => cat.items.includes(item)))
            .map((item) => (
              <div key={item} className="flex items-center space-x-2 mt-3">
                <Checkbox
                  id={item}
                  checked={items[item] || false}
                  onCheckedChange={() => toggleItem(item)}
                />
                <label
                  htmlFor={item}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {item}
                </label>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}

