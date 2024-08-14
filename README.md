# SpareChange

## Overview

SpareChange is an innovative tipping app developed for the ETH TO hackathon, designed to enable easy, secure, and direct donations to panhandlers and street performers. By leveraging modern technologies like **Next.js**, **Supabase**, and **Vercel**, SpareChange facilitates frictionless micro-donations, allowing users to make an impact with just a few taps on their mobile devices.

## Features

- **Secure Donations**: Ensures safe transactions using trusted platforms.
- **User-friendly Interface**: Simple and intuitive design for both donors and recipients.
- **Location-based Donations**: Donors can easily find and support individuals near them.
- **Seamless Integration**: Works seamlessly with existing digital payment systems.

## Tech Stack

- **Next.js**: For building the fast, responsive front-end of the application.
- **Supabase**: Utilized as a back-end service for managing user data, authentication, and real-time databases.
- **Vercel**: Hosts our serverless deployment, ensuring the app is scalable and reliable.

This repo was originally cloned from CubidStarter. Below is the original "getting started" chapter from CubidStarter, it applies to this repo too.

## Getting Started with CubidStarter

To set up the project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

Then follow these steps to set up and start developing your project:

1. **Fork the Repo**
   - Fork the repository and clone it to your local machine.
   - [Link to the repository](#)

2. **Set Up Your Supabase Project**
   - Go to [Supabase](https://supabase.io/) and create a new project.
   - Get your Supabase URL and anon key from the Supabase dashboard.

3. **Sign Up for an App at Cubid**
   - Go to [Cubid Admin](https://admin.cubid.me) and sign up for an app.
   - Obtain your Cubid keys from the Cubid dashboard.

4. **Deploy on Vercel or Netlify**
   - Deploy your project on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
   - Add your Supabase keys and Cubid keys to the environment variables in your deployment settings.
     ```plaintext
     NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
     NEXT_PUBLIC_CUBID_API_KEY=<your-cubid-api-key>
     ```

5. **Sign In and Experiment with the Cubid APIs**
   - Sign in to your deployed app.
   - Experiment with the Cubid APIs to familiarize yourself with the available functionalities.

6. **Start Developing**
   - Begin developing your project by adding new features, fixing bugs, and improving the codebase.
   - Use the documentation and resources available for Supabase and Cubid to aid your development process.
