# ==========================================

# Stage 1: Dependencies

# ==========================================

FROM node:20-alpine AS deps

WORKDIR /app



# Copy package files and install exact dependencies

COPY package.json package-lock.json ./

RUN npm ci



# ==========================================

# Stage 2: Builder

# ==========================================

FROM node:20-alpine AS builder

WORKDIR /app



# Copy dependencies and source code

COPY --from=deps /app/node_modules ./node_modules

COPY . .



# Disable Next.js telemetry

ENV NEXT_TELEMETRY_DISABLED=1



# Build the Next.js application

RUN npm run build



# ==========================================

# Stage 3: Runner (Production Image)

# ==========================================

FROM node:20-alpine AS runner

WORKDIR /app



ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED=1



# Create a non-root user for security compliance

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs



# Copy only the necessary files needed to run the app

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/package.json ./package.json



# Switch to the restricted user

USER nextjs



# Expose the listening port

EXPOSE 3000

ENV PORT=3000



# Start the application

CMD ["npm", "start"]