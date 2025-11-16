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

<?php if (isset($includeSlider) && $includeSlider): ?>
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

    // Change slide function
    function changeSlide(n) {
        showSlide(currentSlideIndex += n);
        resetAutoSlide();
    }

    // Current slide function (for dots)
    function currentSlide(n) {
        showSlide(currentSlideIndex = n);
        resetAutoSlide();
    }

    // Auto slide function
    function startAutoSlide() {
        slideInterval = setInterval(function() {
            currentSlideIndex++;
            showSlide(currentSlideIndex);
        }, 5000); // Change slide every 5 seconds
    }

    // Reset auto slide
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // Pause auto slide on hover
    document.addEventListener('DOMContentLoaded', function() {
        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });
            
            slider.addEventListener('mouseleave', function() {
                startAutoSlide();
            });
        }
    });
</script>
<?php endif; ?>

</div>
<!-- /min-vh-100 d-flex flex-column -->

</body>

</html>
