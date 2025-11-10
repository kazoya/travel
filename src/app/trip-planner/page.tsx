"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateTripItinerary } from "@/ai/flows/personalized-trip-itinerary";
import { useFlow } from "@/hooks/use-flow";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useTranslations } from 'next-intl';

const formSchema = z.object({
  disabilityType: z.string().min(2, {
    message: "Disability type must be at least 2 characters.",
  }),
  budget: z.string().min(1, {
    message: "Budget is required.",
  }),
  destinationPreferences: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  tripDuration: z.string().min(2, {
    message: "Duration must be at least 2 characters.",
  }),
  interests: z.string().min(2, {
    message: "Interests must be at least 2 characters.",
  }),
});

export default function TripPlannerPage() {
  const t = useTranslations('TripPlanner');
  const { loading, data, run } = useFlow(generateTripItinerary);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      disabilityType: "",
      budget: "",
      destinationPreferences: "",
      tripDuration: "",
      interests: "",
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
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('budget')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('budgetPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destinationPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('destination')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('destinationPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tripDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('tripDuration')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('tripDurationPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('interests')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('interestsPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? t('generatingButton') : t('generateButton')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(loading || data) && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t('resultTitle')}</CardTitle>
            <CardDescription>{t('resultDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                {data?.itinerary}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
