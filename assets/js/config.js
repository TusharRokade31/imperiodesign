// Configuration file
const CONFIG = {
    // API Endpoints - Replace with your actual API endpoints
    API_BASE_URL: 'https://your-api-domain.com/api',
    ENDPOINTS: {
        SEND_OTP: '/send-otp',
        VERIFY_OTP: '/verify-otp',
        SUBMIT_QUOTE: '/submit-quote',
    },
    
    // Base information
    BASES: {
        ace: {
            name: 'Ace Base',
            description: 'Premium railing system with advanced features and superior durability.',
            suitable: 'Suitable for: Large balconies, terraces, and commercial spaces. Ideal for projects requiring maximum strength and modern aesthetics.',
            image: 'assets/images/modals/ace-modal.jpg'
        },
        pro: {
            name: 'Pro Base',
            description: 'Professional-grade railing system designed for versatility and performance.',
            suitable: 'Suitable for: Medium to large spaces, residential and commercial projects. Perfect balance of aesthetics and functionality.',
            image: 'assets/images/modals/pro-modal.jpg'
        },
        smart: {
            name: 'Smart Base',
            description: 'Intelligent railing solution with sleek design and easy installation.',
            suitable: 'Suitable for: Modern homes, offices, and retail spaces. Designed for contemporary architecture.',
            image: 'assets/images/modals/smart-modal.jpg'
        },
        mini: {
            name: 'Mini Base',
            description: 'Compact railing system perfect for space-constrained areas.',
            suitable: 'Suitable for: Small balconies, compact staircases, and tight spaces. Ideal for urban apartments and small footprint renovations.',
            image: 'assets/images/modals/mini-modal.jpg'
        },
        micro: {
            name: 'Micro Base',
            description: 'Minimal Railing System, High Grade Anti Corrosion, Ultra Strong and Modern Aesthetics',
            suitable: 'Suitable for: Small balconies, compact staircases, and tight spaces. Ideal for urban apartments and small footprint renovations.',
            image: 'assets/images/modals/micro-modal.jpg'
        }
    },
    
    // Height configurations
    HEIGHTS: {
        '2': { label: '2 Feet', image: 'assets/images/heights/2-feet.png', position: 60 },
        '2.5': { label: '2.5 Feet', image: 'assets/images/heights/2.5-feet.png', position: 90 },
        '3': { label: '3 Feet', image: 'assets/images/heights/3-feet.png', position: 110 },
        '3.5': { label: '3.5 Feet', image: 'assets/images/heights/3.5-feet.png', position: 140 },
        '4': { label: '4 Feet', image: 'assets/images/heights/4-feet.png', position: 170 }
    },
    
    // Color/Finish options
    FINISHES: ['silver', 'bronze', 'black', 'copper'],
    
    // Glass type display names
    GLASS_TYPES: {
        'clear': '12mm Clear Toughened Glass',
        'frosted': '12mm Frosted Toughened Glass',
        'tinted': '12mm Tinted Toughened Glass'
    },
    
    // User type display names
    USER_TYPES: {
        'looking': 'Looking for Myself',
        'architect': 'Architect',
        'contractor': 'Contractor',
        'designer': 'Interior Designer'
    },
    
    // Timeline display names
    TIMELINES: {
        'urgent': 'Urgent - Within 30 Days',
        '1-3': '1-3 Months',
        '3-6': '3-6 Months',
        '6+': '6+ Months'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}