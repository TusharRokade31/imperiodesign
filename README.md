# Imperio Custom Railing Designer

A modern, interactive web application for designing custom railing systems with real-time visualization and quotation generation.

## Features

- **Color/Finish Selection**: Choose from Silver, Bronze, Black, and Copper finishes
- **Base Selection**: Multiple base options (Ace, Pro, Smart, Mini, Micro) with detailed information modals
- **Handrail Selection**: Various handrail styles (Sleek, Slim, Square20, Square30)
- **Real-time Image Updates**: Images change dynamically based on selected color/finish
- **Glass Height Visualization**: Interactive height selector with visual representation
- **Additional Options**: Glass type, user type, installation requirements, timeline
- **Live Selection Summary**: Real-time preview of all selections
- **OTP Verification**: Secure phone number verification via OTP
- **Quote Submission**: Complete form with customer details and quantity
- **PDF Download**: Download selection summary as PDF

## Installation

1. Clone or download this repository
2. Ensure you have a web server (Apache, Nginx, or use a local development server)
3. Place all files in your web root directory maintaining the folder structure

## Folder Structure
```
railing-designer/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── config.js
│   │   └── api.js
│   └── images/
│       ├── bases/
│       ├── handrails/
│       ├── heights/
│       └── modals/
└── README.md
```

## Configuration

### API Integration

Edit `assets/js/config.js` to configure your API endpoints:
```javascript
const CONFIG = {
    API_BASE_URL: 'https://your-api-domain.com/api',
    ENDPOINTS: {
        SEND_OTP: '/send-otp',
        VERIFY_OTP: '/verify-otp',
        SUBMIT_QUOTE: '/submit-quote',
    },
    // ... other config
};
```

### API Endpoints Expected Format

#### Send OTP
**POST** `/send-otp`
```json
{
  "phone": "9876543210",
  "countryCode": "+91"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

#### Verify OTP
**POST** `/verify-otp`
```json
{
  "phone": "9876543210",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "verified": true
}
```

#### Submit Quote
**POST** `/submit-quote`
```json
{
  "customerInfo": {
    "name": "John Doe",
    "phone": "+919876543210",
    "email": "john@example.com",
    "userType": "looking"
  },
  "railingConfig": {
    "finish": "silver",
    "base": "ace",
    "handrail": "sleek",
    "glassType": "clear",
    "height": "3.5",
    "quantity": "50"
  },
  "projectInfo": {
    "name": "My Project",
    "pincode": "400001",
    "timeline": "urgent",
    "installation": "yes"
  },
  "timestamp": "2025-10-29T12:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "quoteId": "QT1234567890"
}
```

## Image Requirements

### Base Images
Place base images in `assets/images/bases/` with naming convention:
- `{base-type}-{finish}.png`
- Example: `ace-silver.png`, `ace-bronze.png`, etc.

Required combinations:
- ace: silver, bronze, black, copper
- pro: silver, bronze, black, copper
- smart: silver, bronze, black, copper
- mini: silver, bronze, black, copper

### Handrail Images
Place handrail images in `assets/images/handrails/` with naming convention:
- `{handrail-type}-{finish}.png`
- Example: `sleek-silver.png`, `slim-bronze.png`, etc.

Required combinations:
- sleek: silver, bronze, black, copper
- slim: silver, bronze, black, copper
- square20: silver, bronze, black, copper
- square30: silver, bronze, black, copper

### Height Images
Place height visualization images in `assets/images/heights/`:
- `2-feet.png`
- `2.5-feet.png`
- `3-feet.png`
- `3.5-feet.png`
- `4-feet.png`
- `silhouette.png` (person silhouette for reference)

### Modal Images
Place detailed product images in `assets/images/modals/`:
- `ace-modal.jpg`
- `pro-modal.jpg`
- `smart-modal.jpg`
- `mini-modal.jpg`
- `micro-modal.jpg`

## Development

### Mock API Mode
By default, the application uses mock APIs for testing. In `assets/js/main.js`, you'll find:
```javascript
// Use mock API for development
const result = await apiService.sendOTPMock(phoneNumber);

// For production, replace with:
// const result = await apiService.sendOTP(phoneNumber);
```

Replace all mock API calls with actual API calls in production.

### Running Locally

Using Python:
```bash
python -m http.server 8000
```

Using Node.js:
```bash
npx http-server -p 8000
```

Using PHP:
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- **Tailwind CSS** (via CDN) - For styling
- No other external dependencies required

## Customization

### Colors
Edit the finish buttons and color configuration in `config.js` and update Tailwind classes in `index.html`.

### Products
Add or modify base/handrail options in `config.js` and add corresponding images.

### Form Fields
Modify the additional options section in `index.html` to add/remove fields.

## Production Deployment

1. Replace mock API calls with actual API endpoints
2. Optimize images (compress and use appropriate formats)
3. Minify CSS and JavaScript files
4. Enable HTTPS
5. Add proper error handling and logging
6. Implement rate limiting on API endpoints
7. Add analytics tracking if needed

## Security Considerations

- Always validate input on both client and server side
- Implement proper OTP expiration and retry limits
- Use HTTPS for all API calls
- Sanitize user inputs before displaying
- Implement CORS properly on your API
- Add CSRF protection

## License

Proprietary - Imperio Railing Systems

## Support

For support, please contact: sales@imperiorailing.com

---

Built with ❤️ for Imperio Railing Systems