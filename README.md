# Stripe Demo Frontend

A React-based e-commerce frontend application demonstrating Stripe integration for one-time payments and subscriptions.

## Features
- **Authentication**: User login and registration.
- **Product Management**: Support for one-time purchase products and recurring subscription plans.
- **Shopping Cart**: Manage items and proceed to checkout.
- **Stripe Integration**: Secure checkout sessions and customer portal for billing management.
- **Order History**: Users can view their past orders.
- **Digital Content**: Protected content access based on active subscription status.
- **Admin Dashboard**: Comprehensive admin panel to manage products, orders, and subscription plans.

## Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- A running instance of the backend API

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/votranphi/stripe-demo-frontend
   cd stripe-demo-frontend
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Copy `.env.example` to a new file named `.env` and configure your API URL:

    ```bash
    cp .env.example .env
    ```

    *Update `VITE_API_BASE_URL` if your backend is not running on localhost:3000.*

4.  **Run the application**

    ```bash
    npm run dev
    ```

## Pages

### Public & User Pages

  - **Home**: Landing page featuring service highlights and quick links.
  - **Login / Register**: Authentication pages for user access.
  - **Products**: Browsable list of all available products with filtering options.
  - **Pricing**: Display of subscription tiers with subscribe options.
  - **Cart**: Manages draft orders and initiates the checkout process.
  - **My Orders**: Lists the logged-in user's purchase history and statuses.
  - **My Subscription**: Details active subscriptions and links to the Stripe Customer Portal.
  - **Digital Content**: Exclusive page accessible only to users with an active subscription.
  - **Success / Cancel**: Feedback pages handling redirects after Stripe checkout.

### Admin Pages

  - **Dashboard**: Overview of store statistics (revenue, orders, users).
  - **Manage Products**: List, create, edit, and delete store products.
  - **Manage Orders**: View all customer orders and update their shipping status.
  - **Subscription Plans**: Configure Stripe price IDs and link them to products.

## License
This project is available under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) license.