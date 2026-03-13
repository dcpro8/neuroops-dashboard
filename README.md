# 🧠 NeuroOps Dashboard

> **Real-Time Analytics Dashboard for AI-Powered Pull Request Risk Analysis**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📖 Overview

**NeuroOps Dashboard** is the frontend interface of the NeuroOps platform. It visualizes AI-generated insights about GitHub Pull Requests and provides real-time engineering intelligence.

The dashboard **automatically updates** whenever a new pull request is analyzed.

---

## 🚀 Live Demo

**Frontend Dashboard:** [https://neuroops-dashboard.vercel.app](https://neuroops-dashboard.vercel.app)

---

## ✨ Dashboard Features

### 🔍 Pull Request Intelligence Feed
Displays analyzed pull requests with:
* **AI review**
* **Risk score**
* **Repository info**
* **Author details**

### 📊 Risk Distribution
Shows breakdown of PR risk levels:
* 🟢 **Low**
* 🟡 **Moderate**
* 🔴 **High**

### 📈 Risk Trend
Visualizes average repository risk over time.

### 💡 Repository Intelligence
Identifies:
* **Most active** repositories
* **Highest risk** repositories

### 🖥️ System Intelligence
Summarizes system health based on recent PR analysis.

---

## ⚡ Real-Time Updates

The dashboard uses **Server-Sent Events (SSE)**. When the worker finishes AI analysis:

1. **Worker** notifies Gateway  
2. **Gateway** broadcasts SSE event  
3. **Frontend** automatically refreshes PR list  

> [!IMPORTANT]
> **No manual refresh required.** The UI updates instantly as analysis completes.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React, TypeScript, Vite |
| **UI** | TailwindCSS, Lucide Icons |
| **Charts** | Recharts |
| **Data** | Axios |
| **Markdown Rendering** | React Markdown |

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── PRCard.tsx
│   ├── MetricsBar.tsx
│   ├── RiskTrend.tsx
│   ├── RiskDistribution.tsx
│   └── RepoIntelligence.tsx
├── App.tsx
└── main.tsx
```

## 💻 Running Locally

1. Clone repository

```bash
git clone [https://github.com/dcpro8/neuroops-dashboard.git](https://github.com/dcpro8/neuroops-dashboard.git)
```
```bash
cd neuroops-frontend
```
2. Install dependencies

```bash
npm install
```
3. Start development server

```bash
npm run dev
```
4. Open
Navigate to [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment

1. **Frontend** is deployed on Vercel.

2. Connect GitHub repo

3. Select Vite framework

4. Add environment variable: VITE_API_URL

5. Deploy

## 👤 Author

* **Dhruv Chauhan**

## 📄 License

* This project is licensed under the **MIT License**.