# URL Shortener with Stats

This project is a simple URL Shortener app built as part of my 4th year CSE assessment.  
It allows shortening of URLs (with optional validity and shortcode), and also shows statistics like clicks and location of visitors.

---

## Features

- Shorten up to 5 URLs at a time.
- Set custom shortcode (optional).
- Set validity in minutes (default = 30).
- Store all data in localStorage (no backend DB).
- Stats page shows:
  - Original URL + shortened link
  - Creation and expiry time
  - Total clicks
  - Click details (time, source, location if available)
- Logs are sent to AffordMed evaluation service using a bearer token.

---

## System Design (Short Recap)

- _Frontend_ made in React.
- _Storage_ is handled in localStorage.
- _Logging middleware_ is separate, sending logs to the evaluation API.
- _Location_ is captured using browser geolocation API (approx lat/long).
- _Routing_:
  - / → Shortener page
  - /stats → Stats page
  - /r/:code → Redirect handler

---

## Folder Structure

2201640100247
│
├── LoggingMiddleware/
│ └── logging.js
│
├── Frontend Test Submission/
| ├── src/
| │ ├── lib/
| │ │ ├── storage.js
| | |
| │ ├── pages/
| │ │ ├── Shortener.jsx
| │ │ ├── Stats.jsx
| | |
| │ ├── redirector/
| │ │ └── Redirector.jsx
| │ │
| │ ├── App.css
| │ ├── App.jsx
| │ └── main.jsx
| |
| ├── package.json
| ├── index.html
| └── README.md
|
└── README.md

---

## How to Run

1. Clone the repo.

2. Install dependencies:
   bash
   npm install

3. Run the app:
   bash
   npm run dev

4. Open in browser
   http://localhost:3000/

---

## Usage

1. First, paste your Bearer token in the Shortener page and save it.
2. Enter up to 5 URLs, with optional validity and shortcode.
3. Click Shorten – new short links will be displayed.
4. Visit /stats page to view all your shortened URLs and stats.
5. When someone clicks a short link, it redirects to original URL and logs the click.

---

## Assumptions

1. Token is provided manually by the user (not auto-generated).
2. Location is captured using geolocation (if denied, marked as "denied").
3. Data is not persisted to a server, only browser localStorage.

![Screenshot](Copy/Screenshot%202025-09-08%20140405.png)

![ScreenShot](<Screenshot 2025-09-09 110624.png>)
