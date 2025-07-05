# What2Wear 🌤️

What2Wear is a full-stack application that helps users choose outfit combinations based on weather and personal wardrobe. Users can upload outfit items (tops, bottoms, shoes), get weather-based suggestions, save full looks, and generate random outfits from their wardrobe.

## 📌 Features

- User Authentication (Signup/Login)
- Image Upload with Cloudinary
- Outfit Categorization (top, bottom, shoes)
- Weather-based outfit suggestion using OpenWeatherMap API
- Save full looks by selecting outfit pieces
- View previously saved looks
- Random outfit generator

## 🛠️ Technologies Used

### Frontend:
- React
- Axios
- React Router
- CSS

### Backend:
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- Cloudinary
- Multer

### External APIs:
- Cloudinary API (Image Hosting)
- OpenWeatherMap API (Weather data)

## 🔐 Login Info
To use the application locally:
- First, register a new user.
- JWT-based authentication is used; tokens are stored in `localStorage`.

## ▶️ How to Run the Project

### Backend
```bash
cd server
npm install
npm start

### Frontend
```bash
cd client
npm install
npm start
