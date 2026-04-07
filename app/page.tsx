import Navbar from '@/components/Navbar';
import { ArrowRight, Mail, ExternalLink, Code, Layers, Database, Shield, CheckCircle, Globe, Terminal } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar />

      {/* 2. Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-start justify-center min-h-[90vh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-8 border-success/20 bg-success/5">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-xs font-mono text-success uppercase tracking-wider">Available for High-Impact Projects</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]">
          PETER DAMIANO
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10 font-light leading-relaxed">
          Engineering Scalable Systems. <br className="hidden md:block" />
          <span className="text-gray-200 font-medium">Innovating Digital Infrastructure.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="https://wa.me/265987966051"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 group"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="mailto:peterleodamiano@gmail.com"
            className="flex items-center justify-center gap-2 glass hover:bg-white/10 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            Email Me
          </a>
        </div>
      </section>

      {/* 3. The Innovation Lab (Featured Systems) */}
      <section id="systems" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Innovation Lab</h2>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Featured Systems & Architecture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* System 01 */}
          <div className="glass rounded-2xl p-8 flex flex-col h-full group hover:border-primary/30 transition-colors duration-500 lg:col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                <Code className="w-3 h-3 text-primary" />
                System 01
              </div>
              <a href="https://globlync.vercel.app" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors">
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
              <a href="https://educatemw.vercel.app" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors">
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
          <div className="glass rounded-2xl p-8 flex flex-col h-full group hover:border-primary/30 transition-colors duration-500 lg:col-span-3">
            <div className="flex justify-between items-start mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                <Terminal className="w-3 h-3 text-primary" />
                System 03
              </div>
              <a href="https://omaxtool.vercel.app" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="md:flex gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">OmaxTool</h3>
                <p className="text-primary font-mono text-sm mb-4">Utility-First Productivity Suite.</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Everyday solver application focusing on streamlined UX and high-utility tools. Built for performance and immediate user value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Engine (Tech Stack) */}
      <section id="stack" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
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
              {['Next.js', 'React', 'Tailwind CSS', 'TypeScript'].map(item => (
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
              {['Firebase (Firestore)', 'Firebase Auth', 'Cloud Functions', 'Node.js'].map(item => (
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
      </section>

      {/* 5. Investment & Services (Pricing) */}
      <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
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
            <h3 className="text-2xl font-bold mb-2">MVP Package</h3>
            <div className="text-primary font-mono text-sm mb-6">Starting at $1,000 USD</div>
            <p className="text-gray-400 mb-8 flex-grow">
              For fast, scalable web applications (Next.js + Firebase) ready for market testing.
            </p>
            <ul className="space-y-4 mb-10">
              {['Rapid Prototyping', 'Core Feature Implementation', 'Responsive Design', 'Basic Authentication'].map(feature => (
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
          <div className="glass rounded-3xl p-8 md:p-10 flex flex-col relative overflow-hidden border-primary/30 bg-primary/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-10 -mt-10" />
            <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono font-bold">
              RECOMMENDED
            </div>
            <h3 className="text-2xl font-bold mb-2">Enterprise Innovation</h3>
            <div className="text-primary font-mono text-sm mb-6">Starting at $5,000+ USD</div>
            <p className="text-gray-400 mb-8 flex-grow">
              For complex systems like Globlync requiring AI integration and custom architecture.
            </p>
            <ul className="space-y-4 mb-10">
              {['Custom Systems Architecture', 'AI & LLM Integration', 'Advanced Database Optimization', 'High-Scale Infrastructure'].map(feature => (
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
              className="w-full py-4 rounded-xl bg-primary hover:bg-blue-600 text-white text-center font-medium transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Book a Discovery Call
            </a>
          </div>
        </div>
      </section>

      {/* 6. Origin Story (The Innovator) */}
      <section id="story" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
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
      </section>

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
