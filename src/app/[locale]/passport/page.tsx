"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from 'next-intl';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from "react";
import { Download, QrCode } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  disabilityInfo: z.string().min(5, "Please provide some details about your disability."),
  medicalNeeds: z.string().optional(),
  emergencyContactName: z.string().min(2, "Contact name is required."),
  emergencyContactPhone: z.string().min(5, "A valid phone number is required."),
});

export default function PassportPage() {
    const t = useTranslations('Passport');
    const { toast } = useToast();
    const [passportData, setPassportData] = useState<z.infer<typeof formSchema> | null>(null);
    const [showQR, setShowQR] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        fullName: "",
        disabilityInfo: "",
        medicalNeeds: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        },
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would save to a secure database.
    setPassportData(values);
    setShowQR(true);
    // We are not using success toasts per instructions.
    // I will use a descriptive error toast if something were to go wrong.
    // toast({ title: "Passport Saved", description: "Your information has been securely updated." });
  }

  const qrCodeValue = passportData 
    ? JSON.stringify({
        name: passportData.fullName,
        disability: passportData.disabilityInfo,
        emergency: passportData.emergencyContactPhone,
        timestamp: new Date().toISOString(),
      })
    : "";

  return (
    <div className="container mx-auto max-w-3xl">
      <header className="text-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>
      
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>{t('formTitle')}</CardTitle>
              <CardDescription>{t('formDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('fullName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('fullNamePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="disabilityInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('disabilityInfo')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('disabilityInfoPlaceholder')}
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>{t('disabilityInfoDescription')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="medicalNeeds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('medicalNeeds')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('medicalNeedsPlaceholder')}
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <h3 className="text-lg font-medium font-headline mb-4">{t('emergencyContact')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="emergencyContactName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t('contactName')}</FormLabel>
                        <FormControl>
                            <Input placeholder={t('contactNamePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="emergencyContactPhone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t('contactPhone')}</FormLabel>
                        <FormControl>
                            <Input placeholder="+1-555-123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
              </div>
            </CardContent>
            <CardContent>
                 <Button type="submit" className="w-full">
                    {t('saveButton')}
                </Button>
            </CardContent>
          </form>
        </Form>
      </Card>

      {/* Digital Passport Display with QR Code */}
      {passportData && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-6 w-6" />
              {t('digitalPassport')}
            </CardTitle>
            <CardDescription>{t('digitalPassportDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Passport Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">{t('passportInfo')}</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">{t('fullName')}:</span> {passportData.fullName}</p>
                    <p><span className="font-semibold">{t('disabilityInfo')}:</span> {passportData.disabilityInfo}</p>
                    {passportData.medicalNeeds && (
                      <p><span className="font-semibold">{t('medicalNeeds')}:</span> {passportData.medicalNeeds}</p>
                    )}
                    <p><span className="font-semibold">{t('contactName')}:</span> {passportData.emergencyContactName}</p>
                    <p><span className="font-semibold">{t('contactPhone')}:</span> {passportData.emergencyContactPhone}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => window.print()}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t('printPassport')}
                </Button>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-lg">
                <h3 className="font-bold text-lg mb-4">{t('qrCode')}</h3>
                {qrCodeValue && (
                  <div className="p-4 bg-white rounded-lg">
                    <QRCodeSVG value={qrCodeValue} size={200} />
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  {t('qrCodeDesc')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
