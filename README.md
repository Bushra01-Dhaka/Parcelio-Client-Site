# 🚚 Parcelio – Parcel Delivery Application

Parcelio is a full-stack MERN parcel delivery platform designed to handle real-world logistics workflows including parcel booking, online payments, rider assignment, tracking, and role-based dashboards.

This project focuses on clean UX, transparent pricing, and scalable backend architecture.

## 🔗 Live Links

🌐 Client: https://github.com/Bushra01-Dhaka/Parcelio-Client-Site

🛠 Server: https://github.com/Bushra01-Dhaka/Parcelio-Server_Site

🎥 Demo Video: 
A complete walkthrough of Parcelio showing parcel creation, Stripe payment,
rider assignment, live tracking, and role-based dashboards.  
[Watch Full Project Demo](https://drive.google.com/file/d/1xPFsCul16qpB-N-GCSGQY-fVWi8J8hYQ/view?usp=sharing)


## 📌 Features Overview
### 👤 User Features

- Create parcels with dynamic pricing

- Transparent price calculation based on:

- Parcel type

- Weight

- Within / Outside city

- Secure online payment using Stripe

- Track parcels using Tracking ID

- View parcel history & statuses



### 🚴 Rider Features

- Rider approval system

- Assigned parcel management

- Update delivery status:

- Picked up

- In transit

- Delivered

### Earnings dashboard:

Today / Week / Month / Year

Total, Cashed Out & Pending earnings



### 🧑‍💼 Admin Features

- Manage parcels & users

- Approve riders

- Assign riders dynamically

- Delivery analytics dashboard:

- Parcel status distribution

- Total deliveries

- Track system-wide parcel flow



### 📦 Parcel Tracking System

- Parcelio maintains step-by-step tracking logs:

- Parcel Submitted

- Payment Completed

- Rider Assigned

- Parcel Picked Up

- Parcel Delivered

- Anyone can track a parcel using its Tracking ID.



##  💰 Pricing Logic
Parcel Type	Weight	Within City	Outside City
Document	Any	৳60	৳80
Non-Document	Up to 3kg	৳110	৳150
Non-Document	>3kg	+৳40/kg	+৳40/kg + ৳40



## 🛠️ Tech Stack
###
Frontend

- React

- React Router

- Tailwind CSS

- DaisyUI

- TanStack Query

- React Icons

- Stripe.js


### Backend

- Node.js

- Express.js

- MongoDB

- JWT Authentication

- Stripe Payment Gateway




## 🔐 Authentication & Security

- JWT based authentication

- Role-based route protection

- Secure API access

- Environment variables for sensitive data



## 📊 Dashboards

- Role-based dashboards:

- User

- Rider

- Admin

- Dynamic statistics

- Real-time parcel & earning calculations



## 🧠 Architecture Highlights

- Modular REST APIs

- Tracking as a separate collection

- Centralized pricing logic

- Reusable custom hooks

- Scalable role management



## 🧪 Future Improvements

- Live parcel location (map)

- Push notifications

- Rider cash-out request system

- Admin revenue analytics

- Mobile app version



## 🙌 Author

- Junior MERN Stack Developer
- 📧 Email: humayraanjum87@gmail.com
- 🔗 GitHub: https://github.com/Bushra01-Dhaka