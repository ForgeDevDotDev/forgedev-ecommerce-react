# ForgeDev E-commerce (React)

> Storefront + admin panel + inventory system — React + Vite + TypeScript + Zustand

**Part of [ForgeDev](https://forgedev.dev)** — Structured work simulation for junior developers.

---

## 🛒 What's This?

A React frontend for an e-commerce platform. Includes product catalog with search/filter, shopping cart, checkout flow, order confirmation, and an admin dashboard for stock management.

This is a **training codebase** — it works, but it has intentional bugs, missing features, and messy patterns for you to find and fix.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server (proxies /api to localhost:3000)
npm run dev
```

Make sure the [backend](../forgedev-ecommerce-backend) is running on port 3000.

## 📋 Features

- **Storefront** — Product grid with search and category filter
- **Product Detail** — Full product info with stock status
- **Shopping Cart** — Add/remove items, quantity controls
- **Checkout** — Shipping form + order creation
- **Order Confirmation** — Order summary after checkout
- **Admin Dashboard** — Stock overview with low-stock alerts

## 🛠 Tech Stack

- **Framework:** React 18
- **Build:** Vite
- **State:** Zustand
- **Routing:** React Router
- **HTTP:** Axios
- **Language:** TypeScript

## 📁 Project Structure

```
src/
├── api/
│   └── index.ts            # API client with all endpoints
├── assets/
│   └── main.css            # Global styles
├── components/
│   ├── ProductCard.tsx     # Product card for grid
│   ├── CartItem.tsx        # Cart line item
│   ├── CheckoutForm.tsx    # Checkout shipping + payment form
│   ├── SearchBar.tsx       # Product search
│   ├── FilterSidebar.tsx   # Category filter
│   └── StockDashboard.tsx  # Admin inventory table
├── pages/
│   ├── StorefrontPage.tsx         # Main product grid
│   ├── ProductDetailPage.tsx      # Single product page
│   ├── CartPage.tsx               # Shopping cart page
│   ├── CheckoutPage.tsx           # Checkout flow
│   ├── OrderConfirmationPage.tsx  # Order success page
│   └── AdminDashboardPage.tsx     # Admin stock dashboard
├── stores/
│   ├── products.ts        # Product catalog state
│   ├── cart.ts            # Shopping cart state
│   └── orders.ts          # Order state
├── App.tsx                # Root component with navbar + routes
└── main.tsx               # App entry point
```

## ⚠️ Known Issues (Intentional)

- **Cart total floating point bug** — `19.99 * 3` gives `59.96999999999999` instead of `59.97`
- **Direct data fetch** — StockDashboard fetches inventory directly instead of using a store
- **Missing key prop** — StorefrontPage maps products without passing `key` to ProductCard
- **Broken pagination** — Page state is not reset when filter/category changes
- **TODO: Image optimization** — Images loaded at full resolution, no lazy loading
- **Inconsistent error handling** — Some stores use `console.error`, others set error state
- **TODO: Payment gateway** — Checkout only supports cash on delivery
- **Inline styles** — ProductDetailPage and OrderConfirmationPage use inline styles

## 🔗 Related Repositories

| Repo | Role |
|------|------|
| forgedev-ecommerce-backend | Backend API |
| forgedev-ecommerce-vue | Vue frontend (alternative) |

---

## 📜 License

This project is dual-licensed. See [LICENSE](./LICENSE), [COMMERCIAL-LICENSE.md](./COMMERCIAL-LICENSE.md), and [CLA.md](./CLA.md).

**ForgeDev** — https://forgedev.dev
