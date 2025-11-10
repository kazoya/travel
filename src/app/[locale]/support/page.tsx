"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSupportInfo } from "@/ai/flows/rights-and-support-directory";
import { useFlow } from "@/hooks/use-flow";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from 'next-intl';

const formSchema = z.object({
  location: z.string().min(2, "Location must be at least 2 characters."),
  disabilityType: z.string().min(2, "Disability type must be at least 2 characters."),
  query: z.string().optional(),
});

export default function SupportPage() {
  const t = useTranslations('Support');
  const { loading, data, run } = useFlow(getSupportInfo);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      disabilityType: "",
      query: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    run(values);
  }

  return (
    <div className="container mx-auto max-w-3xl">
      <header className="text-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('description')}</p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('formTitle')}</CardTitle>
          <CardDescription>{t('formDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('location')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('locationPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="disabilityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('disabilityType')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('disabilityTypePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('specificQuestion')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('specificQuestionPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? t('searchingButton') : t('findInfoButton')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(loading || data) && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t('resultsTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : data ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline text-xl mb-2">{t('rightsInfo')}</h3>
                  <p className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap">{data.rightsInformation}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-headline text-xl mb-2">{t('supportOrgs')}</h3>
                   <p className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap">{data.supportOrganizations}</p>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
