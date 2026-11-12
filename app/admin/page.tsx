'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { 
  auth, 
  googleProvider, 
  db, 
  ADMIN_EMAIL 
} from '@/lib/firebase';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ShieldCheck, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Mail, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Layers, 
  Smartphone, 
  Cpu, 
  Globe, 
  ArrowLeft, 
  AlertTriangle, 
  Check, 
  X, 
  FolderPlus,
  Radio,
  Sliders,
  Sparkles,
  Search,
  Copy,
  ChevronRight,
  Clock,
  Send,
  Eye,
  RefreshCw,
  Tag,
  CheckCircle,
  HelpCircle,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Upload,
  Key,
  BarChart2,
  TrendingUp,
  Users,
  Wand2,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export interface ProjectItem {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'web' | 'mobile' | 'ai' | 'hardware' | 'other';
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  status: 'Live' | 'In Progress' | 'Beta' | 'Restricted';
  tags: string[];
  order?: number;
}

export interface BlogItem {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  published: boolean;
  readTime: string;
  views?: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface InquiryItem {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  service?: string;
  message: string;
  read: boolean;
  createdAt?: any;
}

export interface ProfileSettings {
  phone: string;
  email: string;
  whatsapp: string;
  availabilityStatus: string;
  announcementText: string;
  announcementActive: boolean;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    title: "Automatic Flood Alert System",
    subtitle: "4-Way Early Warning & Community Safety App",
    description: "An automated emergency warning system connected with a dedicated web and mobile app. It alerts communities when river levels rise using SMS alerts, loud app sound notifications, a real siren, and flashing red LEDs.",
    category: "hardware",
    liveUrl: "https://automatic-flood-alert-app.vercel.app/",
    status: "Live",
    tags: ["Mobile App", "SMS Alerts", "Loud Siren", "Red LEDs", "Water Sensor"],
    order: 1
  },
  {
    title: "EducateMW",
    subtitle: "Free Past Exam Papers & Study Guides",
    description: "A fast and free study website where Malawian primary and secondary students can easily search, view, and download national past examination papers and answer guides.",
    category: "web",
    liveUrl: "https://educatemw.vercel.app",
    status: "Live",
    tags: ["Next.js", "Fast Search", "Free Education", "Mobile Friendly"],
    order: 2
  },
  {
    title: "AI Tact",
    subtitle: "Smart Message & Email Checker",
    description: "A clean web app that helps you review important emails, proposals, and customer messages before sending, giving clear suggestions to make your words clear and polite.",
    category: "ai",
    liveUrl: "https://aitact.vercel.app",
    status: "Live",
    tags: ["Web App", "Message Review", "Fast & Helpful"],
    order: 3
  },
  {
    title: "Oto Creator",
    subtitle: "Social Media Post Writer",
    description: "A helpful tool that takes a single idea and writes ready-to-publish posts for Twitter/X, LinkedIn, TikTok, and Instagram, matching your preferred voice.",
    category: "ai",
    liveUrl: "https://otocreater.vercel.app",
    status: "Live",
    tags: ["Content Tool", "Social Media", "Time Saver"],
    order: 4
  },
  {
    title: "OINONE",
    subtitle: "Online Business & Tech Guide",
    description: "A blog and resource directory explaining legitimate ways to earn online, helpful digital tools, and practical side-hustle guides.",
    category: "web",
    liveUrl: "https://oinone.vercel.app",
    status: "Live",
    tags: ["Directory", "Tech Blog", "Online Income"],
    order: 5
  },
  {
    title: "SoundBox",
    subtitle: "Fast Offline Android Music Player",
    description: "A lightweight Android music app written in Kotlin and C++. It plays songs saved on your phone with clear sound, smooth background controls, and zero internet required.",
    category: "mobile",
    githubUrl: "https://github.com/PetedianoTech",
    status: "Live",
    tags: ["Android", "Kotlin", "C++", "Offline Audio"],
    order: 6
  },
  {
    title: "TrendBrainAI",
    subtitle: "Daily Topic & Trend Assistant",
    description: "A tool being built that spots trending topics and drafts ideas for daily social updates.",
    category: "ai",
    status: "In Progress",
    tags: ["In Progress", "Trend Discovery"],
    order: 7
  }
];

const DEFAULT_BLOGS: BlogItem[] = [
  {
    title: "From Mulanje, Malawi to the World — My Journey as a Developer & Creator",
    slug: "from-mulanje-malawi-to-the-world",
    excerpt: "Growing up in Dzenje, Mulanje, I discovered a passion for machines and software. Here is how I taught myself to code and build hardware.",
    content: "<p>My name is <strong>Peter Damiano</strong>, known across social platforms as <strong>Petediano</strong> (@petediano). Growing up in Dzenje, Mulanje, Malawi, I was always fascinated by how things worked. With limited resources, I taught myself programming, electronics soldering, and hardware engineering.</p><p>Today, I build full-stack web applications, mobile apps in Kotlin, Flutter, and C++, and practical IoT hardware like the Automatic Flood Alert System.</p>",
    category: "Personal Journey",
    tags: ["Malawi", "Petediano", "Developer Story", "Mulanje"],
    published: true,
    readTime: "4 min read",
    views: 0
  },
  {
    title: "Building the 4-Way Automatic Flood Alert System",
    slug: "automatic-flood-alert-system-malawi",
    excerpt: "How water sensors, sirens, SMS alerts, and flashing LEDs protect Malawian communities from rising river waters during heavy storms.",
    content: "<p>Flooding is a major challenge during rainy seasons in many riverine communities. To protect families and livestock, I designed and built the Automatic Flood Alert System.</p><p>The system uses water level sensors connected to microcontroller units and a companion mobile app. When water crosses safety thresholds, it triggers an immediate local siren, bright flashing red LEDs, and automated SMS alerts.</p>",
    category: "Hardware & IoT",
    tags: ["IoT", "Sensors", "Arduino", "Community Safety", "Flood Alert"],
    published: true,
    readTime: "5 min read",
    views: 0
  },
  {
    title: "Why Next.js and Kotlin Are My Go-To Tools for Fast Full-Stack Apps",
    slug: "why-nextjs-and-kotlin-are-my-go-to-tools",
    excerpt: "Exploring why Next.js powers lightning-fast web apps like EducateMW and AI Tact while Kotlin drives robust Android experiences.",
    content: "<p>When building web applications that need to load instantly for students and professionals across Africa and globally, Next.js with React and Tailwind CSS provides unmatched speed and SEO performance.</p><p>For mobile devices, Kotlin and C++ enable high-performance offline audio playback and low-level sensor integration as seen in SoundBox.</p>",
    category: "Software Engineering",
    tags: ["Next.js", "Kotlin", "React", "TypeScript", "Mobile Apps"],
    published: true,
    readTime: "3 min read",
    views: 0
  }
];

const POPULAR_TAGS = [
  'Next.js', 'React', 'TypeScript', 'Flutter', 'Kotlin', 
  'C++', 'Python', 'Firebase', 'Tailwind', 'Hardware', 'Sensors', 'AI', 'Malawi', 'Petediano'
];

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'blogs' | 'messages' | 'settings'>('overview');

  // Data States
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [settings, setSettings] = useState<ProfileSettings>({
    phone: '+265 98 706 6051',
    email: 'peterleodamiano@gmail.com',
    whatsapp: '265987066051',
    availabilityStatus: 'Available for high-stakes projects & consultations',
    announcementText: 'Now building Mobile Applications using Flutter, C++, Kotlin, and Python.',
    announcementActive: true
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Filters & Search
  const [projectSearch, setProjectSearch] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<'all' | 'web' | 'mobile' | 'ai' | 'hardware' | 'other'>('all');
  const [blogSearch, setBlogSearch] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'unread' | 'read'>('all');

  // Project Modal State
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState<ProjectItem>({
    title: '',
    subtitle: '',
    description: '',
    category: 'web',
    liveUrl: '',
    githubUrl: '',
    imageUrl: '',
    status: 'Live',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  // Blog Modal State
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogForm, setBlogForm] = useState<BlogItem>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'Software Engineering',
    tags: ['Next.js', 'Malawi'],
    published: true,
    readTime: '4 min read',
    views: 120
  });
  const [blogTagInput, setBlogTagInput] = useState('');

  // Inquiry Detail State
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [mobileMessageViewOpen, setMobileMessageViewOpen] = useState(false);

  // Secure Server-side ImgBB Upload helper function via /api/upload
  const uploadToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    const json = await res.json();
    if (res.ok && json.url) {
      return json.url;
    } else {
      throw new Error(json.error || 'Secure server-side upload failed.');
    }
  };

  // Gemini AI Blog Assistant helper via /api/gemini/blog-ai
  const handleGeminiAiAssist = async () => {
    if (!blogForm.title.trim() && !blogForm.content.trim()) {
      alert('Please enter a title or some initial notes before using Gemini AI assistant.');
      return;
    }

    setIsAiLoading(true);
    try {
      const res = await fetch('/api/gemini/blog-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: blogForm.title,
          content: blogForm.content,
          action: 'polish'
        })
      });
      const data = await res.json();
      if (res.ok) {
        const newTitle = data.title || blogForm.title;
        const newSlug = generateUniqueSlug(newTitle, editingBlog?.id);
        setBlogForm({
          ...blogForm,
          title: newTitle,
          slug: newSlug,
          excerpt: data.excerpt || blogForm.excerpt,
          content: data.content || blogForm.content
        });
        showToast(`Gemini AI (${data.modelUsed || 'flash-lite'}) optimized your article with human tone successfully!`);
      } else {
        alert(data.error || 'AI generation failed.');
      }
    } catch (err: any) {
      alert('AI Assistant Error: ' + err.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Real-time Unique  Slug Generator & Validator
  const generateUniqueSlug = (title: string, currentId?: string): string => {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'post';

    const existingBlogs = blogs.length > 0 ? blogs : DEFAULT_BLOGS;
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (existingBlogs.some(b => b.slug === uniqueSlug && b.id !== currentId)) {
      counter++;
      uniqueSlug = `${baseSlug}-${counter}`;
    }
    return uniqueSlug;
  };

  const handleTitleChange = (title: string) => {
    const slug = generateUniqueSlug(title, editingBlog?.id);
    setBlogForm({
      ...blogForm,
      title,
      slug
    });
  };

  // Listen for Auth changes with persistent login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen to Firestore data
  useEffect(() => {
    if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return;

    const projectsRef = collection(db, 'projects');
    const projectsQuery = query(projectsRef, orderBy('order', 'asc'));
    const unsubProjects = onSnapshot(projectsQuery, (snapshot) => {
      const list: ProjectItem[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...(docSnap.data() as Omit<ProjectItem, 'id'>) });
      });
      setProjects(list);
    }, (err) => {
      console.warn('Projects snapshot fallback:', err.message);
    });

    const blogsRef = collection(db, 'blogs');
    const blogsQuery = query(blogsRef, orderBy('createdAt', 'desc'));
    const unsubBlogs = onSnapshot(blogsQuery, (snapshot) => {
      const list: BlogItem[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...(docSnap.data() as Omit<BlogItem, 'id'>) });
      });
      setBlogs(list);
    }, (err) => {
      console.warn('Blogs snapshot fallback:', err.message);
    });

    const inquiriesRef = collection(db, 'inquiries');
    const inquiriesQuery = query(inquiriesRef, orderBy('createdAt', 'desc'));
    const unsubInquiries = onSnapshot(inquiriesQuery, (snapshot) => {
      const list: InquiryItem[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...(docSnap.data() as Omit<InquiryItem, 'id'>) });
      });
      setInquiries(list);
    }, (err) => {
      console.warn('Inquiries snapshot fallback:', err.message);
    });

    const settingsDoc = doc(db, 'profile_settings', 'current');
    const unsubSettings = onSnapshot(settingsDoc, (docSnap) => {
      if (docSnap.exists()) {
        setSettings(docSnap.data() as ProfileSettings);
      }
    });

    return () => {
      unsubProjects();
      unsubBlogs();
      unsubInquiries();
      unsubSettings();
    };
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`Copied ${label} to clipboard`);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || 'Could not sign in with Google. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };
