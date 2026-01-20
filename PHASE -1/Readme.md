# 📌 URL Shortener — Phase 1

## Overview

This project is a **URL Shortener system** built step by step in phases. **Phase 1** focuses on building the **core foundation** of the system and understanding how URL shorteners work internally.

The goal of this phase is:

- Make the system work correctly
- Understand different approaches
- Learn problems like collisions and indexing
- Not focus on scaling yet

Advanced topics like caching, distributed systems, and high traffic handling will be implemented in later phases.

---

## ✅ What is implemented in Phase 1

- Create short URLs
- Redirect short URL → original URL
- Basic analytics (click count)
- MongoDB schema design
- Indexing and unique constraints
- Collision handling
- Multiple URL generation strategies

---

## 🔁 Phase 1 – Levels Implemented

### 🟢 Level 1 — Basic Implementation

**Goal:** Make the system work.

- Random short code generation
- Store long URL and short URL in database
- Redirect using short URL

**Problems observed:**

- Collisions possible
- No guarantee of uniqueness
- Not reliable for large data

---

### 🟡 Level 2 — Encoded Approach

**Goal:** Understand encoding logic.

- Used MongoDB `_id` as input
- Converted `_id` to number
- Applied Base62 encoding
- Learned BigInt usage and safe integer limits

**Learnings:**

- Base62 encoding reduces length
- JavaScript Number has precision limits
- BigInt is required for large identifiers
- Encoding alone does not solve scalability

---

### 🔵 Level 3 — Collision-Safe Implementation

**Goal:** Improve reliability.

- Random short code generation with retry
- Database check before saving
- Unique index on short URL
- Database acts as final safety layer

**Result:**

- No duplicate short URLs
- System is reliable at small scale
- Still not optimized for high traffic

---

## 🗄️ Database Design

```
longUrl  → original URL
shortUrl → generated short code
clicks   → redirect count
```

### Indexing

- `shortUrl` has **unique index**
- `longUrl` has **normal index**

**Why indexes are used:**

- Faster search
- Efficient redirection
- Prevent duplicate short URLs

---

## ⚠️ Problems intentionally not solved in Phase 1

These are **planned for next phases**:

- Single point of failure
- No caching (Redis)
- Database hit on every redirect
- No rate limiting
- No high traffic handling
- No distributed system
- No queue-based analytics
- No performance optimization

Phase 1 is about **correctness**, not scale.

---

## 📘 Key Learnings from Phase 1

- How URL shorteners work internally
- Why collisions happen
- Why randomness alone is not enough
- Importance of database indexes
- Difference between correctness and scalability
- Why database must enforce uniqueness
- Basics of Base62 encoding
- Understanding JavaScript Number vs BigInt
- Architecture matters more than language

---

## 🚀 Next Phase (Phase 2 Goals)

In Phase 2, the focus will be on **scaling and performance**:

- Redis caching for redirects
- Reduce database dependency
- Faster redirect flow
- Improve performance under load
- Better analytics design
- Prepare system for high traffic

---

## ✅ Phase Summary

Phase 1 successfully builds the **core working URL shortener** and establishes a strong foundation. Further phases will focus on making the system **fast, scalable, and production-ready**.

---

**Ready for Phase 2?** Just say **"phase 2 next"** 🚀
