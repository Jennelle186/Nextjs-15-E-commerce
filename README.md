# 📚 BookHaven

A modern full-stack e-commerce bookstore built with **Next.js**, **Supabase**, **Tailwind CSS**, and **shadcn/ui**. The application provides a seamless online shopping experience while allowing administrators to efficiently manage books, inventory, and customer orders.

---

# Features

### Customer Features

* Secure user authentication
* Browse and search books
* Category filtering
* Product detail pages
* Shopping cart
* Order placement
* Order history
* Responsive user interface

### Administrator Features

* Dashboard overview
* Product management (Create, Update, Delete)
* Category management
* Inventory management
* Order management
* Customer order monitoring

---

# Technology Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Radix UI

## Backend

* Supabase
* PostgreSQL
* Supabase Authentication
* Supabase Storage

---

# Architecture

```
                User
                  │
                  ▼
          Next.js Frontend
                  │
                  ▼
             Supabase API
        ┌─────────┼─────────┐
        │         │         │
        ▼         ▼         ▼
 PostgreSQL   Authentication  Storage
```

The application follows a modern full-stack architecture where Next.js handles the user interface and routing, while Supabase provides authentication, database services, and file storage.

---

# Core Features

* Authentication using Supabase Auth
* Role-based access control
* Product catalog management
* Shopping cart functionality
* Order processing workflow
* Inventory tracking
* Responsive design for desktop and mobile
* Server-side rendering using Next.js

---

# Project Structure

```
app/
components/
hooks/
lib/
public/
styles/
types/

README.md
package.json
```

---

# Getting Started

## Prerequisites

* Node.js 18+
* npm
* Supabase Project

## Installation

```bash
git clone https://github.com/yourusername/bookhaven.git

cd bookhaven

npm install
```

Create a `.env.local` file.

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Run the development server.

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

# Learning Outcomes

This project demonstrates experience in:

* Full-Stack Web Development
* Modern React Development
* Next.js App Router
* Authentication & Authorization
* PostgreSQL Database Design
* Responsive UI Development
* Component-Based Architecture
* CRUD Operations
* State Management
* RESTful Data Integration
* UI/UX Design
* Git Version Control

---

# Future Improvements

* Payment gateway integration
* Wishlist functionality
* Product reviews and ratings
* Email notifications
* Sales analytics dashboard
* Recommendation engine
* Coupon and discount system
* Multi-vendor support

---

# License

This project was developed for educational and portfolio purposes.
