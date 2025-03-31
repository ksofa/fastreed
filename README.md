# FastReed

FastReed is a Telegram Mini App that helps users read books faster using two innovative reading modes:
- Bionic Reading: Highlights parts of words to improve reading speed and comprehension
- RSVP (Rapid Serial Visual Presentation): Shows words one at a time at adjustable speeds

## Features

- Support for multiple file formats (PDF, EPUB, TXT, DOCX)
- Modern, responsive UI with dark/light theme support
- Drag-and-drop file upload
- Adjustable reading speed for RSVP mode
- Pause/Resume functionality
- Telegram Mini App integration

## Project Structure

```
fastreed/
├── backend/           # FastAPI backend
│   ├── main.py       # Main FastAPI application
│   └── requirements.txt
├── frontend/         # Telegram WebApp frontend
│   ├── index.html    # Main HTML file
│   ├── styles.css    # CSS styles
│   └── app.js        # Frontend JavaScript
└── bot/             # Telegram bot
    └── bot.py       # Bot implementation
```

## Setup Instructions

### Backend Setup

1. Create and activate a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the backend server:
```bash
python main.py
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Deploy the frontend files to a web server (e.g., Vercel, Netlify, or GitHub Pages)
2. Update the API URL in `app.js` to point to your backend server
3. Update the WebApp URL in `bot.py` to point to your frontend deployment

### Telegram Bot Setup

1. Create a new bot using [@BotFather](https://t.me/botfather) on Telegram
2. Get your bot token
3. Set the environment variable:
```bash
export TELEGRAM_BOT_TOKEN="your_bot_token_here"
```

4. Run the bot:
```bash
cd bot
python bot.py
```

## Development

### Local Development

1. Start the backend server
2. Deploy the frontend locally using a development server
3. Update the WebApp URL in `bot.py` to point to your local frontend
4. Run the bot

### Production Deployment

1. Deploy the backend to a cloud service (e.g., Railway, Render)
2. Deploy the frontend to a static hosting service (e.g., Vercel)
3. Update the WebApp URL in `bot.py` to point to your production frontend
4. Deploy the bot to a server

## API Endpoints

### Backend API

- `POST /upload`: Upload and process a book file
- `POST /bionic`: Convert text to bionic reading format
- `POST /rsvp`: Prepare text for RSVP reading

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for your own purposes. 