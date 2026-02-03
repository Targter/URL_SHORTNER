# Distributed URL Shortener Backend

**High-Availability Bun + Express Cluster with Nginx Load Balancing**

Production-ready, horizontally scalable backend architecture with automated load distribution across multiple application instances.

---

## 🛠 Tech Stack

| Layer             | Technology     |
| ----------------- | -------------- |
| **Runtime**       | Bun.js         |
| **Framework**     | Express.js     |
| **Load Balancer** | Nginx (Alpine) |
| **Database**      | MongoDB        |
| **Cache/Queue**   | Redis          |
| **Orchestration** | Docker Compose |

---

## 🏗 Architecture

```
Internet → Nginx (:80) → [App-1, App-2, App-3...] → MongoDB + Redis
```

**Key Features:**

- **Zero Downtime Scaling:** Add/remove instances without service interruption
- **Automatic Load Distribution:** Round-robin across healthy containers
- **Shared State:** Centralized MongoDB & Redis ensure data consistency
- **Network Isolation:** App instances accessible only via Nginx proxy

---

## 🚀 Quick Start

### Deploy with 3 instances

```bash
docker-compose up -d --build --scale app=3
```

### Scale to 5 instances (zero downtime)

```bash
docker-compose up -d --scale app=5
```

### Monitor traffic distribution

```bash
docker-compose logs -f app
```

---

## 🚦 Endpoints

| Endpoint                  | Method | Description                                  |
| ------------------------- | ------ | -------------------------------------------- |
| `http://localhost/`       | GET    | Main application entry                       |
| `http://localhost/whoami` | GET    | Returns container ID (verify load balancing) |

**Test Load Balancing:**

```bash
curl http://localhost/whoami
# Response changes on each request → confirms distribution
```

**Example Response:**

```json
{
  "instance_id": "8a3dcf22b1",
  "internal_port": 3000,
  "status": "Healthy"
}
```

---

## 🔒 Security & Optimization

✅ **Network Isolation** – App containers not exposed publicly  
✅ **Persistent Storage** – MongoDB/Redis data survives restarts  
✅ **Lightweight Images** – Alpine Linux base reduces attack surface  
✅ **Docker DNS** – Automatic service discovery for scaled instances

---

## 📦 Project Structure

```
.
├── docker-compose.yml    # Orchestration config
├── nginx.conf            # Load balancer rules
├── Dockerfile            # Bun app container
└── src/                  # Application code
```

---

## 🔄 Next Steps

- [ ] Add health checks to `docker-compose.yml`
- [ ] Implement sticky sessions for stateful operations
- [ ] Configure HTTPS with Let's Encrypt
- [ ] Set up centralized logging (ELK Stack)

---

**License:** MIT | **Author:** Abhay Bansal
