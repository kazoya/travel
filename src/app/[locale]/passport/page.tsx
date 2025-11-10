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
    console.log("Passport data to save:", values);
    // We are not using success toasts per instructions.
    // I will use a descriptive error toast if something were to go wrong.
    // toast({ title: "Passport Saved", description: "Your information has been securely updated." });
  }

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
    </div>
  );
}
