'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export interface ProjectItem {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'web' | 'mobile' | 'ai' | 'hardware' | 'other';
  liveUrl?: string;
  githubUrl?: string;
  status: 'Live' | 'In Progress' | 'Beta' | 'Restricted';
  tags: string[];
  order?: number;
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

const POPULAR_TAGS = [
  'Next.js', 'React', 'TypeScript', 'Flutter', 'Kotlin', 
  'C++', 'Python', 'Firebase', 'Tailwind', 'Hardware', 'Sensors', 'AI'
];

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Navigation Tabs: 'overview' | 'projects' | 'messages' | 'settings'
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'messages' | 'settings'>('overview');

  // Data States
  const [projects, setProjects] = useState<ProjectItem[]>([]);
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters & Search
  const [projectSearch, setProjectSearch] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<'all' | 'web' | 'mobile' | 'ai' | 'hardware' | 'other'>('all');
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
    status: 'Live',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  // Inquiry Detail State (for mobile drilldown)
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [mobileMessageViewOpen, setMobileMessageViewOpen] = useState(false);

  // Listen for Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen to Firestore data once authenticated
  useEffect(() => {
    if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return;

    // 1. Projects listener
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

    // 2. Inquiries listener
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

    // 3. Profile Settings listener
    const settingsDoc = doc(db, 'profile_settings', 'current');
    const unsubSettings = onSnapshot(settingsDoc, (docSnap) => {
      if (docSnap.exists()) {
        setSettings(docSnap.data() as ProfileSettings);
      }
    });

    return () => {
      unsubProjects();
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

  // Seed default portfolio data if Firestore is empty
  const handleSeedDefaults = async () => {
    if (!confirm('This will load the 7 featured systems into your Firestore database for instant editing. Continue?')) return;
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
      showToast('Loaded 7 portfolio systems into Firestore successfully.');
    } catch (err: any) {
      alert('Error loading defaults: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Open Modal to Add or Edit Project
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

  const handleToggleInquiryRead = async (inquiry: InquiryItem) => {
    if (!inquiry.id) return;
    try {
      const ref = doc(db, 'inquiries', inquiry.id);
      await updateDoc(ref, {
        read: !inquiry.read
      });
      // update local selected object if matched
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

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      if (inquiryFilter === 'unread') return !inq.read;
      if (inquiryFilter === 'read') return inq.read;
      return true;
    });
  }, [inquiries, inquiryFilter]);

  const unreadMessagesCount = inquiries.filter(i => !i.read).length;

  // Format Date helper
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

  // 1. Loading Screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
        <div className="relative mb-6">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-primary animate-pulse" />
          </div>
        </div>
        <p className="font-mono text-xs text-gray-400">Verifying administrator access...</p>
      </div>
    );
  }

  // 2. Not Logged In Screen
  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-primary/30">
        <div className="w-full max-w-md bg-[#0a0a0c] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-primary flex items-center justify-center mb-6 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Admin Portal
          </div>

          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-400 mb-8 leading-relaxed max-w-xs">
            Welcome, Peter Damiano. Sign in with your verified Google account to manage systems, inquiries, and settings.
          </p>

          {authError && (
            <div className="w-full bg-red-500/10 text-red-300 p-3.5 rounded-xl text-xs mb-6 flex items-start gap-2.5 border border-red-500/20 text-left">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <button
            id="google-signin-button"
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

          <div className="mt-8 pt-6 border-t border-white/10 w-full flex items-center justify-between text-xs font-mono text-gray-500">
            <span>Security Protected</span>
            <Link href="/" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Unauthorized Account Check
  const isAuthorized = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-primary/30">
        <div className="w-full max-w-md bg-[#0a0a0c] rounded-3xl p-6 sm:p-8 border border-red-500/20 shadow-2xl flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mb-5 border border-red-500/20">
            <AlertTriangle className="w-7 h-7" />
          </div>
          
          <h1 className="text-xl font-bold text-red-400 mb-2">Access Restricted</h1>
          <p className="text-xs sm:text-sm text-gray-400 mb-6 leading-relaxed">
            Signed in with an unauthorized account. Only the portfolio owner is authorized to access this console.
          </p>

          <button
            onClick={handleSignOut}
            className="w-full py-3 px-6 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-medium text-xs transition-colors flex items-center justify-center gap-2 mb-4 border border-red-500/30 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out & Switch Account</span>
          </button>

          <Link href="/" className="text-xs font-mono text-gray-400 hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Website
          </Link>
        </div>
      </div>
    );
  }

  // 4. Logged in & Authorized
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 pb-24 md:pb-16 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08080a]/95 backdrop-blur-md px-4 sm:px-6 md:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Brand & User info */}
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
                <span className="bg-primary/15 text-primary text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded border border-primary/30 font-bold shrink-0">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-mono text-gray-400 truncate">Petediano Console</p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 border border-white/10 transition-colors"
              title="Open public website in new tab"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">View Site</span>
              <ExternalLink className="w-3 h-3 text-gray-400 hidden sm:inline" />
            </Link>

            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors border border-white/10 cursor-pointer"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-6 flex-1 w-full">
        
        {/* Desktop & Tablet Segmented Navigation Bar */}
        <div className="hidden md:flex items-center justify-between border-b border-white/10 pb-4 mb-8 gap-4">
          <div className="flex items-center gap-1.5 bg-[#0e0e12] p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Systems & Projects</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/15 text-white">
                {projects.length > 0 ? projects.length : DEFAULT_PROJECTS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 relative cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries</span>
              {unreadMessagesCount > 0 ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary text-white font-bold animate-pulse">
                  {unreadMessagesCount} new
                </span>
              ) : (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/15 text-gray-300">
                  {inquiries.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Firestore Live Sync</span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW & STATS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
            {/* Top Control Banner */}
            <div className="bg-[#0b0b0e] rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
              
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Portfolio Command Center
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                  Welcome back, Peter!
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Manage your featured systems, review prospective client messages, and update public contact information in real-time.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openProjectModal()}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-primary hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-98 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New System</span>
                </button>

                {projects.length === 0 && (
                  <button
                    onClick={handleSeedDefaults}
                    disabled={isSaving}
                    className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 border border-white/15 cursor-pointer"
                  >
                    <FolderPlus className="w-4 h-4 text-primary" />
                    <span>Sync Initial 7 Systems</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Card 1 */}
              <div 
                onClick={() => setActiveTab('projects')}
                className="bg-[#0b0b0e] hover:bg-[#111116] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-[11px] sm:text-xs font-mono">Systems</span>
                  <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {projects.length > 0 ? projects.length : DEFAULT_PROJECTS.length}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-mono mt-1 flex items-center gap-1">
                  <span>Manage Portfolio</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 2 */}
              <div 
                onClick={() => setActiveTab('messages')}
                className="bg-[#0b0b0e] hover:bg-[#111116] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-[11px] sm:text-xs font-mono">Inquiries</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {inquiries.length}
                </div>
                <div className="text-[10px] sm:text-xs text-primary font-mono mt-1 flex items-center gap-1 font-semibold">
                  <span>{unreadMessagesCount} unread</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#0b0b0e] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-[11px] sm:text-xs font-mono">Live Deployed</span>
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">
                  {(projects.length > 0 ? projects : DEFAULT_PROJECTS).filter(p => p.status === 'Live').length}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-mono mt-1">Online & Accessible</div>
              </div>

              {/* Card 4 */}
              <div 
                onClick={() => setActiveTab('settings')}
                className="bg-[#0b0b0e] hover:bg-[#111116] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-[11px] sm:text-xs font-mono">Availability</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                </div>
                <div className="text-sm sm:text-base font-bold text-emerald-400 truncate mt-1">
                  Open for Work
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-mono mt-1">Edit Settings →</div>
              </div>
            </div>

            {/* Quick Actions & Recent Messages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Inquiries Card */}
              <div className="bg-[#0b0b0e] rounded-3xl p-5 sm:p-7 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <h3 className="font-bold text-sm sm:text-base text-white">Recent Client Inquiries</h3>
                    </div>
                    <button 
                      onClick={() => setActiveTab('messages')}
                      className="text-xs font-mono text-primary hover:underline"
                    >
                      View All ({inquiries.length}) →
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 text-xs font-mono bg-white/5 rounded-2xl p-6 border border-white/5">
                      <MessageSquare className="w-8 h-8 text-gray-600 mx-auto mb-2 opacity-50" />
                      No inquiries received yet. Messages sent via your homepage contact form will appear here.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {inquiries.slice(0, 3).map((inq) => (
                        <div 
                          key={inq.id}
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setMobileMessageViewOpen(true);
                            setActiveTab('messages');
                          }}
                          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                            !inq.read 
                              ? 'bg-white/10 border-primary/40 shadow-sm' 
                              : 'bg-white/5 border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-xs sm:text-sm text-white truncate max-w-[70%]">
                              {inq.name}
                            </span>
                            {!inq.read ? (
                              <span className="text-[9px] font-mono bg-primary text-white px-2 py-0.5 rounded font-bold">
                                NEW
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-gray-500">
                                {formatDate(inq.createdAt)}
                              </span>
                            )}
                          </div>
                          {inq.service && (
                            <span className="text-[10px] font-mono text-primary block mb-1">
                              {inq.service}
                            </span>
                          )}
                          <p className="text-xs text-gray-400 line-clamp-1">{inq.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-white/10">
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono transition-colors text-center block"
                  >
                    Open Full Inbox
                  </button>
                </div>
              </div>

              {/* Fast Settings Preview */}
              <div className="bg-[#0b0b0e] rounded-3xl p-5 sm:p-7 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <h3 className="font-bold text-sm sm:text-base text-white">Public Channels & Notice</h3>
                    </div>
                    <button 
                      onClick={() => setActiveTab('settings')}
                      className="text-xs font-mono text-primary hover:underline"
                    >
                      Edit Info →
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-gray-400 font-mono text-[11px]">Phone / WhatsApp</span>
                      <span className="font-mono text-white font-medium">{settings.phone}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-gray-400 font-mono text-[11px]">Official Email</span>
                      <span className="font-mono text-white font-medium truncate max-w-[180px]">{settings.email}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-gray-400 font-mono text-[11px]">Announcement</span>
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${settings.announcementActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
                        {settings.announcementActive ? 'Active on Home' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10">
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono transition-colors text-center block"
                  >
                    Manage Settings & Bio
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: PROJECTS & SYSTEMS MANAGER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header & Controls */}
            <div className="bg-[#0b0b0e] p-5 sm:p-7 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Portfolio Systems Manager</h2>
                <p className="text-xs text-gray-400 font-mono mt-0.5">
                  Publish, update, or reorganize systems shown on your website.
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {projects.length === 0 && (
                  <button
                    onClick={handleSeedDefaults}
                    disabled={isSaving}
                    className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono flex items-center gap-2 border border-white/10 cursor-pointer transition-colors"
                  >
                    <FolderPlus className="w-3.5 h-3.5 text-primary" />
                    <span className="hidden sm:inline">Sync Initial 7</span>
                  </button>
                )}

                <button
                  onClick={() => openProjectModal()}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all cursor-pointer active:scale-98"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Search systems by title, tech, or tags..."
                  className="w-full bg-[#0b0b0e] border border-white/10 rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors font-sans"
                />
                {projectSearch && (
                  <button
                    onClick={() => setProjectSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Pills (Horizontal Scroll on Mobile) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {(['all', 'web', 'mobile', 'ai', 'hardware', 'other'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProjectCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                      projectCategoryFilter === cat
                        ? 'bg-white text-black font-semibold shadow'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Cards Grid */}
            {displayProjectsList.length === 0 ? (
              <div className="bg-[#0b0b0e] rounded-3xl p-12 border border-white/10 text-center">
                <Cpu className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">No Systems Found</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
                  No projects match your current search or category filter.
                </p>
                <button
                  onClick={() => { setProjectSearch(''); setProjectCategoryFilter('all'); }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-mono"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {displayProjectsList.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="bg-[#0b0b0e] hover:bg-[#101014] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/10 flex flex-col justify-between transition-all group shadow-md"
                  >
                    <div>
                      {/* Top Category & Status Header */}
                      <div className="flex items-start justify-between gap-3 mb-3.5">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-mono text-gray-300 border border-white/10">
                          {item.category === 'mobile' && <Smartphone className="w-3 h-3 text-primary" />}
                          {item.category === 'hardware' && <Cpu className="w-3 h-3 text-primary" />}
                          {item.category === 'ai' && <Sparkles className="w-3 h-3 text-primary" />}
                          {item.category === 'web' && <Globe className="w-3 h-3 text-primary" />}
                          <span className="uppercase font-semibold">{item.category}</span>
                        </div>

                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          item.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' :
                          item.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25' :
                          'bg-blue-500/10 text-blue-400 border border-blue-500/25'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-primary/90 mb-2">{item.subtitle}</p>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-mono bg-white/5 text-gray-300 px-2 py-0.5 rounded border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        {item.liveUrl && (
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1 font-mono font-medium"
                          >
                            Live Site <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {item.githubUrl && (
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-mono transition-colors"
                          >
                            GitHub <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openProjectModal(item as ProjectItem)}
                          className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors border border-white/10 flex items-center gap-1.5 text-xs font-mono cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        {item.id && (
                          <button
                            onClick={() => handleDeleteProject(item.id)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors border border-white/10 cursor-pointer"
                            title="Delete Project"
                            aria-label="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
        {/* TAB 3: CLIENT INQUIRIES & MESSAGES */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header & Filter Bar */}
            <div className="bg-[#0b0b0e] p-5 sm:p-7 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Client Inquiries & Leads</h2>
                <p className="text-xs text-gray-400 font-mono mt-0.5">
                  Direct inquiries received from visitors via your portfolio contact form.
                </p>
              </div>

              {/* Unread / All Filter Pills */}
              <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/10 self-start sm:self-auto">
                <button
                  onClick={() => setInquiryFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    inquiryFilter === 'all'
                      ? 'bg-white text-black font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  All ({inquiries.length})
                </button>
                <button
                  onClick={() => setInquiryFilter('unread')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    inquiryFilter === 'unread'
                      ? 'bg-primary text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>Unread</span>
                  {unreadMessagesCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
                <button
                  onClick={() => setInquiryFilter('read')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    inquiryFilter === 'read'
                      ? 'bg-white text-black font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Read
                </button>
              </div>
            </div>

            {/* Empty State */}
            {inquiries.length === 0 ? (
              <div className="bg-[#0b0b0e] rounded-3xl p-12 sm:p-16 border border-white/10 text-center">
                <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No Inquiries Yet</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                  When potential clients submit the message form on your portfolio, their contact info and message will appear here in real time.
                </p>
              </div>
            ) : (
              /* Split Master-Detail Layout (Adaptive on Mobile) */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Master: Messages List */}
                <div className={`lg:col-span-5 space-y-3 ${mobileMessageViewOpen ? 'hidden lg:block' : 'block'}`}>
                  {filteredInquiries.length === 0 ? (
                    <div className="bg-[#0b0b0e] rounded-2xl p-8 text-center text-xs font-mono text-gray-500 border border-white/10">
                      No messages matching filter &ldquo;{inquiryFilter}&rdquo;.
                    </div>
                  ) : (
                    filteredInquiries.map((inq) => {
                      const isSelected = selectedInquiry?.id === inq.id;
                      return (
                        <div
                          key={inq.id}
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setMobileMessageViewOpen(true);
                          }}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                            isSelected
                              ? 'bg-primary/20 border-primary shadow-md'
                              : !inq.read
                              ? 'bg-[#111116] border-primary/40 hover:border-primary'
                              : 'bg-[#0b0b0e] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-7 h-7 rounded-full bg-white/10 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                {inq.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-bold text-xs sm:text-sm text-white truncate">
                                {inq.name}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] font-mono text-gray-500">
                                {formatDate(inq.createdAt)}
                              </span>
                              {!inq.read && (
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                              )}
                            </div>
                          </div>

                          {inq.service && (
                            <span className="text-[10px] font-mono text-primary font-medium block mb-1">
                              {inq.service}
                            </span>
                          )}

                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                            {inq.message}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Detail: Message View */}
                <div className={`lg:col-span-7 ${!mobileMessageViewOpen ? 'hidden lg:block' : 'block'}`}>
                  {selectedInquiry ? (
                    <div className="bg-[#0b0b0e] rounded-3xl p-5 sm:p-8 border border-white/10 space-y-6 shadow-xl sticky top-24">
                      {/* Mobile Back Button */}
                      <button
                        onClick={() => setMobileMessageViewOpen(false)}
                        className="lg:hidden flex items-center gap-1.5 text-xs font-mono text-primary pb-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to all inquiries</span>
                      </button>

                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-white/10">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center shrink-0 border border-primary/30">
                            {selectedInquiry.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base sm:text-lg font-bold text-white">
                                {selectedInquiry.name}
                              </h3>
                              {selectedInquiry.service && (
                                <span className="text-[10px] font-mono bg-primary/15 text-primary border border-primary/30 px-2 py-0.5 rounded font-semibold">
                                  {selectedInquiry.service}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-mono text-gray-500 block mt-0.5">
                              Received {formatDate(selectedInquiry.createdAt)}
                            </span>
                          </div>
                        </div>

                        {/* Top Action Buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => handleToggleInquiryRead(selectedInquiry)}
                            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-xs font-mono text-gray-300 transition-colors border border-white/10 cursor-pointer"
                          >
                            {selectedInquiry.read ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          <button
                            onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors border border-white/10 cursor-pointer"
                            title="Delete Message"
                            aria-label="Delete inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Contact Info Badges */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedInquiry.email && (
                          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span className="text-xs font-mono text-gray-300 truncate">
                                {selectedInquiry.email}
                              </span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(selectedInquiry.email!, 'email')}
                              className="p-1 rounded-md text-gray-400 hover:text-white"
                              title="Copy email"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {selectedInquiry.phone && (
                          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="text-xs font-mono text-emerald-400 truncate">
                                {selectedInquiry.phone}
                              </span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(selectedInquiry.phone!, 'phone number')}
                              className="p-1 rounded-md text-gray-400 hover:text-white"
                              title="Copy phone"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Message Content */}
                      <div>
                        <span className="text-xs font-mono text-gray-400 block mb-2">Message</span>
                        <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-wrap font-sans">
                          {selectedInquiry.message}
                        </div>
                      </div>

                      {/* Quick Reply Channels */}
                      <div className="pt-2">
                        <span className="text-xs font-mono text-gray-400 block mb-2.5">Direct Reply Actions</span>
                        <div className="flex flex-wrap gap-2.5">
                          {selectedInquiry.phone && (
                            <a
                              href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                            >
                              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                              <span>Reply on WhatsApp</span>
                            </a>
                          )}

                          {selectedInquiry.email && (
                            <a
                              href={`mailto:${selectedInquiry.email}?subject=Regarding your portfolio inquiry&body=Hi ${selectedInquiry.name},\n\nThank you for reaching out!`}
                              className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-primary hover:bg-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                            >
                              <Mail className="w-4 h-4 shrink-0" />
                              <span>Reply by Email</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#0b0b0e] rounded-3xl p-16 border border-white/10 text-center text-gray-500 text-xs font-mono">
                      <MessageSquare className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                      Select an inquiry from the list on the left to read and reply.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: PROFILE & SETTINGS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#0b0b0e] rounded-3xl p-5 sm:p-8 border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Portfolio Configuration</h2>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    Update WhatsApp numbers, official email, and live announcements.
                  </p>
                </div>
                <Sliders className="w-5 h-5 text-primary" />
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-5">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">
                    Display Phone Number
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                    placeholder="+265 98 706 6051"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">
                    WhatsApp Direct Number (Digits only, e.g. 265987066051)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                    placeholder="265987066051"
                  />
                  <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                    Used for automatic WhatsApp direct chat links across the site.
                  </span>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">
                    Official Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                    placeholder="peterleodamiano@gmail.com"
                  />
                </div>

                {/* Availability Headline */}
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">
                    Current Availability Status
                  </label>
                  <input
                    type="text"
                    value={settings.availabilityStatus}
                    onChange={(e) => setSettings({ ...settings, availabilityStatus: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Available for high-stakes projects & consultations"
                  />
                </div>

                {/* Announcement Box */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono text-gray-300 font-medium">
                      Homepage Announcement Notice
                    </label>
                    <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer select-none">
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
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors font-sans"
                    placeholder="e.g. Now building Mobile Applications using Flutter, C++, Kotlin, and Python..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-primary hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer active:scale-98"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isSaving ? 'Saving Changes...' : 'Save Configuration'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE BOTTOM NAVIGATION BAR (Fixed at bottom on phones) */}
      {/* ------------------------------------------------------------- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#08080a]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'overview' ? 'text-primary font-bold' : 'text-gray-400'
          }`}
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'projects' ? 'text-primary font-bold' : 'text-gray-400'
          }`}
        >
          <Cpu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Projects</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('messages');
            setMobileMessageViewOpen(false);
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative cursor-pointer ${
            activeTab === 'messages' ? 'text-primary font-bold' : 'text-gray-400'
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 mb-0.5" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse ring-2 ring-[#08080a]" />
            )}
          </div>
          <span className="text-[10px]">Inquiries</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'settings' ? 'text-primary font-bold' : 'text-gray-400'
          }`}
        >
          <Sliders className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Settings</span>
        </button>
      </nav>

      {/* ------------------------------------------------------------- */}
      {/* PROJECT ADD/EDIT MODAL (Mobile Bottom Sheet / Desktop Modal) */}
      {/* ------------------------------------------------------------- */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b0b0e] border-t sm:border border-white/15 rounded-t-[2rem] sm:rounded-3xl p-5 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto scrollbar-none">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {editingProject ? 'Edit Portfolio System' : 'Add New Portfolio System'}
                </h3>
              </div>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">
                  System / Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors font-sans"
                  placeholder="e.g., Automatic Flood Alert System"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">
                  Subtitle / One-Line Headline
                </label>
                <input
                  type="text"
                  value={projectForm.subtitle}
                  onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono text-primary"
                  placeholder="e.g., 4-Way Early Warning & Community Safety App"
                />
              </div>

              {/* Category and Status Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="ai">AI System</option>
                    <option value="hardware">Hardware & IoT</option>
                    <option value="other">Other System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as any })}
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="Live">Live</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Beta">Beta</option>
                    <option value="Restricted">Restricted</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl p-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors font-sans leading-relaxed"
                  placeholder="Explain what this system does in clear, simple words..."
                />
              </div>

              {/* Live URL & GitHub URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">
                    Live Demo / App URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.liveUrl || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">
                    GitHub Repo URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.githubUrl || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              {/* Tags Editor */}
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1.5">
                  Technologies & Tags
                </label>
                
                {/* Popular tag quick click pills */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {POPULAR_TAGS.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleAddTag(t)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                        projectForm.tags.includes(t)
                          ? 'bg-primary/20 text-primary border-primary/40'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 bg-[#050505] border border-white/10 rounded-2xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                    placeholder="Type custom tag & press Enter"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTag()}
                    className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                  {projectForm.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-xs font-mono text-gray-200"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-400 hover:text-red-400 font-bold ml-1 cursor-pointer"
                        aria-label={`Remove tag ${tag}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-2.5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl bg-white/5 text-gray-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-2xl bg-primary hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-primary/20 transition-all cursor-pointer active:scale-98"
                >
                  {isSaving ? 'Saving...' : 'Save System'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Toast Notification */}
      {/* ------------------------------------------------------------- */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-4 sm:right-8 z-50 bg-[#111116] border border-white/20 text-white px-4 sm:px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 font-mono text-xs animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
