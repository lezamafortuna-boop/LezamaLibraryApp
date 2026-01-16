# LezamaLibraryApp
libraryApp

# 📚 **Lezama Library App**

A full‑stack book inventory application built with **Node.js**, **Express**, **MongoDB**, and **Auth0 authentication**.  
Users can log in securely, add books, edit them, delete them, and view their personal library in a clean, responsive UI.

---

## 🚀 **Features**

- 🔐 **Secure login** using Auth0 (Google, email/password, etc.)  
- 📖 **Add, edit, and delete books**  
- 🏷️ **Tag support** (comma‑separated tags)  
- 🖼️ **Modern UI** with Bootstrap 5  
- 👤 **User‑aware interface**  
  - Shows user avatar and name  
  - Edit/Delete buttons only appear when logged in  
- 📦 **MongoDB database** for persistent storage  
- 🧭 **Clean routing structure** with protected routes  
- 🎨 **Reusable EJS templates** (header, footer, forms, cards)

---

## 🛠️ **Tech Stack**

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express |
| Frontend | EJS, Bootstrap 5 |
| Database | MongoDB (Mongoose) |
| Auth | Auth0 (OAuth2 / OpenID Connect) |
| Version Control | Git & GitHub |

---

## 📂 **Project Structure**

```
LezamaLibraryApp/
│
├── models/
│   └── books.js
│
├── routes/
│   └── books.js
│
├── views/
│   ├── books.ejs
│   ├── form.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
│
├── index.js
├── package.json
└── README.md
```

---

## 🔧 **Setup Instructions**

### 1. Clone the repository

```
git clone https://github.com/lezamafortuna-boop/LezamaLibraryApp.git
cd LezamaLibraryApp
```

### 2. Install dependencies

```
npm install
```

### 3. Create a `.env` file

```
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_CALLBACK_URL=http://localhost:3000/callback
SESSION_SECRET=your-session-secret
```

### 4. Start MongoDB  
Make sure MongoDB is running locally.

### 5. Start the server

```
npm start
```

App runs at:

```
http://localhost:3000
```

---

## 🔐 **Authentication**

This app uses **Auth0** for secure login.  
Only authenticated users can:

- Add books  
- Edit books  
- Delete books  

Unauthenticated users can only view the library.

---

## 🖼️ **Screenshots (optional)**

You can add these later:

- Home page  
- Add book form  
- Auth0 login screen  
- Profile dropdown  

---

## 🧠 **Future Enhancements**

- Search bar for books  
- Pagination  
- User‑specific libraries  
- Dark mode  
- Book cover images  
- API endpoints for mobile apps  

---

## 👤 **Author**

**Luis Lezama**  
Full‑stack developer in training  
Vancouver, BC  
