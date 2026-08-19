# E.D.I.T.H. AI API Documentation

All API requests pass through the central Gateway running on port `9000`.

## 1. Authentication Service (`/api/auth`)

- **`POST /api/auth/login`**: Authenticates a user using a Firebase Identity token, manages the session, and stores the user in MongoDB.
- **`POST /api/auth/logout`**: Clears the session from Redis and clears the session cookie.
- **`POST /api/auth/update-payment`**: Updates user credit balance and plan status.
- **`GET /api/me`**: Fetches the authenticated user's current session state.

## 2. Chat Service (`/api/chat`)

- **`GET /api/chat/get-conversations`**: Retrieves a list of all conversations for the authenticated user, sorted by `updatedAt`.
- **`GET /api/chat/create-conversation`**: Creates a new blank conversation for the authenticated user.
- **`PUT /api/chat/update-conversation`**: Updates the title or metadata of an existing conversation.
- **`POST /api/chat/save-message`**: Persists a new message (User or AI Assistant) along with its associated artifacts (code files, image links).
- **`GET /api/chat/messages/:conversationId`**: Fetches the full message history for a specific conversation.

## 3. Agent Service (`/api/agent`)

- **`POST /api/agent/chat`**: The core execution engine for AI processing.
  - **Body Format**: 
    ```json
    {
      "prompt": "User's request string",
      "conversationId": "MongoDB_ID",
      "agent": "chat | coding | vision | pdf | ppt | search"
    }
    ```
  - **Description**: Handles file uploads via `multer` (if images are attached), classifies intent, triggers the respective LangGraph agent, streams LLM output (via Groq/Gemini), generates any necessary artifacts (Images, PDFs), and saves the final output to the chat database.

## 4. Billing Service (`/api/billing`)

- **`POST /api/billing/deduct`**: Deducts credits asynchronously from the user's account after an AI agent successfully finishes a task.
  - Cost Rules:
    - Chat: `1 credit`
    - Search: `5 credits`
    - Coding, PDF, PPT, Vision: `10 credits`

## Authentication Middleware (`protect`)

The Gateway enforces session security across all `/api/chat`, `/api/agent`, and `/api/billing` routes.
- The `protect` middleware intercepts requests, extracts the `session` cookie, verifies it against the Redis cache (`session-{id}`), and injects `x-user-id` into the headers before proxying it to the internal microservices.
