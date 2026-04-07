'use client';

import Navbar from '@/components/Navbar';
import { ArrowRight, ExternalLink, Code, Layers, Database, Shield, CheckCircle, Globe, Terminal, Play, Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar />

      {/* 2. Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-start justify-center min-h-[90vh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-8 border-success/20 bg-success/5"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-xs font-mono text-success uppercase tracking-wider">Available for High-Impact Projects</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]"
        >
          PETER DAMIANO
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10 font-light leading-relaxed"
        >
          Engineering Scalable Systems. <br className="hidden md:block" />
          <span className="text-gray-200 font-medium">Innovating Digital Infrastructure.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 w-full"
        >
          <a
            href="https://wa.me/265987966051"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 group"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Start a Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="mailto:peterleodamiano@gmail.com"
            className="flex items-center justify-center gap-2 glass hover:bg-white/10 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 10.682l8.073-7.191C21.691 2.278 24 3.434 24 5.457z" fill="#EA4335"/>
              <path d="M12 16.64L24 7.636v13.364c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64z" fill="#C5221F"/>
              <path d="M0 7.636l12 9.004 6.545-4.91V22.636h3.819A1.636 1.636 0 0 0 24 21V7.636L12 16.64 0 7.636z" fill="#FABB05"/>
              <path d="M0 7.636V21a1.636 1.636 0 0 0 1.636 1.636h3.819V11.73L12 16.64 0 7.636z" fill="#34A853"/>
              <path d="M0 7.636l12 9.004L24 7.636V5.457c0-2.023-2.309-3.178-3.927-1.964L12 10.682 3.927 3.493C2.309 2.278 0 3.434 0 5.457v2.179z" fill="#4285F4"/>
            </svg>
            Email Me
          </a>
          <a
            href="https://github.com/petedianotech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 glass hover:bg-white/10 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </motion.div>
      </section>

      {/* 3. The Innovation Lab (Featured Systems) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        id="systems" 
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Innovation Lab</h2>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Featured Systems & Architecture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System 01 */}
          <div className="glass rounded-2xl p-8 flex flex-col h-full group hover:border-primary/30 transition-colors duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                <Code className="w-3 h-3 text-primary" />
                System 01
              </div>
              <a href="https://globlync.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="Visit Globlync live demo" className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <h3 className="text-2xl font-bold mb-2">Globlync</h3>
            <p className="text-primary font-mono text-sm mb-4">Verifiable Professional Identity Engine.</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              A national directory and reputation platform bridging the trust gap. Features AI-integrated job logging and evidence-based professional verification.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['Next.js', 'Firebase', 'AI Integration'].map(tech => (
                <span key={tech} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* System 02 */}
          <div className="glass rounded-2xl p-8 flex flex-col h-full group hover:border-primary/30 transition-colors duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                <Layers className="w-3 h-3 text-primary" />
                System 02
              </div>
              <a href="https://educatemw.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="Visit EducateMW live demo" className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <h3 className="text-2xl font-bold mb-2">EducateMW</h3>
            <p className="text-primary font-mono text-sm mb-4">Rapid-Scale Educational Infrastructure.</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              Scalable EdTech platform built for rapid user adoption, achieving 20+ active nodes/sign-ups within the first 60 minutes of deployment.
            </p>
          </div>

          {/* System 03 */}
          <div className="glass rounded-2xl p-8 flex flex-col h-full group hover:border-primary/30 transition-colors duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                <Terminal className="w-3 h-3 text-primary" />
                System 03
              </div>
              <a href="https://omaxtool.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="Visit OmaxTool live demo" className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <h3 className="text-2xl font-bold mb-2">OmaxTool</h3>
            <p className="text-primary font-mono text-sm mb-4">Utility-First Productivity Suite.</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              Everyday solver application focusing on streamlined UX and high-utility tools. Built for performance and immediate user value.
            </p>
          </div>

          {/* System 04 */}
          <div className="glass rounded-2xl p-8 flex flex-col h-full group hover:border-primary/30 transition-colors duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                <Gamepad2 className="w-3 h-3 text-primary" />
                System 04
              </div>
              <a href="https://streakrpro.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="Visit Streakr Pro live demo" className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <h3 className="text-2xl font-bold mb-2">Streakr Pro</h3>
            <p className="text-primary font-mono text-sm mb-4">Scalable Web-Based Game.</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              A scalable web-based puzzle and streak-tracking game demonstrating interactive UI, real-time state management, and engaging user loops.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 4. The Engine (Tech Stack) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        id="stack" 
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
      >
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Engine</h2>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Core Technical Stack</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-8 rounded-2xl border-t-4 border-t-primary/50">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Frontend</h3>
            <ul className="space-y-3">
              {['Next.js', 'React', 'HTML5', 'Tailwind CSS', 'Flutter', 'React Native + Expo'].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-400 font-mono text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass p-8 rounded-2xl border-t-4 border-t-success/50">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl font-bold mb-4">Backend</h3>
            <ul className="space-y-3">
              {['Firebase (Firestore/Auth)', 'Node.js', 'AI Integration', 'Web Games & Puzzles'].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-400 font-mono text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-success/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass p-8 rounded-2xl border-t-4 border-t-purple-500/50">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">Architecture</h3>
            <ul className="space-y-3">
              {['Systems Design', 'Scalable Database Optimization', 'Secure Authentication', 'API Integration'].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-400 font-mono text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Templates Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        id="templates" 
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
      >
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Production Templates</h2>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Ready-to-deploy Architectures</p>
        </div>

        <div className="glass rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 relative group flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
            <div className="relative z-10 flex flex-col items-center gap-4 text-gray-500 group-hover:text-primary transition-colors duration-500">
              <Code className="w-12 h-12" />
              <span className="font-mono text-sm tracking-widest uppercase">System Architecture</span>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-mono text-primary mb-6 w-fit">
              Production Template
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Next.js Enterprise Boilerplate</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              A production-ready foundation for scalable applications. Built with performance and developer experience in mind, powering platforms like <strong>EducateMW</strong>.
            </p>
            <ul className="space-y-3 mb-8">
              {['Next.js 15 App Router', 'Supabase / Firebase Integration', 'Stripe Billing Setup', 'Tailwind CSS + shadcn/ui'].map(feature => (
                <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-success shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex gap-4 mt-auto">
              <a href="#" className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition-colors">
                Get Template
              </a>
              <a href="#" className="px-6 py-3 rounded-lg glass hover:bg-white/10 font-medium transition-colors">
                View Demo
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. Investment & Services (Pricing) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        id="services" 
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Partner with an Expert.</h2>
          <p className="text-xl text-gray-400 font-light">
            I do not charge by the hour. I charge for systems that solve complex problems and scale businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* MVP Package */}
          <div className="glass rounded-3xl p-8 md:p-10 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-10 -mt-10" />
            <h3 className="text-2xl font-bold mb-2">Team Integration & Starter Apps</h3>
            <div className="text-primary font-mono text-sm mb-6">$100 - $400 USD</div>
            <p className="text-gray-400 mb-8 flex-grow">
              Friendly, collaborative development for websites, small web apps, and team projects.
            </p>
            <ul className="space-y-4 mb-10">
              {['HTML/React/Next.js Websites', 'Mobile Apps (Flutter / Expo)', 'Team Project Collaboration', 'Rapid Prototyping'].map(feature => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/265987966051"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl glass hover:bg-white/10 text-center font-medium transition-colors"
            >
              Book a Discovery Call
            </a>
          </div>

          {/* Enterprise Innovation */}
          <div className="rounded-3xl p-8 md:p-10 flex flex-col relative overflow-hidden border border-primary/40 bg-[#0f172a] shadow-[0_0_40px_rgba(59,130,246,0.15)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-10 -mt-10" />
            <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono font-bold border border-primary/30">
              RECOMMENDED
            </div>
            <h3 className="text-2xl font-bold mb-2">Full-Stack & AI Systems</h3>
            <div className="text-primary font-mono text-sm mb-6">$500 - $1,000 USD</div>
            <p className="text-gray-300 mb-8 flex-grow">
              End-to-end scalable applications, AI integrations, and interactive web-based games.
            </p>
            <ul className="space-y-4 mb-10">
              {['Complex Web Apps & Portals', 'AI & LLM Integration', 'Scalable Web Games (Puzzles, etc.)', 'Full React Native/Flutter Apps'].map(feature => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-200">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/265987966051"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-primary hover:bg-blue-600 text-white text-center font-medium transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              Book a Discovery Call
            </a>
          </div>
        </div>
      </motion.section>

      {/* 6. Origin Story (The Innovator) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        id="story" 
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
      >
        <div className="glass rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 opacity-5">
            <Globe className="w-96 h-96" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-8">
              <Globe className="w-3 h-3 text-primary" />
              Origin Story
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">From Dzenje to the World.</h2>
            <div className="space-y-6 text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              <p>
                Based in Mulanje, Malawi, I build world-class technology in high-constraint environments.
              </p>
              <p>
                I believe innovation is about architecture and vision, not just resources. Trusted by 50+ clients globally, I engineer digital solutions that rival top tech hubs.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 7. Interactive Terminal Footer */}
      <footer className="border-t border-white/10 bg-[#020202] pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 border-b border-white/10 bg-[#111]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs font-mono text-gray-500">peterdamiano — bash — 80x24</div>
            </div>
            
            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm md:text-base space-y-4">
              <div className="flex items-start gap-2">
                <span className="text-success">root@peterdamiano:~#</span>
                <span className="text-white">fetch --contact</span>
              </div>
              
              <div className="pl-4 space-y-2 text-gray-300">
                <div className="flex gap-4">
                  <span className="text-primary w-20">Email:</span>
                  <a href="mailto:peterleodamiano@gmail.com" className="hover:text-white hover:underline">peterleodamiano@gmail.com</a>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary w-20">WhatsApp:</span>
                  <a href="https://wa.me/265987966051" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">+265 98 796 6051</a>
                </div>
                <div className="flex gap-4 items-center mt-4 pt-4 border-t border-white/5">
                  <span className="text-primary w-20">Status:</span>
                  <span className="flex items-center gap-2">
                    System Online. Awaiting input<span className="animate-pulse">_</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center text-xs font-mono text-gray-600">
            © {new Date().getFullYear()} Obsidian Engineering. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
