// API Service
class APIService {
    constructor() {
        this.baseURL = CONFIG.API_BASE_URL;
    }
    
    // Send OTP to phone number
    async sendOTP(phoneNumber) {
        try {
            const response = await fetch(`${this.baseURL}${CONFIG.ENDPOINTS.SEND_OTP}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phoneNumber,
                    countryCode: '+91'
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to send OTP');
            }

            console.log(response)
            
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Send OTP Error:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Verify OTP
    async verifyOTP(phoneNumber, otp) {
        try {
            const response = await fetch(`${this.baseURL}${CONFIG.ENDPOINTS.VERIFY_OTP}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phoneNumber,
                    otp: otp
                })
            });
            
            if (!response.ok) {
                throw new Error('Invalid OTP');
            }
            
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Verify OTP Error:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Submit quotation
    async submitQuote(quoteData) {
        try {
            const response = await fetch(`${this.baseURL}${CONFIG.ENDPOINTS.SUBMIT_QUOTE}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quoteData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to submit quote');
            }
            
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Submit Quote Error:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Mock API for development - Remove in production
    async sendOTPMock(phoneNumber) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('OTP sent to:', phoneNumber);
                resolve({ success: true, data: { otp: '123456' } });
            }, 1000);
        });
    }
    
    async verifyOTPMock(phoneNumber, otp) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (otp === '123456' || otp.length === 6) {
                    resolve({ success: true, data: { verified: true } });
                } else {
                    resolve({ success: false, error: 'Invalid OTP' });
                }
            }, 1000);
        });
    }
    
    async submitQuoteMock(quoteData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Quote submitted:', quoteData);
                resolve({ success: true, data: { quoteId: 'QT' + Date.now() } });
            }, 1500);
        });
    }
}

// Create global instance
const apiService = new APIService();