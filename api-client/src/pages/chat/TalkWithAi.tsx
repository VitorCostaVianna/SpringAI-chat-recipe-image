import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import { Send, Loader2, Bot, User, Sparkles } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

const EXAMPLE_PROMPTS = [
    "Explain how Spring AI integrates with Groq and Llama 3.3",
    "Write a haiku about machine learning",
    "What's the best React architecture in 2025?",
];

function TalkWithAi() {
    const location = useLocation();
    const initialPrompt = (location.state as any)?.initialPrompt ?? '';

    const [prompt, setPrompt] = useState(initialPrompt);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string, ts: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const askAI = async (e: React.FormEvent, overridePrompt?: string) => {
        e.preventDefault();
        const currentPrompt = overridePrompt ?? prompt;
        if (!currentPrompt.trim() || isLoading) return;

        setPrompt('');
        setMessages(prev => [...prev, { role: 'user', content: currentPrompt, ts: now() }]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.get(`ask-ai-options`, { params: { prompt: currentPrompt } });
            const data = response.data;
            setMessages(prev => [...prev, { role: 'ai', content: data.response, ts: now() }]);
        } catch (error: any) {
            setError(error.response?.data?.detail || "Failed to reach AI service.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        Talk with AI
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/25 text-blue-400">
                            GPT-4o
                        </span>
                    </h2>
                    <p className="text-sm text-[#8b9ab8] mt-1">Have a natural conversation with the advanced language model.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8b9ab8]">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Online
                </div>
            </header>

            {/* Message area */}
            <div className="flex-1 overflow-y-auto space-y-5 mb-4 pr-2 custom-scrollbar min-h-0">
                <AnimatePresence initial={false}>
                    {messages.length === 0 && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full flex flex-col items-center justify-center py-16 space-y-6"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center animate-float">
                                <Sparkles size={32} className="text-blue-400" />
                            </div>
                            <div className="text-center space-y-1">
                                <p className="text-white font-semibold">How can I help you today?</p>
                                <p className="text-sm text-[#8b9ab8]">Pick a prompt or write your own below</p>
                            </div>
                            <div className="flex flex-col gap-2 w-full max-w-lg">
                                {EXAMPLE_PROMPTS.map((p) => (
                                    <button
                                        key={p}
                                        onClick={(e: any) => { setPrompt(p); askAI(e, p); }}
                                        className="text-left text-sm px-4 py-3 rounded-xl bg-[#12151c] border border-[#1e2d45] text-[#8b9ab8] hover:text-white hover:border-[#2a3a55] hover:bg-[#1a2236] transition-all"
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center mt-1 ${message.role === 'user' ? 'bg-blue-600' : 'bg-[#1a2236] border border-[#1e2d45]'}`}>
                                {message.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-blue-400" />}
                            </div>
                            <div className={`flex flex-col gap-1 max-w-[78%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${message.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-sm'
                                    : 'bg-[#12151c] border border-[#1e2d45] text-[#f1f5f9] rounded-tl-sm'
                                    }`}>
                                    {message.role === 'ai' ? (
                                        <div className="prose prose-invert prose-sm max-w-none">
                                            <ReactMarkdown>{message.content}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        <p className="whitespace-pre-wrap">{message.content}</p>
                                    )}
                                </div>
                                <span className="text-[10px] text-[#8b9ab8] px-1">{message.ts}</span>
                            </div>
                        </motion.div>
                    ))}

                    {isLoading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full flex shrink-0 items-center justify-center bg-[#1a2236] border border-[#1e2d45]">
                                <Bot size={16} className="text-blue-400" />
                            </div>
                            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#12151c] border border-[#1e2d45] flex items-center gap-3">
                                <Loader2 className="animate-spin text-blue-500 shrink-0" size={16} />
                                <span className="text-sm text-[#8b9ab8]">Thinking...</span>
                            </div>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/20 text-red-400 py-3 px-4 rounded-xl text-sm text-center">
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input */}
            <form onSubmit={askAI} className="relative shrink-0">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Message AI Studio..."
                    disabled={isLoading}
                    className="w-full bg-[#12151c] border border-[#1e2d45] text-white rounded-2xl py-4 pl-5 pr-14 text-sm focus-glow focus:border-blue-500/50 transition-all disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={!prompt.trim() || isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:hover:bg-blue-600 hover:scale-105"
                >
                    <Send size={15} />
                </button>
            </form>
        </div>
    );
}

export default TalkWithAi;