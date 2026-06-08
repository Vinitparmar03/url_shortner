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

Before running docker compose up --build, update the VITE_API_URL value in the frontend service according to your backend URL.

```bash
docker compose up -d --build
```

Docker Compose will automatically:

- Create a custom Docker network
- Build frontend image
- Build backend image
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

# Method 2: Build each Images Directly with Docker build

---

## Create MongoDB Volume

```bash
docker volume create mongo-data
```

---


## Create Network

```
docker network create my-net
```

## Build Images


### MongoDB

```bash
docker run --network my-net -d -v mongo-data:/data/db -name mongodb mongo:7
```

### Backend


```bash
docker build -t url_shortner_backend ./backend/
```

```bash
docker run --rm -p 8080:8080 --name backend --network my-net url_shortner_backend
```

### Frontend

```bash
docker build --build-arg VITE_API_URL=your_backend_url_with_port -t url_shortner_frontend ./frontend/
```

```bash
docker run --rm -p 80:80 --name frontend --network my-net url_shortner_frontend
```


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



# 📸 Application Screenshots

## Home Page

_Add screenshot here_

```md
![Home Page](https://i.ibb.co/gL9zDp1T/Screenshot-From-2026-06-08-22-54-20.png)
```

## Analytics Dashboard

_Add screenshot here_

```md
![Analytics Dashboard](https://i.ibb.co/4wQQ8scM/Screenshot-From-2026-06-08-22-53-55.png)
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
