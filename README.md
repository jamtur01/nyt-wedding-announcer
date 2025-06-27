# NYT Wedding Announcer

A parody generator that creates realistic-sounding New York Times wedding announcements using sophisticated fake data and authentic NYT styling patterns.

## Features

- **Authentic NYT Style**: Based on analysis of real NYT wedding announcements
- **Sophisticated Data**: 130+ prestigious job titles, fake elite universities, academic honors
- **Multiple Templates**: 3 different announcement formats for variety
- **Smart Randomization**: Conditional inclusion of titles, former jobs, and graduate degrees
- **Realistic Demographics**: Reflects the typical NYT announcement audience

## Quick Start

### Prerequisites

- Node.js (version 12 or higher)
- npm (comes with Node.js)

### Installation & Running

```bash
# Clone or download the repository
cd nyt-wedding-announcer

# Install dependencies
npm install

# Start the server
npm start
# OR
node server.js

# Open your browser to:
http://localhost:3000
```

The app will automatically assign a random port if 3000 is unavailable. Check the console output for the actual port.

## Usage

1. Open the web interface in your browser
2. Click the "Generate!" button
3. A new wedding announcement will appear each time
4. Refresh the page or click "Generate!" again for more announcements

## Sample Output

```
Dr. Sarah Mitchell, Ambassador Robert Chen

Dr. Sarah Mitchell and Ambassador Robert Chen were married Saturday at 
the bride's family estate in East Hampton. The Rev. Dr. Michael Patterson, 
a Presbyterian minister, officiated.

Dr. Mitchell, 32, is a partner at Cravath, Swaine & Moore. She graduated 
summa cum laude from Harwick University and received a J.D. from 
Harwick Law School. She was previously a federal prosecutor in the 
Southern District of New York.

She is a daughter of Margaret Mitchell and James Mitchell of Millbrook, 
Connecticut. The bride's father is a retired partner at Goldman Sachs 
and the bride's mother is a philanthropist and board member of the 
Whitmore Museum.

Ambassador Chen, 34, is a senior policy advisor at the State Department. 
He graduated magna cum laude from Standford University and received 
a Master's in International Relations from Georgetown University.

He is a son of Linda Chen and David Chen of Riverside, California. 
The groom's mother is a former editor-in-chief of Harper's Bazaar and 
the groom's father is a retired professor emeritus at MIT.

The couple met during a literature conference at Columbia in Brookhaven. 
They spent hours discussing their shared interest in international 
development and human rights.
```

## Technical Details

### Data Categories

- **Universities**: 30+ elite institutions with fake names (Harwick University, Yalebrook University, etc.)
- **Jobs**: 130+ positions across finance, law, medicine, tech, media, academia, government, nonprofits
- **Titles**: Dr., Professor, Judge, Ambassador, CEO, Senator, etc.
- **Honors**: Rhodes Scholar, summa cum laude, Phi Beta Kappa, etc.
- **Venues**: 30+ sophisticated wedding locations
- **Meeting Places**: 35+ scenarios reflecting elite social circles

### Template Variations

1. **Standard Format**: Classic NYT structure
2. **Story Title Format**: Includes creative headlines like "A Shared Passion for Justice"
3. **Formal Format**: Uses "Ms./Mr." and more formal language

### Randomization Features

- **Titles**: 30% chance of professional titles (Dr., Professor, Judge, etc.)
- **Former Jobs**: 50% chance of mentioning previous career
- **Graduate Degrees**: 60% chance for groom's advanced degree
- **Meeting Stories**: 15 different relationship development narratives

## Architecture

- **Backend**: Node.js with Express
- **Template Engine**: Tracery grammar for text generation
- **Fake Data**: Combination of Faker.js, Fakerator, and custom arrays
- **Frontend**: Vanilla HTML/CSS/JavaScript

## Development

### Project Structure
```
├── server.js          # Main application server
├── package.json       # Dependencies and scripts
├── public/
│   ├── client.js      # Frontend JavaScript
│   └── style.css      # Styling
├── views/
│   └── index.html     # Main page template
└── README.md          # This file
```

### Adding New Data

To add new jobs, universities, or other data:

1. Open `server.js`
2. Find the relevant array (e.g., `finance_jobs`, `medical_jobs`)
3. Add new entries following the existing pattern
4. Restart the server

### Customizing Templates

The announcement templates are in the `origin` array within the `generate()` function. Each template uses Tracery syntax with `#variable#` placeholders.

## Environment Variables

- `PORT`: Server port (defaults to assigned by system)

## Troubleshooting

### Common Issues

**Dependencies not installing:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
The app automatically finds an available port. Check console output for the actual URL.

**Page not loading:**
Ensure the server is running and check the console for any error messages.

### Performance

The generator creates announcements dynamically with each request. For high-volume usage, consider implementing caching or pre-generation.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Privacy & Ethics

This is a parody generator for entertainment purposes. All names, places, and personal details are fictional. No real personal information is collected or stored.

## License

This project is for educational and entertainment purposes.

---

*Built with Node.js, Express, and a healthy sense of humor about wedding announcement culture.*