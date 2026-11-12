'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SocialLinksSection, { SOCIAL_PLATFORMS } from '@/components/SocialLinks';
import { 
  ArrowRight, 
  ExternalLink, 
  Code, 
  Layers, 
  Database, 
  Shield, 
  CheckCircle, 
  Globe, 
  Smartphone, 
  Cpu, 
  Waves, 
  BatteryCharging, 
  Bot, 
  Calendar, 
  BookOpen, 
  Music, 
  Send, 
  CheckCircle2, 
  Lock,
  Sparkles,
  MessageCircle,
  Tv,
  Trophy,
  Clock,
  ChevronRight,
  X,
  Copy
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';

function BlogSection() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, 'blogs'), orderBy('createdAt', 'desc')), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.published !== false) {
          list.push({ id: docSnap.id, ...data });
        }
      });
      setBlogs(list);
    }, (err) => {
      console.warn('Blog fetch fallback:', err.message);
    });
    return () => unsub();
  }, []);

  const displayBlogs = blogs.length > 0 ? blogs : [
    {
      id: 'default-1',
      title: "From Mulanje, Malawi to the World — My Journey as a Developer & Creator",
      slug: "from-mulanje-malawi-to-the-world",
      excerpt: "Growing up in Dzenje, Mulanje, I discovered a passion for machines and software. Here is how I taught myself to code and build hardware.",
      content: "My name is Peter Damiano, known across social platforms as Petediano (@petediano). Growing up in Dzenje, Mulanje, Malawi, I was always fascinated by how things worked. With limited resources, I taught myself programming, electronics soldering, and hardware engineering.\n\nToday, I build full-stack web applications, mobile apps in Kotlin, Flutter, and C++, and practical IoT hardware like the Automatic Flood Alert System. Alongside coding, I run challenge video projects and community games where people connect and win prizes.",
      category: "Personal Journey",
      tags: ["Malawi", "Petediano", "Developer Story", "Mulanje"],
      readTime: "4 min read"
    },
    {
      id: 'default-2',
      title: "Building the 4-Way Automatic Flood Alert System",
      slug: "automatic-flood-alert-system-malawi",
      excerpt: "How water sensors, sirens, SMS alerts, and flashing LEDs protect Malawian communities from rising river waters during heavy storms.",
      content: "Flooding is a major challenge during rainy seasons in many riverine communities. To protect families and livestock, I designed and built the Automatic Flood Alert System.\n\nThe system uses water level sensors connected to microcontroller units and a companion mobile app. When water crosses safety thresholds, it triggers an immediate local siren, bright flashing red LEDs, and automated SMS alerts to community leaders and residents.",
      category: "Hardware & IoT",
      tags: ["IoT", "Sensors", "Arduino", "Community Safety"],
      readTime: "5 min read"
    },
    {
      id: 'default-3',
      title: "Why Next.js and Kotlin Are My Go-To Tools for Fast Full-Stack Apps",
      slug: "why-nextjs-and-kotlin-are-my-go-to-tools",
      excerpt: "Exploring why Next.js powers lightning-fast web apps like EducateMW and AI Tact while Kotlin drives robust Android experiences.",
      content: "When building web applications that need to load instantly for students and professionals across Africa and globally, Next.js with React and Tailwind CSS provides unmatched speed and SEO performance.\n\nFor mobile devices, Kotlin and C++ enable high-performance offline audio playback and low-level sensor integration as seen in SoundBox. Choosing the right stack makes all the difference in delivering dependable digital tools.",
      category: "Software Engineering",
      tags: ["Next.js", "Kotlin", "React", "TypeScript"],
      readTime: "3 min read"
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id="blog" 
      className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
    >
      <div className="mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-primary" />
          Blog & Creator Insights
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-white">
          Stories, Tutorials & Updates
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl">
          Thoughts on software development, IoT hardware innovations, community challenge games, and my journey from Mulanje, Malawi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayBlogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => setSelectedBlog(blog)}
            className="glass rounded-3xl p-6 sm:p-7 flex flex-col justify-between group hover:border-primary/50 transition-all duration-300 border border-white/10 cursor-pointer shadow-lg"
          >
            <div>
              {blog.coverImage && (
                <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative border border-white/10">
                  <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" unoptimized />
                </div>
              )}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold">
                  {blog.category}
                </span>
                <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-primary" /> {blog.readTime || '4 min read'}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-2.5 text-white group-hover:text-primary transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 line-clamp-3">
                {blog.excerpt}
              </p>
            </div>

            <div>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {blog.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-primary font-medium group-hover:translate-x-1 transition-transform">
                <span>Read Full Article</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b0b0e] border border-white/15 rounded-3xl p-6 sm:p-10 max-w-3xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto scrollbar-none relative">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  {selectedBlog.category}
                </span>
                <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" /> {selectedBlog.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                {selectedBlog.title}
              </h2>

              {selectedBlog.coverImage && (
                <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden relative border border-white/10 my-4">
                  <Image src={selectedBlog.coverImage} alt={selectedBlog.title} fill className="object-cover" unoptimized />
                </div>
              )}

              <div className="flex items-center gap-3 pt-2 text-xs font-mono text-gray-400 border-b border-white/10 pb-4">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 relative">
                  <Image src="https://i.ibb.co/BHt5LWsW/20260516-210805.jpg" alt="Peter Damiano" fill className="object-cover" unoptimized />
                </div>
                <div>
                  <span className="text-white font-semibold">Peter Damiano (Petediano)</span>
                  <span className="block text-[10px] text-gray-500">Developer & Creator from Mulanje, Malawi</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">
              {selectedBlog.content}
            </div>

            {selectedBlog.tags && selectedBlog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {selectedBlog.tags.map((tag: string) => (
                  <span key={tag} className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 border border-white/10 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> Share Article
              </button>

              <button
                onClick={() => setSelectedBlog(null)}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white text-xs font-semibold shadow-lg cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}

export default function Home() {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryService, setInquiryService] = useState('Website or Web App');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryMessage.trim()) return;

    setIsSending(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        name: inquiryName.trim(),
        email: inquiryEmail.trim() || null,
        phone: inquiryPhone.trim() || null,
        service: inquiryService,
        message: inquiryMessage.trim(),
        read: false,
        createdAt: serverTimestamp()
      });
      setSendSuccess(true);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryPhone('');
      setInquiryMessage('');
    } catch (err: any) {
      console.error('Error sending message:', err);
      alert('Could not send message. Please reach out directly to Peter on WhatsApp at +265 98 706 6051.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-primary/30 text-white">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-start justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-[#050505] to-[#050505] -z-10" />
        
        {/* Profile Showcase Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full relative rounded-2xl md:rounded-[2rem] overflow-hidden mb-8 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.1)] group aspect-[16/9] max-h-[60vh] sm:max-h-[500px]"
        >
          <Image
            src="https://i.ibb.co/dJjTT8Wj/Peterdamiano-image.jpg"
            alt="Peter Damiano - Software Developer, Electronics Builder and Creator"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/15 to-transparent pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:right-4 z-10 flex items-center justify-center sm:justify-end">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/90 border border-white/20 text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide text-white shadow-xl max-w-full overflow-hidden whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
              <span>Innovator, Developer, Creator</span>
            </div>
          </div>
        </motion.div>

        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 mb-5"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-xs font-mono text-emerald-400 font-medium">Available for New Projects & Collaborations</span>
        </motion.div>

        {/* Main Name */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-5 w-full"
        >
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[1.1] max-w-full">
              PETER DAMIANO
            </h1>
          </div>
          <p className="text-xs sm:text-sm md:text-base font-mono text-primary mt-2">
            Known online as <span className="font-semibold text-white">Petediano</span> (@petediano)
          </p>
        </motion.div>
        
        {/* Simple & Clear Intro */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mb-8 font-normal leading-relaxed"
        >
          Hi, I am <strong className="text-white font-semibold">Peter Damiano</strong> (Petediano). I build fast websites, mobile applications, smart alert electronics, and organize fun real-world gaming challenge videos where people compete for prizes. <br className="hidden md:block" />
          <span className="text-gray-400">Handcrafted with clean code, passion, and attention to detail from Mulanje, Malawi.</span>
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 w-full"
        >
          <a
            href="https://wa.me/265987066051"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 group shadow-lg cursor-pointer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Chat on WhatsApp
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 border border-white/15 cursor-pointer"
          >
            <Send className="w-4 h-4 text-primary" />
            Send Message
          </a>

          <a
            href="https://github.com/petedianotech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 border border-white/10"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View GitHub
          </a>
        </motion.div>
      </section>

      {/* 2. Featured Projects Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        id="systems" 
        className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
      >
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Handcrafted Code & Hardware
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-white">Featured Projects</h2>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl">
            Real software applications, helpful web tools, and smart electronic hardware systems I have designed, coded, and deployed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project 01: Automatic Flood Alert System */}
          <div className="glass rounded-3xl p-8 flex flex-col justify-between group hover:border-primary/40 transition-all duration-300 border border-white/10">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                  <Waves className="w-3.5 h-3.5 text-primary" />
                  Hardware & Connected App
                </div>
                <a 
                  href="https://automatic-flood-alert-app.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Open Automatic Flood Alert App live site" 
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-primary hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                Automatic Flood Alert System
              </h3>
              <p className="text-primary text-xs font-mono mb-4">4-Way Early Warning & Community Safety App</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                An emergency flood warning system with a connected web and mobile app. It alerts communities when river levels rise using 4 automatic warnings: SMS text messages to phones, loud app sound notifications, a real physical siren, and bright flashing red LED lights.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {['Mobile & Web App', 'SMS Alerts', 'Loud Siren Alarm', 'Red Warning LEDs', 'Automatic Sensor'].map(feature => (
                <span key={feature} className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Project 02: EducateMW */}
          <div className="glass rounded-3xl p-8 flex flex-col justify-between group hover:border-primary/40 transition-all duration-300 border border-white/10">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                  Education Platform
                </div>
                <a 
                  href="https://educatemw.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Visit EducateMW website" 
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-primary hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-primary/30 transition-colors">
                <Image 
                  src="https://i.ibb.co/b5JQ5fG5/image-2.jpg"
                  alt="EducateMW Past Exam Papers Platform"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                EducateMW
              </h3>
              <p className="text-primary text-xs font-mono mb-3">Free Past Exam Papers & Study Guides for Malawi</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                A fast and easy-to-use study platform where students and teachers in Malawi can search, view, and download national past examination papers and answer guides for free.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {['Next.js', 'Fast Search', 'Free Education', 'Mobile Friendly'].map(feature => (
                <span key={feature} className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Project 03: AI Tact */}
          <div className="glass rounded-3xl p-8 flex flex-col justify-between group hover:border-primary/40 transition-all duration-300 border border-white/10">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  Productivity Tool
                </div>
                <a 
                  href="https://aitact.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Visit AI Tact website" 
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-primary hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                AI Tact
              </h3>
              <p className="text-primary text-xs font-mono mb-3">Smart Message & Email Checker</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                A clean web app that helps you review important emails, proposals, and customer messages before sending. It gives clear suggestions to make your communication clear, polite, and persuasive.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {['Web App', 'Message Review', 'Fast & Helpful'].map(feature => (
                <span key={feature} className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Project 04: Oto Creator */}
          <div className="glass rounded-3xl p-8 flex flex-col justify-between group hover:border-primary/40 transition-all duration-300 border border-white/10">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                  Content Creator Tool
                </div>
                <a 
                  href="https://otocreater.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Visit Oto Creator website" 
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-primary hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                Oto Creator
              </h3>
              <p className="text-primary text-xs font-mono mb-3">Social Media Post Writer</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                A helpful tool that takes a single idea and writes ready-to-publish posts for Twitter/X, LinkedIn, TikTok, and Instagram, matching your preferred voice and format.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {['Social Media', 'Content Formatting', 'Time Saver'].map(feature => (
                <span key={feature} className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Project 05: OINONE */}
          <div className="glass rounded-3xl p-8 flex flex-col justify-between group hover:border-primary/40 transition-all duration-300 border border-white/10">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  Blog & Resource Directory
                </div>
                <a 
                  href="https://oinone.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Visit OINONE website" 
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-primary hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                OINONE
              </h3>
              <p className="text-primary text-xs font-mono mb-3">Online Business & Tech Guide</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                A blog and resource directory explaining legitimate ways to earn online, helpful digital tools, and practical side-hustle guides for beginners and creators.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {['Resource Directory', 'Tech Blog', 'Online Earning'].map(feature => (
                <span key={feature} className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Project 06: SoundBox */}
          <div className="glass rounded-3xl p-8 flex flex-col justify-between group hover:border-primary/40 transition-all duration-300 border border-white/10">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                  <Music className="w-3.5 h-3.5 text-primary" />
                  Android Music App
                </div>
                <a 
                  href="https://github.com/PetedianoTech" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Visit SoundBox Android Music Player on GitHub" 
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-primary hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                SoundBox
              </h3>
              <p className="text-primary text-xs font-mono mb-3">Fast Offline Android Music Player</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                A lightweight Android music app written in Kotlin and C++. It plays songs saved on your phone with clear sound, smooth background controls, and zero internet required. 100% open-source.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {['Android App', 'Kotlin', 'C++', 'Offline Audio'].map(feature => (
                <span key={feature} className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/10">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Project 07: Hardware & STEM Exhibitions */}
          <div className="glass rounded-3xl p-8 flex flex-col justify-between group hover:border-primary/30 transition-all duration-300 border border-white/10 md:col-span-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5 -z-10" />
            
            <div>
              <div className="flex justify-between items-start mb-6 gap-4 flex-wrap">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                  <Cpu className="w-3.5 h-3.5 text-primary" />
                  Hands-on Electronics & Exhibitions
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  STEM & Innovation Fair Winner
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                Real Electronics & Working Inventions
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">
                I do not just write computer software — I love designing and building physical electronics with wires, sensors, and circuit boards. At BICC during the COMSTEDA22 STEM program and school exhibitions, I showcased working hardware alongside fellow innovators like Innocent Mandili.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Exhibit 1 */}
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <Waves className="w-6 h-6 text-primary" />
                    <a 
                      href="https://automatic-flood-alert-app.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[11px] font-mono text-primary hover:underline bg-primary/10 px-2 py-0.5 rounded border border-primary/20 flex items-center gap-1"
                    >
                      App Demo <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <h4 className="font-bold text-sm mb-2 text-white">Automatic Flood Alert System</h4>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    Water sensor connected to a phone app that triggers loud sirens, SMS text alerts, and bright red flashing lights to protect families during storms.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                  <Calendar className="w-3 h-3 flex-shrink-0 text-primary" />
                  <span>Dzenje Secondary School</span>
                </div>
              </div>

              {/* Exhibit 2 */}
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <BatteryCharging className="w-6 h-6 text-emerald-400 mb-3" />
                  <h4 className="font-bold text-sm mb-2 text-white">Battery-Powered Gym</h4>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    Clean-energy gym equipment that captures human exercise movement and stores electricity in rechargeable battery packs.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                  <Calendar className="w-3 h-3 flex-shrink-0 text-emerald-400" />
                  <span>BICC & Mloza Secondary</span>
                </div>
              </div>

              {/* Exhibit 3 */}
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <Bot className="w-6 h-6 text-purple-400 mb-3" />
                  <h4 className="font-bold text-sm mb-2 text-white">Robotic Toy Car</h4>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    Custom electronic motorized vehicle built with handmade circuits and switches. Received an official Certificate of Achievement.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                  <Calendar className="w-3 h-3 flex-shrink-0 text-purple-400" />
                  <span>Mulanje Park & Art Week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Skills & Technologies Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        id="stack" 
        className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
      >
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-3">
            <Code className="w-3.5 h-3.5 text-primary" />
            Skills & Languages
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-white">The Tools I Use</h2>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl">
            I write clean, reliable code with modern programming languages and proven tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Frontend */}
          <div className="glass p-8 rounded-3xl border-t-4 border-t-primary flex flex-col border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Web Frontend</h3>
            <p className="text-xs text-gray-400 mb-6">Building fast, mobile-friendly websites that look great on any screen.</p>
            <div className="grid grid-cols-2 gap-2.5 mt-auto">
              {['Next.js', 'React', 'Angular', 'Tailwind', 'HTML5', 'CSS3'].map((item) => (
                <div key={item} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-center text-gray-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Backend & Databases */}
          <div className="glass p-8 rounded-3xl border-t-4 border-t-emerald-500 flex flex-col border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Backend & Data</h3>
            <p className="text-xs text-gray-400 mb-6">Storing user data safely and managing fast server logic.</p>
            <div className="grid grid-cols-2 gap-2.5 mt-auto">
              {['Firebase', 'Node.js', 'Firestore', 'REST APIs', 'Cloud Auth', 'PostgreSQL'].map((item) => (
                <div key={item} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-center text-gray-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Apps */}
          <div className="glass p-8 rounded-3xl border-t-4 border-t-blue-500 flex flex-col border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Mobile Apps</h3>
            <p className="text-xs text-gray-400 mb-6">Native and cross-platform apps for Android and iOS phones.</p>
            <div className="grid grid-cols-2 gap-2.5 mt-auto">
              {['Flutter', 'Kotlin', 'C++', 'Python', 'Android SDK', 'Offline Storage'].map((item) => (
                <div key={item} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-center text-gray-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Electronics & IoT */}
          <div className="glass p-8 rounded-3xl border-t-4 border-t-purple-500 flex flex-col border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Hardware & Smart Tech</h3>
            <p className="text-xs text-gray-400 mb-6">Connecting real electronics with smartphone apps and alarms.</p>
            <div className="grid grid-cols-2 gap-2.5 mt-auto">
              {['Water Sensors', 'Siren Alarms', 'SMS Triggers', 'LED Circuits', 'Battery Power', 'Circuit Design'].map((item) => (
                <div key={item} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-center text-gray-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. Pricing & Work Packages */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        id="services" 
        className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            Affordable & Honest Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-white">Work With Me</h2>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base">
            Clear project pricing with direct communication, fast delivery, and clean code you own completely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="glass rounded-3xl p-8 md:p-10 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Websites & Starter Apps</h3>
              <div className="text-primary font-mono text-xl font-bold mb-4">$100 – $400 USD</div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Ideal for personal websites, business landing pages, portfolio sites, or small mobile prototypes.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Custom Next.js or React Website',
                  'Mobile Friendly & Responsive Layout',
                  'Contact Form & WhatsApp Direct Link',
                  'Free Setup & Deployment Assistance',
                  'Fast Delivery & Clean Source Code'
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="https://wa.me/265987066051"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-center font-medium text-sm transition-colors border border-white/15 cursor-pointer block"
            >
              Discuss a Starter Project
            </a>
          </div>

          {/* Full Custom App Plan */}
          <div className="rounded-3xl p-8 md:p-10 flex flex-col justify-between border border-primary/40 bg-[#0f172a] shadow-[0_0_40px_rgba(59,130,246,0.15)] relative overflow-hidden">
            <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono font-bold border border-primary/30">
              POPULAR
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Custom Full-Stack Apps</h3>
              <div className="text-primary font-mono text-xl font-bold mb-4">$500 – $1,000 USD</div>
              <p className="text-gray-200 text-sm mb-6 leading-relaxed">
                For complete web applications, Flutter mobile apps, user login systems, or hardware and sensor integrations.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Complete Web Application or Portal',
                  'Mobile App for Android & iOS (Flutter/Kotlin)',
                  'User Accounts, Authentication & Database',
                  'Custom Logic, APIs & Smart Tools',
                  'Hardware/Sensor App Communication',
                  'Ongoing Support & Direct WhatsApp Access'
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-100">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="https://wa.me/265987066051"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-primary hover:bg-blue-600 text-white text-center font-semibold text-sm transition-colors shadow-lg cursor-pointer block"
            >
              Start Full Project on WhatsApp
            </a>
          </div>
        </div>
      </motion.section>

      {/* 5. Blog Section */}
      <BlogSection />

      {/* 6. Social Platforms & Community Hub */}
      <SocialLinksSection />

      {/* 7. Contact & Direct Message Form */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        id="contact"
        className="py-20 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5"
      >
        <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-3">
              <MessageCircle className="w-3.5 h-3.5 text-primary" />
              Direct Message
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-2">
              Send a Message to Peter
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Have an idea, project, or question? Send a message below or reach out directly on WhatsApp.
            </p>
          </div>

          {sendSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-sm text-gray-300">
                Thank you! Peter has received your message in his dashboard and will get back to you shortly.
              </p>
              <button
                onClick={() => setSendSuccess(false)}
                className="mt-4 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendInquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. John"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">Email or WhatsApp Number</label>
                  <input
                    type="text"
                    value={inquiryPhone || inquiryEmail}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.includes('@')) {
                        setInquiryEmail(val);
                      } else {
                        setInquiryPhone(val);
                      }
                    }}
                    placeholder="e.g. +265... or name@mail.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1.5">What kind of project do you need?</label>
                <select
                  value={inquiryService}
                  onChange={(e) => setInquiryService(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors font-sans"
                >
                  <option value="Website or Web App">Website or Web Application</option>
                  <option value="Mobile App (Android/iOS)">Mobile App (Flutter / Kotlin / Android)</option>
                  <option value="Electronics & Hardware Alert">Smart Hardware & Alert System (Sensors/Siren)</option>
                  <option value="Creator Collaboration">Creator Collaboration & Challenge Games</option>
                  <option value="Consultation & Advice">General Consultation & Project Advice</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1.5">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Describe your project, ideas, or questions here..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? 'Sending message...' : 'Send Message to Peter'}</span>
              </button>
            </form>
          )}
        </div>
      </motion.section>

      {/* 8. Footer with Complete Social Platform Links */}
      <footer className="border-t border-white/10 bg-[#020202] pt-14 pb-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-white/20 relative flex-shrink-0">
                <Image
                  src="https://i.ibb.co/BHt5LWsW/20260516-210805.jpg"
                  alt="Peter Damiano (Petediano)"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Peter Damiano <span className="text-primary font-normal text-sm font-mono">(petediano)</span></h4>
                <p className="text-xs text-gray-400 font-mono">Software Developer, Electronics Innovator & Creator • Mulanje, Malawi</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/265987066051"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors text-xs font-semibold border border-[#25D366]/30 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp: +265 98 706 6051</span>
              </a>
              <a
                href="mailto:peterleodamiano@gmail.com"
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-xs font-mono border border-white/10"
              >
                peterleodamiano@gmail.com
              </a>
            </div>
          </div>

          {/* Social Platform Badges */}
          <div className="pt-2">
            <p className="text-xs font-mono text-gray-400 mb-3 text-center md:text-left">
              Official Platforms & Profiles (@petediano / pete.diano):
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              {SOCIAL_PLATFORMS.map((platform) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-xs text-gray-300 hover:text-white group"
                  >
                    <span style={{ color: platform.color }}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-medium">{platform.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
            <span>© {new Date().getFullYear()} Peter Damiano (petediano). Handcrafted with care from Malawi.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
