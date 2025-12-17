// BimaZz Store - JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('BimaZz Store website loaded successfully!');
    
    // Smooth scrolling untuk navigasi
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active nav link berdasarkan scroll position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Animasi untuk service cards saat masuk viewport
    const serviceCards = document.querySelectorAll('.service-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Animasi untuk process steps
    const processSteps = document.querySelectorAll('.step');
    const stepObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);
    
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        stepObserver.observe(step);
    });
    
    // Konfirmasi sebelum mengirim pesan WA (kecuali floating button dan nav button)
    const waButtons = document.querySelectorAll('a[href*="wa.me"]');
    waButtons.forEach(button => {
        if (!button.classList.contains('float-wa') && !button.classList.contains('wa-button')) {
            button.addEventListener('click', function(e) {
                const serviceName = this.closest('.service-card') ? 
                    this.closest('.service-card').querySelector('h3').textContent : 
                    'layanan';
                
                if (!confirm(`Anda akan diarahkan ke WhatsApp untuk memesan ${serviceName}. Lanjutkan?`)) {
                    e.preventDefault();
                }
            });
        }
    });
    
    // Efek ketikan untuk hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 20);
            }
        };
        
        // Mulai efek ketikan setelah 1 detik
        setTimeout(typeWriter, 1000);
    }
    
    // Tambahkan tahun otomatis di footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
    
    // Efek parallax untuk background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const bgElements = document.querySelectorAll('.circle, .square');
        
        bgElements.forEach(element => {
            const speed = element.classList.contains('circle-1') || element.classList.contains('square-1') ? 0.3 : 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Highlight important warning
    const warningBox = document.querySelector('.warning-box');
    if (warningBox) {
        setInterval(() => {
            warningBox.style.boxShadow = warningBox.style.boxShadow === 'var(--shadow)' 
                ? '0 0 30px rgba(255, 152, 0, 0.5)' 
                : 'var(--shadow)';
        }, 2000);
    }
});