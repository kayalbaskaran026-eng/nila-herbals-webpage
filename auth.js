// ==========================================
// Nila Herbals - Authentication Page Script
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sliding Panel Toggles
    const signUpButton = document.getElementById('signUpBtn');
    const signInButton = document.getElementById('signInBtn');
    const container = document.getElementById('authWrapper');

    if (signUpButton && signInButton && container) {
        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });
    }

    // 2. Spawn botanical falling leaves
    initAuthLeaves();
});

// Mobile helper toggle
function toggleMobileAuth() {
    const container = document.getElementById('authWrapper');
    if (container) {
        container.classList.toggle('right-panel-active');
    }
}

// 3. Form Validation and Custom Submission Animation
function handleFormSubmit(event, type) {
    event.preventDefault();
    const form = event.target;
    
    let isValid = true;
    let errorMessage = "";

    if (type === 'signup') {
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const agree = document.getElementById('agreeTerms').checked;

        if (name.trim().length < 3) {
            isValid = false;
            errorMessage = "Please enter a valid name (at least 3 characters).";
        } else if (!validateEmail(email)) {
            isValid = false;
            errorMessage = "Please enter a valid email address.";
        } else if (password.length < 6) {
            isValid = false;
            errorMessage = "Password must be at least 6 characters long.";
        } else if (!agree) {
            isValid = false;
            errorMessage = "You must agree to the terms and conditions.";
        }
    } else {
        const email = document.getElementById('logEmail').value;
        const password = document.getElementById('logPassword').value;

        if (!validateEmail(email)) {
            isValid = false;
            errorMessage = "Please enter a valid email address.";
        } else if (password.length < 6) {
            isValid = false;
            errorMessage = "Incorrect email or password pattern.";
        }
    }

    if (!isValid) {
        // Trigger visual shake feedback on error
        form.classList.add('shake');
        alert(errorMessage);
        setTimeout(() => {
            form.classList.remove('shake');
        }, 400);
    } else {
        // Show success animation overlay
        const overlay = document.getElementById('successOverlay');
        const title = document.getElementById('successMessageTitle');
        const desc = document.getElementById('successMessageDesc');

        if (type === 'signup') {
            title.textContent = "Welcome to Nila! 🌿";
            desc.textContent = "Your botanical account has been created. Redirecting to home...";
        } else {
            title.textContent = "Welcome Back! 🌸";
            desc.textContent = "Sign in successful. Synchronizing your skincare routine...";
        }

        if (overlay) {
            overlay.classList.add('active');
            
            // Redirect after 2.5 seconds
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2500);
        }
    }
}

// Email regex helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// 4. Botanical Falling Leaves in auth leaves background (Optimized CSS animations)
function initAuthLeaves() {
    const container = document.getElementById('authLeaves');
    if (!container) return;

    const leafIcons = ['🍃', '🌿', '🌱'];

    const spawnLeaf = () => {
        if (document.hidden) return;
        if (container.children.length > 20) return;

        const leaf = document.createElement('div');
        leaf.className = 'falling-leaf';
        leaf.textContent = leafIcons[Math.floor(Math.random() * leafIcons.length)];
        
        const left = Math.random() * 100;
        const size = Math.random() * 14 + 12;
        const duration = Math.random() * 8 + 6;
        const sway = Math.random() * 140 - 70;
        const rotate = Math.random() * 720 - 360;
        const opacity = Math.random() * 0.35 + 0.15;

        leaf.style.left = `${left}vw`;
        leaf.style.fontSize = `${size}px`;
        leaf.style.animationDuration = `${duration}s`;
        leaf.style.setProperty('--leaf-opacity', opacity);
        leaf.style.setProperty('--leaf-sway', `${sway}px`);
        leaf.style.setProperty('--leaf-rotate', `${rotate}deg`);

        container.appendChild(leaf);

        leaf.addEventListener('animationend', () => {
            leaf.remove();
        });
    };

    // Spawn first batch
    for (let i = 0; i < 5; i++) {
        setTimeout(spawnLeaf, Math.random() * 3000);
    }

    // Interval loop
    setInterval(spawnLeaf, 2000);
}
