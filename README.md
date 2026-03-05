# 🤖 AI Studio

**A production-ready, full-stack AI application** demonstrating real-world integration of Large Language Models with a modern backend and frontend — designed as a portfolio-grade project showcasing senior-level engineering practices.

---

## 🌐 Live Demo

| | Link |
|---|---|
| 🖥️ **Frontend** | [ai-studio-alpha-beige.vercel.app](https://ai-studio-alpha-beige.vercel.app/) |
| ⚙️ **Backend API** | [springai-chat-recipe-image-production.up.railway.app](https://springai-chat-recipe-image-production.up.railway.app) |

---

## 💡 Why This Project Stands Out

This is not a tutorial project. It reflects real engineering decisions:

- **LLM Provider Migration** — The project was originally built with OpenAI's API and later migrated to **Llama 3.3 70B via Groq**, without breaking any existing functionality. This demonstrates the value of Spring AI's **provider-agnostic abstraction layer** — the entire migration required only config changes, not code rewrites.
- **Production Deployment** — Backend on **Railway** (Spring Boot JAR), Frontend on **Vercel** (Vite/React), with CORS properly configured for cross-origin communication.
- **API Security** — API keys are never hardcoded. Secrets are injected via environment variables at runtime, following the [12-factor app](https://12factor.net/) methodology.
- **Clean Architecture** — Layered backend with Controller → Service → DTO pattern, global exception handling, and structured logging.

---

## ✨ Features

| Feature | Model / Provider |
|---|---|
| 💬 **AI Chat** | Llama 3.3 70B via Groq |
| 🍽️ **Recipe Generator** | Llama 3.3 70B via Groq + Prompt Templates |
| 🖼️ **Image Generator** | Pollinations.ai (free, no key required) |
| 🎤 **Audio Transcription** | Whisper Large V3 via Groq |

---

## 🛠️ Tech Stack

### Backend
- **Java 21** + **Spring Boot 3.4**
- **Spring AI 1.0** — OpenAI-compatible abstraction layer
- **Groq Cloud** — Ultra-fast LPU inference (Llama 3.3 + Whisper)
- Global Exception Handling with `@RestControllerAdvice`
- DTOs with **Java Records**
- Maven, deployed on **Railway**

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **Framer Motion** animations
- **Axios** for HTTP client
- **React Router** for SPA navigation
- Deployed on **Vercel**

---

## 🔄 Key Engineering Decision: OpenAI → Llama 3.3 Migration

Originally built using OpenAI's GPT models, the project was migrated to **Meta's Llama 3.3 70B** served via **Groq's inference API**.

**Why Groq?**
- ✅ Free tier with generous rate limits
- ✅ 10x faster inference than standard OpenAI (Groq's custom LPU hardware)
- ✅ Fully OpenAI-compatible — Spring AI needed zero code changes

**What changed in the migration?**
```yaml
# Before
spring.ai.openai.base-url: https://api.openai.com
spring.ai.openai.chat.options.model: gpt-4o

# After
spring.ai.openai.base-url: https://api.groq.com/openai
spring.ai.openai.chat.options.model: llama-3.3-70b-versatile
```

That's it. Spring AI's abstraction made the migration seamless.

---

## 📡 API Reference

Base URL: `https://springai-chat-recipe-image-production.up.railway.app/ai`

| Endpoint | Method | Description |
|---|---|---|
| `/ask-ai?prompt=` | GET | Simple AI chat response |
| `/ask-ai-options?prompt=` | GET | Chat with model metadata in response |
| `/recipe-creator` | GET | Generate recipe from ingredients |
| `/generate-image?prompt=` | GET | Generate AI image from text |
| `/transcribe` | POST | Audio file → text transcription |

#### Recipe Creator Parameters
| Param | Default | Description |
|---|---|---|
| `ingredients` | required | Comma-separated list |
| `cuisine` | `any` | Cuisine type |
| `dietaryRestrictions` | `none` | e.g. `vegan`, `gluten-free` |

---

## 🚀 Running Locally

### Prerequisites
- Java 21+, Node.js 18+, Maven 3.8+
- Free [Groq API key](https://console.groq.com)

### Backend
```bash
cd spring-ai-vitor/spring-ai-vitor

# Set your API key
export GROQ_API_KEY="your-key-here"       # macOS/Linux
$env:GROQ_API_KEY = "your-key-here"       # Windows PowerShell

mvn spring-boot:run
```

### Frontend
```bash
cd api-client
npm install
npm run dev
```

---

## 🏗️ Project Structure

```
├── spring-ai-vitor/          # Backend (Spring Boot)
│   └── src/main/java/com/vitor/
│       ├── controller/       # REST endpoints
│       ├── service/          # Business logic + AI integration
│       ├── dto/              # Records (immutable DTOs)
│       ├── config/           # CORS configuration
│       └── exception/        # Global exception handler
│
└── api-client/               # Frontend (React + Vite)
    └── src/
        ├── pages/            # Chat, Recipe, Image, Transcription
        ├── components/       # Layout, Sidebar
        └── services/         # Axios API client
```

---

## 🗺️ Roadmap

- [x] AI Chat with Llama 3.3
- [x] Recipe generator with system prompt templates
- [x] Image generation (Pollinations.ai)
- [x] Audio transcription (Groq Whisper)
- [x] Migration from OpenAI → Llama 3.3 via Groq
- [x] Production deployment (Railway + Vercel)
- [ ] Streaming responses (Server-Sent Events)
- [ ] Conversation history / multi-turn chat
- [ ] Docker Compose for one-command local setup
- [ ] CI/CD pipeline with GitHub Actions

---

## 🙏 Acknowledgements

- **[Groq](https://groq.com)** — Blazing fast LPU inference
- **[Meta AI](https://ai.meta.com)** — Open-source Llama 3.3 model
- **[Spring AI](https://spring.io/projects/spring-ai)** — Provider-agnostic AI integration
- **[Pollinations.ai](https://pollinations.ai)** — Free, open image generation

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
