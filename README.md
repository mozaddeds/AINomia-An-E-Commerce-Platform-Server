# 🛍️ AINomia — AI-Powered E-Commerce Platform

> **An intelligent full-stack e-commerce application designed to make online shopping smarter, faster, and more human-like through AI-assisted interactions.**

---

## 🚀 Overview

**AINomia** is a full-stack AI-integrated e-commerce app built with **Next.js (frontend)** and **NestJS (backend)**.  
Its goal is to enhance customer experience using modern UI/UX practices and intelligent automation — from product browsing to checkout.

The architecture was designed for **clarity**, **scalability**, and **future AI integration**, aligning with the principles of modularity, separation of concerns, and maintainability.

---

## 🧠 Core Objective

Deliver a seamless shopping experience combining traditional e-commerce functionality with **AI-powered assistance**, enabling users to:
- Get product recommendations.
- Interact with AI for product info or price-based suggestions.
- Perform guided shopping with intelligent filtering and categorization.

---

## 🏗️ Architecture & Tech Stack

### 🖥️ Frontend — [Next.js 15]
- **SSR + CSR** hybrid rendering for optimized performance.
- **State Management:** Redux Toolkit with typed hooks (`useAppSelector`, `useAppDispatch`).
- **Form Handling & Validation:** React Hook Form + Zod.
- **TailwindCSS** for clean, responsive design.
- **Dynamic Components:**
  - Auth flows (SignIn / SignUp)
  - Product Display grid
  - Sidebar with categories
  - Profile preview
  - Checkout system

### ⚙️ Backend — [NestJS 11]
- Modular monolith ready for **microservice scaling**.
- Uses **Prisma ORM** for PostgreSQL database.
- **JWT Authentication** with refresh token rotation.
- **WebSocket Chat Gateway** prepared for future real-time AI assistant.
- Clean service and controller layering (`auth`, `user`, `chat` modules).

### 🗄️ Database — [Prisma + PostgreSQL]
- Secure schema with user and refresh token management.
- Soft-delete middleware for safety.
- Utility helpers for strings, arrays, and date management.

---

## 🧩 Key Architectural Decisions

| Decision | Reason |
|-----------|---------|
| **NestJS** | Modular, opinionated, and Angular-like backend — great for scalability, microservice adoption, and organized code. |
| **NextJS** | Excellent SSR + CSR capabilities, SEO-friendly, flexible for dynamic UI rendering. |
| **Prisma** | Clean, type-safe ORM that simplifies database management and migrations. |

---

## ✨ Current Features

✅ **User Authentication** — Sign-in & Sign-up with validation & visual feedback  
✅ **User State Management** via Redux  
✅ **Cart Management System**  
✅ **Product Listing by Category**  
✅ **Dynamic Filtering & Sorting**  
✅ **Product Detail Page**  
✅ **Checkout Page**  
✅ **Guest Purchase Flow**  
✅ **Payment Integration**  

---

## 🔮 Upcoming Features (In Progress)

🧭 **Search Query Integration** — Global search bar for products  
👤 **Profile Quick-Preview Button**
  - Small pop-up showing name, email, avatar  
  - Button to “View & Edit” → navigates to profile page  

🛒 **Cart Quick-Preview Button**
  - Floating bottom-right button  
  - Scrollable preview with product thumbnails, quantity controls (+/–), delete option, and transparent overlay  

---

## 🤖 Future AI Roadmap

| Phase | Feature | Description |
|-------|----------|-------------|
| **Phase 1** | Use of free LLM API | Integrate basic product Q&A, recommendation, and budget-based package suggestion. |
| **Phase 2** | Custom AI Model | Deploy proprietary LLM fine-tuned for product categorization and conversational purchase flows. |
| **Phase 3** | Database-aware Chatbot | Let customers ask queries like _“Find me the best smartphones under $500”_ or _“Compare top-rated perfumes”_ — AI will query the DB and return ranked product bundles. |

---

## 🧱 Folder Structure (Simplified)

```

AINomia/
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── Sidebar/
│   │   │   ├── Products/
│   │   │   ├── SignIn/
│   │   │   └── SignUp/
│   │   ├── providers/
│   │   ├── slices/
│   │   └── stores/
│   ├── types/
│   └── libs/
│
└── backend/
├── src/
│   ├── auth/
│   ├── chat/
│   ├── user/
│   ├── prisma/
│   ├── common/helper/
│   └── main.ts
└── prisma/schema.prisma

````

---

## 🧰 Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/AINomia.git
cd AINomia
````

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

> Runs NestJS backend at `http://localhost:8000`

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

> Runs Next.js frontend at `http://localhost:3000`

---

## 🔐 Environment Variables

### Frontend `.env.local`

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### Backend `.env`

```
DATABASE_URL="postgresql://user:password@localhost:5432/ainomia"
CLIENT_URL=http://localhost:3000
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

## 🧑‍💻 Developer Notes

* **Code Quality:** TypeScript enforced across both frontend and backend.
* **Reusable Utilities:** Helpers for string, date, and array manipulation under `/common/helper`.
* **Security:** Passwords hashed via bcrypt; JWT tokens used with rotation.
* **Scalability:** Ready for modular expansion into microservices (Chat, Recommendation, Analytics).

---

## 📈 Future Scope

* ✅ Real-time AI shopping assistant via WebSockets.
* ✅ Integration with vector DB (e.g., FAISS, Pinecone) for product embeddings.
* ✅ Fine-tuned RAG pipelines for personalized shopping insights.
* ✅ Multilingual LLM support (Bangla, English, etc.).

---

## 🧑‍💼 Author

**Mozadded Ul Islam**
Full-Stack Developer & AI Enthusiast
📧 [[pmozadded@gmail.com](pmozadded@gmail.com)]
🌐 [[Portfolio](https://mozadded-ul-islam.netlify.app/)]
🌐 [[LinkedIn](https://www.linkedin.com/in/mozaddeds/)]

---

## 📜 License

This project is licensed under the **MIT License** — free to use and modify with attribution.