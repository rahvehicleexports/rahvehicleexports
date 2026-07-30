(function() {
    'use strict';

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const WHATSAPP_NUMBER = '923397574906';

    function getFormData() {
        return {
            fullName: document.getElementById('fullName')?.value || '',
            country: document.getElementById('country')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            whatsapp: document.getElementById('whatsapp')?.value || '',
            email: document.getElementById('email')?.value || '',
            vehicleInterest: document.getElementById('vehicleInterest')?.value || '',
            budget: document.getElementById('budget')?.value || '',
            message: document.getElementById('message')?.value || ''
        };
    }

    function buildWhatsAppMessage(data) {
        let message = 'Hello RAH Vehicle Exports!%0A%0A';
        message += '📋 *New Vehicle Inquiry*%0A%0A';
        message += `👤 *Name:* ${data.fullName || 'Not provided'}%0A`;
        message += `🌍 *Country:* ${data.country || 'Not provided'}%0A`;
        message += `📞 *Phone:* ${data.phone || 'Not provided'}%0A`;
        message += `💬 *WhatsApp:* ${data.whatsapp || 'Not provided'}%0A`;
        message += `📧 *Email:* ${data.email || 'Not provided'}%0A`;
        message += `🚗 *Vehicle Interest:* ${data.vehicleInterest || 'Not specified'}%0A`;
        message += `💰 *Budget:* ${data.budget || 'Not specified'} USD%0A%0A`;
        message += `📝 *Message:* ${data.message || 'No additional message'}%0A%0A`;
        message += '🙏 Thank you!';
        return message;
    }

    function redirectToWhatsApp(message) {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, '_blank');
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        let firstError = null;
        inputs.forEach(function(input) {
            input.style.borderColor = '';
            const value = input.value.trim();
            if (!value) {
                input.style.borderColor = '#EF4444';
                isValid = false;
                if (!firstError) firstError = input;
                return;
            }
            if (input.type === 'email' && !validateEmail(value)) {
                input.style.borderColor = '#EF4444';
                isValid = false;
                if (!firstError) firstError = input;
                return;
            }
        });
        if (firstError) {
            firstError.focus();
            showStatus('Please fill in all required fields correctly.', 'error');
        } else if (isValid) {
            showStatus('', '');
        }
        return isValid;
    }

    function showStatus(message, type) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.style.color = type === 'error' ? '#EF4444' : '#10B981';
        formStatus.style.display = message ? 'block' : 'none';
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!validateForm(this)) return;
            const data = getFormData();
            const message = buildWhatsAppMessage(data);
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';
                submitBtn.disabled = true;
            }
            setTimeout(function() {
                redirectToWhatsApp(message);
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Send via WhatsApp';
                    submitBtn.disabled = false;
                }
                showStatus('✓ Redirecting to WhatsApp...', 'success');
                setTimeout(function() {
                    contactForm.reset();
                    showStatus('', '');
                }, 3000);
            }, 800);
        });

        contactForm.querySelectorAll('input, textarea').forEach(function(input) {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#EF4444';
                } else {
                    this.style.borderColor = '';
                }
            });
            input.addEventListener('input', function() {
                if (this.style.borderColor === '#EF4444' && this.value.trim()) {
                    this.style.borderColor = '';
                }
            });
        });
    }

    console.log('RAH Vehicle Exports - Form loaded.');
})();