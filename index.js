// Enhanced Back to Top Button with Scroll Progress
class BackToTopButton {
    constructor() {
        this.button = document.createElement('button');
        this.progressRing = document.createElement('div');
        this.setupButton();
        this.setupScrollListener();
    }

    setupButton() {
        this.button.innerHTML = `
            <svg width="50" height="50" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="22" fill="none" stroke="#007bff" stroke-width="4" />
                <path d="M25 15 L15 25 L25 15 Z" fill="white" />
                <text x="25" y="35" text-anchor="middle" fill="white" font-size="16">↑</text>
            </svg>
        `;
        this.button.className = 'back_to_top';
        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(this.button);
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            const scrollPercentage = 
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercentage > 20) {
                this.button.style.display = 'block';
                this.button.style.opacity = Math.min(scrollPercentage / 50, 1);
            } else {
                this.button.style.display = 'none';
            }
        });
    }
}

// Advanced Hover Effects with Multiple Interactions
class InteractiveCards {
    constructor(selector) {
        this.cards = document.querySelectorAll(selector);
        this.setupCardInteractions();
    }

    setupCardInteractions() {
        this.cards.forEach(card => {
            // Hover Effects
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.3s ease';
                card.style.transform = 'scale(1.05) translateY(-10px)';
                card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1) translateY(0)';
                card.style.boxShadow = 'none';
            });

            // Click Ripple Effect
            card.addEventListener('click', this.createRippleEffect);
        });
    }

    createRippleEffect(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => {
            ripple.remove();
        }, 300);
    }
}

// Dynamic Theme Switcher
class ThemeSwitcher {
    constructor() {
        this.themes = {
            light: {
                '--primary-color': '#669ccb',
                '--secondary-color': '#e8f1fa',
                '--text-dark': '#282d31',
                'background-color': '#ffffff'
            },
            dark: {
                '--primary-color': '#4a7c9b',
                '--secondary-color': '#1a2633',
                '--text-dark': '#e0e0e0',
                'background-color': '#121212'
            }
        };
        this.createThemeSwitcher();
    }

    createThemeSwitcher() {
        const switcher = document.createElement('button');
        switcher.textContent = '🌓';
        switcher.className = 'theme-switcher';
        switcher.style.position = 'fixed';
        switcher.style.top = '20px';
        switcher.style.right = '20px';
        switcher.style.zIndex = '1000';
        
        switcher.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(switcher);
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
        const theme = this.themes[currentTheme];

        document.body.classList.toggle('dark-theme');
        
        Object.entries(theme).forEach(([key, value]) => {
            if (key.startsWith('--')) {
                document.documentElement.style.setProperty(key, value);
            } else {
                document.body.style[key] = value;
            }
        });
    }
}

// Performance Tracking
class PerformanceTracker {
    constructor() {
        window.addEventListener('load', this.trackLoadTime.bind(this));
    }

    trackLoadTime() {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page Load Time: ${loadTime}ms`);
        this.sendPerformanceMetrics(loadTime);
    }

    sendPerformanceMetrics(loadTime) {
        // Simulated performance tracking - replace with actual analytics
        console.log('Performance Metrics:', {
            loadTime,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height
        });
    }
}

// Initialize Features
document.addEventListener('DOMContentLoaded', () => {
    new BackToTopButton();
    new InteractiveCards('.loaction_card');
    new ThemeSwitcher();
    new PerformanceTracker();
});

// Additional Styling for Interactions
const style = document.createElement('style');
style.innerHTML = `
    .back_to_top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: transparent;
        border: none;
        z-index: 1000;
        display: none;
        transition: opacity 0.3s ease;
    }

    .loaction_card .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        background-color: rgba(255, 255, 255, 0.7);
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .theme-switcher {
        font-size: 24px;
        cursor: pointer;
        border: none;
        background: transparent;
    }
`;
document.head.appendChild(style);//