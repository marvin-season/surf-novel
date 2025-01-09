
FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG NEXT_AUTH_SECRET
ENV NEXT_AUTH_SECRET=${NEXT_AUTH_SECRET}
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ARG POSTGRES_PRISMA_URL
ENV POSTGRES_PRISMA_URL=${POSTGRES_PRISMA_URL}


RUN echo POSTGRES_PRISMA_URL: ${POSTGRES_PRISMA_URL}

# copy all
COPY . .
# Install dependencies based on the preferred package manager
# COPY package.json pnpm-lock.yaml* ./
# COPY prisma ./prisma
# COPY .env ./.env
# RUN npm config set registry https://registry.npmmirror.com && npm i -g pnpm && pnpm run docker-setup
# Omit --production flag for TypeScript devDependencies
RUN npm config set registry https://registry.npmmirror.com \
    && npm i -g pnpm \
    && pnpm i

# COPY src ./src
# COPY locales ./locales
# COPY public ./public
# COPY next.config.ts .
# COPY tsconfig.json .



# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred package manager
RUN pnpm build

# Environment variables must be redefined at run time
ARG NEXT_AUTH_SECRET
ENV NEXT_AUTH_SECRET=${NEXT_AUTH_SECRET}
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ARG POSTGRES_PRISMA_URL
ENV POSTGRES_PRISMA_URL=${POSTGRES_PRISMA_URL}

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]