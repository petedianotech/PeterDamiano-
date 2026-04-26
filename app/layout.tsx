import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://peterdamiano.vercel.app'), // Update with your actual domain
  title: {
    default: 'Peter Damiano | Full-Stack Developer & Innovator',
    template: '%s | Peter Damiano'
  },
  description: 'Portfolio of Peter Damiano, an elite Full-Stack Developer, Innovator, and Systems Architect specializing in Next.js, React, Flutter, and AI integrations.',
  keywords: [
    'Peter Damiano', 
    'Full-Stack Developer', 
    'Software Engineer', 
    'Innovator', 
    'Systems Architect', 
    'Next.js Developer', 
    'React Native', 
    'Flutter', 
    'AI Integration', 
    'Web Developer', 
    'Obsidian Engineering'
  ],
  authors: [{ name: 'Peter Damiano' }],
  creator: 'Peter Damiano',
  icons: {
    icon: 'https://i.ibb.co/60DLrWqc/petediano-LJ.jpg',
    apple: 'https://i.ibb.co/60DLrWqc/petediano-LJ.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://peterdamiano.vercel.app',
    title: 'Peter Damiano | Elite Full-Stack Developer & Innovator',
    description: 'Explore the portfolio of Peter Damiano. Discover high-impact projects, scalable web applications, and advanced systems architecture.',
    siteName: 'Peter Damiano Portfolio',
    images: [
      {
        url: 'https://i.ibb.co/60DLrWqc/petediano-LJ.jpg',
        width: 800,
        height: 800,
        alt: 'Peter Damiano Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peter Damiano | Full-Stack Developer & Innovator',
    description: 'Explore the portfolio of Peter Damiano. Discover high-impact projects, scalable web applications, and advanced systems architecture.',
    images: ['https://i.ibb.co/60DLrWqc/petediano-LJ.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="bg-[#050505] text-white font-sans antialiased selection:bg-blue-500/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
