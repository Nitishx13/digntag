# AI Poet Feature

This is a complete AI-powered poetry generation platform that turns feelings and emotions into beautiful poetry using OpenAI's GPT technology.

## Features

- **Multiple Poetry Styles**: Sonnet, Haiku, Free Verse, and Ballad
- **Real-time Generation**: Instant poetry creation based on user input
- **Beautiful UI**: Modern, responsive design with gradient backgrounds
- **OpenAI Integration**: Advanced AI models for high-quality poetry generation
- **Interactive Elements**: Testimonials, features showcase, and more

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create environment file in root directory:
```bash
cp .env.example .env
```

Add your OpenAI API key to the `.env` file:
```
OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 3. Run the Application

**Option 1: Run both frontend and backend together**
```bash
npm run start-all
```

**Option 2: Run separately**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run dev
```

### 4. Access the Application
- Frontend: `http://localhost:5173`
- AI Poet Page: `http://localhost:5173/poet`
- Backend API: `http://localhost:3001`

## API Endpoints

### POST /api/generate-poem
Generates poetry based on user input.

**Request Body:**
```json
{
  "text": "Your feelings or theme here",
  "style": "sonnet|haiku|freeverse|ballad"
}
```

**Response:**
```json
{
  "poem": "Generated poetry text here..."
}
```

### GET /api/health
Health check endpoint.

## File Structure

```
digntag/
├── src/
│   ├── poet/
│   │   ├── poet.jsx          # Main React component
│   │   ├── server.js         # Express backend server
│   │   └── README.md         # This file
│   └── ...
├── package.json              # All dependencies (frontend + backend)
├── .env.example              # Environment variables template
└── start-poet.js             # Alternative startup script
```

## Integration with Main App

The poet feature is integrated into the main Digntag application:

- Added to navigation menu under "Tools" dropdown
- Accessible at `/poet` route
- Fully responsive design
- Uses existing styling and components

## OpenAI Integration

The backend uses the OpenAI API to generate poetry. The system:

1. Takes user input (feelings, themes, emotions)
2. Sends it to OpenAI with style-specific prompts
3. Returns formatted poetry in the requested style
4. Displays it beautifully on the frontend

## Poetry Styles

1. **Sonnet**: 14-line Shakespearean sonnet with iambic pentameter
2. **Haiku**: Traditional 5-7-5 syllable structure
3. **Free Verse**: Modern poetry without strict structure
4. **Ballad**: Narrative poetry with rhyming quatrains

## Notes

- If OpenAI API fails, the system provides fallback poetry
- The frontend includes loading states and error handling
- Responsive design works on all device sizes
- Includes testimonials and feature sections for marketing
