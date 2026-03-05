import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TalkWithAi from './pages/chat/TalkWithAi';
import RecipeGenerator from './pages/recipe/RecipeGenerator';
import ImageGenerator from './pages/image/ImageGenerator';
import AudioTranscription from './pages/transcription/AudioTranscription';
import DashboardOverview from './pages/DashboardOverview';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="chat" element={<TalkWithAi />} />
        <Route path="recipe" element={<RecipeGenerator />} />
        <Route path="image" element={<ImageGenerator />} />
        <Route path="transcribe" element={<AudioTranscription />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
