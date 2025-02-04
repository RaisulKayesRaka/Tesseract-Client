# Tesseract

Tesseract is a platform designed to help users discover, share, and review the latest tech products, including web apps, AI tools, software, games, and mobile apps. It provides a seamless experience for users to explore trending products, post reviews, and upvote or downvote products. Additionally, it includes role-based functionality for moderators and admins to ensure the platform operates smoothly and remains user-friendly.

## Live Site

https://tesseract-69d91.web.app

## Key Features

- Secure User Authentication
- Role-Based User Authorization
- Dedicated Dashboards for Users, Moderators, and Admins
- Payment Gateway Integration
- Upvote and Downvote System
- Product Reviews & Ratings
- Fully Responsive Design

## Technologies Used

`HTML`, `Tailwind CSS`, `React`, `Firebase`, `Node.js`, `Express.js`, `MongoDB`, `JWT`

## Dependencies

- @stripe/react-stripe-js
- @stripe/stripe-js
- @tanstack/react-query
- axios
- firebase
- react
- react-dom
- react-helmet-async
- react-hot-toast
- react-icons
- react-rating
- react-router-dom
- react-tag-input
- recharts
- swiper

## Installation

Here is a step-by-step guide on how to run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RaisulKayesRaka/Tesseract-Client.git
   cd Tesseract-Client
   ```

2. **Install dependencies:**
   Ensure you have Node.js and npm installed. Then run:

   ```bash
   npm install
   ```

3. **Set up Firebase Authentication**

   - Go to the Firebase Console. https://console.firebase.google.com
   - Create a new project or use an existing one.
   - Navigate to Project Settings > General and add a new Web App.
   - Copy the Firebase configuration object.
   - In the Firebase console, go to Authentication > Sign-in method, and enable:
     - Google Sign-in
     - Email/Password Sign-in

4. **Set up environment variables:**
   Create a `.env.local` file in the root directory and Add the following variables to it:

   ```
   VITE_apiKey=your_api_key
   VITE_authDomain=your_auth_domain
   VITE_projectId=your_project_id
   VITE_storageBucket=your_storage_bucket
   VITE_messagingSenderId=your_messaging_sender_id
   VITE_appId=your_app_id
   VITE_imgbbApiKey = your_imgbb_api_key
   VITE_STRIPE_PUBLISHABLE_KEY = your_stripe_publishable_key
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

## Screenshot

![Screenshot_5-2-2025_02256_tesseract-69d91 web app](https://github.com/user-attachments/assets/f848aed2-bb98-4d91-b384-8be0e9dd7511)
