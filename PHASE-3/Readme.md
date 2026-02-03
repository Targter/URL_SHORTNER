<!-- GOING TO IMPLEMENT THE HORIZONTAL AND VERTICAL SCALING IN THIS  -->

<!-- LEVEL -1 : HORIZONTAL SCALING.  -->
<!-- GOING TO ADD  MORE SERVER AND DISTRIBUTE THE LOAD THROUGH LOAD BALANCER. -->

<!-- BEST PRODUCTION LEVEL COMBINATION OF   --

<!-- ngnix also store locally.. cache locally which also send the cache file and data also improve the efficiency> -->

can handle 10000+ concurrent req
cache http request
act as reverse proxy
ast as load balancer
act as an api gateway
server and cache static file like image and videos etc.
handle ssl certificate

<!-- ALB + NGNIX -->
<!-- -where alb managing the server and ngnix managing the proxies ->
⚖️ AWS ALB

Public entry point

Distributes traffic across instances

Health checks

Auto-scaling integration

High availability (multi-AZ)

👉 ALB does NOT know your app logic

🔁 NGINX (inside the server)

Reverse proxy

Route /api vs /static

WebSocket support

Request buffering

Header manipulation

Internal rate limiting

Security headers

Blue/green routing

👉 NGINX understands your app


<!-- proxy are of two type..  -->
<!-- forward or reverse: forward proxy : is set in front of client and reverse proxy is set in front of server  -->
<!-- forward proxy : hides the client to the internet whereas the reverse proxy hides the server from the client -->
<!-- 🧑‍💻 Forward Proxy (Client-side proxy)
Who it protects: the CLIENT
Simple meaning:

A forward proxy hides the client from the internet.

Flow:
Client → Forward Proxy → Internet Server


The server never sees the real client.

📌 Example (Very common)

Company office proxy

VPN

School network proxy

What happens:

You request google.com

Proxy sends the request for you

Google sees proxy’s IP, not yours

🧠 Client is hidden

🖥️ Reverse Proxy (Server-side proxy)
Who it protects: the SERVER
Simple meaning:

A reverse proxy hides the server from clients.

Flow:
Client → Reverse Proxy → Backend Server


The client never talks directly to the backend.

📌 Example (Your case)

NGINX

AWS ALB

Cloudflare

What happens:

User requests your website

Reverse proxy receives request

Forwards to backend server

User never sees backend IP

🧠 Server is hidden

🧠 Super Simple Rule (MEMORIZE THIS)
Forward proxy → hides CLIENT
Reverse proxy → hides SERVER

🧩 One-Line Comparison
Proxy Type	Sits in front of	Hides
Forward Proxy	Client	Client
Reverse Proxy	Server	Server -->

<!-- ## 🔁 How Traffic Is Distributed

Load balancer uses algorithms like:

- Round-robin
- Least connections
- Random
- Weighted

But from your app’s perspective:

> “Requests magically arrive.”
> -->

<!-- 🧠 Common Load Balancing Algorithms (Simple)
1️⃣ Round Robin
Request 1 → Server A
Request 2 → Server B
Request 3 → Server C
Repeat...


Very simple

Assumes all servers are equal

❌ Bad if servers have different capacity

2️⃣ Least Connections
Send request to the server with
the fewest active connections


Better when requests take different time

Good for APIs, long-lived connections

3️⃣ Weighted Routing
Server A (weight 2)
Server B (weight 1)

A gets 2x traffic of B


Used when servers have different sizes

Common in canary / gradual rollout

4️⃣ Hash-based (Sticky)
hash(userIP) → same server


Keeps same user on same server

❌ Not good for stateless systems

Used for sessions (stateful apps)

❓ Who decides which algorithm is used?
🔑 Short answer

It is decided by the load balancer, not your backend code.

But you choose the configuration.

🟢 In AWS ALB (Real Production Case)
Using AWS Application Load Balancer

ALB uses round-robin–like distribution

Considers:

Healthy targets

Availability Zones

Current load (internally)

You cannot manually choose algorithms like “least connections”

👉 AWS manages this automatically.

🟡 In AWS NLB (Different LB)

Works at Layer 4 (TCP)

Uses flow hashing

Better for very high throughput

🟠 In NGINX / HAProxy (Self-managed)

Here YOU decide.

Example (NGINX):

upstream backend {
  least_conn;
  server app1;
  server app2;
}


Or:

upstream backend {
  server app1 weight=2;
  server app2 weight=1;
}


So:

Algorithm = your choice

More control

More responsibility -->

<!-- also after this i am going to decide the architecture wheather this is statels and stateful -->

<!-- all steps with aws ELB .. with ngnix
usign the linux ec2 instance load balancer

# Node.js Deployment

> Steps to deploy a Node.js app to DigitalOcean using PM2, NGINX as a reverse proxy and an SSL from LetsEncrypt

## 1. Create Free AWS Account
Create free AWS Account at https://aws.amazon.com/

## 2. Create and Lauch an EC2 instance and SSH into machine
I would be creating a t2.medium ubuntu machine for this demo.

## 3. Install Node and NPM
```
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

node --version
```

## 4. Clone your project from Github
```
git clone https://github.com/piyushgargdev-01/short-url-nodejs
```

## 5. Install dependencies and test app
```
sudo npm i pm2 -g
pm2 start index

# Other pm2 commands
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Show log stream)
pm2 flush (Clear logs)

# To make sure app starts when reboot
pm2 startup ubuntu
```

## 6. Setup Firewall
```
sudo ufw enable
sudo ufw status
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)
```

## 7. Install NGINX and configure
```
sudo apt install nginx

sudo nano /etc/nginx/sites-available/default
```
Add the following to the location part of the server block
```
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8001; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
```
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo nginx -s reload
```

## 8. Add SSL with LetsEncrypt
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```
create a seprat readme.md for this .. with the name of installation guide for production.md

 -->
