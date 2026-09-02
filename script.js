// HD CONSULTING S.A.C. - Código JavaScript Optimizado
class WebsiteManager {
    constructor() {
        this.header = document.getElementById('header');
        this.sections = document.querySelectorAll('section[id]');
        this.navMenuLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupNavigation();
        this.setupForms();
        this.setupAnimations();
        this.setupMobileMenu();
        this.setupWhatsApp();
        this.addNotificationStyles();
        
        console.log('HD CONSULTING S.A.C. - Website loaded successfully! 🏗️');
    }

    // Efectos de scroll y navegación
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            this.updateHeaderStyle();
            this.updateActiveNavigation();
        });
    }

    updateHeaderStyle() {
        if (!this.header) return;
        
        if (window.scrollY > 100) {
            this.header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            this.header.style.backdropFilter = 'blur(10px)';
        } else {
            this.header.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            this.header.style.backdropFilter = 'none';
        }
    }

    updateActiveNavigation() {
        if (!this.header) return;
        
        let current = '';
        const headerHeight = this.header.offsetHeight;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });

        this.navMenuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }

    // Navegación suave
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .banner-buttons a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothScrollTo(link.getAttribute('href'));
            });
        });
    }

    smoothScrollTo(targetId) {
        const targetSection = document.querySelector(targetId);
        if (!targetSection || !this.header) return;
        
        const headerHeight = this.header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Gestión de formularios
    setupForms() {
        this.setupContactForm();
        this.setupNewsletterForm();
    }

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formObj = Object.fromEntries(formData);
            
            if (!this.validateContactForm(formObj)) return;
            
            this.submitForm(contactForm, '¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.');
        });
    }

    setupNewsletterForm() {
        const newsletterForm = document.querySelector('footer form');
        if (!newsletterForm) return;
        
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!this.validateEmail(email)) return;
            
            this.submitForm(newsletterForm, '¡Te has suscrito exitosamente a nuestro boletín!', () => {
                emailInput.value = '';
            });
        });
    }

    validateContactForm(formObj) {
        if (!formObj.name || !formObj.email || !formObj.phone || !formObj.message) {
            this.showNotification('Por favor, completa todos los campos requeridos.', 'error');
            return false;
        }
        
        if (!this.validateEmail(formObj.email)) return false;
        
        return true;
    }

    validateEmail(email) {
        if (!email) {
            this.showNotification('Por favor, ingresa tu email.', 'error');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showNotification('Por favor, ingresa un email válido.', 'error');
            return false;
        }
        
        return true;
    }

    submitForm(form, successMessage, callback) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            this.showNotification(successMessage, 'success');
            if (callback) callback();
            else form.reset();
            
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    // Animaciones
    setupAnimations() {
        const animateElements = document.querySelectorAll(
            '.property-card, .info-table li, .professional-profile, .highlight-item'
        );
        
        const animateOnScroll = () => {
            animateElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < window.innerHeight - 100) {
                    element.classList.add('animate');
                }
            });
        };

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll();
    }

    // Menú móvil
    setupMobileMenu() {
        const createMobileMenu = () => {
            const nav = document.querySelector('.nav-menu');
            if (!nav) return;
            
            const navUl = nav.querySelector('ul');
            const existingToggle = document.querySelector('.mobile-menu-toggle');
            
            
        };

        window.addEventListener('resize', createMobileMenu);
        createMobileMenu();
    }

    // WhatsApp
    setupWhatsApp() {
        const whatsappButton = document.createElement('div');
        whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
        whatsappButton.className = 'whatsapp-float';
        whatsappButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background-color: #25d366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;
        
        whatsappButton.addEventListener('mouseenter', () => {
            whatsappButton.style.transform = 'scale(1.1)';
            whatsappButton.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
        });
        
        whatsappButton.addEventListener('mouseleave', () => {
            whatsappButton.style.transform = 'scale(1)';
            whatsappButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        });
        
        whatsappButton.addEventListener('click', () => {
            this.contactWhatsApp();
        });
        
        document.body.appendChild(whatsappButton);
    }

    contactWhatsApp(message = 'Hola, me interesa obtener más información sobre sus servicios de construcción.') {
        const phone = '51944074981';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    // Notificaciones
    showNotification(message, type = 'info') {
        // Remover notificaciones existentes
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    addNotificationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .property-card, .info-table li {
                opacity: 0.8;
                transform: translateY(20px);
                transition: all 0.6s ease;
            }
            
            .property-card.animate, .info-table li.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .professional-profile {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }
            
            .professional-profile.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .highlight-item {
                opacity: 0;
                transform: translateX(-20px);
                transition: all 0.5s ease;
            }
            
            .highlight-item:nth-child(even) {
                transform: translateX(20px);
            }
            
            .professional-profile.animate .highlight-item {
                opacity: 1;
                transform: translateX(0);
            }
            
            .professional-profile.animate .highlight-item:nth-child(1) {
                transition-delay: 0.1s;
            }
            
            .professional-profile.animate .highlight-item:nth-child(2) {
                transition-delay: 0.2s;
            }
            
            .professional-profile.animate .highlight-item:nth-child(3) {
                transition-delay: 0.3s;
            }
            
            .professional-profile.animate .highlight-item:nth-child(4) {
                transition-delay: 0.4s;
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 5px;
                color: white;
                font-weight: 600;
                z-index: 10000;
                transform: translateX(400px);
                transition: all 0.3s ease;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            
            .notification.show { transform: translateX(0); }
            .notification.success { background-color: #059b9a; }
            .notification.error { background-color: #e74c3c; }
            .notification.info { background-color: #3498db; }
            
            @media (max-width: 768px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    transform: translateY(-100px);
                }
                .notification.show { transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    // Utilidades públicas
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Slideshow del banner
class BannerSlideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        if (this.slides.length > 0) this.init();
    }

    init() {
        this.startSlideshow();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetInterval();
            });
        });

        const banner = document.getElementById('main-banner');
        if (banner) {
            banner.addEventListener('mouseenter', () => this.pauseSlideshow());
            banner.addEventListener('mouseleave', () => this.startSlideshow());
        }
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    startSlideshow() {
        this.slideInterval = setInterval(() => this.nextSlide(), 3000);
    }

    pauseSlideshow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    resetInterval() {
        this.pauseSlideshow();
        this.startSlideshow();
    }
}

// Carrusel de módulos - UN SOLO MÓDULO CON AUTOPLAY
class ProjectCarousel {
    constructor() {
        this.track = document.getElementById('carousel-track');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorsContainer = document.querySelector('#properties-section .carousel-indicators');
        this.carouselContainer = document.querySelector('.carousel-container');
        this.timerProgress = document.querySelector('.timer-progress');
        
        if (!this.track) return;
        
        // CORREGIDO: Seleccionar solo los elementos .module-card
        this.cards = Array.from(this.track.querySelectorAll('.module-card'));
        this.currentIndex = 0;
        this.isPlaying = true;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 20000; // 20 segundos
        this.timerInterval = null;
        
        this.init();
    }

    init() {
        this.setupCards();
        this.createIndicators();
        this.updateDisplay();
        this.setupEventListeners();
        this.startAutoPlay();
        
        window.addEventListener('resize', () => {
            this.updateDisplay();
        });
        
        console.log('ProjectCarousel inicializado con', this.cards.length, 'módulos');
    }

    setupCards() {
        this.cardsPerView = 1; // Siempre mostrar 1 módulo
        
        // Asegurarse de que solo trabajamos con 3 módulos
        if (this.cards.length > 3) {
            this.cards = this.cards.slice(0, 3);
        }
        
        this.totalCards = this.cards.length;
        this.maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
        
        console.log('Total de módulos:', this.totalCards);
        
        this.cards.forEach((card, index) => {
            card.style.flex = '0 0 100%';
        });
    }

    createIndicators() {
        if (!this.indicatorsContainer) {
            console.error('No se encontró el contenedor de indicadores');
            return;
        }
        
        this.indicatorsContainer.innerHTML = '';
        
        // Crear EXACTAMENTE 3 indicadores
        const totalIndicators = 3;
        console.log('Creando', totalIndicators, 'indicadores');
        
        for (let i = 0; i < totalIndicators; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.dataset.index = i;
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
        
        console.log('Indicadores creados:', this.indicatorsContainer.children.length);
    }

    setupEventListeners() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        if (this.carouselContainer) {
            this.carouselContainer.addEventListener('mouseenter', () => {
                if (this.isPlaying) this.pauseAutoPlay();
            });
            
            this.carouselContainer.addEventListener('mouseleave', () => {
                if (this.isPlaying) this.startAutoPlay();
            });
        }
        
        this.setupTouchEvents();
        this.setupKeyboardNavigation();
    }

    setupTouchEvents() {
        let startX = 0;
        let isDragging = false;
        const threshold = 50;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pauseAutoPlay();
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
            
            if (this.isPlaying) this.startAutoPlay();
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }

    updateDisplay() {
        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar clases active en las tarjetas
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
        });
        
        // Actualizar indicadores - SOLO 3
        const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index < this.totalCards) {
                indicator.classList.toggle('active', index === this.currentIndex);
            } else {
                indicator.style.display = 'none';
            }
        });
        
        this.updateNavigationButtons();
        this.resetTimerAnimation();
    }

    updateNavigationButtons() {
        if (this.prevBtn) {
            this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
            this.prevBtn.style.cursor = this.currentIndex === 0 ? 'not-allowed' : 'pointer';
        }
        
        if (this.nextBtn) {
            this.nextBtn.style.opacity = this.currentIndex >= this.maxIndex ? '0.5' : '1';
            this.nextBtn.style.cursor = this.currentIndex >= this.maxIndex ? 'not-allowed' : 'pointer';
        }
    }

    goToSlide(index) {
        // Limitar al número real de tarjetas (máximo 3)
        const validIndex = Math.max(0, Math.min(index, this.totalCards - 1));
        this.currentIndex = validIndex;
        this.updateDisplay();
        this.resetAutoPlay();
    }

    nextSlide() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Volver al inicio
        }
        this.updateDisplay();
        this.resetAutoPlay();
    }

    previousSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.maxIndex; // Ir al último
        }
        this.updateDisplay();
        this.resetAutoPlay();
    }

    startAutoPlay() {
        if (!this.isPlaying) return;
        
        this.pauseAutoPlay();
        this.startTimerAnimation();
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        
        this.pauseTimerAnimation();
    }

    resetAutoPlay() {
        if (this.isPlaying) {
            this.pauseAutoPlay();
            this.startAutoPlay();
        }
    }

    startTimerAnimation() {
        if (!this.timerProgress) return;
        
        // Resetear la animación
        this.timerProgress.style.animation = 'none';
        this.timerProgress.offsetHeight; // Trigger reflow
        this.timerProgress.style.animation = 'progressBar 20s linear forwards';
    }

    pauseTimerAnimation() {
        if (!this.timerProgress) return;
        
        const computedStyle = window.getComputedStyle(this.timerProgress);
        const animationPlayState = computedStyle.animationPlayState;
        
        if (animationPlayState === 'running') {
            this.timerProgress.style.animationPlayState = 'paused';
        }
    }

    resetTimerAnimation() {
        if (!this.timerProgress) return;
        
        this.timerProgress.style.animation = 'none';
        this.timerProgress.offsetHeight; // Trigger reflow
        
        if (this.isPlaying) {
            this.timerProgress.style.animation = 'progressBar 20s linear forwards';
        }
    }
}

// Carrusel de clientes - REVISADO
class ClientCarousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.carousel = document.getElementById('carousel');
        this.indicators = document.querySelector('#clientes-section .carousel-indicators');
        
        if (!this.track) return;
        
        this.currentSlide = 0;
        this.totalSlides = this.track.children.length;
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.slideWidth = 230;
        
        this.init();
    }

    init() {
        this.createIndicators();
        this.updateCarousel();
        this.setupEventListeners();
        this.setupResponsive();
    }

    createIndicators() {
        if (!this.indicators) return;
        
        this.indicators.innerHTML = '';
        
        // Crear indicadores para el carrusel de clientes
        const slidesPerView = 4;
        const totalIndicatorSlides = Math.ceil(this.totalSlides / slidesPerView);
        
        for (let i = 0; i < totalIndicatorSlides; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(i * slidesPerView));
            this.indicators.appendChild(indicator);
        }
    }

    updateIndicators() {
        if (!this.indicators) return;
        
        const slidesPerView = 4;
        const indicators = this.indicators.querySelectorAll('.indicator');
        const currentIndicator = Math.floor(this.currentSlide / slidesPerView);
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndicator);
        });
    }

    setupEventListeners() {
        this.carousel.addEventListener('mousedown', (e) => this.startDrag(e));
        this.carousel.addEventListener('touchstart', (e) => this.startDrag(e));
        
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('touchmove', (e) => this.drag(e));
        
        document.addEventListener('mouseup', () => this.endDrag());
        document.addEventListener('touchend', () => this.endDrag());
        
        this.carousel.addEventListener('selectstart', (e) => e.preventDefault());
    }

    setupResponsive() {
        const updateSlideWidth = () => {
            this.slideWidth = window.innerWidth <= 768 ? 210 : 230;
            this.updateCarousel();
        };
        
        window.addEventListener('resize', updateSlideWidth);
        updateSlideWidth();
    }

    startDrag(e) {
        this.isDragging = true;
        this.startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        this.currentX = this.startX;
        this.carousel.style.cursor = 'grabbing';
    }

    drag(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        this.currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const deltaX = this.currentX - this.startX;
        const resistance = Math.abs(deltaX) > 30 ? 0.8 : 1;
        const offset = -this.currentSlide * this.slideWidth + deltaX * resistance;
        this.track.style.transform = `translateX(${offset}px)`;
    }

    endDrag() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.carousel.style.cursor = 'grab';
        
        const deltaX = this.currentX - this.startX;
        const threshold = this.slideWidth / 5;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                this.moveSlide(-1);
            } else {
                this.moveSlide(1);
            }
        } else {
            this.updateCarousel();
        }
    }

    moveSlide(direction) {
        this.currentSlide += direction;
        
        if (this.currentSlide < 0) {
            this.currentSlide = this.totalSlides - 1;
        } else if (this.currentSlide >= this.totalSlides) {
            this.currentSlide = 0;
        }
        
        this.updateCarousel();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex >= this.totalSlides ? 0 : slideIndex;
        this.updateCarousel();
    }

    updateCarousel() {
        const offset = -this.currentSlide * this.slideWidth;
        this.track.style.transform = `translateX(${offset}px)`;
        this.updateIndicators();
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Instanciar todas las clases
    new WebsiteManager();
    new BannerSlideshow();
    new ProjectCarousel();
    new ClientCarousel();
    
    // Funciones globales
    window.scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    window.contactWhatsApp = (message = 'Hola, me interesa obtener más información sobre sus servicios de construcción.') => {
        const phone = '51944074981';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };
});

// Funcionalidad del menú hamburguesa para móviles - MENÚ DESDE LA DERECHA
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Función para alternar el menú
    function toggleMenu() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Cambiar el icono del botón hamburguesa
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            // Convertir a X
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            // Volver a hamburguesa
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    }
    
    // Event listener para el botón hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Cerrar menú al hacer click en un enlace
    const menuLinks = document.querySelectorAll('.nav-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Resetear icono
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        });
    });
    
    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(event) {
        // Solo cerrar si se hace click fuera del menú y del botón hamburguesa
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Resetear icono
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
    
    // Cerrar menú al cambiar el tamaño de la ventana (si vuelve a desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1092) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Resetear icono
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
    
    // Cerrar menú al presionar la tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Resetear icono
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
});