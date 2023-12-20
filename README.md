# TaraTech Healthcare

### About

---

A backend service for improving the efficiency of healthcare facilities by implementing a digital patient queue system. The goal is to create a service that manages patient queues in hospitals and clinics, streamlining the check-in, waiting, and treatment processes. The system should be scalable, reliable, and provide a seamless experience for both patients and healthcare providers.

### Tech Stack

---

![NodeJS](https://skillicons.dev/icons?i=nodejs) v 20.10.0

![TypeScript](https://skillicons.dev/icons?i=ts) v 5.3.3

![ExpressJS](https://skillicons.dev/icons?i=expressjs) v 4.18.2

![Prisma](https://skillicons.dev/icons?i=prisma) v 5.7.0

<img src="https://cdn.icon-icons.com/icons2/2389/PNG/512/socket_io_logo_icon_144874.png" width = 48 alt="Socket.io"/> v 4.7.2

### Installation

1. Pull this repository

2. Create .env file and set DATABASE_URL, JWT_KEY, SALT (bcrypt salt)

3. Using NPM

- Installing

```cmd
npm install
```

or

```cmd
yarn install
```

- Run

```cmd
npm run dev
```

4. Using Docker

- Build

```cmd
docker build -t healtchare .
```

- Run

```cmd
docker-compose up -d
```

API Documentation: https://documenter.getpostman.com/view/26585922/2s9Ykq6L1Y
