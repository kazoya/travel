// Root layout - minimal wrapper
// The main layout is handled by src/app/[locale]/layout.tsx

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

// Disable static generation for root layout
export const dynamic = 'force-dynamic';
