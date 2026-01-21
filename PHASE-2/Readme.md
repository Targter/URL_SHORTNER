# 📌 URL Shortener — Phase 2

## Overview

**Phase 2** focuses on **scaling and performance** using Redis caching. The goal is to understand how caching prevents database bottlenecks under high traffic.

Phase 1 was about **correctness**. Phase 2 is about **reliability at scale**.

---

## ✅ What is implemented in Phase 2

- Redis caching layer
- Cache-first redirect flow
- Reduced database dependency
- Better performance under load
- Understanding Redis vs ioredis
- Docker setup for Redis

---

## 🔴 Redis Implementation

### Why Redis?

**Common misconception:**

> "Redis makes everything faster"

**Actual reason:**

> "Redis prevents my database from dying under traffic"

### Without Redis (at scale)

```
10k users/sec
    ↓
Backend
    ↓
Database (read + write every time)
```

**Result:**

- DB CPU spikes
- DB connection pool exhausted
- Requests slow down
- App crashes
- Latency gets WORSE, not better

### With Redis

```
10k users/sec
    ↓
Backend
    ↓
Redis (in-memory)
    ↓ (only on cache miss)
Database
```

**Result:**

- DB reads drop by 90%+
- DB stays stable
- Latency stays consistent
- App survives traffic spikes

---

## 📦 Redis Setup

### Installation using Docker

```bash
# Run Redis Stack (includes Redis + RedisInsight GUI)
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

# Check if running
docker ps

# Access Redis CLI
docker exec -it <containerId> bash
redis-cli ping
# Response: PONG

# Start Redis CLI
redis-cli
```

**Ports:**

- `6379` → Redis CLI (default)
- `8001` → RedisInsight GUI (visualization tool)

**Note:** RedisInsight is useful for development but not used in production.

---

## 🆚 Redis vs ioredis

### Comparison

| Feature             | redis | ioredis |
| ------------------- | ----- | ------- |
| Official            | ✅    | ❌      |
| Promise-based       | ✅    | ✅      |
| Simple API          | ✅    | ⚠️      |
| Redis Stack support | ✅    | ✅      |
| Cluster/Sentinel    | ⚠️    | ✅      |
| Pub/Sub heavy       | ⚠️    | ✅      |
| Beginner friendly   | ✅    | ❌      |

**For Phase 2:** Using `redis` (official client) for simplicity.

**For production clusters:** `ioredis` is better for advanced features.

---

## 🔄 New Flow with Redis

### Redirect Flow

**Before (Phase 1):**

```
User → Backend → Database → Response
```

**After (Phase 2):**

```
User → Backend → Redis (check cache)
                    ↓
            Cache Hit → Response
                    ↓
            Cache Miss → Database → Update Cache → Response
```

### Benefits

- Database reads reduced by 90%+
- Faster response times
- System handles traffic spikes
- Database load stays predictable

---

## 📘 Key Learnings from Phase 2

- Why Redis prevents database overload
- Difference between speed and reliability
- Cache-first architecture pattern
- Redis is not magic, it's strategic
- Why redirect time "feels the same" (network/TLS/target site dominate)
- Docker basics for Redis
- Choosing between redis and ioredis

---

## ⚠️ What Redis DOESN'T solve

- **Network latency** → Redis can't change physics
- **Redirect overhead** → Extra hop still exists
- **Target website load time** → Outside our control
- **User perception** → End-to-end time dominated by external factors

**What Redis DOES solve:**

- Database bottlenecks
- System reliability
- Predictable latency
- Scalability under traffic

---

## 🚀 Next Phase (Phase 3 Goals)

In Phase 3, focus will be on **horizontal scaling**:

- Load balancing
- Multiple application instances
- Distributed system concepts
- Handling millions of requests
- Session management across instances

---

## ✅ Phase Summary

Phase 2 successfully implements **Redis caching** and establishes a scalable foundation. The system can now handle high traffic without overwhelming the database. Next phase will focus on **horizontal scaling and distributed systems**.

---

**Ready for Phase 3?** Horizontal scaling next 🚀
