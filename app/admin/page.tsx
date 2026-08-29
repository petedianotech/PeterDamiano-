'use client';

import React, { useState, useEffect } from 'react';
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
  Settings,
  Sparkles
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

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Navigation Tabs
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

  // Inquiry Detail State
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

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
    }, 4000);
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
    if (!confirm('This will load your 7 featured systems into Firestore for easy live editing. Continue?')) return;
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
        order: projects.length + 1
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
    if (!confirm('Are you sure you want to delete this system from the portfolio?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      showToast('System deleted.');
    } catch (err: any) {
      alert('Error deleting: ' + err.message);
    }
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (!projectForm.tags.includes(tagInput.trim())) {
      setProjectForm({
        ...projectForm,
        tags: [...projectForm.tags, tagInput.trim()]
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
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this message?')) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
      showToast('Message deleted.');
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
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
      showToast('Portfolio configuration saved to Firestore.');
    } catch (err: any) {
      alert('Error saving settings: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Loading Screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-mono text-xs text-gray-400">Verifying administrator access...</p>
      </div>
    );
  }

  // Not Logged In Screen
  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-primary/30">
        <div className="w-full max-w-md glass rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-primary flex items-center justify-center mb-6 shadow-inner">
            <ShieldCheck className="w-7 h-7" />
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-3">
            <Radio className="w-3 h-3 text-primary animate-pulse" />
            Obsidian Console
          </div>

          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            Welcome, Peter Damiano. Sign in with your authorized Google account to manage live systems, inquiries, and portfolio settings.
          </p>

          {authError && (
            <div className="w-full bg-red-500/10 text-red-300 p-3.5 rounded-xl text-xs mb-6 flex items-center gap-2.5 border border-red-500/20 text-left">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <button
            id="google-signin-button"
            onClick={handleGoogleLogin}
            className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-gray-100 text-black font-semibold text-sm transition-all flex items-center justify-center gap-3 shadow-lg active:scale-98 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z" />
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
              <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.4 0 12.8s.6 4.5 1.6 6.4l3.7-2.9z" />
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="mt-8 pt-6 border-t border-white/10 w-full flex items-center justify-between text-xs font-mono text-gray-500">
            <span>Administrator Access</span>
            <Link href="/" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Logged In, but Unauthorized Email Check
  const isAuthorized = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-primary/30">
        <div className="w-full max-w-md glass rounded-3xl p-8 border border-red-500/20 shadow-2xl flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mb-6 border border-red-500/20">
            <AlertTriangle className="w-7 h-7" />
          </div>
          
          <h1 className="text-xl font-bold text-red-400 mb-2">Access Restricted</h1>
          <p className="text-sm text-gray-400 mb-3 leading-relaxed">
            Signed in with an unauthorized account.
          </p>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Only the authorized portfolio owner is permitted to access this administration console.
          </p>

          <button
            onClick={handleSignOut}
            className="w-full py-3 px-6 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-medium text-xs transition-colors flex items-center justify-center gap-2 mb-4 border border-red-500/30 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out & Switch Account</span>
          </button>

          <Link href="/" className="text-xs font-mono text-gray-400 hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Return to Public Website
          </Link>
        </div>
      </div>
    );
  }

  // Logged in & Authorized: Clean Obsidian Admin Console
  const unreadMessagesCount = inquiries.filter(i => !i.read).length;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 pb-16">
      {/* Top Glass Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 relative">
              <Image
                src="https://i.ibb.co/BHt5LWsW/20260516-210805.jpg"
                alt="Peter Damiano"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-white">Peter Damiano</span>
                <span className="bg-primary/10 text-primary text-[10px] font-mono px-2 py-0.5 rounded border border-primary/20">
                  ADMIN
                </span>
              </div>
              <p className="text-xs font-mono text-gray-400">@petediano • Administrator</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 border border-white/10 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">View Public Website</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </Link>

            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors border border-white/10 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8 overflow-x-auto gap-4">
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
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
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Systems & Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center gap-2 relative cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries ({inquiries.length})</span>
              {unreadMessagesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Settings & Info</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-gray-500">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Firestore Live Sync Active</span>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & STATS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top Control Banner */}
            <div className="glass rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
              
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Portfolio Command Center
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                  System & Inquiry Management
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Real-time administration portal connected to your portfolio database. Manage featured systems, review client messages, and update public contact details instantly.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openProjectModal()}
                  className="px-5 py-3 rounded-xl bg-primary hover:bg-blue-600 text-white font-medium text-xs md:text-sm transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New System</span>
                </button>

                {projects.length === 0 && (
                  <button
                    onClick={handleSeedDefaults}
                    disabled={isSaving}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs md:text-sm transition-colors flex items-center justify-center gap-2 border border-white/15 cursor-pointer"
                  >
                    <FolderPlus className="w-4 h-4 text-primary" />
                    <span>Sync Initial 7 Systems</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-xs font-mono">Managed Systems</span>
                  <Layers className="w-4 h-4 text-primary" />
                </div>
                <div className="text-3xl font-bold text-white tracking-tight">{projects.length}</div>
                <div className="text-[11px] text-gray-500 font-mono mt-1">Live in Firestore</div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-xs font-mono">Live Deployed</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-emerald-400 tracking-tight">
                  {projects.filter(p => p.status === 'Live').length || 6}
                </div>
                <div className="text-[11px] text-gray-500 font-mono mt-1">Online & Accessible</div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-xs font-mono">Client Inquiries</span>
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
                <div className="text-3xl font-bold text-white tracking-tight">{inquiries.length}</div>
                <div className="text-[11px] text-primary font-mono mt-1">
                  {unreadMessagesCount} unread message{unreadMessagesCount === 1 ? '' : 's'}
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-gray-400 mb-2">
                  <span className="text-xs font-mono">Availability</span>
                  <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                </div>
                <div className="text-sm font-bold text-emerald-400 truncate mt-1">Available for Hire</div>
                <div className="text-[11px] text-gray-500 font-mono mt-1">High-Stakes Projects</div>
              </div>
            </div>

            {/* Quick Actions & Recent Messages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Inquiries Card */}
              <div className="glass rounded-3xl p-6 md:p-8 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-base text-white">Recent Client Inquiries</h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('messages')}
                    className="text-xs font-mono text-primary hover:underline"
                  >
                    View All →
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 text-xs font-mono">
                    No inquiries received yet. Messages sent via the portfolio contact form will appear here.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.slice(0, 3).map((inq) => (
                      <div 
                        key={inq.id}
                        onClick={() => {
                          setSelectedInquiry(inq);
                          setActiveTab('messages');
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          !inq.read 
                            ? 'bg-white/10 border-primary/40 shadow-sm' 
                            : 'bg-black/30 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm text-white">{inq.name}</span>
                          {!inq.read && (
                            <span className="text-[10px] font-mono bg-primary text-white px-2 py-0.5 rounded font-bold">
                              NEW
                            </span>
                          )}
                        </div>
                        {inq.service && (
                          <span className="text-[10px] font-mono text-primary block mb-1">
                            {inq.service}
                          </span>
                        )}
                        <p className="text-xs text-gray-400 line-clamp-2">{inq.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Fast Settings Preview */}
              <div className="glass rounded-3xl p-6 md:p-8 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-base text-white">Public Channels & Config</h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className="text-xs font-mono text-primary hover:underline"
                  >
                    Edit Info →
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <span className="text-gray-400">Phone / WhatsApp</span>
                    <span className="font-mono text-white font-medium">{settings.phone}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <span className="text-gray-400">Official Email</span>
                    <span className="font-mono text-white font-medium">{settings.email}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <span className="text-gray-400">Announcement Notice</span>
                    <span className={`px-2.5 py-0.5 rounded font-mono text-[10px] ${settings.announcementActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
                      {settings.announcementActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-500 font-mono pt-2">
                    Settings can be updated at any time from the Settings tab without redeploying code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS & SYSTEMS MANAGER */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="glass p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Portfolio Systems Manager</h2>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  Create, edit, or adjust systems featured on your public website.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {projects.length === 0 && (
                  <button
                    onClick={handleSeedDefaults}
                    disabled={isSaving}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono flex items-center gap-2 border border-white/10 cursor-pointer transition-colors"
                  >
                    <FolderPlus className="w-4 h-4 text-primary" />
                    <span>Sync Initial Systems</span>
                  </button>
                )}

                <button
                  onClick={() => openProjectModal()}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white font-medium text-xs md:text-sm flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            {/* List of projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(projects.length > 0 ? projects : DEFAULT_PROJECTS).map((item, index) => (
                <div
                  key={item.id || index}
                  className="glass rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 text-xs font-mono text-gray-300 border border-white/10">
                        {item.category === 'mobile' && <Smartphone className="w-3.5 h-3.5 text-primary" />}
                        {item.category === 'hardware' && <Cpu className="w-3.5 h-3.5 text-primary" />}
                        {item.category === 'ai' && <Layers className="w-3.5 h-3.5 text-primary" />}
                        {item.category === 'web' && <Globe className="w-3.5 h-3.5 text-primary" />}
                        <span className="uppercase">{item.category}</span>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        item.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        item.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 mb-3">{item.subtitle}</p>
                    <p className="text-xs text-gray-400 leading-relaxed mb-6">{item.description}</p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-mono bg-white/5 text-gray-300 px-2.5 py-1 rounded border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1 font-mono"
                        >
                          Live App <ExternalLink className="w-3 h-3" />
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
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 transition-colors border border-white/10 cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {item.id && (
                        <button
                          onClick={() => handleDeleteProject(item.id)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors border border-white/10 cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CLIENT INQUIRIES & MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="glass p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Client Messages & Inquiries</h2>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  Direct message leads received from the portfolio contact form.
                </p>
              </div>
              <div className="text-xs text-primary font-mono">
                Total: {inquiries.length} | Unread: {unreadMessagesCount}
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="glass rounded-3xl p-16 border border-white/10 text-center">
                <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-base font-bold text-white mb-1">No Messages Yet</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                  When visitors submit inquiries through your homepage contact form, their message details and contact info will appear here in real time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List of Messages */}
                <div className="lg:col-span-1 space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      onClick={() => setSelectedInquiry(inq)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedInquiry?.id === inq.id
                          ? 'bg-primary/15 border-primary shadow-sm'
                          : !inq.read
                          ? 'bg-white/10 border-primary/40'
                          : 'bg-black/30 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white truncate">{inq.name}</span>
                        {!inq.read && (
                          <span className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                      {inq.service && (
                        <span className="text-[10px] font-mono text-primary block mb-1">
                          {inq.service}
                        </span>
                      )}
                      <p className="text-xs text-gray-400 line-clamp-2">{inq.message}</p>
                    </div>
                  ))}
                </div>

                {/* Message Details View */}
                <div className="lg:col-span-2">
                  {selectedInquiry ? (
                    <div className="glass rounded-3xl p-6 md:p-8 border border-white/10 space-y-6">
                      <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                        <div>
                          <h3 className="text-xl font-bold text-white">{selectedInquiry.name}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 mt-2 font-mono">
                            {selectedInquiry.email && (
                              <span className="flex items-center gap-1.5 text-gray-300">
                                <Mail className="w-3.5 h-3.5 text-primary" /> {selectedInquiry.email}
                              </span>
                            )}
                            {selectedInquiry.phone && (
                              <span className="flex items-center gap-1.5 text-emerald-400">
                                <Phone className="w-3.5 h-3.5 text-emerald-400" /> {selectedInquiry.phone}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleInquiryRead(selectedInquiry)}
                            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-xs text-gray-300 transition-colors border border-white/10 cursor-pointer"
                          >
                            {selectedInquiry.read ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          <button
                            onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors border border-white/10 cursor-pointer"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-mono text-gray-400 block mb-2">Message Content</span>
                        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap font-sans">
                          {selectedInquiry.message}
                        </div>
                      </div>

                      {/* Direct Reply Actions */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        {selectedInquiry.phone && (
                          <a
                            href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-2 transition-colors shadow-lg"
                          >
                            <Phone className="w-4 h-4" />
                            <span>Reply via WhatsApp</span>
                          </a>
                        )}

                        {selectedInquiry.email && (
                          <a
                            href={`mailto:${selectedInquiry.email}?subject=Regarding your portfolio inquiry&body=Hi ${selectedInquiry.name},\n\nThank you for reaching out!`}
                            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white font-medium text-xs flex items-center gap-2 transition-colors shadow-lg"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Reply by Email</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="glass rounded-3xl p-16 border border-white/10 text-center text-gray-500 text-xs font-mono">
                      Select an inquiry from the list to view sender details and message text.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PROFILE & SETTINGS */}
        {activeTab === 'settings' && (
          <div className="glass rounded-3xl p-8 md:p-10 border border-white/10 max-w-3xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-1">Portfolio Configuration</h2>
            <p className="text-xs text-gray-400 font-mono mb-6">
              Update direct phone numbers, WhatsApp, and announcement notices shown across the website.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  Display Phone Number
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                  placeholder="+265 98 706 6051"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  WhatsApp Direct Number (Digits only, e.g. 265987066051)
                </label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                  placeholder="265987066051"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                  placeholder="peterleodamiano@gmail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  Current Availability Headline
                </label>
                <input
                  type="text"
                  value={settings.availabilityStatus}
                  onChange={(e) => setSettings({ ...settings, availabilityStatus: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="Available for high-stakes enterprise projects & consultations"
                />
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-gray-400">
                    Portfolio Announcement Notice
                  </label>
                  <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.announcementActive}
                      onChange={(e) => setSettings({ ...settings, announcementActive: e.target.checked })}
                      className="accent-primary w-4 h-4 rounded"
                    />
                    <span>Show on Website</span>
                  </label>
                </div>
                <textarea
                  rows={3}
                  value={settings.announcementText}
                  onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. Now building Mobile Applications using Flutter, C++, Kotlin, and Python..."
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-primary hover:bg-blue-600 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Configuration</span>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* PROJECT ADD/EDIT MODAL (Obsidian Glass Theme) */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto scrollbar-none">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {editingProject ? 'Edit Portfolio System' : 'Add New Portfolio System'}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  System / Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g., Automatic Flood Alert System"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  Subtitle / One-Line Headline
                </label>
                <input
                  type="text"
                  value={projectForm.subtitle}
                  onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                  placeholder="e.g., 4-Way Early Warning & Community Safety App"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">
                    Category
                  </label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="ai">AI System</option>
                    <option value="hardware">Hardware & IoT</option>
                    <option value="other">Other System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">
                    Status
                  </label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as any })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="Live">Live</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Beta">Beta</option>
                    <option value="Restricted">Restricted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  Simple Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="Explain what this system does in simple words..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">
                    Live Demo / App URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.liveUrl || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">
                    GitHub Code Repository URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.githubUrl || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  Tags & Technologies
                </label>
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
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                    placeholder="e.g., Kotlin, Next.js (Press Enter)"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium transition-colors"
                  >
                    Add Tag
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {projectForm.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-400 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white text-xs font-mono transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white font-medium text-xs shadow-lg transition-colors cursor-pointer"
                >
                  {isSaving ? 'Saving...' : 'Save System'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification (Obsidian Glass Theme) */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 glass bg-black/90 border border-white/20 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 font-mono text-xs animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
