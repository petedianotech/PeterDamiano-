import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://peterdamiano.vercel.app'),
  title: {
    default: 'Peter Damiano (Petediano) | Software Developer, Electronics Innovator & Creator',
    template: '%s | Peter Damiano (Petediano)'
  },
  description: 'Official portfolio and creator hub of Peter Damiano (petediano), software developer, electronics builder, and challenge video creator from Mulanje, Malawi. Building web apps, mobile apps, alert hardware, and organizing fun community gaming competitions.',
  keywords: [
    'Peter Damiano',
    'Peter Damiano Malawi',
    'petediano',
    'Petediano',
    'pete.diano',
    'Peter Leo Damiano',
    'Peter Damiano Developer',
    'Peter Damiano Creator',
    'Petediano YouTube',
    'Petediano TikTok',
    'Petediano Instagram',
    'Software Developer Malawi',
    'Full-Stack Web Developer',
    'Mobile App Developer',
    'Next.js Developer',
    'React Developer',
    'Flutter Developer',
    'Python Developer',
    'Kotlin Android Developer',
    'IoT and Electronics Builder',
    'Automatic Flood Alert System',
    'EducateMW Malawi',
    'Mulanje Malawi Developer'
  ],
  authors: [{ name: 'Peter Damiano (Petediano)', url: 'https://peterdamiano.vercel.app' }],
  creator: 'Peter Damiano',
  publisher: 'Peter Damiano',
  category: 'technology',
  alternates: {
    canonical: 'https://peterdamiano.vercel.app',
  },
  icons: {
    icon: 'https://i.ibb.co/BHt5LWsW/20260516-210805.jpg',
    apple: 'https://i.ibb.co/BHt5LWsW/20260516-210805.jpg',
    shortcut: 'https://i.ibb.co/BHt5LWsW/20260516-210805.jpg',
  },
  openGraph: {
    type: 'profile',
    firstName: 'Peter',
    lastName: 'Damiano',
    username: 'petediano',
    gender: 'male',
    locale: 'en_US',
    url: 'https://peterdamiano.vercel.app',
    title: 'Peter Damiano (Petediano) | Software Developer, Electronics Innovator & Creator',
    description: 'Official portfolio and creator hub of Peter Damiano (petediano) from Mulanje, Malawi. Custom web apps, mobile apps, real hardware innovations, and interactive challenge competitions.',
    siteName: 'Peter Damiano (Petediano) Portfolio',
    images: [
      {
        url: 'https://i.ibb.co/BHt5LWsW/20260516-210805.jpg',
        width: 1200,
        height: 1200,
        alt: 'Peter Damiano (Petediano) - Software Developer, Electronics Builder and Creator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peter Damiano (Petediano) | Software Developer, Electronics Innovator & Creator',
    description: 'Official portfolio of Peter Damiano (petediano) from Mulanje, Malawi. Custom web apps, hardware innovations, and interactive community games.',
    creator: '@petediano',
    images: ['https://i.ibb.co/BHt5LWsW/20260516-210805.jpg'],
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://peterdamiano.vercel.app/#website',
      'url': 'https://peterdamiano.vercel.app',
      'name': 'Peter Damiano | Creator Hub',
      'alternateName': ['Petediano', 'petediano', 'Peter Damiano Portfolio', 'pete.diano'],
      'description': 'Official website and portfolio of Peter Damiano (Petediano), software developer, electronics creator, and challenge games organizer from Mulanje, Malawi.',
      'publisher': {
        '@id': 'https://peterdamiano.vercel.app/#person'
      },
      'inLanguage': 'en-US'
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://peterdamiano.vercel.app/#profilepage',
      'url': 'https://peterdamiano.vercel.app',
      'name': 'Peter Damiano (Petediano) - Software Developer, Electronics Builder & Creator',
      'isPartOf': {
        '@id': 'https://peterdamiano.vercel.app/#website'
      },
      'mainEntity': {
        '@id': 'https://peterdamiano.vercel.app/#person'
      }
    },
    {
      '@type': 'Person',
      '@id': 'https://peterdamiano.vercel.app/#person',
      'name': 'Peter Damiano',
      'givenName': 'Peter',
      'familyName': 'Damiano',
      'additionalName': 'Leo',
      'alternateName': [
        'Petediano',
        'petediano',
        'pete.diano',
        'peterdamiano',
        'Peter Leo Damiano',
        'Damiano Peter'
      ],
      'url': 'https://peterdamiano.vercel.app',
      'image': 'https://i.ibb.co/BHt5LWsW/20260516-210805.jpg',
      'jobTitle': 'Software Developer, Electronics Innovator & Content Creator',
      'description': 'Peter Damiano (known as Petediano) is a software developer, electronics builder, and content creator from Mulanje, Malawi. Creator of EducateMW, Automatic Flood Alert System, and community challenge games.',
      'nationality': {
        '@type': 'Country',
        'name': 'Malawi'
      },
      'homeLocation': {
        '@type': 'Place',
        'name': 'Mulanje, Malawi'
      },
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Mulanje',
        'addressCountry': 'Malawi'
      },
      'email': 'mailto:peterleodamiano@gmail.com',
      'telephone': '+265987066051',
      'sameAs': [
        'https://youtube.com/@petediano',
        'https://tiktok.com/@petediano',
        'https://instagram.com/pete.diano',
        'https://x.com/petediano',
        'https://facebook.com/petediano',
        'https://t.me/petediano',
        'https://twitch.tv/petediano',
        'https://pinterest.com/petediano',
        'https://github.com/petedianotech',
        'https://linkedin.com/in/peterdamiano',
        'https://automatic-flood-alert-app.vercel.app/',
        'https://educatemw.vercel.app',
        'https://aitact.vercel.app',
        'https://otocreater.vercel.app',
        'https://oinone.vercel.app'
      ],
      'knowsAbout': [
        'Software Development',
        'Mobile App Development',
        'Next.js',
        'React',
        'Flutter',
        'Kotlin',
        'C++',
        'Python',
        'Electronics & Hardware Sensors',
        'Automatic Flood Alert Systems',
        'Firebase',
        'Content Creation & Challenge Games'
      ]
    }
  ]
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#050505] text-white font-sans antialiased selection:bg-blue-500/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
