// Main Application Logic
class RailingDesigner {
    constructor() {
        this.state = {
            finish: 'silver',
            base: 'ace',
            handrail: 'sleek',
            glassType: 'clear',
            userType: 'looking',
            installation: 'no',
            pincode: '',
            timeline: 'urgent',
            projectName: '',
            height: '3.5',
            otpSent: false,
            otpVerified: false,
            phoneNumber: ''
        };
        
        this.carouselPositions = {
            base: 0,
            handrail: 0
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateAllImages();
        this.updateSummary();
    }
    
    bindEvents() {
        // Finish selection
        document.querySelectorAll('.finish-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFinishChange(e));
        });
        
        // Base selection
        document.querySelectorAll('.base-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.info-btn')) {
                    this.handleBaseChange(e);
                }
            });
        });
        
        // Handrail selection
        document.querySelectorAll('.handrail-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.info-btn')) {
                    this.handleHandrailChange(e);
                }
            });
        });
        
        // Info buttons
        document.querySelectorAll('[data-modal]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showModal(btn.dataset.modal);
            });
        });
        
        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });
        
        // Close modal on backdrop click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        });
        
        // Form inputs
        document.getElementById('glassType').addEventListener('change', (e) => {
            this.state.glassType = e.target.value;
            this.updateSummary();
        });
        
        document.getElementById('userType').addEventListener('change', (e) => {
            this.state.userType = e.target.value;
            this.updateSummary();
        });
        
        document.querySelectorAll('input[name="installation"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.state.installation = e.target.value;
                this.updateSummary();
            });
        });
        
        document.getElementById('pincode').addEventListener('input', (e) => {
            this.state.pincode = e.target.value;
        });
        
        document.getElementById('timeline').addEventListener('change', (e) => {
            this.state.timeline = e.target.value;
            this.updateSummary();
        });
        
        document.getElementById('projectName').addEventListener('input', (e) => {
            this.state.projectName = e.target.value;
            this.updateSummary();
        });
        
        // Height selection
        document.querySelectorAll('input[name="height"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.state.height = e.target.value;
                this.updateHeightVisualization();
                this.updateSummary();
            });
        });
        
        // Carousel buttons
        document.querySelectorAll('.carousel-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCarousel(e));
        });
        
        // Continue button
        document.getElementById('continueBtn').addEventListener('click', () => {
            this.openQuotationModal();
        });
        
        // Send OTP
        document.getElementById('sendOtpBtn').addEventListener('click', () => {
            this.sendOTP();
        });
        
        // Quotation form
        document.getElementById('quotationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitQuotation();
        });
        
        // Back button
        document.getElementById('backToForm').addEventListener('click', () => {
            this.closeModal();
        });
        
        // Success modal buttons
        document.getElementById('downloadPdfBtn').addEventListener('click', () => {
            this.downloadPDF();
        });
        
        document.getElementById('closeSuccessBtn').addEventListener('click', () => {
            this.closeModal();
            location.reload();
        });
        
        // Phone validation
        document.getElementById('userPhone').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
            document.getElementById('phoneError').classList.add('hidden');
        });
        
        // OTP validation
        document.getElementById('userOtp').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
            document.getElementById('otpError').classList.add('hidden');
        });
    }
    
    handleFinishChange(e) {
        const finish = e.currentTarget.dataset.finish;
        this.state.finish = finish;
        
        // Update active state
        document.querySelectorAll('.finish-btn').forEach(btn => {
            btn.dataset.active = btn.dataset.finish === finish;
            if (btn.dataset.finish === finish) {
                btn.classList.add('border-blue-500');
                btn.classList.remove('border-transparent');
            } else {
                btn.classList.remove('border-blue-500');
                btn.classList.add('border-transparent');
            }
        });
        
        this.updateAllImages();
        this.updateSummary();
    }
    
    handleBaseChange(e) {
        const base = e.currentTarget.dataset.base;
        this.state.base = base;
        
        // Update active state
        document.querySelectorAll('.base-card').forEach(card => {
            const isActive = card.dataset.base === base;
            card.dataset.active = isActive;
            if (isActive) {
                card.classList.add('border-blue-500', 'bg-blue-50');
                card.classList.remove('border-transparent');
            } else {
                card.classList.remove('border-blue-500', 'bg-blue-50');
                card.classList.add('border-transparent');
            }
        });
        
        this.updateSummary();
    }
    
    handleHandrailChange(e) {
        const handrail = e.currentTarget.dataset.handrail;
        this.state.handrail = handrail;
        
        // Update active state
        document.querySelectorAll('.handrail-card').forEach(card => {
            const isActive = card.dataset.handrail === handrail;
            card.dataset.active = isActive;
            if (isActive) {
                card.classList.add('border-blue-500', 'bg-blue-50');
                card.classList.remove('border-transparent');
            } else {
                card.classList.remove('border-blue-500', 'bg-blue-50');
                card.classList.add('border-transparent');
            }
        });
        
        this.updateAllImages();
        this.updateSummary();
    }
    
    updateAllImages() {
        // Update base images
        document.querySelectorAll('.base-card').forEach(card => {
            const base = card.dataset.base;
            const img = card.querySelector('.base-image');
            img.src = `assets/images/bases/${base}-${this.state.finish}.png`;
        });
        
        // Update handrail images
        document.querySelectorAll('.handrail-card').forEach(card => {
            const handrail = card.dataset.handrail;
            const img = card.querySelector('.handrail-image');
            img.src = `assets/images/handrails/${handrail}-${this.state.finish}.png`;
        });
    }
    
    updateHeightVisualization() {
        const height = this.state.height;
        const heightConfig = CONFIG.HEIGHTS[height];
        
        // Update text
        document.getElementById('selectedHeight').textContent = heightConfig.label;
        
        // Update indicator position
        const indicator = document.getElementById('heightIndicator');
        indicator.style.bottom = heightConfig.position + 'px';
        indicator.querySelector('span').textContent = heightConfig.label;
        
        // Update sample image
        const sampleImage = document.getElementById('heightSampleImage');
        sampleImage.src = heightConfig.image;
        
        // Update radio label styling
        document.querySelectorAll('input[name="height"]').forEach(radio => {
            const label = radio.closest('label');
            if (radio.value === height) {
                label.classList.add('border-blue-500', 'bg-blue-50');
                label.classList.remove('border-gray-300');
            } else {
                label.classList.remove('border-blue-500', 'bg-blue-50');
                label.classList.add('border-gray-300');
            }
        });
    }
    
    updateSummary() {
        document.getElementById('summaryFinish').textContent = 
            this.state.finish.charAt(0).toUpperCase() + this.state.finish.slice(1);
        
        document.getElementById('summaryBase').textContent = 
            this.state.base.charAt(0).toUpperCase() + this.state.base.slice(1);
        
        document.getElementById('summaryHandrail').textContent = 
            this.state.handrail.charAt(0).toUpperCase() + this.state.handrail.slice(1);
        
        document.getElementById('summaryGlass').textContent = 
            CONFIG.GLASS_TYPES[this.state.glassType];
        
        document.getElementById('summaryHeight').textContent = 
            this.state.height + ' ft';
        
        document.getElementById('summaryUserType').textContent = 
            CONFIG.USER_TYPES[this.state.userType];
        
        document.getElementById('summaryTimeline').textContent = 
            CONFIG.TIMELINES[this.state.timeline];
        
        document.getElementById('summaryInstallation').textContent = 
            this.state.installation.charAt(0).toUpperCase() + this.state.installation.slice(1);
        
        // Project name
        const projectNameSection = document.getElementById('summaryProjectName');
        const projectNameValue = document.getElementById('summaryProjectNameValue');
        if (this.state.projectName) {
            projectNameSection.style.display = 'block';
            projectNameValue.textContent = this.state.projectName;
        } else {
            projectNameSection.style.display = 'none';
        }
    }
    
    handleCarousel(e) {
        const btn = e.currentTarget;
        const carouselType = btn.dataset.carousel;
        const isPrev = btn.classList.contains('prev');
        const track = document.getElementById(carouselType + 'Carousel');
        const items = track.querySelectorAll('.carousel-item');
        const itemWidth = items[0].offsetWidth;
        const visibleItems = Math.floor(track.parentElement.offsetWidth / itemWidth);
        const maxPosition = items.length - visibleItems;
        
        if (isPrev) {
            this.carouselPositions[carouselType] = Math.max(0, this.carouselPositions[carouselType] - 1);
        } else {
            this.carouselPositions[carouselType] = Math.min(maxPosition, this.carouselPositions[carouselType] + 1);
        }
        
        const offset = -this.carouselPositions[carouselType] * itemWidth;
        track.style.transform = `translateX(${offset}px)`;
    }
    
    showModal(baseType) {
        const modal = document.getElementById('baseModal');
        const baseInfo = CONFIG.BASES[baseType];
        
        document.getElementById('modalTitle').textContent = baseInfo.name;
        document.getElementById('modalImage').src = baseInfo.image;
        document.getElementById('modalDescription').textContent = baseInfo.description;
        document.getElementById('modalSuitable').textContent = baseInfo.suitable;
        
        modal.classList.remove('hidden');
    }
    
    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }
    
    openQuotationModal() {
        document.getElementById('quotationModal').classList.remove('hidden');
    }
    
    showLoading() {
        document.getElementById('loadingOverlay').classList.remove('hidden');
    }
    
    hideLoading() {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }
    
    async sendOTP() {
        const phoneInput = document.getElementById('userPhone');
        const phoneNumber = phoneInput.value.trim();
        
        // Validate phone number
        if (phoneNumber.length !== 10) {
            document.getElementById('phoneError').classList.remove('hidden');
            return;
        }
        
        this.showLoading();
        
        // Use mock API for development - Replace with actual API call
        const result = await apiService.sendOTPMock(phoneNumber);
        // const result = await apiService.sendOTP(phoneNumber);
        
        this.hideLoading();
        
        if (result.success) {
            this.state.phoneNumber = phoneNumber;
            this.state.otpSent = true;
            document.getElementById('otpField').classList.remove('hidden');
            document.getElementById('sendOtpBtn').textContent = 'Resend OTP';
            document.getElementById('sendOtpBtn').classList.add('bg-gray-500', 'hover:bg-gray-600');
            document.getElementById('sendOtpBtn').classList.remove('bg-blue-500', 'hover:bg-blue-600');
            
            // Show success message
            alert('OTP sent successfully!');
        } else {
            alert('Failed to send OTP. Please try again.');
        }
    }
    
    async verifyOTP(otp) {
        this.showLoading();
        
        // Use mock API for development - Replace with actual API call
        const result = await apiService.verifyOTPMock(this.state.phoneNumber, otp);
        // const result = await apiService.verifyOTP(this.state.phoneNumber, otp);
        
        this.hideLoading();
        
        if (result.success) {
            this.state.otpVerified = true;
            return true;
        } else {
            document.getElementById('otpError').classList.remove('hidden');
            return false;
        }
    }
    
    async submitQuotation() {
        const name = document.getElementById('userName').value.trim();
        const phone = document.getElementById('userPhone').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const quantity = document.getElementById('quantity').value;
        const otp = document.getElementById('userOtp').value.trim();
        
        // Validate fields
        if (!name || !phone || !email || !quantity) {
            alert('Please fill all required fields');
            return;
        }
        
        // Check if OTP is sent
        if (!this.state.otpSent) {
            alert('Please send OTP first');
            return;
        }
        
        // Verify OTP
        if (!this.state.otpVerified) {
            if (!otp || otp.length !== 6) {
                document.getElementById('otpError').classList.remove('hidden');
                return;
            }
            
            const verified = await this.verifyOTP(otp);
            if (!verified) {
                return;
            }
        }
        
        // Prepare quote data
        const quoteData = {
            customerInfo: {
                name: name,
                phone: '+91' + phone,
                email: email,
                userType: this.state.userType
            },
            railingConfig: {
                finish: this.state.finish,
                base: this.state.base,
                handrail: this.state.handrail,
                glassType: this.state.glassType,
                height: this.state.height,
                quantity: quantity
            },
            projectInfo: {
                name: this.state.projectName,
                pincode: this.state.pincode,
                timeline: this.state.timeline,
                installation: this.state.installation
            },
            timestamp: new Date().toISOString()
        };
        
        this.showLoading();
        
        // Use mock API for development - Replace with actual API call
        const result = await apiService.submitQuoteMock(quoteData);
        // const result = await apiService.submitQuote(quoteData);
        
        this.hideLoading();
        
        if (result.success) {
            this.closeModal();
            document.getElementById('successModal').classList.remove('hidden');
        } else {
            alert('Failed to submit quote. Please try again.');
        }
    }
    
    downloadPDF() {
        // Create PDF content
        const pdfContent = `
            <div id="pdfContent" style="padding: 40px; font-family: Arial, sans-serif;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #333; font-size: 32px; margin-bottom: 10px;">Imperio Railing System</h1>
                    <h2 style="color: #666; font-size: 24px;">Your Custom Selection</h2>
                </div>
                
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <h3 style="color: #333; font-size: 20px; margin-bottom: 15px;">Configuration Details</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px; font-weight: bold;">Finish:</td>
                            <td style="padding: 10px;">${this.state.finish.charAt(0).toUpperCase() + this.state.finish.slice(1)}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px; font-weight: bold;">Base:</td>
                            <td style="padding: 10px;">${this.state.base.charAt(0).toUpperCase() + this.state.base.slice(1)}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px; font-weight: bold;">Handrail:</td>
                            <td style="padding: 10px;">${this.state.handrail.charAt(0).toUpperCase() + this.state.handrail.slice(1)}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px; font-weight: bold;">Glass Type:</td>
                            <td style="padding: 10px;">${CONFIG.GLASS_TYPES[this.state.glassType]}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px; font-weight: bold;">Height:</td>
                            <td style="padding: 10px;">${this.state.height} Feet</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 10px; font-weight: bold;">Quantity:</td>
                            <td style="padding: 10px;">${document.getElementById('quantity').value} Running Feet</td>
                        </tr>
                    </table>
                </div>
                
                ${this.state.projectName ? `
                <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <h3 style="color: #333; font-size: 20px; margin-bottom: 10px;">Project Information</h3>
                    <p style="margin: 5px 0;"><strong>Project Name:</strong> ${this.state.projectName}</p>
                    <p style="margin: 5px 0;"><strong>Timeline:</strong> ${CONFIG.TIMELINES[this.state.timeline]}</p>
                    <p style="margin: 5px 0;"><strong>Installation:</strong> ${this.state.installation === 'yes' ? 'Required' : 'Not Required'}</p>
                </div>
                ` : ''}
                
                <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <h3 style="color: #333; font-size: 20px; margin-bottom: 10px;">Contact Information</h3>
                    <p style="margin: 5px 0;"><strong>Name:</strong> ${document.getElementById('userName').value}</p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> ${document.getElementById('userEmail').value}</p>
                    <p style="margin: 5px 0;"><strong>Phone:</strong> +91 ${document.getElementById('userPhone').value}</p>
                </div>
                
                <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #333;">
                    <p style="color: #666; font-size: 14px;">Quote generated on ${new Date().toLocaleDateString()}</p>
                    <p style="color: #666; font-size: 14px;">Thank you for choosing Imperio Railing Systems</p>
                </div>
            </div>
        `;
        
        // Create a new window for printing
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Railing Selection - Imperio</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(pdfContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        
        // Wait for content to load then print
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new RailingDesigner();
});