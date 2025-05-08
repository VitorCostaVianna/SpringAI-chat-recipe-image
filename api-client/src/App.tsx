import { useState } from 'react'

import TalkWithAi from './pages/chat/TalkWithAi'
import RecipeGenerator from './pages/recipe/RecipeGenerator'
import ImageGenerator from './pages/image/ImageGenerator'
import './App.css'

function App() {

  const [activeTab , setActiveTab] = useState('ask-ai')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <>
      <div className="App">
        <button 
          className={activeTab === 'ask-ai' ? 'active' : ''}
          onClick={() => handleTabChange('ask-ai')}>
            Talk with AI
        </button>
        <button
          className={activeTab === 'recipe-generator' ? 'active' : ''}
          onClick={() => handleTabChange('recipe-generator')}>
            Generate Recipes
        </button>
        <button
          className={activeTab === 'image-generator' ? 'active' : ''}
          onClick={() => handleTabChange('image-generator')}>
            Generate Images
          </button>
      </div>

      <div>
        {activeTab === 'ask-ai' && <TalkWithAi/>}
        {activeTab === 'recipe-generator' && <RecipeGenerator/>}
        {activeTab === 'image-generator' && <ImageGenerator/>}
      </div>
    </>
  )
}

export default App
