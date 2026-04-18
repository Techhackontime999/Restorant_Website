document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const menuContent = document.getElementById('menuContent');
    const reservationForm = document.getElementById('reservationForm');
    const formSuccess = document.getElementById('formSuccess');
    const newsletterForm = document.getElementById('newsletterForm');

    const menuData = {
        starters: [
            { name: 'French Onion Soup', description: 'Classic caramelized onion soup with gruyere crouton', price: '$16' },
            { name: 'Beef Carpaccio', description: 'Thinly sliced beef tenderloin with arugula and truffle oil', price: '$22' },
            { name: 'Burrata Salad', description: 'Creamy burrata with heirloom tomatoes and basil pesto', price: '$18' },
            { name: 'Seared Foie Gras', description: 'Pan-seared duck liver with fig compote and brioche', price: '$28' }
        ],
        mains: [
            { name: 'Filet Mignon', description: '8oz center-cut tenderloin with red wine jus and truffle mash', price: '$52' },
            { name: 'Pan-Roasted Salmon', description: 'Atlantic salmon with lemon beurre blanc and asparagus', price: '$38' },
            { name: 'Duck Confit', description: 'Slow-cooked duck leg with cherry sauce and potato gratin', price: '$42' },
            { name: 'Lamb Rack', description: 'Herb-crusted New Zealand lamb with mint gremolata', price: '$48' }
        ],
        desserts: [
            { name: 'Creme Brulee', description: 'Classic vanilla bean custard with caramelized sugar crust', price: '$14' },
            { name: 'Chocolate Fondant', description: 'Warm dark chocolate cake with vanilla ice cream', price: '$16' },
            { name: 'Tarte Tatin', description: 'Caramelized apple tart with calvados cream', price: '$15' },
            { name: 'Cheese Selection', description: 'Curated French cheeses with honey and walnuts', price: '$22' }
        ],
        drinks: [
            { name: 'Signature Old Fashioned', description: 'Bourbon, demerara, angostura bitters, orange peel', price: '$18' },
            { name: 'French 75', description: 'Gin, champagne, lemon juice, simple syrup', price: '$20' },
            { name: 'Sommelier Wine Pairing', description: 'Curated wine selection to complement your meal', price: '$35' },
            { name: 'Espresso Martini', description: 'Vodka, fresh espresso, coffee liqueur, vanilla', price: '$17' }
        ]
    };

    function renderMenu(category) {
        const items = menuData[category];
        menuContent.innerHTML = items.map(item => `
            <div class="menu-item">
                <div class="menu-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                <span class="menu-item-price">${item.price}</span>
            </div>
        `).join('');
    }

    renderMenu('starters');

    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMenu(tab.dataset.tab);
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showTestimonial(parseInt(dot.dataset.index));
        });
    });

    setInterval(() => {
        showTestimonial((currentTestimonial + 1) % testimonials.length);
    }, 5000);

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        reservationForm.style.display = 'none';
        formSuccess.classList.add('show');

        setTimeout(() => {
            reservationForm.style.display = 'block';
            formSuccess.classList.remove('show');
            reservationForm.reset();
        }, 5000);
    });

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const button = newsletterForm.querySelector('button');
        button.textContent = 'Subscribed!';
        button.style.background = '#4caf50';
        input.value = '';

        setTimeout(() => {
            button.textContent = 'Subscribe';
            button.style.background = '';
        }, 3000);
    });

    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about-grid, .menu-content, .specials-grid, .gallery-grid').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
