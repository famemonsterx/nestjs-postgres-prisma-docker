# docker/dev.Dockerfile
FROM node:latest

WORKDIR /app/nest-app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY .. .

RUN npx prisma generate
# for deploting the build version

# RUN bun next build
# and
# CMD bun next start

# OR for sart Next.js in development, comment above two lines and uncomment below line

CMD npm run start:dev

# Note: Don't expose ports here, Compose will handle that for us