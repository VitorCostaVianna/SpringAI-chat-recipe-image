import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Image as ImageIcon, Utensils, Mic, LayoutDashboard, Github, Zap } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const navItems = [
    { path: '/', label: 'Overview', icon: LayoutDashboard },
    { path: '/chat', label: 'Ask AI', icon: MessageSquare },
    { path: '/image', label: 'Images', icon: ImageIcon },
    { path: '/recipe', label: 'Recipes', icon: Utensils },
    { path: '/transcribe', label: 'Transcription', icon: Mic },
];

const techStack = [
    { label: 'Spring Boot', color: 'text-green-400 bg-green-400/10 border-green-400/20' },
    { label: 'Groq / Llama 3.3', color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
    { label: 'React', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <div className="w-64 h-screen border-r border-[#1e2d45] glass flex items-center shrink-0 flex-col py-8 px-4 relative overflow-hidden">

            {/* Ambient background effect */}
            <div className="absolute top-0 left-0 w-full h-40 bg-blue-600/5 blur-[60px] pointer-events-none animate-aurora" />

            {/* Logo */}
            <div className="mb-10 flex items-center gap-3 w-full px-2">
                <div className="relative w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}>
                    <span className="text-white font-black text-sm tracking-tight">v.</span>
                    <div className="absolute inset-0 rounded-xl animate-pulse-glow" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-[15px] font-bold leading-none gradient-text tracking-tight">AI Studio</h1>
                    <span className="text-[10px] text-[#8b9ab8] font-medium mt-0.5 tracking-wider">v1.0 · BETA</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 w-full space-y-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="block relative"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-nav"
                                    className="absolute inset-0 bg-[#1a2236] rounded-xl border border-[#1e2d45]"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                />
                            )}
                            {isActive && (
                                <div className="absolute left-0 inset-y-2 w-0.5 bg-blue-500 rounded-full z-10" />
                            )}
                            <span className={clsx(
                                'relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-150 z-10',
                                isActive
                                    ? 'text-white'
                                    : 'text-[#8b9ab8] hover:text-white hover:bg-[#1a2236]/60 hover:scale-[1.02]'
                            )}>
                                <span className={clsx(
                                    'w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0',
                                    isActive
                                        ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.25)]'
                                        : 'bg-[#12151c] text-[#8b9ab8]'
                                )}>
                                    <Icon size={17} />
                                </span>
                                <span className="font-medium text-sm">{item.label}</span>
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom section */}
            <div className="mt-auto w-full space-y-4">

                {/* GitHub link */}
                <a
                    href="https://github.com/VitorCostaVianna/SpringAI-chat-recipe-image"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[#8b9ab8] hover:text-white hover:bg-[#1a2236]/60 transition-all group text-sm"
                >
                    <Github size={16} className="shrink-0" />
                    <span className="font-medium">View on GitHub</span>
                    <Zap size={12} className="ml-auto text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                {/* Tech stack */}
                <div className="p-3 rounded-xl bg-[#12151c] border border-[#1e2d45]">
                    <p className="text-[10px] text-[#8b9ab8] font-semibold uppercase tracking-widest mb-2.5 px-1">Stack</p>
                    <div className="flex flex-col gap-1.5">
                        {techStack.map((tech) => (
                            <span key={tech.label} className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${tech.color} w-fit`}>
                                {tech.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
