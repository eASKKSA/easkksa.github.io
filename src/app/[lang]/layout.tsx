import "@/app/globals.css";
import Background from "@/components/background";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "pt" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  return (
    <html lang={(await params).lang} suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Background />
        </Providers>
      </body>
    </html>
  );
}
