import { useState } from "react";
import api from "../../services/api";
import { Image as ImageIcon, Loader2, Download, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [quality, setQuality] = useState('hd');
    const [n, setN] = useState('1');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateImages = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;
        setIsLoading(true);
        setError(null);
        setImageUrls([]);

        try {
            const response = await api.get(`generate-image`, { params: { prompt, quality, n, width: 1024, height: 1024 } });
            setImageUrls(response.data.imageUrls);
        } catch (error: any) {
            setError(error.response?.data?.detail || "Failed to generate image. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const numSlots = parseInt(n);

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <header>
                <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                    <ImageIcon size={22} className="text-purple-400" />
                    AI Image Studio
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/25 text-purple-400">
                        DALL·E 3
                    </span>
                </h2>
                <p className="text-sm text-[#8b9ab8]">Create stunning visualizations from text descriptions.</p>
            </header>

            {/* Form */}
            <form onSubmit={generateImages} className="bg-[#12151c] border border-[#1e2d45] p-5 rounded-2xl space-y-4">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 space-y-1.5">
                        <label className="text-xs font-semibold text-[#8b9ab8] uppercase tracking-wider">
                            Image Prompt <span className="text-purple-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="A futuristic city bathed in neon lights, cyberpunk style..."
                            className="w-full bg-[#0a0c10] border border-[#1e2d45] rounded-xl px-4 py-3 text-sm text-white focus-glow focus:border-purple-500/50 transition-all"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="w-full md:w-32 space-y-1.5">
                        <label className="text-xs font-semibold text-[#8b9ab8] uppercase tracking-wider">Quantity</label>
                        <select
                            value={n}
                            onChange={(e) => setN(e.target.value)}
                            className="w-full bg-[#0a0c10] border border-[#1e2d45] rounded-xl px-3 py-3 text-sm text-white focus-glow focus:border-purple-500/50 transition-all"
                            disabled={isLoading}
                        >
                            {[1, 2, 3, 4].map(v => <option key={v} value={v}>{v} image{v > 1 ? 's' : ''}</option>)}
                        </select>
                    </div>

                    <div className="w-full md:w-36 space-y-1.5">
                        <label className="text-xs font-semibold text-[#8b9ab8] uppercase tracking-wider">Quality</label>
                        <select
                            value={quality}
                            onChange={(e) => setQuality(e.target.value)}
                            className="w-full bg-[#0a0c10] border border-[#1e2d45] rounded-xl px-3 py-3 text-sm text-white focus-glow focus:border-purple-500/50 transition-all"
                            disabled={isLoading}
                        >
                            <option value="hd">HD Quality</option>
                            <option value="standard">Standard</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            type="submit"
                            disabled={!prompt.trim() || isLoading}
                            className="h-[46px] px-7 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold text-sm transition-all disabled:opacity-40 w-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-100"
                        >
                            {isLoading ? <><Loader2 className="animate-spin" size={16} /> Generating</> : <><ImageIcon size={16} /> Generate</>}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-red-500/10 border border-red-500/20 text-red-400 py-2.5 px-4 rounded-xl text-sm text-center">
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>

            {/* Image grid */}
            <div className={`grid gap-5 ${numSlots === 1 ? 'grid-cols-1 max-w-lg mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>

                {/* Loading skeletons */}
                {isLoading && Array.from({ length: numSlots }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-2xl bg-[#12151c] border border-[#1e2d45] overflow-hidden relative">
                        <div className="absolute inset-0 animate-shimmer" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#8b9ab8]">
                            <Loader2 className="animate-spin text-purple-500" size={36} />
                            <p className="text-sm font-medium animate-pulse">Painting masterpiece {i + 1}...</p>
                        </div>
                    </div>
                ))}

                {/* Empty state */}
                {!isLoading && imageUrls.length === 0 && !error && (
                    <div className="col-span-full aspect-[2/1] bg-[#12151c]/60 border border-dashed border-[#1e2d45] rounded-2xl flex flex-col items-center justify-center text-[#8b9ab8] space-y-3">
                        <ImageIcon size={48} className="text-purple-500/40 animate-float" />
                        <p className="text-sm">Your generated images will appear here.</p>
                    </div>
                )}

                {/* Images */}
                <AnimatePresence>
                    {imageUrls.map((url, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group aspect-square rounded-2xl overflow-hidden bg-[#0a0c10] border border-[#1e2d45]"
                        >
                            <img src={url} alt={`Generated ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                <a href={url} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors" title="View full size">
                                    <Maximize2 size={18} />
                                </a>
                                <a href={url} download={`generated-${index + 1}.png`} className="w-11 h-11 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center text-white transition-colors" title="Download">
                                    <Download size={18} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default ImageGenerator;