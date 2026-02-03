# FROM oven/api:latest-alpine
FROM oven/bun:latest

# 2. Set the working directory FIRST
# All subsequent commands (COPY, RUN, etc.) happen inside this folder
WORKDIR /app

# 3. Copy dependency files
COPY package.json ./

# 4. Install dependencies
RUN bun install --production

# 5. Copy the rest of the application
COPY . .

# 6. Expose the port
EXPOSE 3000

# 7. Start the app
CMD [ "bun", "src/index.ts" ]