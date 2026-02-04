# Read Replicas Setup Guide

## 📖 What Are Read Replicas?

**Read replicas** are copies of your database that handle **READ operations only**.

```
Application
 ├─ Writes → Primary DB
 └─ Reads  → Replica DB(s)
```

**Benefits:**

- Reduces load on primary database
- Improves read performance
- Increases availability

---

## 🟢 MongoDB Read Replicas

### Prerequisites

- MongoDB Atlas account (recommended)
- Existing cluster

### Setup Steps

#### 1. Enable Replica Set (MongoDB Atlas)

```bash
1. Go to MongoDB Atlas Dashboard
2. Select your Cluster
3. Click "Configuration"
4. Set Replication Factor = 3
   - 1 Primary node
   - 2 Secondary nodes (read replicas)
5. Click "Apply Changes"
```

#### 2. Configure Application

```javascript
// Update connection string
mongoose.connect(process.env.MONGO_URI, {
  readPreference: "secondaryPreferred",
});
```

**Read Preference Options:**

- `primary` - Read from primary only
- `primaryPreferred` - Primary first, then replica
- `secondary` - Read from replica only
- `secondaryPreferred` - Replica first, then primary ✅ **Recommended**
- `nearest` - Lowest latency node

#### 3. Done ✅

MongoDB driver **automatically routes** reads to replicas.

---

## 🟡 PostgreSQL Read Replicas

### Prerequisites

- AWS RDS PostgreSQL instance
- Or cloud provider with replica support

### Setup Steps

#### 1. Create Read Replica (AWS RDS)

```bash
1. Go to AWS RDS Console
2. Select your primary database
3. Click Actions → "Create read replica"
4. Configure:
   - DB instance identifier: my-db-replica
   - Instance class: (same or smaller)
   - Region: (same for low latency)
5. Click "Create read replica"
```

#### 2. Get Connection URLs

```bash
Primary:  your-db.xxxxx.us-east-1.rds.amazonaws.com
Replica:  your-db-replica.xxxxx.us-east-1.rds.amazonaws.com
```

#### 3. Configure Application

```javascript
const { Pool } = require("pg");

// Two separate connection pools
const primaryDb = new Pool({
  connectionString: process.env.PRIMARY_DB_URL,
});

const replicaDb = new Pool({
  connectionString: process.env.REPLICA_DB_URL,
});

// Export both
module.exports = { primaryDb, replicaDb };
```

#### 4. Route Queries Manually

```javascript
// WRITES → Primary
async function createUrl(code, longUrl) {
  await primaryDb.query("INSERT INTO urls (code, long_url) VALUES ($1, $2)", [
    code,
    longUrl,
  ]);
}

// READS → Replica
async function getUrl(code) {
  const result = await replicaDb.query("SELECT * FROM urls WHERE code = $1", [
    code,
  ]);
  return result.rows[0];
}
```

#### 5. Done ✅

You **manually control** read/write routing.

---

## 🆚 MongoDB vs PostgreSQL

| Feature           | MongoDB         | PostgreSQL        |
| ----------------- | --------------- | ----------------- |
| Setup Complexity  | ⭐ Very Easy    | ⭐⭐ Medium       |
| Auto Read Routing | ✅ Yes          | ❌ No (manual)    |
| Code Changes      | Minimal         | Moderate          |
| Replication Lag   | Eventual        | Configurable      |
| Best For          | Read-heavy apps | Transaction-heavy |

---

## 🎯 Recommendation

### For URL Shortener:

**Choose MongoDB** ✅

**Why:**

- Read-heavy workload (redirects)
- Automatic routing (less code)
- Faster to implement
- Simpler to maintain

---

## ⚠️ Important Notes

### What Read Replicas ARE:

- ✅ Scale READ operations
- ✅ Improve query performance
- ✅ Provide redundancy

### What Read Replicas ARE NOT:

- ❌ Scale WRITE operations
- ❌ Instantly consistent (replication lag exists)
- ❌ Backup solution

### Replication Lag

- Data takes time to sync (usually milliseconds)
- Read-after-write might return stale data
- **Solution:** Critical reads from primary

```javascript
// MongoDB: Force primary for critical reads
const user = await User.findById(id).read("primary");

// PostgreSQL: Use primary connection
const user = await primaryDb.query("SELECT * FROM users WHERE id = $1", [id]);
```

---

## 🧠 Interview Answer

**"How do you implement read replicas?"**

> "For MongoDB, I configure replica sets through Atlas and use `readPreference: 'secondaryPreferred'` in the connection options. The MongoDB driver automatically routes read queries to secondary nodes.
>
> For PostgreSQL, I create read replicas at the infrastructure level using AWS RDS, then explicitly route read queries to replica connections and write queries to the primary connection in the application code."

---

## 📚 Next Steps

Want to learn more about:

- [ ] Read/write splitting middleware
- [ ] Handling replication lag
- [ ] Automatic failover scenarios
- [ ] Monitoring replica health
- [ ] When NOT to use replicas

---

## 🔗 Resources

- [MongoDB Replica Sets Docs](https://docs.mongodb.com/manual/replication/)
- [AWS RDS Read Replicas](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html)
- [PostgreSQL Replication](https://www.postgresql.org/docs/current/warm-standby.html)
