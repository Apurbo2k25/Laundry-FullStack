# Laundry Booking Project (LaundroLink) 🧺

# 📌 What is this project?

This is a full-stack web application I built to allow users to book laundry services online.
Users can select services, manage a cart (Selected Items), and submit a booking through a form.

Since this was my second full-stack project, I focused on understanding how the frontend and backend connect and work together.

# ⚙️ Tech Stack:

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Other Tools: Axios, EmailJS

# 🚀 Key Features:

- Add/remove laundry services to a cart
- Cart data persists using localStorage (no data loss on refresh)
- Responsive UI using Tailwind CSS
- Booking form connected to backend
- Email notification on successful booking (using EmailJS)

# 🧠 Concepts I Used:

- useState → for managing cart and form data
- useEffect → for saving cart data to localStorage
- useRef → for smooth scrolling to booking section
- Axios → for frontend-backend communication

# ⚔️ Challenges I Faced:

1. Cart data getting cleared on refresh

At first, all selected items were lost after refreshing the page.
I solved this by learning and using localStorage to persist the cart.

2. EmailJS 422 Error

The email was not sending initially.
After checking the Network tab in DevTools and debugging with some guidance, I realized the variable names in my code didn’t match the EmailJS template.
Fixing the names solved the issue.

3. Making the UI responsive

It was difficult to adjust layouts for mobile screens.
I used Tailwind’s grid and flex utilities to handle responsiveness.

4. Backend connection

Connecting React with MongoDB via Express was confusing at first.
Using CORS and environment variables helped me fix the issues.

# 🤝 Help & Learning:

# I used:

- Official documentation (React, Tailwind, Node.js)
- Online resources and tutorials
- AI tools for debugging and understanding errors

# 👉 I tried to understand the solutions instead of just copying them.

# 🔮 Future Improvements:

- Add user authentication (login/signup)
- Admin dashboard to manage bookings
- Online payment integration
- Better UI/UX and animations

# 🛠️ How to Run Locally:

# Backend:

- cd server
- npm install
- Create a .env file:
- MONGO_URI=your_mongodb_uri
  PORT=5000

# Run: node server.js

# Frontend:

- cd client
- npm install
- npm run dev

# 🧾 Final Note:

This project is part of my learning journey into full-stack development.
There may be improvements needed, but it helped me understand how real-world applications are built and connected.
