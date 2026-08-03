import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const GA_MEASUREMENT_ID = "G-JNHKHM8PEZ";
const CLARITY_PROJECT_ID = "xwd2vf2zeh";

export const metadata: Metadata = {
  metadataBase: new URL("https://fabiomantelli.com"),
  title: "Fabio Mantelli | AWS Cloud Infrastructure for Energy & Utility Systems",
  description: "AWS Certified AI Practitioner and DevOps/Infrastructure Engineer based in Winter Garden, FL. 15+ years building cloud and real-time data infrastructure for power grid monitoring systems across eight countries.",
  keywords: ["AWS Certified AI Practitioner", "AWS Solutions Architect", "cloud infrastructure", "DevOps", "energy sector consulting", "utilities IT", "smart grid", "synchrophasor", "Winter Garden FL", "Orlando FL cloud consultant"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fabio Mantelli | AWS Cloud Infrastructure for Energy & Utility Systems",
    description: "AWS Certified AI Practitioner and DevOps/Infrastructure Engineer helping energy, utility, and industrial teams build cloud infrastructure that stays online.",
    url: "/",
    images: ["/fabio.jpeg"],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      </body>
    </html>
  );
}
