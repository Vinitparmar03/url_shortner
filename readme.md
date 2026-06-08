
# Project Title

A brief description of what this project does and who it's for

# 🔗 URL Shortener - MERN Stack Application

A full-stack URL Shortener built using the MERN Stack that allows users to generate short URLs, track analytics, and manage redirections efficiently.

---

## 🚀 Features

### URL Management
- Generate short URLs instantly
- Redirect users to original URLs
- Unique short code generation
- Fast redirection handling

### Analytics Dashboard
Track detailed information about every shortened URL:

- Total Clicks
- Visitor Country
- Browser Information
- Device Information
- Referrer Source
- Operating System
- Click History
- Traffic Insights

### Persistent Data Storage
- MongoDB database persistence
- Data remains safe even if containers are removed
- Docker volumes used for persistent storage

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### DevOps
- Docker
- Docker Compose
- Docker Hub Registry

---

## 📂 Project Structure

```bash
url_shortener/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── src/
│   └── Dockerfile
│
├── docker-compose.yml
│
└── README.md
```

---

# ⚡ Running the Project

There are **3 ways** to run this project.

---

# Method 1: Run Using Docker Compose (Recommended)

This is the easiest way.

### Step 1: Clone Repository

```bash
git clone https://github.com/Vinitparmar03/url_shortner.git

cd url_shortner
```

### Step 2: Start All Services

```bash
docker compose up -d
```

Docker Compose will automatically:

- Create a custom Docker network
- Pull frontend image
- Pull backend image
- Pull MongoDB image
- Create MongoDB volume
- Start MongoDB container
- Start Backend container
- Start Frontend container

### Verify Running Containers

```bash
docker ps
```

### Access Application

Frontend:

```bash
http://localhost
```

Backend API:

```bash
http://localhost:8080
```

---

## Data Persistence

MongoDB data is stored inside a Docker Volume.

Even if containers are deleted:

```bash
docker compose down
```

Data remains safe.

To remove data completely:

```bash
docker compose down -v
```

---

# Method 2: Pull Images Directly From Docker Hub

If you don't want to clone the source code, use the prebuilt images.

---

## Pull Images

### Backend

```bash
docker pull vinitparmar03/url_shortner_backend:latest
```

### Frontend

```bash
docker pull vinitparmar03/url_shortner_frontend:latest
```

### MongoDB

```bash
docker pull mongo:7
```

---

## Create Network

```bash
docker network create url-shortener-network
```

---

## Create MongoDB Volume

```bash
docker volume create mongo-data
```

---

## Run MongoDB

```bash
docker run -d --name mongodb --network url-shortener-network -v mongo-data:/data/db mongo:7
```

---

## Run Backend

```bash
docker run -d --name backend --network url-shortener-network -p 8080:8080 urlshortener vinitparmar03/url_shortner_backend:latest
```

---

## Run Frontend

```bash
docker run -d --name frontend --network url-shortener-network -p 80:80 vinitparmar03/url_shortner_frontend:latest
```

---

## Access Application

Frontend:

```bash
http://localhost
```

Backend:

```bash
http://localhost:8080
```

---

# Method 3: Run Manually Without Docker

---

## Prerequisites

Install:

- Node.js
- npm
- MongoDB Community Server

---

## Clone Repository

```bash
git clone https://github.com/Vinitparmar03/url_shortner.git

cd url_shortner
```

---

## Start MongoDB

Ensure MongoDB is running locally.

Default URI:

```bash
mongodb://localhost:27017/urlshortener
```

---

## Configure Backend

Inside backend `.env`

```env
PORT=8080

MONGO_URI=mongodb://localhost:27017/urlshortener
```

---

## Run Backend

```bash
cd backend

npm install

npm run dev
```

---

## Run Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Access Application

Frontend:

```bash
http://localhost:5173
```

Backend:

```bash
http://localhost:8080
```

---

# 🐳 Building Docker Images Locally

---

## Build Backend Image

```bash
cd backend

docker build -t url_shortner_backend .
```

---

## Build Frontend Image

```bash
cd frontend

docker build -t url_shortner_frontend .
```

---

# 📸 Application Screenshots

## Home Page

_Add screenshot here_

```md
![Home Page](images/home.png)
```

---

## URL Generated

_Add screenshot here_

```md
![Generated URL](images/generated-url.png)
```

---

## Analytics Dashboard

_Add screenshot here_

```md
![Analytics Dashboard](images/dashboard.png)
```

# 🎯 Use Cases

- Social Media Sharing
- Marketing Campaign Tracking
- QR Code Redirections
- Affiliate Links
- Analytics Monitoring
- URL Management

---

# 🔐 Security Features

- Input Validation
- Error Handling
- MongoDB Schema Validation
- Safe URL Redirection
- Environment Variable Configuration

---

# 📈 Future Improvements

- User Authentication
- Custom Short URLs
- Expiration Dates
- QR Code Generation
- Export Analytics
- Admin Dashboard
- Rate Limiting
- API Keys

---

# 👨‍💻 Author

**Vinit Kumar Parmar**

📧 Email: vinitparmar03
💼 LinkedIn: https://www.linkedin.com/in/vinit-kumar-parmar-22522a215/

🐙 GitHub: https://github.com/Vinitparmar03

---

# ⭐ Support

If you found this project useful, please consider giving it a star on GitHub.

```bash
⭐ Star the repository
```

It helps others discover the project and motivates further development.

---

## License

MIT License

Copyright (c) 2026 Vinit Parmar