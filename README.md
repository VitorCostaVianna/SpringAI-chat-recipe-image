# 🤖 AI Studio — Chat, Recipe & Image Generator

A full-stack AI-powered web application built with **Spring Boot + Spring AI** on the backend and **React + Vite** on the frontend. The project demonstrates real-world integration of large language models (LLMs) via a production-ready REST API.

---

## 🔄 Migration: OpenAI → Llama 3.3 via Groq

This project was originally built using the **OpenAI API** (GPT models). It was later migrated to use **Meta's Llama 3.3 70B** model served via **Groq's inference API**, which is:

- ✅ **Free** for personal and portfolio use
- ✅ **OpenAI-compatible** — minimal code changes required thanks to Spring AI's abstraction layer
- ✅ **Faster** — Groq's LPU inference hardware delivers extremely low latency

The audio transcription feature uses **Groq's Whisper API** (also OpenAI-compatible), replacing the original OpenAI Whisper integration.

---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 **AI Chat** | Real-time Q&A powered by Llama 3.3-70B via Groq |
| 🍽️ **Recipe Generator** | Creates personalized recipes from ingredients, cuisine type, and dietary restrictions |
| 🖼️ **Image Generator** | Generates AI images from text prompts via Pollinations.ai (free, no API key needed) |
| 🎤 **Audio Transcription** | Converts voice recordings to text using Groq's Whisper model |

---

## 🛠️ Tech Stack

**Backend**
- Java 21 + Spring Boot 3.4
- Spring AI 1.0 (OpenAI-compatible adapter)
- Groq Cloud (Llama 3.3 70B + Whisper)
- Maven

**Frontend**
- React 18 + Vite
- TypeScript
- Axios
- Framer Motion

---

## 🚀 Getting Started

### Prerequisites
- Java 21+
- Node.js 18+
- Maven 3.8+
- A free [Groq API key](https://console.groq.com)

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/VitorCostaVianna/SpringAI-chat-recipe-image.git
cd SpringAI-chat-recipe-image/spring-ai-vitor
```

2. Set your Groq API key as an environment variable:
```bash
# Windows PowerShell
$env:GROQ_API_KEY = "your-groq-api-key-here"

# macOS/Linux
export GROQ_API_KEY="your-groq-api-key-here"
```

3. Run the backend:
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`.

### Frontend Setup

```bash
cd frontend/api-client
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GROQ_API_KEY` | Your Groq Cloud API key — get one free at [console.groq.com](https://console.groq.com) | ✅ Yes |

> ⚠️ **Never commit your API key.** The `application.yml` uses `${GROQ_API_KEY}` — always set it via environment variable or a local `.env` file (already in `.gitignore`).

---

## 📡 API Reference

Base URL: `http://localhost:8080/ai`

#### 💬 Chat — Simple
```http
GET /ai/ask-ai?prompt={prompt}
```
| Parameter | Type | Description |
|---|---|---|
| `prompt` | `string` | **Required**. Your question or message |

#### 💬 Chat — With Options (returns model metadata)
```http
GET /ai/ask-ai-options?prompt={prompt}
```

#### 🍽️ Recipe Generator
```http
GET /ai/recipe-creator
```
| Parameter | Type | Description |
|---|---|---|
| `ingredients` | `string` | **Required**. Comma-separated list (e.g. `chicken,garlic,lemon`) |
| `cuisine` | `string` | Cuisine type (default: `any`) |
| `dietaryRestrictions` | `string` | E.g. `vegan`, `gluten-free` (default: `none`) |

#### 🖼️ Image Generator
```http
GET /ai/generate-image
```
| Parameter | Type | Description |
|---|---|---|
| `prompt` | `string` | **Required**. Text description of the image |
| `quality` | `string` | Image quality (default: `hd`) |
| `n` | `integer` | Number of images (default: `1`) |
| `height` | `integer` | Height in pixels (default: `1024`) |
| `width` | `integer` | Width in pixels (default: `1024`) |

#### 🎤 Audio Transcription
```http
POST /ai/transcribe
Content-Type: multipart/form-data
```
| Parameter | Type | Description |
|---|---|---|
| `file` | `file` | **Required**. Audio file (`.mp3`, `.wav`, etc.) |

---

## 🏗️ Project Structure

```
ProjetoOpenAi/
├── spring-ai-vitor/          # Backend (Spring Boot)
│   └── spring-ai-vitor/
│       └── src/main/
│           ├── java/com/vitor/
│           │   ├── controller/   # REST endpoints
│           │   ├── service/      # Business logic + AI calls
│           │   ├── dto/          # Data Transfer Objects (Java Records)
│           │   ├── exception/    # Global exception handler
│           │   └── config/       # CORS configuration
│           └── resources/
│               └── application.yml
└── frontend/
    └── api-client/           # Frontend (React + Vite)
        └── src/
            ├── pages/        # Chat, Recipe, Image, Transcription pages
            ├── components/   # Sidebar, Layout
            └── services/     # Axios API client
```

---

## 🗺️ Roadmap

- [x] AI Chat interface
- [x] Recipe generator with prompt templates
- [x] Image generation (Pollinations.ai)
- [x] Audio transcription (Groq Whisper)
- [x] Migration from OpenAI to Llama 3.3 via Groq
- [ ] Multi-turn chat with conversation history
- [ ] Docker Compose setup for one-command deployment
- [ ] User authentication (Spring Security + JWT)
- [ ] Streaming responses (Server-Sent Events)

---

## 🙏 Acknowledgements

- **[Groq](https://groq.com)** — Ultra-fast LPU inference for Llama 3.3 and Whisper
- **[Meta AI](https://ai.meta.com)** — For the open-source Llama 3.3 model
- **[Spring AI](https://spring.io/projects/spring-ai)** — For the seamless AI integration layer
- **[Spring Boot](https://spring.io/projects/spring-boot)** — Robust, production-ready backend framework
- **[React](https://react.dev)** — Interactive and responsive frontend
- **[Pollinations.ai](https://pollinations.ai)** — Free, open-source image generation API

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
