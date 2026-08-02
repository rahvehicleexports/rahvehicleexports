/**
 * RAH Vehicle Exports - Agent System
 * Handles agent registration, login, and dashboard functionality
 */

(function() {
    'use strict';

    // ========================================
    // AGENT REGISTRATION FORM
    // ========================================
    const agentForm = document.getElementById('agentRegistrationForm');
    const formStatus = document.getElementById('agentFormStatus');

    if (agentForm) {
        agentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate agreement checkbox
            const agreement = document.getElementById('agreement');
            if (!agreement.checked) {
                showStatus('Please accept the agreement to continue.', 'error');
                return;
            }

            // Collect form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                dob: document.getElementById('dob').value,
                gender: document.getElementById('gender').value,
                country: document.getElementById('country').value,
                city: document.getElementById('city').value,
                address: document.getElementById('address').value,
                phone: document.getElementById('phone').value,
                whatsapp: document.getElementById('whatsapp').value,
                email: document.getElementById('email').value,
                occupation: document.getElementById('occupation').value,
                companyName: document.getElementById('companyName').value,
                vehicleExperience: document.getElementById('vehicleExperience').value,
                yearsExperience: document.getElementById('yearsExperience').value,
                facebookProfile: document.getElementById('facebookProfile').value,
                instagramProfile: document.getElementById('instagramProfile').value,
                linkedinProfile: document.getElementById('linkedinProfile').value,
                paymentMethod: document.getElementById('paymentMethod').value,
                bankName: document.getElementById('bankName').value,
                accountName: document.getElementById('accountName').value,
                accountNumber: document.getElementById('accountNumber').value,
                swiftCode: document.getElementById('swiftCode').value,
                paypal: document.getElementById('paypal').value,
                wise: document.getElementById('wise').value,
                agreement: agreement.checked
            };

            // Show loading state
            const submitBtn = document.getElementById('submitAgentBtn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(function() {
                // Generate Agent ID (simulated)
                const agentId = 'RAH' + String(Math.floor(Math.random() * 9000) + 1000);
                
                showStatus(`✅ Application submitted successfully! Your Agent ID: <strong>${agentId}</strong><br>You will receive an email confirmation with login details.`, 'success');
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Reset form after 5 seconds
                setTimeout(function() {
                    agentForm.reset();
                    formStatus.innerHTML = '';
                }, 5000);

                // Store in localStorage (for demo)
                const agents = JSON.parse(localStorage.getItem('rah_agents') || '[]');
                agents.push({
                    ...formData,
                    agentId: agentId,
                    status: 'pending',
                    joinDate: new Date().toISOString(),
                    sales: 0,
                    commission: 0
                });
                localStorage.setItem('rah_agents', JSON.stringify(agents));

            }, 2000);
        });
    }

    function showStatus(message, type) {
        if (!formStatus) return;
        formStatus.innerHTML = message;
        formStatus.style.color = type === 'error' ? '#EF4444' : '#10B981';
        formStatus.style.display = 'block';
    }

    // ========================================
    // AGENT DASHBOARD STATS (Demo)
    // ========================================
    function loadAgentStats() {
        const stats = document.querySelectorAll('.stat-number');
        if (!stats.length) return;

        // Animate numbers
        stats.forEach(function(stat) {
            const target = parseInt(stat.getAttribute('data-target')) || parseInt(stat.textContent);
            if (target > 0) {
                let current = 0;
                const duration = 1500;
                const steps = 30;
                const increment = target / steps;
                const stepTime = duration / steps;
                
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + (target > 10 ? '+' : '');
                }, stepTime);
            }
        });
    }

    // ========================================
    // AGENT TABLE POPULATION
    // ========================================
    function loadAgentTable() {
        const tableBody = document.getElementById('agentTableBody');
        if (!tableBody) return;

        const agents = JSON.parse(localStorage.getItem('rah_agents') || '[]');
        
        if (agents.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:40px;">No agents registered yet.</td></tr>`;
            return;
        }

        tableBody.innerHTML = agents.map(function(agent, index) {
            const statusClass = agent.status === 'approved' ? 'active' : 
                               agent.status === 'rejected' ? 'inactive' : 'pending';
            return `
                <tr>
                    <td>${agent.agentId || 'RAH' + String(1000 + index)}</td>
                    <td>${agent.fullName || 'N/A'}</td>
                    <td>${agent.email || 'N/A'}</td>
                    <td>${agent.country || 'N/A'}</td>
                    <td><span class="badge-status ${statusClass}">${agent.status || 'pending'}</span></td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="viewAgent('${agent.agentId}')"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-outline btn-sm" onclick="approveAgent('${agent.agentId}')"><i class="fas fa-check" style="color:var(--success);"></i></button>
                        <button class="btn btn-outline btn-sm" onclick="rejectAgent('${agent.agentId}')"><i class="fas fa-times" style="color:var(--danger);"></i></button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // ========================================
    // AGENT ACTIONS (Admin)
    // ========================================
    window.viewAgent = function(agentId) {
        alert(`Viewing agent: ${agentId}\nThis would open the full agent profile.`);
    };

    window.approveAgent = function(agentId) {
        if (confirm(`Approve agent ${agentId}?`)) {
            const agents = JSON.parse(localStorage.getItem('rah_agents') || '[]');
            const updated = agents.map(function(a) {
                if (a.agentId === agentId) a.status = 'approved';
                return a;
            });
            localStorage.setItem('rah_agents', JSON.stringify(updated));
            loadAgentTable();
            updateStats();
            alert(`✅ Agent ${agentId} approved! Email notification sent.`);
        }
    };

    window.rejectAgent = function(agentId) {
        if (confirm(`Reject agent ${agentId}?`)) {
            const agents = JSON.parse(localStorage.getItem('rah_agents') || '[]');
            const updated = agents.map(function(a) {
                if (a.agentId === agentId) a.status = 'rejected';
                return a;
            });
            localStorage.setItem('rah_agents', JSON.stringify(updated));
            loadAgentTable();
            updateStats();
            alert(`❌ Agent ${agentId} rejected.`);
        }
    };

    // ========================================
    // UPDATE STATS (Admin)
    // ========================================
    function updateStats() {
        const agents = JSON.parse(localStorage.getItem('rah_agents') || '[]');
        const total = agents.length;
        const pending = agents.filter(a => a.status === 'pending').length;
        const approved = agents.filter(a => a.status === 'approved').length;
        const rejected = agents.filter(a => a.status === 'rejected').length;

        document.getElementById('totalAgents').textContent = total;
        document.getElementById('pendingAgents').textContent = pending;
        document.getElementById('approvedAgents').textContent = approved;
        document.getElementById('rejectedAgents').textContent = rejected;
    }

    // ========================================
    // INIT DASHBOARD
    // ========================================
    if (document.getElementById('agentTableBody')) {
        document.addEventListener('DOMContentLoaded', function() {
            loadAgentTable();
            updateStats();
            loadAgentStats();
        });
    }

    // ========================================
    // ADMIN LOGIN CHECK
    // ========================================
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;

            // Demo credentials
            if (username === 'admin' && password === 'rah2025') {
                sessionStorage.setItem('rah_admin', 'true');
                window.location.href = 'admin-dashboard.html';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }

    // ========================================
    // AGENT LOGIN CHECK
    // ========================================
    const agentLoginForm = document.getElementById('agentLoginForm');
    if (agentLoginForm) {
        agentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('agentEmail').value;
            const password = document.getElementById('agentPassword').value;

            // Demo login - check if agent exists
            const agents = JSON.parse(localStorage.getItem('rah_agents') || '[]');
            const found = agents.find(a => a.email === email && a.status === 'approved');
            
            if (found) {
                sessionStorage.setItem('rah_agent', JSON.stringify(found));
                window.location.href = 'agent-dashboard.html';
            } else {
                alert('Invalid credentials or account not approved. Please check your email.');
            }
        });
    }

    // ========================================
    // PROTECT DASHBOARD PAGES
    // ========================================
    function protectDashboard() {
        const isAdmin = sessionStorage.getItem('rah_admin');
        const isAgent = sessionStorage.getItem('rah_agent');
        
        if (window.location.pathname.includes('admin-dashboard.html') && !isAdmin) {
            window.location.href = 'admin-login.html';
        }
        if (window.location.pathname.includes('agent-dashboard.html') && !isAgent) {
            window.location.href = 'agent-login.html';
        }
    }

    protectDashboard();

    // ========================================
    // LOGOUT
    // ========================================
    window.logout = function() {
        sessionStorage.removeItem('rah_admin');
        sessionStorage.removeItem('rah_agent');
        window.location.href = 'index.html';
    };

    console.log('RAH Agent System loaded.');
})();
