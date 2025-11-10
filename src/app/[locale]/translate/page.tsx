"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { translateToSignLanguage } from "@/ai/flows/sign-language-translation";
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
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useTranslations } from 'next-intl';

const formSchema = z.object({
  spokenContent: z.string().min(1, "Please enter some text to translate."),
});

export default function TranslatePage() {
  const t = useTranslations('Translate');
  const { loading, data, run } = useFlow(translateToSignLanguage);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spokenContent: "",
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
              <FormField
                control={form.control}
                name="spokenContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('textToTranslate')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('textToTranslatePlaceholder')}
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? t('translatingButton') : t('translateButton')}
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
              <div className="flex flex-col items-center justify-center p-8 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground text-sm">Generating video, this may take a moment...</p>
              </div>
            ) : data ? (
                <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <video
                        src={data.signLanguageVideo}
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                        muted
                        loop
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 font-code">{t('videoDescription')}</h4>
                        <p className="text-sm text-muted-foreground font-mono bg-muted p-3 rounded-md">
                          {data?.videoDescription}
                        </p>
                    </div>
                </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
