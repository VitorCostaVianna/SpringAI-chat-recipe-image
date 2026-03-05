import { Outlet, useLocation, Link } from 'react-router-dom';
import { Github, ChevronRight } from 'lucide-react';
import Sidebar from './Sidebar';

const routeLabels: Record<string, string> = {
    '/': 'Overview',
    '/chat': 'Ask AI',
    '/image': 'Image Generator',
    '/recipe': 'Recipe Creator',
    '/transcribe': 'Audio Transcription',
};

export default function Layout() {
    const location = useLocation();
    const currentLabel = routeLabels[location.pathname] ?? 'Page';
    const isHome = location.pathname === '/';

    return (
        <div className="flex min-h-screen bg-[#0a0c10] text-[#f1f5f9] overflow-hidden">
            <Sidebar />
            <main className="flex-1 h-screen overflow-y-auto relative flex flex-col custom-scrollbar">

                {/* Ambient blobs */}
                <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-blue-600/8 blur-[140px] -z-10 rounded-full pointer-events-none animate-aurora" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-purple-600/6 blur-[140px] -z-10 rounded-full pointer-events-none" style={{ animationDelay: '4s' }} />

                {/* Top header bar */}
                <header className="shrink-0 h-14 border-b border-[#1e2d45]/60 flex items-center px-8 gap-2 backdrop-blur-sm bg-[#0a0c10]/50 sticky top-0 z-20">
                    <Link to="/" className="text-[#8b9ab8] hover:text-white text-sm transition-colors font-medium">
                        AI Studio
                    </Link>
                    {!isHome && (
                        <>
                            <ChevronRight size={14} className="text-[#1e2d45]" />
                            <span className="text-sm text-[#f1f5f9] font-medium">{currentLabel}</span>
                        </>
                    )}
                    <a
                        href="https://github.com/VitorCostaVianna/SpringAI-chat-recipe-image"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-[#8b9ab8] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#1a2236]"
                        title="View on GitHub"
                    >
                        <Github size={17} />
                    </a>
                </header>

                {/* Page content */}
                <div className="flex-1 max-w-6xl mx-auto w-full p-8 pt-10 min-h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
