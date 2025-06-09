# URL Shortener

A scalable and performant URL shortener built using Node.js, Redis, and PostgreSQL. Includes frontends built in both React and Angular. Supports caching, efficient process pooling, and clean UI for shortening and resolving URLs.

---

## 🔗 Features

- ✂️ Shorten long URLs to unique, compact codes  
- 🚀 Fast performance using:
  - **Node.js** with **process pooling** (`cluster` module)
  - **Redis** for caching frequent URLs
  - **PostgreSQL** for persistent storage  
- 🌐 Frontend in both **React** and **Angular**
- 🧠 Intelligent caching layer to reduce database load  
- 🔄 Auto-redirect based on short URL input

---

## 🔧 Setup Instructions

### Backend

1. Clone the project and go to the backend folder:
   ```bash
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener/backend
   npm install
``

2. **Edit the database and Redis config manually** inside the appropriate config or source files:

   * PostgreSQL connection string 
   * Redis host/port 

3. Start the server with multi-core processing enabled:

   ```bash
   node cluster.js
   ```

---

### Frontend (React)

```bash
cd ../frontend-react
npm install
npm start
```

---

### Frontend (Angular)

```bash
cd ../frontend-angular
npm install
ng serve
```

---

## 🛠 Tech Stack

* **Node.js + Express** – Core API server
* **PostgreSQL** – Stores original + shortened URLs
* **Redis** – Caching layer for fast redirects
* **Cluster Module** – Utilizes all CPU cores
* **React** – Frontend version 1
* **Angular** – Frontend version 2


