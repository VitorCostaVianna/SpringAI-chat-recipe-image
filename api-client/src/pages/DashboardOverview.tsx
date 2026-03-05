import { Link } from 'react-router-dom';
import { MessageSquare, Image as ImageIcon, Utensils, Mic, ArrowRight, Cpu, Layers, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        title: 'Ask AI',
        description: 'Engage in natural conversations using state-of-the-art language models.',
        icon: MessageSquare,
        path: '/chat',
        gradient: 'from-blue-500 to-indigo-500',
        glow: 'rgba(59,130,246,0.15)',
        iconBg: 'bg-blue-500/15 border-blue-500/25',
        iconColor: 'text-blue-400',
        badge: 'GPT-4o',
        badgeColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    },
    {
        title: 'Image Generator',
        description: 'Transform your text descriptions into stunning, high-quality images.',
        icon: ImageIcon,
        path: '/image',
        gradient: 'from-purple-500 to-violet-500',
        glow: 'rgba(139,92,246,0.15)',
        iconBg: 'bg-purple-500/15 border-purple-500/25',
        iconColor: 'text-purple-400',
        badge: 'DALL·E 3',
        badgeColor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    },
    {
        title: 'Recipe Creator',
        description: 'Get custom recipes tailored to your ingredients and dietary preferences.',
        icon: Utensils,
        path: '/recipe',
        gradient: 'from-orange-500 to-amber-500',
        glow: 'rgba(249,115,22,0.12)',
        iconBg: 'bg-orange-500/15 border-orange-500/25',
        iconColor: 'text-orange-400',
        badge: 'AI Chef',
        badgeColor: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    },
    {
        title: 'Audio Transcription',
        description: 'Convert voice recordings or audio files into accurate, structured text.',
        icon: Mic,
        path: '/transcribe',
        gradient: 'from-emerald-500 to-teal-500',
        glow: 'rgba(16,185,129,0.12)',
        iconBg: 'bg-emerald-500/15 border-emerald-500/25',
        iconColor: 'text-emerald-400',
        badge: 'Whisper AI',
        badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    },
];

const stats = [
    { label: 'AI Tools', value: '4', icon: Layers, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Backend', value: 'Spring Boot', icon: Cpu, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'AI Provider', value: 'Groq / Llama 3.3', icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Performance', value: 'Real-time', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
];

const examplePrompts = [
    'Explain quantum computing in simple terms',
    'Write a poem about artificial intelligence',
    'What are the best practices in Spring Boot?',
];

export default function DashboardOverview() {
    return (
        <div className="space-y-10">

            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-5"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                    All systems operational
                </div>

                <h1 className="text-5xl font-black tracking-tight text-white leading-[1.1]">
                    Your creative<br />
                    <span className="gradient-text">AI workspace.</span>
                </h1>

                <p className="text-lg text-[#8b9ab8] max-w-xl leading-relaxed">
                    A full-stack application powered by <span className="text-white font-medium">Spring AI</span> and <span className="text-white font-medium">Llama 3.3 via Groq</span>.
                    Chat, generate images, create recipes, and transcribe audio — all in one place.
                </p>

                <div className="flex items-center gap-3 pt-1">
                    <Link
                        to="/chat"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.03] active:scale-100"
                        style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
                    >
                        Start exploring <ArrowRight size={15} />
                    </Link>
                    <span className="text-[#8b9ab8] text-sm">or pick a tool below</span>
                </div>
            </motion.div>

            {/* Stat strip */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.45 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="flex items-center gap-3 p-4 rounded-xl bg-[#12151c] border border-[#1e2d45]">
                            <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                                <Icon size={17} className={stat.color} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-[#8b9ab8] font-medium">{stat.label}</p>
                                <p className="text-sm font-bold text-white truncate">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </motion.div>

            {/* Bento grid */}
            <div>
                <h2 className="text-xs font-semibold text-[#8b9ab8] uppercase tracking-widest mb-4">Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                            >
                                <Link
                                    to={feature.path}
                                    className="block h-full group relative overflow-hidden rounded-2xl border border-[#1e2d45] bg-[#12151c] p-6 transition-all duration-300 hover:border-[#2a3a55] hover:-translate-y-0.5"
                                    style={{ '--glow': feature.glow } as React.CSSProperties}
                                >
                                    {/* Hover glow */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                        style={{ background: `radial-gradient(circle at top right, ${feature.glow}, transparent 60%)` }}
                                    />

                                    {/* Live badge */}
                                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#0a0c10] border border-[#1e2d45]">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                        <span className="text-[10px] font-semibold text-green-400">Live</span>
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-start gap-4 mb-5">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feature.iconBg} ${feature.iconColor} transition-all group-hover:scale-110`}>
                                                <Icon size={24} />
                                            </div>
                                            <span className={`mt-0.5 text-[11px] font-bold px-2 py-0.5 rounded-md border ${feature.badgeColor}`}>
                                                {feature.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                        <p className="text-[#8b9ab8] text-sm mb-5 flex-1 leading-relaxed">{feature.description}</p>

                                        <div className={`flex items-center text-sm font-semibold gap-2 group-hover:gap-3 transition-all ${feature.iconColor}`}>
                                            Open <ArrowRight size={15} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Quick start prompts */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pb-4"
            >
                <h2 className="text-xs font-semibold text-[#8b9ab8] uppercase tracking-widest mb-3">Try a prompt</h2>
                <div className="flex flex-wrap gap-2">
                    {examplePrompts.map((prompt) => (
                        <Link
                            key={prompt}
                            to={`/chat`}
                            state={{ initialPrompt: prompt }}
                            className="text-sm px-4 py-2 rounded-xl bg-[#12151c] border border-[#1e2d45] text-[#8b9ab8] hover:text-white hover:border-[#2a3a55] hover:bg-[#1a2236] transition-all"
                        >
                            {prompt}
                        </Link>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
