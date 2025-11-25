"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { MapPin, AlertCircle, Clock, Users, Settings, Plus, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface FamilyMember {
  id: string;
  name: string;
  currentLocation?: string;
  stressLevel: 'low' | 'medium' | 'high' | 'critical';
  lastContact: string;
  isTraveling: boolean;
  tripDestination?: string;
}

export default function FamilyControlPage() {
  const t = useTranslations('FamilyControl');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");

  useEffect(() => {
    // In a real app, load family members from Firestore
    // For now, using mock data
    const mockMembers: FamilyMember[] = [
      {
        id: "1",
        name: "أحمد محمد",
        currentLocation: "مطار الملكة علياء، عمان",
        stressLevel: "medium",
        lastContact: "منذ 15 دقيقة",
        isTraveling: true,
        tripDestination: "دبي، الإمارات",
      },
    ];
    setFamilyMembers(mockMembers);
  }, []);

  const getStressColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-orange-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStressLabel = (level: string) => {
    switch (level) {
      case 'low':
        return t('low');
      case 'medium':
        return t('medium');
      case 'high':
        return t('high');
      case 'critical':
        return t('critical');
      default:
        return '';
    }
  };

  const getStressValue = (level: string) => {
    switch (level) {
      case 'low':
        return 25;
      case 'medium':
        return 50;
      case 'high':
        return 75;
      case 'critical':
        return 100;
      default:
        return 0;
    }
  };

  const handleAddFamilyMember = () => {
    // In a real app, send invitation to email
    alert(`سيتم إرسال دعوة إلى ${newMemberEmail}`);
    setNewMemberEmail("");
    setIsAddDialogOpen(false);
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <header className="text-center mb-8">
        <Users className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>

      <div className="mb-6 flex justify-end">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t('addFamilyMember')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('addFamilyMember')}</DialogTitle>
              <DialogDescription>
                أدخل بريد المستخدم الإلكتروني لإرسال دعوة
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                type="email"
                placeholder="example@email.com"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
              <Button onClick={handleAddFamilyMember} className="w-full">
                إرسال الدعوة
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {familyMembers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t('noActiveTrip')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {familyMembers.map((member) => (
            <Card
              key={member.id}
              className={`cursor-pointer transition-all ${
                member.stressLevel === 'critical' ? 'border-red-500' : ''
              }`}
              onClick={() => setSelectedMember(member)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{member.name}</CardTitle>
                    {member.isTraveling && (
                      <CardDescription className="mt-1">
                        {t('currentTrip')}: {member.tripDestination}
                      </CardDescription>
                    )}
                  </div>
                  <Badge className={getStressColor(member.stressLevel)}>
                    {getStressLabel(member.stressLevel)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {member.currentLocation && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{t('userLocation')}</p>
                        <p className="text-sm text-muted-foreground">{member.currentLocation}</p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{t('stressLevel')}</span>
                      <span className="text-sm text-muted-foreground">
                        {getStressLabel(member.stressLevel)}
                      </span>
                    </div>
                    <Progress value={getStressValue(member.stressLevel)} className="h-2" />
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{t('lastContact')}</p>
                      <p className="text-sm text-muted-foreground">{member.lastContact}</p>
                    </div>
                  </div>

                  {member.stressLevel === 'high' || member.stressLevel === 'critical' && (
                    <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <AlertCircle className="h-4 w-4 mt-0.5 text-yellow-600" />
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        مستوى التوتر مرتفع - قد يحتاج المستخدم إلى مساعدة
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedMember && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>تفاصيل {selectedMember.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">{t('notifications')}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Bell className="h-4 w-4" />
                    <span>إشعار عند تأخره عن الوصول المتوقع</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Bell className="h-4 w-4" />
                    <span>إشعار عند فقدان الاتصال</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Bell className="h-4 w-4" />
                    <span>إشعار عند ارتفاع مستوى التوتر</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

