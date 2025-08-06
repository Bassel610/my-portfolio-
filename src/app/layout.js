import VantaBackground from "@/component/Vanta/Vanta";

export const metadata = {
  title: 'Basel Sherif - Full Stack Developer Portfolio',
  description: 'Professional portfolio showcasing modern web applications, including TwinDeix Assessment Platform, e-commerce solutions, and interactive designs. Expert in React, Next.js, and full-stack development.',
  keywords: 'Basel Sherif, Full Stack Developer, React Developer, Next.js, Portfolio, Web Development, TwinDeix, JavaScript, Frontend, Backend',
  authors: [{ name: 'Basel Sherif' }],
  creator: 'Basel Sherif',
  publisher: 'Basel Sherif',
  openGraph: {
    title: 'Basel Sherif - Full Stack Developer Portfolio',
    description: 'Professional portfolio showcasing modern web applications and development expertise',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Basel Sherif - Full Stack Developer Portfolio',
    description: 'Professional portfolio showcasing modern web applications and development expertise',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#667eea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body style={{ margin: 0, backgroundColor: "#23153c" }}>
        <VantaBackground />
        <main style={{ position: "relative", zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
