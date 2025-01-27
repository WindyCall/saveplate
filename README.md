# Real-Time Food Surplus Marketplace Platform (POC)

## Overview

### **Background**
Every year, one-third of all food produced globally is wasted while millions face food insecurity. Restaurants, grocery stores, and other food providers discard perfectly edible food due to business operations, inventory management, or aesthetic standards, creating both environmental and social challenges. 

### **The Problem**
Businesses in the food industry often throw away surplus food due to a lack of efficient ways to manage and redistribute it. On the other hand, many consumers are eager to purchase discounted food but have limited access to real-time availability and location-specific information. Current solutions lack real-time updates and a centralized platform to address this gap effectively.

### **The Solution**
This Proof of Concept (POC) aims to demonstrate a **Real-Time Food Surplus Marketplace Platform**. The platform connects food providers with surplus inventory to consumers looking for affordable meals or groceries. By leveraging **real-time updates**, **location-based search**, and an easy-to-use interface, the platform aims to reduce food waste while benefiting both businesses and consumers.

### **Key Goals**
- Reduce food waste by providing businesses with an efficient way to sell surplus food.
- Enable consumers to access quality food at reduced prices.
- Demonstrate core functionality to test the feasibility of a scalable marketplace platform.
- Lay the foundation for future innovations and features such as push notifications, payment processing, and food safety tracking.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn or pnpm or bun
- PostgreSQL

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/WindyCall/saveplate.git
    cd saveplate
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3. **Set up the environment variables:**

    Copy the sample environment file and update it with your own values.

    ```bash
    cp .env.example .env
    ```

    Update the [.env](http://_vscodecontentref_/2) file with your PostgreSQL database connection string and other necessary environment variables.

4. **Set up the Prisma database:**

    Initialize the Prisma database and apply migrations.

    ```bash
    npx prisma migrate dev --name init
    ```

5. **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

6. **Open your browser:**

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Additional Information

- **Prisma Studio:** You can use Prisma Studio to view and manage your database.

    ```bash
    npx prisma studio
    ```

- **Database Management:** Ensure your PostgreSQL server is running and accessible. You can use tools like pgAdmin or psql to manage your database.

- **Environment Variables:** Ensure all required environment variables are set in the [.env](http://_vscodecontentref_/3) file for the application to run correctly.

---

## Current Key Features


The Real-Time Food Surplus Marketplace Platform (POC) includes the following core features:

1. **User Authentication:**
   - Users can log in securely using their Gmail account, simplifying the registration process and ensuring data security.

2. **Food Posting:**
   - Food providers can post surplus food items they want to sell, including relevant details such as food name, description, and price.

3. **Stock Management:**
   - Food providers can update their food stock dynamically, ensuring accurate and real-time availability for consumers.

4. **Food Ordering:**
   - Consumers can browse available food items and place orders directly through the platform.

5. **Order History:**
   - Users can view their past orders, making it easy to track previous purchases or sales.

6. **Search Functionality:**
   - A search bar allows users to find specific food items based on keywords, enhancing the user experience.


These fundamental features ensure the platform demonstrates its viability and potential to address food waste effectively, while laying the groundwork for future innovations.


---

## Notable Decisions and Trade-Offs

**Unified User Roles:**
   - The platform does not differentiate between providers and consumers. Every user can perform both roles:
     - A restaurant or food provider can also order food from others.
     - Regular consumers can post their surplus food for others to purchase.
   - **Reasoning:** This approach encourages broader participation, maximizes the potential to reduce food waste, and promotes a community-driven marketplace where everyone can contribute to the solution.


---

## Future Plans and Milestones

The platform has significant potential for growth and expansion. Below are the planned enhancements and milestones for future development:

1. **Enhanced User Experience:**
   - **Mobile Application:** Develop a dedicated mobile app for seamless access and improved user convenience.
   - **Advanced Search Filters:** Implement filters such as dietary preferences, expiration dates, or specific food categories.

2. **Food Safety and Delivery Tracking:**
   - Introduce a **food safety tracking system** to ensure the quality and safety of all deliveries, including proper handling and temperature tracking.
   - Extend the system to monitor food safety for walk-in customers who claim surplus food directly.

3. **Bidding System:**
   - Develop a **bidding system** where consumers can bid for surplus food, allowing for competitive pricing.
   - This feature would encourage better food quality and promote efficient utilization of surplus food.

4. **Community Engagement:**
   - Build a **community system** that allows users within the same locality or community to communicate and collaborate through the platform.
   - Enable chat features for discussions, feedback sharing, or organizing group orders.

5. **Additional Features:**
   - **Push Notifications:** Notify users of new surplus food postings or limited-time discounts.
   - **Payment Integration:** Support secure and seamless online payment systems for food purchases.
   - **Gamification:** Introduce eco-friendly incentives, such as badges or rewards, for users who actively contribute to reducing food waste.

6. **Scalability and Expansion:**
   - Expand platform support to cover multiple locations or regions, enabling broader participation.
   - Optimize the platform’s performance to handle real-time inventory updates at scale.

These milestones aim to transform the POC into a robust, scalable platform that maximizes its social and environmental impact.

---
## Project Video Demo
[link to the video demo](https://drive.google.com/file/d/1eoKyVz0aTcqWZS_mXGaaU5CJhTXdMcRc/view?usp=sharing)