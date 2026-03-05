import { useState } from "react";
import api from "../../services/api";
import ReactMarkdown from "react-markdown";
import { Utensils, ChefHat, Loader2, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CUISINE_TAGS = [
    { emoji: '🌮', label: 'Mexican' },
    { emoji: '🍝', label: 'Italian' },
    { emoji: '🍱', label: 'Japanese' },
    { emoji: '🥗', label: 'Healthy' },
    { emoji: '🇧🇷', label: 'Brazilian' },
    { emoji: '🍛', label: 'Indian' },
];

function RecipeGenerator() {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('Any');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('None');
    const [recipe, setRecipe] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const generateRecipe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ingredients.trim() || isLoading) return;
        setIsLoading(true);
        setError(null);
        setRecipe('');

        try {
            const response = await api.get(`recipe-creator`, { params: { ingredients, cuisine, dietaryRestrictions } });
            setRecipe(response.data.recipe);
        } catch (error: any) {
            setError(error.response?.data?.detail || "Failed to generate recipe. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const copyRecipe = async () => {
        if (!recipe) return;
        await navigator.clipboard.writeText(recipe);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <header>
                <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                    <Utensils size={22} className="text-orange-400" />
                    AI Recipe Creator
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-orange-500/15 border border-orange-500/25 text-orange-400">
                        AI Chef
                    </span>
                </h2>
                <p className="text-sm text-[#8b9ab8]">Turn your available ingredients into delicious meals.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Form Section */}
                <div className="lg:col-span-1 space-y-4">
                    <form onSubmit={generateRecipe} className="bg-[#12151c] border border-[#1e2d45] p-5 rounded-2xl space-y-4">

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#8b9ab8] uppercase tracking-wider">
                                Ingredients <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                placeholder="e.g. Tomato, Onion, Chicken breast..."
                                className="w-full bg-[#0a0c10] border border-[#1e2d45] rounded-xl px-4 py-3 text-sm text-white focus-glow focus:border-orange-500/50 transition-all min-h-[90px] resize-none"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#8b9ab8] uppercase tracking-wider">Cuisine</label>
                            <input
                                type="text"
                                value={cuisine}
                                onChange={(e) => setCuisine(e.target.value)}
                                placeholder="e.g. Italian, Mexican, Any"
                                className="w-full bg-[#0a0c10] border border-[#1e2d45] rounded-xl px-4 py-3 text-sm text-white focus-glow focus:border-orange-500/50 transition-all"
                            />
                            {/* Quick tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {CUISINE_TAGS.map(tag => (
                                    <button
                                        key={tag.label}
                                        type="button"
                                        onClick={() => setCuisine(tag.label)}
                                        className={`text-xs px-2 py-1 rounded-lg border transition-all ${cuisine === tag.label
                                            ? 'bg-orange-500/20 border-orange-500/30 text-orange-300'
                                            : 'bg-[#0a0c10] border-[#1e2d45] text-[#8b9ab8] hover:border-[#2a3a55] hover:text-white'
                                            }`}
                                    >
                                        {tag.emoji} {tag.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#8b9ab8] uppercase tracking-wider">Dietary Restrictions</label>
                            <input
                                type="text"
                                value={dietaryRestrictions}
                                onChange={(e) => setDietaryRestrictions(e.target.value)}
                                placeholder="e.g. Vegan, Gluten-free, None"
                                className="w-full bg-[#0a0c10] border border-[#1e2d45] rounded-xl px-4 py-3 text-sm text-white focus-glow focus:border-orange-500/50 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!ingredients.trim() || isLoading}
                            className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold text-sm transition-all disabled:opacity-40 flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-100"
                        >
                            {isLoading ? <><Loader2 className="animate-spin" size={16} /> Cooking...</> : <><ChefHat size={16} /> Generate Recipe</>}
                        </button>
                    </form>

                    <AnimatePresence>
                        {error && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-red-500/10 border border-red-500/20 text-red-400 py-2.5 px-4 rounded-xl text-sm text-center">
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Result Section */}
                <div className="lg:col-span-2">
                    <div className="bg-[#12151c] border border-[#1e2d45] rounded-2xl min-h-[500px] flex flex-col shadow-lg overflow-hidden">
                        {/* Result header */}
                        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1e2d45]">
                            <div className="flex items-center gap-2">
                                <ChefHat size={15} className="text-orange-400" />
                                <span className="text-xs font-semibold text-[#8b9ab8] uppercase tracking-wider">Your Recipe</span>
                            </div>
                            {recipe && (
                                <button
                                    onClick={copyRecipe}
                                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#0a0c10] border border-[#1e2d45] text-[#8b9ab8] hover:text-white hover:border-[#2a3a55] transition-all"
                                >
                                    {copied ? <><Check size={12} className="text-green-400" /> Copied!</> : <><Copy size={12} /> Copy</>}
                                </button>
                            )}
                        </div>

                        {/* Body */}
                        <div className="flex-1 p-5 relative">
                            {!recipe && !isLoading && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#8b9ab8] space-y-3">
                                    <ChefHat size={52} className="text-orange-500/30 animate-float" />
                                    <p className="text-sm">Your recipe will appear here.</p>
                                </div>
                            )}

                            {isLoading && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-orange-400 space-y-3 bg-[#12151c]/70 backdrop-blur-sm z-10">
                                    <Loader2 className="animate-spin" size={40} />
                                    <p className="text-sm font-medium animate-pulse">Consulting the AI Chef...</p>
                                </div>
                            )}

                            {recipe && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="prose prose-invert prose-orange max-w-none h-full overflow-y-auto custom-scrollbar pr-2 text-sm"
                                >
                                    <ReactMarkdown>{recipe}</ReactMarkdown>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeGenerator;