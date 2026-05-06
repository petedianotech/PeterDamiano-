'use client';

import Navbar from '@/components/Navbar';
import { ArrowRight, ExternalLink, Code, Layers, Database, Shield, CheckCircle, Globe, Terminal, Play, Gamepad2, Cpu, Waves, BatteryCharging, Bot, Calendar, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar />

      {/* 2. Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-start justify-center min-h-[90vh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full relative rounded-2xl md:rounded-[2rem] overflow-hidden mb-12 border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.1)] group aspect-[4/3] md:aspect-[21/9]"
        >
          <Image
            src="https://i.ibb.co/60DLrWqc/petediano-LJ.jpg"
            alt="Peter Damiano at BICC"
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 flex flex-col items-end">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] md:text-sm font-mono text-gray-200">
              <Shield className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              Trusted Enterprise & Public Sector Architect
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-8 border-success/20 bg-success/5"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-xs font-mono text-success uppercase tracking-wider">Available for High-Impact Projects</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]"
        >
          PETER DAMIANO
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-10 font-light leading-relaxed"
        >
          Engineering Scalable Systems for <span className="text-white font-medium">Enterprises, NGOs, and Government</span>. <br className="hidden md:block" />
          <span className="text-gray-200 font-medium">Innovating Digital & Physical Infrastructure.</span>
        </motion.p>

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
            
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-white/10 group-hover:border-primary/30 transition-colors">
              <Image 
                src="https://i.ibb.co/b5JQ5fG5/image-2.jpg"
                alt="EducateMW Dashboard"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
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
                <CheckCircle className="w-3 h-3 text-primary" />
                System 04
              </div>
              <a href="https://aitact.vercel.app" target="_blank" rel="noopener noreferrer" aria-label="Visit AI Tact live demo" className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <h3 className="text-2xl font-bold mb-2">AI Tact</h3>
            <p className="text-primary font-mono text-sm mb-4">High-Stakes Message Auditor.</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              High-converting single-page Web App for auditing high-stakes messages using AI.
            </p>
          </div>

          {/* System 05 */}
          <div className="glass rounded-2xl p-8 flex flex-col h-full group hover:border-primary/30 transition-colors duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                <Bot className="w-3 h-3 text-primary" />
                System 05
              </div>
              <div className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs font-bold text-yellow-500 flex items-center gap-2">
                Restricted (Under Dev)
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">TrendBrainAI</h3>
            <p className="text-primary font-mono text-sm mb-4">Social Media Autopilot.</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              An AI-powered social media autopilot that scans global trends and automatically writes daily posts.
            </p>
          </div>

          {/* System 06: Hardware & IoT Exhibitions */}
          <div className="glass rounded-2xl p-8 flex flex-col h-full group hover:border-primary/30 transition-colors duration-500 md:col-span-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 -z-10" />
            <div className="flex justify-between items-start mb-6 gap-4 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                <Cpu className="w-3 h-3 text-primary" />
                Hardware & Public Innovation
              </div>
              <div className="px-3 py-1 rounded-full bg-success/10 border border-success/20 text-xs font-bold text-success flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                COMSTEDA22 STEM
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">Physical Engineering & Exhibitions</h3>
            <div className="text-gray-400 text-sm leading-relaxed mb-8 flex flex-col gap-4">
              <p>
                At BICC, I attended the COMSTEDA22 STEM program, where we learned about innovations developed by others, including improvements to the education system for Standard 1–4 in Malawi. From the innovations we saw there, our own innovation—especially the battery-powered gym—was showcased at Mloza Secondary School in Lilongwe. This experience allowed me to connect with Innovator Innocent Mandili, who is also a winner of innovation awards in Malawi.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-grow">
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors relative group/card flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <Waves className="w-6 h-6 text-primary mb-3" />
                  <h4 className="font-bold text-sm mb-2 text-white">Flood Alert System</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Automated sensor using a switch mechanism to trigger an alarm and red LED visual warning during heavy rainfall to provide early alerts and save lives.</p>
                </div>
                <div className="flex flex-col gap-1.5 mt-2 pt-4 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                    <Calendar className="w-3 h-3 flex-shrink-0" />
                    <span>6 Mar 2026 - Dzenje Sec. School</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors relative group/card flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <BatteryCharging className="w-6 h-6 text-success mb-3" />
                  <h4 className="font-bold text-sm mb-2 text-white">Battery-Powered Gym</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Sustainable innovation displayed at multiple research and STEM programs, promoting clean-energy fitness infrastructure.</p>
                </div>
                <div className="flex flex-col gap-1.5 mt-2 pt-4 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                    <Calendar className="w-3 h-3 flex-shrink-0" />
                    <span>3 Jul 2025 - Malawi Liverpool Trust</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                    <Calendar className="w-3 h-3 flex-shrink-0" />
                    <span>12 Nov 2025 - BICC</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors relative group/card flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <Bot className="w-6 h-6 text-purple-500 mb-3" />
                  <h4 className="font-bold text-sm mb-2 text-white">Robotic Toy Car</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">Demonstrated during school Art Week (received a certificate of achievement) and later at World Teachers' Day exhibitions.</p>
                </div>
                <div className="flex flex-col gap-1.5 mt-2 pt-4 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                    <Calendar className="w-3 h-3 flex-shrink-0" />
                    <span>12 Dec 2022 - Dzenje Sec. School</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                    <Calendar className="w-3 h-3 flex-shrink-0" />
                    <span>Later - Mulanje Park Stadium</span>
                  </div>
                </div>
              </div>
            </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="glass p-8 rounded-2xl border-t-4 border-t-primary/50 flex flex-col hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-6">Frontend</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Next.js', color: 'hover:border-white hover:bg-white/5', icon: <svg className="w-5 h-5 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c2.478 0 4.774-.753 6.678-2.039l-9.15-12.185v9.11h-1.353V6.2h1.353l9.049 12.054c1.178-1.745 1.875-3.844 1.875-6.254 0-6.627-5.373-12-12-12z"/></svg> },
                { name: 'Angular', color: 'hover:border-[#DD0031] hover:bg-[#DD0031]/10', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#DD0031"><path d="M12 0L1.76 3.64l1.58 13.67L12 24l8.66-6.69 1.58-13.67L12 0zm0 3.32l6.82 15.11h-2.1L15.35 15.3H8.65l-1.37 3.13h-2.1L12 3.32zm0 4.67L9.43 13.2h5.14L12 7.99z"/></svg> },
                { name: 'React', color: 'hover:border-[#61DAFB] hover:bg-[#61DAFB]/10', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#61DAFB"><circle cx="12" cy="12" r="2.5"/><path d="M23.2 11.5c.2-.3.2-.8-.1-1.1-1.9-2.7-5.8-5.3-10.4-6.3-4.6-1.1-9.1-.5-11.6 1.7-.3.2-.4.6-.3.9l.4 1.1c.1.3.4.5.8.4 2.1-1.6 5.8-2.2 9.5-1.4 3.7.8 6.9 3.1 8.5 5.5.2.3.6.4.9.2l1.3-.8z"/><path d="M12 2.5c-4.6 0-8.9 1.4-11.8 3.8-.4.3-.4.8-.1 1.1 1.9 2.7 5.8 5.3 10.4 6.3 4.6 1.1 9.1.5 11.6-1.7.3-.2.4-.6.3-.9l-.4-1.1c-.1-.3-.4-.5-.8-.4-2.1 1.6-5.8 2.2-9.5 1.4L11.7 6.3c-1.6-2.4-4.8-4.7-8.2-6.1C3.3.1 2.9 0 2.6.2l-1.3.8c-.3.2-.4.6-.2.9z" transform="rotate(120 12 12)"/><path d="M12 2.5c-4.6 0-8.9 1.4-11.8 3.8-.4.3-.4.8-.1 1.1 1.9 2.7 5.8 5.3 10.4 6.3 4.6 1.1 9.1.5 11.6-1.7.3-.2.4-.6.3-.9l-.4-1.1c-.1-.3-.4-.5-.8-.4-2.1 1.6-5.8 2.2-9.5 1.4L11.7 6.3c-1.6-2.4-4.8-4.7-8.2-6.1C3.3.1 2.9 0 2.6.2l-1.3.8c-.3.2-.4.6-.2.9z" transform="rotate(240 12 12)"/></svg> },
                { name: 'Flutter', color: 'hover:border-[#02569B] hover:bg-[#02569B]/10', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#02569B"><path d="M14.314 0L2.3 12L6 15.7L21.684.012h-7.357zm.012 11.072L6 19.388L9.684 23.072L24 8.756l-9.674 2.316z"/></svg> },
                { name: 'Tailwind', color: 'hover:border-[#06B6D4] hover:bg-[#06B6D4]/10', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#06B6D4"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1.14.3 1.96 1.134 2.85 2.11 1.47 1.61 3.16 3.465 6.15 3.465 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-1.14-.3-1.96-1.134-2.85-2.11C12.87 6.666 11.18 4.8 8.19 4.8h3.81zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1.14.3 1.96 1.134 2.85 2.11 1.47 1.61 3.16 3.465 6.15 3.465 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-1.14-.3-1.96-1.134-2.85-2.11C12.87 13.866 11.18 12 8.19 12h3.81z"/></svg> },
                { name: 'HTML5', color: 'hover:border-[#E34F26] hover:bg-[#E34F26]/10', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E34F26"><path d="M1.5 0h21l-1.9 21.4-8.6 2.6-8.6-2.6L1.5 0zM19 4H5l1.2 13.4 5.8 1.8 5.8-1.8L19 4zM16.5 7.1h-8l.1 1.7h7.8l-.3 3.5-4.1 1.3-4.1-1.3-.1-1.5H6.2l.2 3.1 5.6 1.8 5.6-1.8.5-6.8z"/></svg> }
              ].map((tech, i) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  key={tech.name} 
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 group overflow-hidden cursor-pointer ${tech.color}`}
                >
                  <div className="text-gray-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">{tech.icon}</div>
                  <span className="text-[10px] font-mono text-gray-400 group-hover:text-white transition-colors uppercase tracking-tighter">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="glass p-8 rounded-2xl border-t-4 border-t-success/50 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl font-bold mb-4">Backend</h3>
            <ul className="space-y-3">
              {[
                { name: 'Firebase', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFCA28"><path d="M3.89 15.67L5.26 8.71C5.31 8.44 5.4 8.21 5.51 8c.11-.21.24-.4.41-.56.17-.16.36-.29.58-.38.21-.09.46-.14.73-.14s.52.05.73.14c.22.09.41.22.58.38.17.16.3.35.41.56.11.21.21.44.25.71l1.37 6.96h-6.75zm13.15-4.81l-.85 4.81H9.42l-1.31-6.63L12 .48l7.15 6.04-2.11 4.34z"/></svg> },
                { name: 'Node.js', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#339933"><path d="M12 24c-.2 0-.4-.1-.6-.2L1.4 18c-.4-.2-.6-.7-.6-1.2V7.2c0-.5.2-1 .6-1.2L11.4.2c.4-.2.8-.2 1.2 0l10 5.8c.4.2.6.7.6 1.2v9.6c0 .5-.2 1-.6 1.2l-10 5.8c-.2.1-.4.2-.6.2zm-9.8-7.7l8.8 5.1V12.9l-8.8-5.1v8.5zm1.6-11l8 4.6 8.2-4.7L12 1.4 3.8 5.3zm18.4 2.2l-8.8 5.1v8.5l8.8-5.1V7.5z"/></svg> },
                { name: 'AI Integration', icon: <span className="w-1.5 h-1.5 rounded-full bg-success/50 group-hover:bg-success transition-colors" /> },
                { name: 'Web Games & Puzzles', icon: <span className="w-1.5 h-1.5 rounded-full bg-success/50 group-hover:bg-success transition-colors" /> }
              ].map((item, i) => (
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 6, color: '#10B981' }}
                  key={item.name} 
                  className="flex items-center gap-3 text-gray-400 font-mono text-sm cursor-default group transition-colors"
                >
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>{item.icon}</motion.div>
                  {item.name}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="glass p-8 rounded-2xl border-t-4 border-t-purple-500/50 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">Architecture</h3>
            <ul className="space-y-3">
              {['Systems Design', 'Scalable Database Optimization', 'Secure Authentication', 'API Integration'].map((item, i) => (
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 6, color: '#A855F7' }}
                  key={item} 
                  className="flex items-center gap-3 text-gray-400 font-mono text-sm cursor-default group transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-purple-500 transition-colors" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="glass p-8 rounded-2xl border-t-4 border-t-blue-500/50 flex flex-col hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
              <Smartphone className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-6">Mobile Apps</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                  { name: 'C++', color: 'hover:border-[#00599C] hover:bg-[#00599C]/10', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00599C"><path d="M22.25 10.33c.89 0 1.5.6 1.5 1.5v.34c0 .9-.6 1.5-1.5 1.5h-1.66v1.65c0 .9-.6 1.5-1.5 1.5h-.34c-.9 0-1.5-.6-1.5-1.5v-1.65h-1.66c-.9 0-1.5-.6-1.5-1.5v-.34c0-.9.6-1.5 1.5-1.5h1.66v-1.66c0-.9.6-1.5 1.5-1.5h.34c.9 0 1.5.6 1.5 1.5v1.66h1.66zM12.98 10.33c.9 0 1.5.6 1.5 1.5v.34c0 .9-.6 1.5-1.5 1.5h-1.66v1.65c0 .9-.6 1.5-1.5 1.5h-.34c-.9 0-1.5-.6-1.5-1.5v-1.65H6.32c-.9 0-1.5-.6-1.5-1.5v-.34c0-.9.6-1.5 1.5-1.5h1.66v-1.66c0-.9.6-1.5 1.5-1.5h.34c.9 0 1.5.6 1.5 1.5v1.66h1.66zM4.14 7.6C2.39 9.35 1.5 11.23 1.5 13.5S2.39 17.65 4.14 19.4C5.89 21.15 7.78 22 10.05 22s4.16-.85 5.9-2.6L12.7 16.14c-1.07.9-2 1.25-3.04 1.25-2.03 0-3.3-1.28-3.3-3.32s1.28-3.34 3.3-3.34c1.05 0 1.98.35 3.05 1.24l3.24-3.23c-1.74-1.76-3.63-2.62-5.9-2.62s-4.16.85-5.9 2.6z"/></svg> },
                  { name: 'Flutter', color: 'hover:border-[#02569B] hover:bg-[#02569B]/10', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#02569B"><path d="M14.314 0L2.3 12L6 15.7L21.684.012h-7.357zm.012 11.072L6 19.388L9.684 23.072L24 8.756l-9.674 2.316z"/></svg> },
                  { name: 'Python', color: 'hover:border-[#3776AB] hover:bg-[#3776AB]/10', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#3776AB"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.02.13-.08.06-.17.03-.3.02h-.4l-.56-.02-.73-.04-.9-.04-1.1-.02-1.3 0h-1.5l-1.5.02-1.3.04-1.1.06-.9.08-.73.1-.56.13-.42.16-.27.2-.13.23-.02.26.13.3.3.32.48.3.69.28.9.23 1.15.18 1.4.12 1.68.08 2 .02 2.25-.04 2.4-.1 2.3-.2 2.1-.3 1.7-.4 1.2-.5.8-.6.3-.7-.1-.9-.6-1-1.3-1-2.2-.8-3.3-.6-4.5-.4-5.8-.2-7.2 0-8.6.3-9.5.6-10.1 1-10.4 1.4-10.1 1.9-9.5 2.5-8.4 3.2-6.8 4-4.8 4.9-2.2 5.9 0 7.1 2.4 8.3 5 9.4 7.8 10.3 10.8 11.1 13.9 11.8 17.2 12.4 20.6 13 24 13.5v-10h-2.5v1h-5v-1h-5v1h-5v-1h-5v1h-3.6l-.3-1-.2-1.2-.07-1.4.03-1.6.17-1.8.35-1.9.6-1.9.9-1.9 1.3-1.8 1.8-1.5 2.4-1.1 3.1-.6 4-.2h14.4l4 .2 3.1.6 2.4 1.1 1.8 1.5 1.3 1.8.9 1.9.6 1.9.35 1.9.17 1.8.03 1.6-.07 1.4-.2 1.2-.3 1zM25.5 27.2c-.6 0-1.1.2-1.5.5s-.6.8-.6 1.4.2 1.1.6 1.4 1 .5 1.5.5 1.1-.2 1.5-.5.6-.8.6-1.4-.2-1.1-.6-1.4-1-.5-1.5-.5z"/></svg> },
                  { name: 'Kotlin', color: 'hover:border-[#7F52FF] hover:bg-[#7F52FF]/10', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#7F52FF"><path d="M24 24H0V0h24L12 12Z"/></svg> }
              ].map((tech, i) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  key={tech.name} 
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 group overflow-hidden cursor-pointer ${tech.color}`}
                >
                  <div className="text-gray-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">{tech.icon}</div>
                  <span className="text-[10px] font-mono text-gray-400 group-hover:text-white transition-colors uppercase tracking-tighter">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
              href="https://wa.me/265987066051"
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
              href="https://wa.me/265987066051"
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
              
              <div className="pl-4 pb-4 border-b border-white/5 mb-4 flex items-center gap-4">
                <div>
                   <div className="text-white font-bold tracking-tight">Peter Damiano</div>
                   <div className="text-gray-400 text-xs mt-1">Systems Architect • Open for Consultation</div>
                </div>
              </div>
              
              <div className="pl-4 space-y-2 text-gray-300">
                <div className="flex gap-4">
                  <span className="text-primary w-20">Email:</span>
                  <a href="mailto:peterleodamiano@gmail.com" className="hover:text-white hover:underline">peterleodamiano@gmail.com</a>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary w-20">WhatsApp:</span>
                  <a href="https://wa.me/265987066051" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">+265 98 706 6051</a>
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
