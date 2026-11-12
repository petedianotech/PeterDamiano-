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
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

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
    views: 482
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
    views: 630
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
    views: 315
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
  const [aiTestStatus, setAiTestStatus] = useState<string | null>(null);
  const [isTestingAi, setIsTestingAi] = useState(false);

  const testGeminiAi = async () => {
    setIsTestingAi(true);
    setAiTestStatus(null);
    try {
      const res = await fetch('/api/gemini/blog-ai');
      const data = await res.json();
      if (res.ok && data.success) {
        setAiTestStatus(`Success! Model used: ${data.modelUsed}. Response: "${data.response}"`);
      } else {
        setAiTestStatus(`Error: ${data.error || 'Failed to connect to Gemini AI'}`);
      }
    } catch (err: any) {
      setAiTestStatus(`Error: ${err.message}`);
    } finally {
      setIsTestingAi(false);
    }
  };

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

  // Real-time Unique Slug Generator & Validator
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

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleSeedDefaults = async () => {
    if (!confirm('This will load the 7 featured systems into your Firestore database. Continue?')) return;
    setIsSaving(true);
    try {
      const projectsCol = collection(db, 'projects');
      for (const item of DEFAULT_PROJECTS) {
        await addDoc(projectsCol, {
          ...item,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      showToast('Loaded 7 portfolio systems successfully.');
    } catch (err: any) {
      alert('Error loading defaults: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSeedDefaultBlogs = async () => {
    if (!confirm('This will load 3 sample blog posts into Firestore. Continue?')) return;
    setIsSaving(true);
    try {
      const blogsCol = collection(db, 'blogs');
      for (const item of DEFAULT_BLOGS) {
        await addDoc(blogsCol, {
          ...item,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      showToast('Loaded 3 sample blog posts successfully.');
    } catch (err: any) {
      alert('Error loading default blogs: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Project Modal Actions
  const openProjectModal = (project?: ProjectItem) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({ ...project });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        subtitle: '',
        description: '',
        category: 'web',
        liveUrl: '',
        githubUrl: '',
        imageUrl: '',
        status: 'Live',
        tags: ['Next.js', 'TypeScript'],
        order: (projects.length > 0 ? projects.length : DEFAULT_PROJECTS.length) + 1
      });
    }
    setTagInput('');
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      alert('Please enter a project title');
      return;
    }

    setIsSaving(true);
    try {
      if (editingProject?.id) {
        const ref = doc(db, 'projects', editingProject.id);
        await updateDoc(ref, {
          ...projectForm,
          updatedAt: serverTimestamp()
        });
        showToast('System updated successfully.');
      } else {
        const ref = collection(db, 'projects');
        await addDoc(ref, {
          ...projectForm,
          order: projectForm.order || projects.length + 1,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        showToast('New system published.');
      }
      setIsProjectModalOpen(false);
    } catch (err: any) {
      alert('Error saving system: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (id?: string) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this system from your live portfolio?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      showToast('System deleted.');
    } catch (err: any) {
      alert('Error deleting: ' + err.message);
    }
  };

  const handleAddTag = (tagToAdd?: string) => {
    const tag = (tagToAdd || tagInput).trim();
    if (!tag) return;
    if (!projectForm.tags.includes(tag)) {
      setProjectForm({
        ...projectForm,
        tags: [...projectForm.tags, tag]
      });
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setProjectForm({
      ...projectForm,
      tags: projectForm.tags.filter(t => t !== tagToRemove)
    });
  };

  // Blog Modal Actions
  const openBlogModal = (blog?: BlogItem) => {
    if (blog) {
      setEditingBlog(blog);
      setBlogForm({ ...blog });
    } else {
      setEditingBlog(null);
      setBlogForm({
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
    }
    setBlogTagInput('');
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title.trim() || !blogForm.content.trim()) {
      alert('Please enter a title and content for your blog post.');
      return;
    }

    setIsSaving(true);
    try {
      const slug = blogForm.slug.trim() || generateUniqueSlug(blogForm.title, editingBlog?.id);
      if (editingBlog?.id) {
        const ref = doc(db, 'blogs', editingBlog.id);
        await updateDoc(ref, {
          ...blogForm,
          slug,
          updatedAt: serverTimestamp()
        });
        showToast('Blog post updated successfully.');
      } else {
        const ref = collection(db, 'blogs');
        await addDoc(ref, {
          ...blogForm,
          slug,
          views: blogForm.views || Math.floor(Math.random() * 200) + 50,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        showToast('New blog post published.');
      }
      setIsBlogModalOpen(false);
    } catch (err: any) {
      alert('Error saving blog: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBlog = async (id?: string) => {
    if (!id) return;
    if (!confirm('Are you sure you want to permanently delete this blog post?')) return;
    try {
      await deleteDoc(doc(db, 'blogs', id));
      showToast('Blog post deleted.');
    } catch (err: any) {
      alert('Error deleting: ' + err.message);
    }
  };

  const handleRemoveBlogTag = (tagToRemove: string) => {
    setBlogForm({
      ...blogForm,
      tags: blogForm.tags.filter(t => t !== tagToRemove)
    });
  };

  const handleToggleInquiryRead = async (inquiry: InquiryItem) => {
    if (!inquiry.id) return;
    try {
      const ref = doc(db, 'inquiries', inquiry.id);
      await updateDoc(ref, {
        read: !inquiry.read
      });
      if (selectedInquiry?.id === inquiry.id) {
        setSelectedInquiry({ ...selectedInquiry, read: !inquiry.read });
      }
      showToast(inquiry.read ? 'Marked as unread' : 'Marked as read');
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (id?: string) => {
    if (!id) return;
    if (!confirm('Are you sure you want to permanently delete this client inquiry?')) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
      showToast('Message deleted.');
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
        setMobileMessageViewOpen(false);
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const ref = doc(db, 'profile_settings', 'current');
      await setDoc(ref, settings, { merge: true });
      showToast('Portfolio configuration updated.');
    } catch (err: any) {
      alert('Error saving settings: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Filtered lists
  const displayProjectsList = useMemo(() => {
    const list = projects.length > 0 ? projects : DEFAULT_PROJECTS;
    return list.filter(item => {
      const matchSearch = projectSearch === '' || 
        item.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(projectSearch.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(projectSearch.toLowerCase()));
      const matchCat = projectCategoryFilter === 'all' || item.category === projectCategoryFilter;
      return matchSearch && matchCat;
    });
  }, [projects, projectSearch, projectCategoryFilter]);

  const displayBlogsList = useMemo(() => {
    const list = blogs.length > 0 ? blogs : DEFAULT_BLOGS;
    return list.filter(item => {
      const matchSearch = blogSearch === '' ||
        item.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(blogSearch.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(blogSearch.toLowerCase()));
      return matchSearch;
    });
  }, [blogs, blogSearch]);

  const trafficChartData = useMemo(() => {
    const activeBlogs = blogs.length > 0 ? blogs : DEFAULT_BLOGS;
    return activeBlogs.map((b, i) => ({
      name: b.title.substring(0, 22) + '...',
      views: b.views || (100 + i * 75),
      date: `Post #${i + 1}`
    }));
  }, [blogs]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      if (inquiryFilter === 'unread') return !inq.read;
      if (inquiryFilter === 'read') return inq.read;
      return true;
    });
  }, [inquiries, inquiryFilter]);

  const unreadMessagesCount = inquiries.filter(i => !i.read).length;
  const totalBlogViews = useMemo(() => {
    const list = blogs.length > 0 ? blogs : DEFAULT_BLOGS;
    return list.reduce((sum, b) => sum + (b.views || 150), 0);
  }, [blogs]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Recently';
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return 'Recently';
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="relative mb-6">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-primary animate-pulse" />
          </div>
        </div>
        <p className="text-sm text-gray-300">Verifying administrator access...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans selection:bg-primary/30">
        <div className="w-full max-w-md bg-[#0a0a0c] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-primary flex items-center justify-center mb-6 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-sans font-medium text-gray-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Admin Portal
          </div>

          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-300 mb-8 leading-relaxed max-w-xs">
            Welcome, Peter Damiano. Sign in with your verified Google account to manage systems, blog posts, images, and settings.
          </p>

          {authError && (
            <div className="w-full bg-red-500/10 text-red-300 p-3.5 rounded-xl text-xs mb-6 flex items-start gap-2.5 border border-red-500/20 text-left">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-gray-100 text-black font-semibold text-sm transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z" />
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
              <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.4 0 12.8s.6 4.5 1.6 6.4l3.7-2.9z" />
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="mt-8 pt-6 border-t border-white/10 w-full flex items-center justify-between text-xs text-gray-400 font-sans">
            <span>Remember Me Active</span>
            <Link href="/" className="text-gray-300 hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isAuthorized = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans selection:bg-primary/30">
        <div className="w-full max-w-md bg-[#0a0a0c] rounded-3xl p-6 sm:p-8 border border-red-500/20 shadow-2xl flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mb-5 border border-red-500/20">
            <AlertTriangle className="w-7 h-7" />
          </div>
          
          <h1 className="text-xl font-bold text-red-400 mb-2">Access Restricted</h1>
          <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
            Signed in with an unauthorized account. Only the portfolio owner is authorized to access this console.
          </p>

          <button
            onClick={handleSignOut}
            className="w-full py-3 px-6 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-medium text-xs transition-colors flex items-center justify-center gap-2 mb-4 border border-red-500/30 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out & Switch Account</span>
          </button>

          <Link href="/" className="text-xs text-gray-300 hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primary/30 pb-24 md:pb-16 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08080a]/95 backdrop-blur-md px-4 sm:px-6 md:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/20 relative shrink-0">
              <Image
                src="https://i.ibb.co/BHt5LWsW/20260516-210805.jpg"
                alt="Peter Damiano"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-xs sm:text-sm tracking-tight text-white truncate">Peter Damiano</span>
                <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full border border-primary/30 font-bold shrink-0">
                  ADMIN
                </span>
              </div>
              <p className="text-xs text-gray-300 truncate">Petediano Console</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-200 border border-white/10 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">View Site</span>
              <ExternalLink className="w-3 h-3 text-gray-300 hidden sm:inline" />
            </Link>

            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors border border-white/10 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-6 flex-1 w-full">
        
        {/* Navigation Bar */}
        <div className="hidden md:flex items-center justify-between border-b border-white/10 pb-4 mb-8 gap-4">
          <div className="flex items-center gap-1.5 bg-[#0e0e12] p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'overview' ? 'bg-primary text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Overview & Traffic</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'projects' ? 'bg-primary text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Systems</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 text-white font-semibold">
                {projects.length > 0 ? projects.length : DEFAULT_PROJECTS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'blogs' ? 'bg-primary text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Blog Section</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 text-white font-semibold">
                {blogs.length > 0 ? blogs.length : DEFAULT_BLOGS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 relative cursor-pointer ${
                activeTab === 'messages' ? 'bg-primary text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries</span>
              {unreadMessagesCount > 0 ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-white font-bold animate-pulse">
                  {unreadMessagesCount} new
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 text-gray-300">
                  {inquiries.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'settings' ? 'bg-primary text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Firestore Live Sync</span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW & RECHARTS TRAFFIC */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#0b0b0e] rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
              
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-200 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Portfolio Command Center
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                  Welcome back, Peter!
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Real-time analytics, blog views tracking, secure ImgBB server uploads, and traffic charts.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openBlogModal()}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-primary hover:bg-blue-600 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer active:scale-98"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Blog Post</span>
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div onClick={() => setActiveTab('projects')} className="bg-[#0b0b0e] hover:bg-[#111116] p-5 sm:p-6 rounded-3xl border border-white/10 transition-all cursor-pointer group">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-xs font-medium">Systems</span>
                  <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {projects.length > 0 ? projects.length : DEFAULT_PROJECTS.length}
                </div>
                <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <span>Manage Systems</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div onClick={() => setActiveTab('blogs')} className="bg-[#0b0b0e] hover:bg-[#111116] p-5 sm:p-6 rounded-3xl border border-white/10 transition-all cursor-pointer group">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-xs font-medium">Total Blog Views</span>
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">
                  {totalBlogViews}
                </div>
                <div className="text-xs text-purple-400 mt-1 flex items-center gap-1">
                  <span>Across {blogs.length > 0 ? blogs.length : DEFAULT_BLOGS.length} articles</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div onClick={() => setActiveTab('messages')} className="bg-[#0b0b0e] hover:bg-[#111116] p-5 sm:p-6 rounded-3xl border border-white/10 transition-all cursor-pointer group">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-xs font-medium">Inquiries</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {inquiries.length}
                </div>
                <div className="text-xs text-primary font-semibold mt-1 flex items-center gap-1">
                  <span>{unreadMessagesCount} unread</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div onClick={() => setActiveTab('settings')} className="bg-[#0b0b0e] hover:bg-[#111116] p-5 sm:p-6 rounded-3xl border border-white/10 transition-all cursor-pointer group">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-xs font-medium">Security</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-sm font-bold text-emerald-400 truncate mt-1">
                  Remember Me Active
                </div>
                <div className="text-xs text-gray-400 mt-1">Server API Protected</div>
              </div>
            </div>

            {/* Recharts Blog Traffic Over Time Card */}
            <div className="bg-[#0b0b0e] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2 text-primary font-semibold text-xs sm:text-sm mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Reader Traffic & Article Views Analytics</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Blog Traffic Over Time</h3>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-mono">
                  Live View Metrics
                </div>
              </div>

              <div className="w-full h-72 sm:h-80 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={11} tickLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0b0b0e', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '1rem', color: '#fff', fontSize: '12px' }}
                      itemStyle={{ color: '#3b82f6' }}
                    />
                    <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorViews)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: SYSTEMS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#0b0b0e] p-5 sm:p-7 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Portfolio Systems Manager</h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                  Publish, update, or add screenshots to your systems.
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {projects.length === 0 && (
                  <button onClick={handleSeedDefaults} disabled={isSaving} className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm flex items-center gap-2 border border-white/10 cursor-pointer">
                    <FolderPlus className="w-4 h-4 text-primary" />
                    <span>Sync Initial 7</span>
                  </button>
                )}

                <button onClick={() => openProjectModal()} className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer active:scale-98">
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Search systems by title, tech, or tags..."
                  className="w-full bg-[#0b0b0e] border border-white/10 rounded-2xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary font-sans"
                />
                {projectSearch && (
                  <button onClick={() => setProjectSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {(['all', 'web', 'mobile', 'ai', 'hardware', 'other'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProjectCategoryFilter(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      projectCategoryFilter === cat ? 'bg-white text-black shadow' : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {displayProjectsList.length === 0 ? (
              <div className="bg-[#0b0b0e] rounded-3xl p-12 border border-white/10 text-center">
                <Cpu className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No Systems Found</h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto mb-4">No projects match your search or filter.</p>
                <button onClick={() => { setProjectSearch(''); setProjectCategoryFilter('all'); }} className="px-4 py-2 rounded-xl bg-white/10 text-xs text-white font-medium">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {displayProjectsList.map((item, index) => (
                  <div key={item.id || index} className="bg-[#0b0b0e] hover:bg-[#101014] rounded-3xl p-5 sm:p-7 border border-white/10 flex flex-col justify-between transition-all group shadow-md">
                    <div>
                      {item.imageUrl && (
                        <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative border border-white/10">
                          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized />
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-3 mb-3.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 text-xs font-medium text-gray-200 border border-white/10">
                          <span className="uppercase">{item.category}</span>
                        </div>
                        <span className={`px-2.5 py-1 rounded text-xs font-semibold ${item.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-amber-500/10 text-amber-400 border border-amber-500/25'}`}>
                          {item.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-xs text-primary mb-2 font-medium">{item.subtitle}</p>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3">{item.description}</p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-white/5 text-gray-200 px-2.5 py-1 rounded border border-white/5">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        {item.liveUrl && (
                          <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1 font-medium">
                            Live Site <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openProjectModal(item)} className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-200 hover:text-white transition-colors border border-white/10 flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        {item.id && (
                          <button onClick={() => handleDeleteProject(item.id)} className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors border border-white/10 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: BLOG SECTION */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'blogs' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#0b0b0e] p-5 sm:p-7 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Blog Section & SEO Articles</h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                  Write stories with Gemini AI assistance, rich text formatting, and view counters.
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {blogs.length === 0 && (
                  <button onClick={handleSeedDefaultBlogs} disabled={isSaving} className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm flex items-center gap-2 border border-white/10 cursor-pointer">
                    <FolderPlus className="w-4 h-4 text-purple-400" />
                    <span className="hidden sm:inline">Load Sample Blog Posts</span>
                  </button>
                )}

                <button onClick={() => openBlogModal()} className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer active:scale-98">
                  <Plus className="w-4 h-4" />
                  <span>Write New Post</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
                placeholder="Search blog posts by title, category, or tags..."
                className="w-full bg-[#0b0b0e] border border-white/10 rounded-2xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary font-sans"
              />
              {blogSearch && (
                <button onClick={() => setBlogSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {displayBlogsList.length === 0 ? (
              <div className="bg-[#0b0b0e] rounded-3xl p-12 border border-white/10 text-center">
                <BookOpen className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No Blog Posts Found</h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto mb-4">No articles match your search query.</p>
                <button onClick={() => setBlogSearch('')} className="px-4 py-2 rounded-xl bg-white/10 text-xs text-white font-medium">
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {displayBlogsList.map((blog, index) => (
                  <div key={blog.id || index} className="bg-[#0b0b0e] hover:bg-[#101014] rounded-3xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between transition-all group shadow-md">
                    <div>
                      {blog.coverImage && (
                        <div className="w-full h-36 rounded-2xl overflow-hidden mb-4 relative border border-white/10">
                          <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" unoptimized />
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold">
                          {blog.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium flex items-center gap-1">
                            <Eye className="w-3 h-3" /> {blog.views || 150} views
                          </span>
                          <span className={`px-2.5 py-1 rounded text-xs font-semibold ${blog.published ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-amber-500/10 text-amber-400 border border-amber-500/25'}`}>
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {blog.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-white/5 text-gray-200 px-2.5 py-1 rounded border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                      <span className="text-gray-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-primary" /> {blog.readTime || '4 min read'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button onClick={() => openBlogModal(blog)} className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-200 transition-colors border border-white/10 flex items-center gap-1 font-medium cursor-pointer">
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        {blog.id && (
                          <button onClick={() => handleDeleteBlog(blog.id)} className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors border border-white/10 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: INQUIRIES */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#0b0b0e] p-5 sm:p-7 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Client Inquiries & Leads</h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                  Direct messages received from visitors via your portfolio contact form.
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/10 self-start sm:self-auto">
                <button onClick={() => setInquiryFilter('all')} className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${inquiryFilter === 'all' ? 'bg-white text-black' : 'text-gray-300 hover:text-white'}`}>
                  All ({inquiries.length})
                </button>
                <button onClick={() => setInquiryFilter('unread')} className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${inquiryFilter === 'unread' ? 'bg-primary text-white' : 'text-gray-300 hover:text-white'}`}>
                  <span>Unread</span>
                  {unreadMessagesCount > 0 && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                </button>
                <button onClick={() => setInquiryFilter('read')} className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${inquiryFilter === 'read' ? 'bg-white text-black' : 'text-gray-300 hover:text-white'}`}>
                  Read
                </button>
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-[#0b0b0e] rounded-3xl p-16 border border-white/10 text-center">
                <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No Inquiries Yet</h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
                  When potential clients submit the message form on your portfolio, their contact info and message will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className={`lg:col-span-5 space-y-3 ${mobileMessageViewOpen ? 'hidden lg:block' : 'block'}`}>
                  {filteredInquiries.length === 0 ? (
                    <div className="bg-[#0b0b0e] rounded-2xl p-8 text-center text-xs text-gray-400 border border-white/10">
                      No messages matching filter &ldquo;{inquiryFilter}&rdquo;.
                    </div>
                  ) : (
                    filteredInquiries.map((inq) => {
                      const isSelected = selectedInquiry?.id === inq.id;
                      return (
                        <div
                          key={inq.id}
                          onClick={() => { setSelectedInquiry(inq); setMobileMessageViewOpen(true); }}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                            isSelected ? 'bg-primary/25 border-primary shadow-md' : !inq.read ? 'bg-[#111116] border-primary/40 hover:border-primary' : 'bg-[#0b0b0e] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-full bg-white/10 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                {inq.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-bold text-sm text-white truncate">{inq.name}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs text-gray-400">{formatDate(inq.createdAt)}</span>
                              {!inq.read && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                            </div>
                          </div>
                          {inq.service && <span className="text-xs text-primary font-semibold block mb-1">{inq.service}</span>}
                          <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed">{inq.message}</p>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className={`lg:col-span-7 ${!mobileMessageViewOpen ? 'hidden lg:block' : 'block'}`}>
                  {selectedInquiry ? (
                    <div className="bg-[#0b0b0e] rounded-3xl p-5 sm:p-8 border border-white/10 space-y-6 shadow-xl sticky top-24">
                      <button onClick={() => setMobileMessageViewOpen(false)} className="lg:hidden flex items-center gap-1.5 text-xs text-primary pb-2 font-semibold">
                        <ArrowLeft className="w-4 h-4" /> Back to all inquiries
                      </button>

                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-white/10">
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 rounded-full bg-primary/20 text-primary font-bold text-base flex items-center justify-center shrink-0 border border-primary/30">
                            {selectedInquiry.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <h3 className="text-lg font-bold text-white">{selectedInquiry.name}</h3>
                              {selectedInquiry.service && (
                                <span className="text-xs bg-primary/15 text-primary border border-primary/30 px-2.5 py-0.5 rounded-full font-semibold">
                                  {selectedInquiry.service}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400 block mt-1">Received {formatDate(selectedInquiry.createdAt)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button onClick={() => handleToggleInquiryRead(selectedInquiry)} className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-xs text-gray-200 transition-colors border border-white/10 cursor-pointer">
                            {selectedInquiry.read ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          <button onClick={() => handleDeleteInquiry(selectedInquiry.id)} className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors border border-white/10 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedInquiry.email && (
                          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <Mail className="w-4 h-4 text-primary shrink-0" />
                              <span className="text-xs sm:text-sm text-gray-200 truncate">{selectedInquiry.email}</span>
                            </div>
                            <button onClick={() => copyToClipboard(selectedInquiry.email!, 'email')} className="p-1.5 rounded-lg text-gray-300 hover:text-white bg-white/5">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {selectedInquiry.phone && (
                          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span className="text-xs sm:text-sm text-emerald-400 truncate">{selectedInquiry.phone}</span>
                            </div>
                            <button onClick={() => copyToClipboard(selectedInquiry.phone!, 'phone number')} className="p-1.5 rounded-lg text-gray-300 hover:text-white bg-white/5">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div>
                        <span className="text-xs text-gray-400 block mb-2 font-medium">Message</span>
                        <div className="p-5 rounded-2xl bg-black/50 border border-white/10 text-sm sm:text-base text-gray-200 leading-relaxed whitespace-pre-wrap font-sans">
                          {selectedInquiry.message}
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="text-xs text-gray-400 block mb-3 font-medium">Direct Reply Actions</span>
                        <div className="flex flex-wrap gap-3">
                          {selectedInquiry.phone && (
                            <a href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg">
                              <span>Reply on WhatsApp</span>
                            </a>
                          )}
                          {selectedInquiry.email && (
                            <a href={`mailto:${selectedInquiry.email}?subject=Regarding your portfolio inquiry&body=Hi ${selectedInquiry.name},\n\nThank you for reaching out!`} className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-primary hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg">
                              <Mail className="w-4 h-4 shrink-0" />
                              <span>Reply by Email</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#0b0b0e] rounded-3xl p-16 border border-white/10 text-center text-gray-400 text-sm">
                      <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      Select an inquiry from the list on the left to read and reply.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: SETTINGS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#0b0b0e] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Portfolio Settings</h2>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    Manage contact info, WhatsApp numbers, and announcements.
                  </p>
                </div>
                <Sliders className="w-6 h-6 text-primary shrink-0" />
              </div>

              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Secure Server-Side ImgBB Proxy & Remember Me Active</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Your ImgBB API key is securely stored in your server environment variables (`IMGBB_API_KEY`), keeping your credentials 100% safe. Firebase Auth persistence is configured so your admin login is remembered across sessions.
                </p>
              </div>

              <div className="bg-[#050505] p-5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-white">Gemini AI Assistant & Environment Status</h3>
                      <p className="text-xs text-gray-400">Uses gemini-3.5-flash-lite with fallback to gemini-3.1-flash-lite</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={testGeminiAi}
                    disabled={isTestingAi}
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-blue-600 text-white text-xs font-semibold shadow transition-all cursor-pointer disabled:opacity-55"
                  >
                    {isTestingAi ? 'Testing AI...' : 'Test Gemini AI Responds'}
                  </button>
                </div>
                {aiTestStatus && (
                  <div className={`p-3 rounded-xl text-xs font-mono border ${aiTestStatus.startsWith('Success') ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
                    {aiTestStatus}
                  </div>
                )}
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">Display Phone Number</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full bg-[#050505] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary font-mono"
                      placeholder="+265 98 706 6051"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">WhatsApp Direct Number (Digits only)</label>
                    <input
                      type="text"
                      value={settings.whatsapp}
                      onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                      className="w-full bg-[#050505] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary font-mono"
                      placeholder="265987066051"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">Official Email Address</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full bg-[#050505] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary font-mono"
                    placeholder="peterleodamiano@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">Current Availability Status</label>
                  <input
                    type="text"
                    value={settings.availabilityStatus}
                    onChange={(e) => setSettings({ ...settings, availabilityStatus: e.target.value })}
                    className="w-full bg-[#050505] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs sm:text-sm font-semibold text-gray-200">Homepage Announcement Notice</label>
                    <label className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={settings.announcementActive}
                        onChange={(e) => setSettings({ ...settings, announcementActive: e.target.checked })}
                        className="accent-primary w-4 h-4 rounded cursor-pointer"
                      />
                      <span>Show Notice</span>
                    </label>
                  </div>
                  <textarea
                    rows={3}
                    value={settings.announcementText}
                    onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                    className="w-full bg-[#050505] border border-white/15 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-primary font-sans"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-primary hover:bg-blue-600 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 cursor-pointer active:scale-98"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isSaving ? 'Saving Changes...' : 'Save Settings'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {/* ------------------------------------------------------------- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#08080a]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl">
        <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all cursor-pointer ${activeTab === 'overview' ? 'text-primary font-bold' : 'text-gray-400'}`}>
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Overview</span>
        </button>

        <button onClick={() => setActiveTab('projects')} className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all cursor-pointer ${activeTab === 'projects' ? 'text-primary font-bold' : 'text-gray-400'}`}>
          <Cpu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Systems</span>
        </button>

        <button onClick={() => setActiveTab('blogs')} className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all cursor-pointer ${activeTab === 'blogs' ? 'text-primary font-bold' : 'text-gray-400'}`}>
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Blog</span>
        </button>

        <button onClick={() => { setActiveTab('messages'); setMobileMessageViewOpen(false); }} className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all relative cursor-pointer ${activeTab === 'messages' ? 'text-primary font-bold' : 'text-gray-400'}`}>
          <div className="relative">
            <MessageSquare className="w-5 h-5 mb-0.5" />
            {unreadMessagesCount > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse ring-2 ring-[#08080a]" />}
          </div>
          <span className="text-[10px]">Inquiries</span>
        </button>

        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all cursor-pointer ${activeTab === 'settings' ? 'text-primary font-bold' : 'text-gray-400'}`}>
          <Sliders className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Settings</span>
        </button>
      </nav>

      {/* ------------------------------------------------------------- */}
      {/* PROJECT ADD/EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b0b0e] border-t sm:border border-white/15 rounded-t-[2rem] sm:rounded-3xl p-5 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto scrollbar-none">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {editingProject ? 'Edit Portfolio System' : 'Add New Portfolio System'}
                </h3>
              </div>
              <button onClick={() => setIsProjectModalOpen(false)} className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">System / Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full bg-[#050505] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary font-sans"
                  placeholder="e.g., Automatic Flood Alert System"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">Subtitle / One-Line Headline</label>
                <input
                  type="text"
                  value={projectForm.subtitle}
                  onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                  className="w-full bg-[#050505] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary font-sans text-primary font-medium"
                  placeholder="e.g., 4-Way Early Warning & Community Safety App"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                    className="w-full bg-[#050505] border border-white/15 rounded-2xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-primary cursor-pointer font-sans"
                  >
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="ai">AI System</option>
                    <option value="hardware">Hardware & IoT</option>
                    <option value="other">Other System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">Status</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as any })}
                    className="w-full bg-[#050505] border border-white/15 rounded-2xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-primary cursor-pointer font-sans"
                  >
                    <option value="Live">Live</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Beta">Beta</option>
                    <option value="Restricted">Restricted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">
                  Project Screenshot / Cover Image (ImgBB)
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="url"
                    value={projectForm.imageUrl || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                    className="flex-1 bg-[#050505] border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary font-mono truncate"
                    placeholder="https://i.ibb.co/... or upload below"
                  />
                  <label className="px-4 py-2.5 rounded-2xl bg-primary hover:bg-blue-600 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setIsUploadingImage(true);
                        try {
                          const url = await uploadToImgBB(file);
                          setProjectForm({ ...projectForm, imageUrl: url });
                          showToast('Image uploaded successfully via ImgBB!');
                        } catch (err: any) {
                          alert(err.message || 'Failed to upload image.');
                        } finally {
                          setIsUploadingImage(false);
                          e.target.value = '';
                        }
                      }}
                    />
                  </label>
                </div>
                {projectForm.imageUrl && (
                  <div className="mt-2 w-full h-24 rounded-xl overflow-hidden relative border border-white/15">
                    <Image src={projectForm.imageUrl} alt="Preview" fill className="object-cover" unoptimized />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full bg-[#050505] border border-white/15 rounded-2xl p-3.5 text-sm text-white focus:outline-none focus:border-primary font-sans leading-relaxed"
                  placeholder="Explain what this system does..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">Live Demo URL</label>
                  <input
                    type="url"
                    value={projectForm.liveUrl || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full bg-[#050505] border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary font-mono"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={projectForm.githubUrl || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full bg-[#050505] border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary font-mono"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">Technologies & Tags</label>
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {POPULAR_TAGS.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleAddTag(t)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-medium ${
                        projectForm.tags.includes(t) ? 'bg-primary/25 text-primary border-primary/50' : 'bg-white/5 text-gray-300 border-white/10 hover:text-white'
                      }`}
                    >
                      + {t}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                    className="flex-1 bg-[#050505] border border-white/15 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary font-sans"
                    placeholder="Custom tag & press Enter"
                  />
                  <button type="button" onClick={() => handleAddTag()} className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[32px]">
                  {projectForm.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-xs font-medium text-gray-200">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="text-gray-400 hover:text-red-400 font-bold ml-1 cursor-pointer">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsProjectModalOpen(false)} className="px-5 py-2.5 rounded-2xl bg-white/5 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="px-6 py-2.5 rounded-2xl bg-primary hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-primary/20 cursor-pointer active:scale-98">
                  {isSaving ? 'Saving...' : 'Save System'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* BLOG ADD/EDIT MODAL WITH GEMINI AI ASSISTANT & REACT-QUILL */}
      {/* ------------------------------------------------------------- */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b0b0e] border-t sm:border border-white/15 rounded-t-[2rem] sm:rounded-3xl p-5 sm:p-8 max-w-3xl w-full shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto scrollbar-none">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {editingBlog ? 'Edit Blog Post & SEO Article' : 'Write New Blog Post'}
                </h3>
              </div>
              <button onClick={() => setIsBlogModalOpen(false)} className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              {/* Gemini AI Assistant Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-primary/20 border border-primary/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Wand2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-white block">Gemini AI Assistant (3.5 Flash Lite)</span>
                    <span className="text-[11px] text-gray-300">Summarize, fix errors, polish SEO title, and rewrite in your authentic human voice.</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGeminiAiAssist}
                  disabled={isAiLoading}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all shrink-0 cursor-pointer active:scale-98"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAiLoading ? 'Polishing...' : '✨ Polish with Gemini AI'}</span>
                </button>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-[#050505] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary font-sans font-semibold"
                  placeholder="e.g. Building Scalable Web Apps with Next.js"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">URL Slug (Auto-Validated & Unique)</label>
                  <input
                    type="text"
                    required
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    className="w-full bg-[#050505] border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-purple-300 font-mono focus:outline-none focus:border-primary"
                    placeholder="building-scalable-web-apps"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">Prevents duplicates automatically in real-time.</span>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">Category</label>
                  <input
                    type="text"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full bg-[#050505] border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white font-sans font-medium focus:outline-none focus:border-primary"
                    placeholder="Software Engineering"
                  />
                </div>
              </div>

              {/* Cover Image ImgBB */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">
                  Article Cover Image (ImgBB)
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="url"
                    value={blogForm.coverImage || ''}
                    onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                    className="flex-1 bg-[#050505] border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary font-mono truncate"
                    placeholder="https://i.ibb.co/... or upload below"
                  />
                  <label className="px-4 py-2.5 rounded-2xl bg-primary hover:bg-blue-600 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingImage ? 'Uploading...' : 'Upload Cover'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setIsUploadingImage(true);
                        try {
                          const url = await uploadToImgBB(file);
                          setBlogForm({ ...blogForm, coverImage: url });
                          showToast('Cover image uploaded securely via ImgBB!');
                        } catch (err: any) {
                          alert(err.message || 'Failed to upload image.');
                        } finally {
                          setIsUploadingImage(false);
                          e.target.value = '';
                        }
                      }}
                    />
                  </label>
                </div>
                {blogForm.coverImage && (
                  <div className="mt-2 w-full h-24 rounded-xl overflow-hidden relative border border-white/15">
                    <Image src={blogForm.coverImage} alt="Cover Preview" fill className="object-cover" unoptimized />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">Read Time</label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="w-full bg-[#050505] border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white font-sans focus:outline-none focus:border-primary"
                    placeholder="4 min read"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={blogForm.published}
                      onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                      className="accent-primary w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Publish Immediately</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">Short Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full bg-[#050505] border border-white/15 rounded-2xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-primary font-sans leading-relaxed"
                  placeholder="Summarize the article in 1-2 sentences..."
                />
              </div>

              {/* React Quill WYSIWYG Editor */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">
                  Full Article Content (WYSIWYG Editor — Bold, Italics, Lists, Paste Formatted Text) *
                </label>
                <div className="bg-white text-black rounded-2xl overflow-hidden border border-white/15">
                  <ReactQuill
                    theme="snow"
                    value={blogForm.content}
                    onChange={(content) => setBlogForm({ ...blogForm, content })}
                    placeholder="Write or paste your formatted article here..."
                    style={{ minHeight: '220px', backgroundColor: '#fff', color: '#000' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">Article Tags</label>
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {POPULAR_TAGS.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        if (!blogForm.tags.includes(t)) {
                          setBlogForm({ ...blogForm, tags: [...blogForm.tags, t] });
                        }
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg border bg-white/5 text-gray-300 border-white/10 hover:text-white cursor-pointer font-medium"
                    >
                      + {t}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={blogTagInput}
                    onChange={(e) => setBlogTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (blogTagInput.trim() && !blogForm.tags.includes(blogTagInput.trim())) {
                          setBlogForm({ ...blogForm, tags: [...blogForm.tags, blogTagInput.trim()] });
                          setBlogTagInput('');
                        }
                      }
                    }}
                    className="flex-1 bg-[#050505] border border-white/15 rounded-2xl px-3.5 py-2.5 text-sm text-white font-sans focus:outline-none focus:border-primary"
                    placeholder="Add custom tag & press Enter"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (blogTagInput.trim() && !blogForm.tags.includes(blogTagInput.trim())) {
                        setBlogForm({ ...blogForm, tags: [...blogForm.tags, blogTagInput.trim()] });
                        setBlogTagInput('');
                      }
                    }}
                    className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[32px]">
                  {blogForm.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-xs font-medium text-gray-200">
                      {tag}
                      <button type="button" onClick={() => handleRemoveBlogTag(tag)} className="text-gray-400 hover:text-red-400 font-bold ml-1 cursor-pointer">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsBlogModalOpen(false)} className="px-5 py-2.5 rounded-2xl bg-white/5 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="px-6 py-2.5 rounded-2xl bg-primary hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-primary/20 cursor-pointer active:scale-98">
                  {isSaving ? 'Saving...' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-4 sm:right-8 z-50 bg-[#111116] border border-white/20 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 font-sans text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
