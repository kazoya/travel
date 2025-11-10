import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import { SiteSidebar } from "@/components/site-sidebar";
import { SiteHeader } from "@/components/site-header";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Cairo, PT_Sans, Space_Grotesk, Source_Code_Pro } from 'next/font/google';
import { FirebaseClientProvider } from "@/firebase/client-provider";

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-cairo',
});


export const metadata: Metadata = {
  title: "Inclusive Voyager",
  description: "Barrier-free travel for everyone.",
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const messages = await getMessages();

  const fontVariables = locale === 'ar' 
    ? `${cairo.variable} ${sourceCodePro.variable}` 
    : `${ptSans.variable} ${spaceGrotesk.variable} ${sourceCodePro.variable}`;
  
  const bodyClass = locale === 'ar' ? 'font-cairo' : 'font-pt-sans';

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`antialiased ${bodyClass} ${fontVariables}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <FirebaseClientProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <SidebarProvider>
                <Sidebar side={locale === 'ar' ? 'right' : 'left'}>
                  <SiteSidebar />
                </Sidebar>
                <SidebarInset>
                  <div className="flex h-full flex-col">
                    <SiteHeader />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                      {children}
                    </main>
                  </div>
                </SidebarInset>
              </SidebarProvider>
              <Toaster />
            </ThemeProvider>
          </FirebaseClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
