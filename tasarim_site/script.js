/**
 * Quadrata Passport - Cosmic Cinematic JavaScript
 * Advanced JavaScript for cinematic hero section and interactive elements
 */

// Global Configuration
const CONFIG = {
    video: {
        playbackRate: 1,
        volumeLevel: 0,
        qualityThreshold: 768,
        preloadDelay: 100
    },
    particles: {
        count: 50,
        maxSpeed: 0.7,
        minSpeed: 0.2,
        size: { min: 2, max: 5 },
        opacity: { min: 0.3, max: 1 },
        colors: ['#8000FF', '#B000FF', '#FF006C', '#006CFF']
    },
    animations: {
        wordRevealDelay: 400,
        glassAppearDelay: 3000,
        scrollThrottleDelay: 16,
        colorSampleRate: 60
    },
    breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1440
    }
};

// Performance tracking
const performance = {
    enabled: true,
    fps: 0,
    frameCount: 0,
    lastTime: 0,
    
    update() {
        if (!this.enabled) return;
        
        this.frameCount++;
        const now = Date.now();
        
        if (now - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = now;
            
            // Adaptive quality based on FPS
            if (this.fps < 30) {
                ParticleSystem.reduce();
            } else if (this.fps > 50) {
                ParticleSystem.enhance();
            }
        }
    }
};

// Cosmic Particle System
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('cosmic-particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = this.isMobile() ? 50 : 100;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', this.resize.bind(this));
    }
    
    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(dpr, dpr);
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle() {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            life: Math.random() * 100 + 50,
            maxLife: 150,
            color: this.getRandomColor()
        };
    }
    
    getRandomColor() {
        const colors = [
            'rgba(139, 92, 246, ',  // electric-purple
            'rgba(59, 130, 246, ',   // neon-blue
            'rgba(99, 102, 241, ',   // cosmic-purple
            'rgba(255, 255, 255, '   // white
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateParticle(particle) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life--;
        
        // Boundary wrapping
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;
        
        // Fade effect based on life
        particle.opacity = (particle.life / particle.maxLife) * 0.7;
        
        // Regenerate particle when life ends
        if (particle.life <= 0) {
            Object.assign(particle, this.createParticle());
        }
    }
    
    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color + particle.opacity + ')';
        this.ctx.fill();
        
        // Add glow effect
        this.ctx.shadowColor = particle.color + '0.8)';
        this.ctx.shadowBlur = particle.size * 2;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });
        
        // Draw connections between nearby particles
        this.drawConnections();
        
        performance.update();
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    static reduce() {
        if (window.particleSystem && window.particleSystem.maxParticles > 30) {
            window.particleSystem.maxParticles -= 10;
            window.particleSystem.createParticles();
        }
    }
    
    static enhance() {
        if (window.particleSystem && window.particleSystem.maxParticles < 100) {
            window.particleSystem.maxParticles += 5;
            window.particleSystem.createParticles();
        }
    }
    
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}

// Smooth Scroll Manager
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Navigation Controller
class NavigationController {
    constructor() {
        this.nav = document.querySelector('nav');
        this.init();
    }
    
    init() {
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    handleScroll() {
        const scrolled = window.scrollY > 100;
        
        if (scrolled) {
            this.nav.style.background = 'rgba(5, 5, 8, 0.95)';
            this.nav.style.backdropFilter = 'blur(30px)';
        } else {
            this.nav.style.background = 'rgba(5, 5, 8, 0.8)';
            this.nav.style.backdropFilter = 'blur(20px)';
        }
    }
}

// Chain Integration Controller
class IntegrationController {
    constructor() {
        this.chainSelect = document.getElementById('chain-select');
        this.codeContent = document.getElementById('code-content');
        this.init();
    }
    
    init() {
        if (this.chainSelect) {
            this.chainSelect.addEventListener('change', this.handleChainChange.bind(this));
        }
    }
    
    handleChainChange(e) {
        const chain = e.target.value;
        const codeSnippets = {
            ethereum: `import { QuadrataPassport } from '@quadrata/core'

const passport = new QuadrataPassport({
  chainId: 1,
  apiKey: 'your-api-key'
})

// Verify user identity
const result = await passport.verify(address)
console.log('Verification:', result)`,

            polygon: `import { QuadrataPassport } from '@quadrata/core'

const passport = new QuadrataPassport({
  chainId: 137,
  apiKey: 'your-api-key'
})

// Fast verification on Polygon
const result = await passport.verify(address)
console.log('Verified on Polygon:', result)`,

            arbitrum: `import { QuadrataPassport } from '@quadrata/core'

const passport = new QuadrataPassport({
  chainId: 42161,
  apiKey: 'your-api-key'
})

// L2 verification
const result = await passport.verify(address)
console.log('Arbitrum verification:', result)`,

            optimism: `import { QuadrataPassport } from '@quadrata/core'

const passport = new QuadrataPassport({
  chainId: 10,
  apiKey: 'your-api-key'
})

// Optimistic verification
const result = await passport.verify(address)
console.log('Optimism result:', result)`,

            avalanche: `import { QuadrataPassport } from '@quadrata/core'

const passport = new QuadrataPassport({
  chainId: 43114,
  apiKey: 'your-api-key'
})

// Avalanche network verification
const result = await passport.verify(address)
console.log('Avalanche verified:', result)`
        };
        
        if (chain && codeSnippets[chain]) {
            this.animateCodeChange(codeSnippets[chain]);
        } else {
            this.codeContent.textContent = '// Select a blockchain to see integration code';
        }
    }
    
    animateCodeChange(newCode) {
        this.codeContent.style.opacity = '0';
        this.codeContent.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            this.codeContent.textContent = newCode;
            this.codeContent.style.opacity = '1';
            this.codeContent.style.transform = 'translateY(0)';
        }, 150);
    }
}

// Hero Animations Controller
class HeroAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.animateHeadlines();
        this.animateGlassCard();
    }
    
    animateHeadlines() {
        const headlines = document.querySelectorAll('.headline-line');
        headlines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.animation = 'text-reveal 1s ease-out forwards';
            }, index * 300);
        });
    }
    
    animateGlassCard() {
        const glassCard = document.querySelector('.glass-card');
        if (glassCard) {
            setTimeout(() => {
                glassCard.style.opacity = '1';
                glassCard.style.animation = 'glass-appear 1.5s ease-out forwards';
            }, 800);
        }
    }
}

// Intersection Observer for animations
class AnimationObserver {
    constructor() {
        this.init();
    }
    
    init() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver(this.handleIntersection, options);
        
        // Observe animated elements
        document.querySelectorAll('.feature-card, .partner-card, .integration-demo-card').forEach(el => {
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }
}

// Theme and accessibility manager
class AccessibilityManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.handlePrefersReducedMotion();
        this.setupKeyboardNavigation();
    }
    
    handlePrefersReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
            
            // Disable particle system for reduced motion
            if (window.particleSystem) {
                window.particleSystem.maxParticles = 10;
                window.particleSystem.createParticles();
            }
        }
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

// Error handling and fallbacks
class ErrorHandler {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('error', this.handleError.bind(this));
        window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
    }
    
    handleError(event) {
        console.warn('Runtime error caught:', event.error);
        
        // Fallback for canvas issues
        if (event.error.message.includes('canvas') || event.error.message.includes('WebGL')) {
            this.disableCanvasFeatures();
        }
    }
    
    handlePromiseRejection(event) {
        console.warn('Promise rejection caught:', event.reason);
        event.preventDefault();
    }
    
    disableCanvasFeatures() {
        const canvas = document.getElementById('cosmic-particles');
        if (canvas) {
            canvas.style.display = 'none';
        }
        
        // Show fallback background
        document.querySelector('.cosmic-background').style.background = 
            'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 25%, rgba(10, 10, 15, 0.8) 50%, rgba(5, 5, 8, 1) 100%)';
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Quadrata Passport - Cosmic Theme Initialized');
    
    try {
        // Initialize core systems
        window.particleSystem = new ParticleSystem();
        window.smoothScroll = new SmoothScroll();
        window.navigationController = new NavigationController();
        window.integrationController = new IntegrationController();
        window.heroAnimations = new HeroAnimations();
        window.animationObserver = new AnimationObserver();
        window.accessibilityManager = new AccessibilityManager();
        window.errorHandler = new ErrorHandler();
        
        console.log('✅ All systems initialized successfully');
        
    } catch (error) {
        console.error('❌ Initialization error:', error);
        
        // Fallback initialization
        window.errorHandler = new ErrorHandler();
        window.errorHandler.disableCanvasFeatures();
    }
});

// Page visibility handling for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        if (window.particleSystem && window.particleSystem.animationId) {
            cancelAnimationFrame(window.particleSystem.animationId);
        }
    } else {
        // Resume animations when tab becomes visible
        if (window.particleSystem) {
            window.particleSystem.animate();
        }
    }
});

// Utility functions
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function getDevicePixelRatio() {
    return window.devicePixelRatio || 1;
}

// Export for external use
window.QuadrataTheme = {
    performance,
    ParticleSystem,
    SmoothScroll,
    NavigationController,
    IntegrationController,
    HeroAnimations,
    AnimationObserver,
    AccessibilityManager,
    ErrorHandler,
    utils: {
        isMobile,
        isTouch,
        getDevicePixelRatio
    }
}; 