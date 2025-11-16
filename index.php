
<?php 

include_once('header.php');
?>
//body contents go here


    <main class="flex-grow-1">
    
    <!-- Hero Section -->
    <section class="wedding-hero">
        <div class="hero-slider">
            <div class="slider-container">
                <div class="slide active">
                    <img src="https://pinpro.in/wp-content/uploads/2023/03/Optimized-PINPRO-Banner-1-2-1-1.jpg" alt="Digital Solutions 1">
                    <div class="slide-content">
                        <div class="container-fluid">
                            <div class="container-wrapper">
                                <div class="hero-content-text">
                                    <h1 class="hero-main-title">Digital Excellence for Modern Business</h1>
                                    <p class="hero-subtitle">Transform your brand with cutting-edge digital solutions</p>
                                    <div class="hero-buttons">
                                        <a href="#services" class="btn btn-hero-primary">Explore Services</a>
                                        <a href="contact.php" class="btn btn-hero-outline">Get Started</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="slide">
                    <img src="https://pinpro.in/wp-content/uploads/2023/03/Optimized-PINPRO-BANNER-2.jpg" alt="Digital Solutions 2">
                    <div class="slide-content">
                        <div class="container-fluid">
                            <div class="container-wrapper">
                                <div class="hero-content-text">
                                    <h1 class="hero-main-title">Innovative Digital Solutions</h1>
                                    <p class="hero-subtitle">Elevate your business presence with our comprehensive digital services</p>
                                    <div class="hero-buttons">
                                        <a href="#services" class="btn btn-hero-primary">Explore Services</a>
                                        <a href="contact.php" class="btn btn-hero-outline">Get Started</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="slide">
                    <img src="https://pinpro.in/wp-content/uploads/2023/03/Optimized-PINPRO-Banner-3.jpg" alt="Digital Solutions 3">
                    <div class="slide-content">
                        <div class="container-fluid">
                            <div class="container-wrapper">
                                <div class="hero-content-text">
                                    <h1 class="hero-main-title">Your Digital Partner</h1>
                                    <p class="hero-subtitle">Professional services tailored to your digital transformation needs</p>
                                    <div class="hero-buttons">
                                        <a href="#services" class="btn btn-hero-primary">Explore Services</a>
                                        <a href="contact.php" class="btn btn-hero-outline">Get Started</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Slider Navigation -->
            <div class="slider-nav">
                <button class="slider-btn prev-btn" onclick="changeSlide(-1)">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="slider-btn next-btn" onclick="changeSlide(1)">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            
            <!-- Slider Dots -->
            <div class="slider-dots">
                <span class="dot active" onclick="currentSlide(1)"></span>
                <span class="dot" onclick="currentSlide(2)"></span>
                <span class="dot" onclick="currentSlide(3)"></span>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services-section">
        <div class="container">
            <div class="row justify-content-center mb-5">
                <div class="col-lg-8 text-center">
                    <h2 class="section-title">Our Digital Services</h2>
                    <p class="section-subtitle">Comprehensive digital solutions to transform your business</p>
                </div>
            </div>
            <div class="row g-4">
                <div class="col-lg-4 col-md-6">
                    <div class="service-card-modern">
                        <div class="service-icon-wrapper">
                            <i class="fas fa-heart service-icon"></i>
                        </div>
                        <div class="service-content">
                            <h3>Digital Wedding Invitations</h3>
                            <p>Beautiful, interactive digital wedding invitations that make your special day memorable</p>
                            <ul class="service-features">
                                <li><i class="fas fa-check"></i> Custom designs</li>
                                <li><i class="fas fa-check"></i> Video invitations</li>
                                <li><i class="fas fa-check"></i> RSVP tracking</li>
                            </ul>
                            <a href="wedding.php" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="service-card-modern">
                        <div class="service-icon-wrapper">
                            <i class="fas fa-qrcode service-icon"></i>
                        </div>
                        <div class="service-content">
                            <h3>QR Smart Cards</h3>
                            <p>Innovative QR code solutions for seamless digital sharing and networking</p>
                            <ul class="service-features">
                                <li><i class="fas fa-check"></i> Business cards</li>
                                <li><i class="fas fa-check"></i> Contact sharing</li>
                                <li><i class="fas fa-check"></i> Analytics tracking</li>
                            </ul>
                            <a href="#" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="service-card-modern">
                        <div class="service-icon-wrapper">
                            <i class="fas fa-star service-icon"></i>
                        </div>
                        <div class="service-content">
                            <h3>GMB Review Cards</h3>
                            <p>Boost your online presence with Google My Business review management</p>
                            <ul class="service-features">
                                <li><i class="fas fa-check"></i> Review generation</li>
                                <li><i class="fas fa-check"></i> Rating improvement</li>
                                <li><i class="fas fa-check"></i> Local SEO boost</li>
                            </ul>
                            <a href="#" class="service-link">Learn More <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Statistics Section -->
    <section class="statistics-section">
        <div class="container">
            <div class="row g-4">
                <div class="col-lg-3 col-md-6">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-number">5000+</div>
                        <p class="stat-label">Happy Clients</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-project-diagram"></i>
                        </div>
                        <div class="stat-number">10000+</div>
                        <p class="stat-label">Projects Completed</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-award"></i>
                        </div>
                        <div class="stat-number">50+</div>
                        <p class="stat-label">Awards Won</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-number">24/7</div>
                        <p class="stat-label">Support Available</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="section-content">
                        <h2 class="section-title">Why Choose Digintag?</h2>
                        <p class="section-subtitle">We provide comprehensive digital solutions with cutting-edge technology and exceptional service</p>
                        <div class="feature-list">
                            <div class="feature-item">
                                <div class="feature-icon-small">
                                    <i class="fas fa-rocket"></i>
                                </div>
                                <div class="feature-text">
                                    <h5>Fast Delivery</h5>
                                    <p>Quick turnaround time for all your digital needs without compromising quality</p>
                                </div>
                            </div>
                            <div class="feature-item">
                                <div class="feature-icon-small">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <div class="feature-text">
                                    <h5>Secure Platform</h5>
                                    <p>Your data is protected with enterprise-grade security measures</p>
                                </div>
                            </div>
                            <div class="feature-item">
                                <div class="feature-icon-small">
                                    <i class="fas fa-mobile-alt"></i>
                                </div>
                                <div class="feature-text">
                                    <h5>Mobile Friendly</h5>
                                    <p>All our solutions are optimized for perfect mobile experience</p>
                                </div>
                            </div>
                            <div class="feature-item">
                                <div class="feature-icon-small">
                                    <i class="fas fa-headset"></i>
                                </div>
                                <div class="feature-text">
                                    <h5>24/7 Support</h5>
                                    <p>Round-the-clock assistance to help you succeed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="features-visual">
                        <div class="floating-elements">
                            <div class="floating-card" style="top: 20%; left: 10%;">
                                <i class="fas fa-heart"></i>
                                <span>Wedding Invites</span>
                            </div>
                            <div class="floating-card" style="top: 60%; left: 50%;">
                                <i class="fas fa-qrcode"></i>
                                <span>QR Cards</span>
                            </div>
                            <div class="floating-card" style="top: 30%; left: 80%;">
                                <i class="fas fa-star"></i>
                                <span>GMB Reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
        <div class="container">
            <div class="row justify-content-center mb-5">
                <div class="col-lg-8 text-center">
                    <h2 class="section-title">What Our Clients Say</h2>
                    <p class="section-subtitle">Real experiences from our valued customers</p>
                </div>
            </div>
            <div class="row g-4">
                <div class="col-lg-4 col-md-6">
                    <div class="testimonial-card">
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p class="testimonial-text">"Digintag transformed our wedding invitation experience. The digital invitations were beautiful and easy to share!"</p>
                        <div class="testimonial-author">
                            <div class="author-info">
                                <h5>Sarah Johnson</h5>
                                <span>Happy Bride</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="testimonial-card">
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p class="testimonial-text">"The QR smart cards have revolutionized our networking. Professional, modern, and effective!"</p>
                        <div class="testimonial-author">
                            <div class="author-info">
                                <h5>Michael Chen</h5>
                                <span>Business Owner</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="testimonial-card">
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p class="testimonial-text">"Our Google My Business ratings improved significantly with Digintag's review management service."</p>
                        <div class="testimonial-author">
                            <div class="author-info">
                                <h5>Emily Davis</h5>
                                <span>Marketing Manager</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <div class="cta-text">
                    <h2>Ready to Transform Your Digital Presence?</h2>
                    <p>Join thousands of satisfied customers who have already elevated their digital experience with Digintag's innovative solutions.</p>
                    <div class="cta-buttons">
                        <a href="contact.php" class="btn-cta-primary">Get Started Now</a>
                        <a href="about.php" class="btn-cta-outline">Learn More</a>
                    </div>
                </div>
                <div class="cta-visual">
                    <div class="cta-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </main>
    <div class="sticky-contact-footer">
        <div class="sticky-contact-btn left-btn" onclick="window.location.href='tel:+919876543210'">
            <i class="fas fa-phone"></i>
            <span>Call Us</span>
        </div>
        <div class="sticky-contact-btn right-btn" onclick="window.open('https://wa.me/919876543210', '_blank')">
            <i class="fab fa-whatsapp"></i>
            <span>WhatsApp</span>
        </div>
    </div>

    <footer>
        <div class="container-fluid">
            <div class="container-wrapper">
                <div class="row align-items-center">
                    <div class="col-sm-6">
                        <p> 2024 Digintag | Digital Tagging Platform</p>
                    </div>
                    <div class="col-sm-6 text-md-end">
                        <a href="about.html" class="btn btn-link text-decoration-none me-3">About</a>
                        <a href="contact.html" class="btn btn-link text-decoration-none">Contact</a>
                    </div>
                </div>
                <!-- /Row -->
            </div>
        </div>
    </footer>
    <!-- /Footer -->

</div>
<!-- /flex-column -->

<!-- COMMON SCRIPTS -->
<script src="js/common_scripts.min.js"></script>
<script src="js/common_functions.js"></script>

<!-- SMOOTH SCROLL -->
<script>
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
</script>

<!-- Hero Slider JavaScript -->
<script>
    let currentSlideIndex = 1;
    let slideInterval;

    // Initialize slider
    document.addEventListener('DOMContentLoaded', function() {
        showSlide(currentSlideIndex);
        startAutoSlide();
    });

    // Show slide function
    function showSlide(n) {
        let slides = document.getElementsByClassName('slide');
        let dots = document.getElementsByClassName('dot');
        
        if (n > slides.length) { currentSlideIndex = 1 }
        if (n < 1) { currentSlideIndex = slides.length }
        
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        
        // Remove active class from all dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        
        // Show current slide and activate dot
        slides[currentSlideIndex - 1].classList.add('active');
        dots[currentSlideIndex - 1].classList.add('active');
    }

    function changeSlide(n) {
        currentSlideIndex += n;
        showSlide(currentSlideIndex);
        resetInterval();
    }

    function currentSlide(n) {
        currentSlideIndex = n;
        showSlide(currentSlideIndex);
        resetInterval();
    }

    function nextSlide() {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    }
</script>

</body>

</html>
