    # KRGO Technical Documentation

    ## 1. Project Overview
    KRGO is a full-stack business automation platform designed to streamline lead collection and client onboarding. The project combines a modern React frontend with a robust Node.js/Express backend, featuring an automated WhatsApp bot for interactive client scheduling.

    **Main Features:**
    - **Automated WhatsApp Bot**: An interactive bot that guides potential clients through a multi-step booking process.
    - **Google Sheets Integration**: Automatic synchronization of booking data with Google Sheets for real-time tracking.
    - **Single Service Deployment**: Both frontend and backend are served from a single Node.js process.

    ---

    ## 2. Folder Structure
    The project is organized as a monorepo for easy management and deployment.

    ### Root Directory
    - `src/`: Frontend React source code.
    - `public/`: Static assets for the React application.
    - `dist/`: Production-ready frontend build (generated after running `npm run build`).
    - `vite.config.js`: Configuration for the Vite build tool.
    - `package.json`: Main dependencies and orchestration scripts (`dev`, `build`).

    ### `backend/` Directory
    - `src/server.js`: The entry point. Starts both the Express server and the WhatsApp bot.
    - `src/app.js`: Configures Express middleware, security headers (Helmet), CORS, and serves the static `dist/` folder.
    - `src/services/whatsappBot.js`: Contains the core logic for the WhatsApp conversation flow and event handling.
    - `src/config/`: Configuration for the WhatsApp bot messages/triggers.

    ---

    ## 3. System Architecture
    The system follows a centralized architecture where the Backend acts as the hub for all communications.

    - **Frontend (React)**: Communicates with the Backend API for data submission.
    - **Backend (Express)**: Serves the React app and provides RESTful APIs.
    - **WhatsApp Web (whatsapp-web.js)**: Runs inside the backend using Puppeteer. It listens for incoming messages and manages user sessions.
    - **Google Sheets API/Webhook**: The backend sends a POST request to an external Google Apps Script URL whenever a booking is finalized.

    ---

    ## 4. Backend Explanation

    ### Express Server
    The server uses **Express 5** and is configured to handle JSON payloads, manage CORS for security, and log requests via Morgan.

    ### Webhook Handling
    - **Incoming**: The `/webhook` endpoint in `app.js` is set up to receive data from external integrations (like status updates or external bots).
    - **Outgoing**: The bot logic acts as a client-side webhook, pushing data to Google Sheets after a successful flow completion.

    ### Message Filtering Logic
    To prevent spam and group interference:
    1. **Source Check**: Ignores messages from groups (`@g.us`).
    2. **Self Check**: Ignores messages sent by the bot's own account (`fromMe`).
    3. **Trigger Check**: Only starts the flow if the user sends the exact `TRIGGER_MESSAGE`.

    ---

    ## 5. WhatsApp Bot Logic

    ### Flow Diagram
    1. **User sends Trigger** → Bot checks if the user is in "cooldown".
    2. **Step 1 (Name)** → Bot asks for the user's name.
    3. **Step 2 (Website Type)** → Bot provides a menu of 6 website types.
    4. **Step 3 (Time Slot)** → Bot provides available time slots.
    5. **Step 4 (Date)** → Bot dynamically calculates the next 5 working days.
    6. **Completion** → Bot confirms booking to user and sends data to Google Sheets.

    ### Session Management
    User states are tracked in a `Map` using their WhatsApp ID as the key. This allows the bot to handle multiple conversations simultaneously without confusion.

    ---

    ## 6. Frontend Explanation

    ### Building the Project
    The frontend uses **Vite** for fast development and optimized builds.
    - Running `npm run build` triggers `vite build`.
    - This generates the `dist/` folder containing minified HTML, CSS, and JS.

    ### Serving the Frontend
    The backend is configured to serve the `dist/` folder as a static directory.
    ```javascript
    app.use(express.static(path.join(__dirname, "../../../dist")));
    ```
    Any request that doesn't match an API route or a webhook is redirected to `index.html`, allowing React Router to handle client-side navigation.

    ---

    ## 7. Deployment Process (Render)

    ### Build Steps
    1. **Install Dependencies**: `npm install` (Root) and `npm install --prefix backend`.
    2. **Build Frontend**: `npm run build`.

    ### Start Commands
    - **Production**: `npm run start --prefix backend`
    - **Development**: `npm run dev` (Runs both using `concurrently`)

    ### Single Service Setup
    On Render, you only need to create one **Web Service**. Point it to the root of the repository. The backend will automatically serve the built frontend, meaning you don't need a separate static site service.

    ---

    ## 8. Environment Variables

    | Variable | Purpose | Example |
    | :--- | :--- | :--- |
    | `PORT` | The port the server runs on | `5000` |
    | `GOOGLE_SHEETS_WEBHOOK_URL` | URL to receive booking data | `https://script.google.com/...` |
    | `VITE_API_BASE_URL` | Frontend API base path | `http://localhost:5000` |

    ---

    ## 9. Common Errors and Fixes

    ### 404 Errors on Refresh
    **Issue**: Refreshing a page on a deployed site returns a 404.
    **Fix**: Ensure the backend's catch-all route `app.get("*")` is correctly redirecting to `index.html`.

    ### Webhook Not Working
    **Issue**: Messages aren't being sent to Google Sheets.
    **Fix**: Check if `GOOGLE_SHEETS_WEBHOOK_URL` is set in the production environment variables. Ensure the Google Script is deployed as a "Web App" accessible to "Anyone".

    ### WhatsApp Session Expiry
    **Issue**: Bot stops responding after some time.
    **Fix**: The `LocalAuth` strategy is used to persist the session. If it fails, delete the `.wwebjs_auth` folder and scan the QR code again.

    ---

    ## 10. Improvements Suggestions

    1. **Scalability**: Move the conversation `Map` to **Redis** to allow multiple server instances and persistent sessions across restarts.
    2. **Reliability**: Implement a **Job Queue** (like BullMQ) for the Google Sheets synchronization to handle retries if the external API is down.
    3. **Bot Logic**: Integrate **OpenAI API** for more natural language understanding instead of strict number-based menus.
    4. **Monitoring**: Add a dashboard on the frontend to monitor the bot's status and view connected WhatsApp sessions.
