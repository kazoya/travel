"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useRouter } from "@/navigation";

export function HomeSearchBox() {
  const t = useTranslations('Home');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/trip-planner?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('smartSearchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-14 text-lg pr-12 pl-4 bg-white/95 backdrop-blur"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
      </div>
      <p className="text-sm text-gray-300 mt-2">{t('smartSearchLabel')}</p>
    </div>
  );
}

