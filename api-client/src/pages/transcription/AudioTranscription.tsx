import { useState, useRef } from "react";
import api from "../../services/api";
import { Mic, Upload, FileAudio, Loader2, Copy, Check, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function AudioTranscription() {
    const [file, setFile] = useState<File | null>(null);
    const [transcription, setTranscription] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [copied, setCopied] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
            setTranscription('');
            setError(null);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) {
            setFile(dropped);
            setTranscription('');
            setError(null);
        }
    };

    const handleTranscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || isLoading) return;
        setIsLoading(true);
        setError(null);
        setTranscription('');

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await api.post(`transcribe`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setTranscription(response.data.transcription);
        } catch (error: any) {
            setError(error.response?.data?.detail || "Failed to transcribe audio. Please ensure it's a valid audio format.");
        } finally {
            setIsLoading(false);
        }
    }

    const copyTranscription = async () => {
        if (!transcription) return;
        await navigator.clipboard.writeText(transcription);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <header>
                <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                    <Mic size={22} className="text-emerald-400" />
                    Audio Transcription
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/25 text-emerald-400">
                        Whisper AI
                    </span>
                </h2>
                <p className="text-sm text-[#8b9ab8]">Convert your voice recordings to accurate text using Groq Whisper.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Upload Section */}
                <form onSubmit={handleTranscribe} className="bg-[#12151c] border border-[#1e2d45] p-5 rounded-2xl space-y-4 flex flex-col h-[420px]">

                    {/* Drop zone */}
                    <div
                        className={`flex-1 relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden cursor-pointer ${isDragging
                            ? 'border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                            : file
                                ? 'border-emerald-500/40 bg-emerald-500/5'
                                : 'border-[#1e2d45] bg-[#0a0c10]/50 hover:border-emerald-500/40 hover:bg-emerald-500/5'
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={isLoading}
                        />

                        <AnimatePresence mode="wait">
                            {file ? (
                                <motion.div
                                    key="file-selected"
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex flex-col items-center gap-3 text-center p-4 pointer-events-none"
                                >
                                    <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center">
                                        <FileAudio size={28} className="text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm truncate max-w-[200px]">{file.name}</p>
                                        <p className="text-xs text-emerald-400 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <span className="text-xs text-[#8b9ab8]">Click to change file</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="no-file"
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex flex-col items-center gap-3 text-center p-4 pointer-events-none"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isDragging ? 'bg-emerald-500/30 scale-110' : 'bg-[#0a0c10] border border-[#1e2d45]'}`}>
                                        <Upload size={26} className={`transition-colors ${isDragging ? 'text-emerald-400' : 'text-[#8b9ab8]'}`} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm">
                                            {isDragging ? 'Drop your file here' : 'Click or drag audio file'}
                                        </p>
                                        <p className="text-xs text-[#8b9ab8] mt-0.5">MP3, M4A, WAV up to 25MB</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        type="submit"
                        disabled={!file || isLoading}
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm transition-all disabled:opacity-40 flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-100"
                    >
                        {isLoading ? <><Loader2 className="animate-spin" size={16} /> Transcribing...</> : <><Upload size={16} /> Transcribe Audio</>}
                    </button>

                    <AnimatePresence>
                        {error && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-red-500/10 border border-red-500/20 text-red-400 py-2.5 px-4 rounded-xl text-sm text-center">
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>

                {/* Result Section */}
                <div className="bg-[#12151c] border border-[#1e2d45] rounded-2xl h-[420px] flex flex-col overflow-hidden">
                    {/* Result header */}
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e2d45] shrink-0">
                        <div className="flex items-center gap-2">
                            <Mic size={14} className="text-emerald-400" />
                            <span className="text-xs font-semibold text-[#8b9ab8] uppercase tracking-wider">Transcription</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {transcription && (
                                <span className="flex items-center gap-1 text-[10px] text-[#8b9ab8] font-medium">
                                    <Hash size={10} />
                                    {transcription.length} chars
                                </span>
                            )}
                            {transcription && (
                                <button
                                    onClick={copyTranscription}
                                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#0a0c10] border border-[#1e2d45] text-[#8b9ab8] hover:text-white hover:border-[#2a3a55] transition-all"
                                >
                                    {copied ? <><Check size={12} className="text-green-400" /> Copied!</> : <><Copy size={12} /> Copy</>}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 relative overflow-hidden">
                        {!transcription && !isLoading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#8b9ab8] space-y-3">
                                <Mic size={48} className="text-emerald-500/30 animate-float" />
                                <p className="text-sm">Upload an audio file to see text.</p>
                            </div>
                        )}

                        {isLoading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-400 space-y-3 bg-[#12151c]/70 backdrop-blur-sm z-10">
                                <Loader2 className="animate-spin" size={40} />
                                <p className="text-sm font-medium animate-pulse">Whisper is listening...</p>
                            </div>
                        )}

                        {transcription && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute inset-0 p-5 overflow-y-auto custom-scrollbar"
                            >
                                <p className="text-[#f1f5f9] text-sm leading-relaxed whitespace-pre-wrap">{transcription}</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AudioTranscription;
