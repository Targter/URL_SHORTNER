# Read Replicas Implementation Guide

## Overview

Read replicas are database copies that handle read operations, allowing the primary database to focus on writes. This improves performance and availability in read-heavy applications.

```
Application → Writes → Primary Database
           → Reads  → Read Replica(s)
```

---

## MongoDB Implementation

### Setup (MongoDB Atlas)

1. Navigate to cluster configuration
2. Set replication factor to 3 (1 primary + 2 secondaries)
3. Apply changes

### Application Configuration

```javascript
mongoose.connect(process.env.MONGO_URI, {
  readPreference: "secondaryPreferred",
});
```

**Result:** MongoDB driver automatically routes read queries to replicas.

---

## PostgreSQL Implementation

### Setup (AWS RDS)

1. Select primary database instance
2. Create read replica via Actions menu
3. Configure instance specifications and region
4. Note both connection endpoints

### Application Configuration

```javascript
const { Pool } = require("pg");

const primary = new Pool({ connectionString: process.env.PRIMARY_DB_URL });
const replica = new Pool({ connectionString: process.env.REPLICA_DB_URL });

// Writes
await primary.query("INSERT INTO urls (code, url) VALUES ($1, $2)", [
  code,
  url,
]);

// Reads
await replica.query("SELECT * FROM urls WHERE code = $1", [code]);
```

**Result:** Manual control over read/write routing.

---

## Comparison

| Aspect          | MongoDB            | PostgreSQL     |
| --------------- | ------------------ | -------------- |
| Setup           | Simple (Atlas GUI) | Moderate (RDS) |
| Routing         | Automatic          | Manual         |
| Code Complexity | Low                | Medium         |
| Consistency     | Eventual           | Configurable   |

---

## Key Considerations

### Appropriate Use Cases

- High read-to-write ratios
- Geographic distribution of users
- Performance optimization for read operations

### Limitations

- Does not scale write operations
- Introduces replication lag (typically milliseconds)
- Not a substitute for backup strategies

### Handling Replication Lag

```javascript
// MongoDB: Force primary read when consistency required
const data = await Model.findById(id).read("primary");

// PostgreSQL: Use primary connection
const data = await primary.query("SELECT * FROM table WHERE id = $1", [id]);
```

---

## Production Considerations

**Monitoring:**

- Replication lag metrics
- Replica health status
- Query distribution patterns

**Failover:**

- MongoDB: Automatic with replica sets
- PostgreSQL: Configure with Multi-AZ deployment

**Scaling:**

- Add replicas based on read load
- Consider geographic distribution for global applications

---

## Interview Talking Points

_"For read-heavy applications, I implement read replicas to distribute query load. With MongoDB, I leverage built-in replica sets and configure read preferences at the driver level. For PostgreSQL, I create infrastructure-level replicas and implement explicit read/write routing in the application layer. Both approaches require careful consideration of replication lag and consistency requirements."_

---

## References

- [MongoDB Replica Sets Documentation](https://docs.mongodb.com/manual/replication/)
- [AWS RDS Read Replicas](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html)
- [PostgreSQL Replication](https://www.postgresql.org/docs/current/warm-standby.html)
