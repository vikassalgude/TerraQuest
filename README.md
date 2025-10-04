[# 🌍 TerraQuest

TerraQuest is a full-stack web application, built with the MERN stack principles (using Express and EJS instead of React for the frontend), designed to allow users to discover, list, and review unique travel accommodations. It aims to provide a platform for finding and sharing listings ranging from classic rooms to iconic cities and campsites.

## ✨ Features

  * **User Authentication:** Secure user sign-up, login, and logout implemented using **Passport.js** (Local Strategy).
  * **Authorization:** Middleware ensures that only logged-in users can create/edit listings and that only the owner can delete or update their content.
  * **CRUD for Listings:** Users can create, read, update, and delete accommodation listings.
  * **Review System:** Users can add and delete reviews for listings (one-to-many relationship).
  * **Flash Messaging:** Instant feedback to users (success/error/info) using `connect-flash`.
  * **Mapping Integration:** Uses **Leaflet.js** and **OpenStreetMap (OSM)** for displaying listing locations on interactive maps.
  * **MongoDB Sessions:** Persistent user sessions using `connect-mongo` for secure session storage.
  * **Responsive UI:** Built with **Bootstrap 5** and custom CSS for a mobile-friendly experience.
  * **EJS-Mate Layouts:** Efficient template structuring using EJS layouts.

## 🛠️ Tech Stack

**Backend:**

  * **Node.js**
  * **Express.js:** Web application framework.
  * **MongoDB / Mongoose:** Database and ODM for data modeling.
  * **Passport.js:** Authentication middleware.
  * **Express-Session & Connect-Mongo:** Session management.

**Frontend:**

  * **EJS (Embedded JavaScript):** Templating engine.
  * **EJS-Mate:** Layout and partial management.
  * **Bootstrap 5:** Styling and components.
  * **Leaflet.js & OpenStreetMap:** Interactive mapping.

## 🚀 Getting Started

Follow these steps to get a local copy of the project running.

### Prerequisites

You need the following installed on your machine:

  * Node.js (v18+)
  * MongoDB (local installation or cloud Atlas)
  * Git

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/vikassalgude/TerraQuest
    cd TerraQuest
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env` in the root directory and add your secret keys.

    **`.env` Example:**

    ```
    # MongoDB Atlas Connection URL
    ATLASDB_URL="mongodb+srv://[username]:[password]@[cluster]/[database]"

    # Secret key for Express Sessions
    SECRET="your_strong_random_session_secret_here"

    # Cloudinary Keys (if implementing image uploads)
    CLOUD_NAME="your_cloudinary_cloud_name"
    CLOUD_API_KEY="your_cloudinary_api_key"
    CLOUD_API_SECRET="your_cloudinary_api_secret"
    ```

4.  **Start the Server:**

    ```bash
    node app.js
    ```

    The application should now be running at `http://localhost:8080`.

## ⚙️ Deployment (Render)

The application is designed for easy deployment to platforms like Render. Ensure the following steps are taken when deploying:

1.  **Define Environment Variables:** In the Render dashboard (under the **Environment** tab for your service), you **must** manually set all keys from your `.env` file (`ATLASDB_URL`, `SECRET`, `CLOUD_NAME`, etc.).

      * **Crucial Note:** Environment variables are case-sensitive. If you use `process.env.SECRET` in your code, the key in Render must be named **`SECRET`** (uppercase).

2.  **Build Command:** `npm install`

3.  **Start Command:** `node app.js`

## 🤝 Contributing

Contributions are welcome\! If you find a bug or have an enhancement, please open an issue or submit a pull request.
](https://github.com/vikassalgude/TerraQuest)
