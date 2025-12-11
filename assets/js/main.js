 tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary': '#34161E',
                        'accent': '#FFF4F7',
                        'cta': '#F5668D',
                    },
                    fontFamily: {
                        sans: ['Roboto', 'sans-serif'],
                    }
                }
            }
        }        
        
        // Set the current year for the copyright
        document.getElementById('current-year').textContent = new Date().getFullYear();

        /**
         * Toggles the visibility of the mobile menu.
         */
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            if (menu.classList.contains('-translate-x-full')) {
                menu.classList.remove('-translate-x-full');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                menu.classList.add('-translate-x-full');
                document.body.style.overflow = ''; // Restore scrolling
            }
        }

 // Set the current year for the copyright
        document.getElementById('current-year').textContent = new Date().getFullYear();

        /**
         * Toggles the visibility of the mobile menu.
         */
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            if (menu.classList.contains('-translate-x-full')) {
                menu.classList.remove('-translate-x-full');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                menu.classList.add('-translate-x-full');
                document.body.style.overflow = ''; // Restore scrolling
            }
        }

        /**
         * Initialize Owl Carousels
         */
        document.addEventListener('DOMContentLoaded', () => {
            // Configuration for the first carousel (Digital Invitation)
            $('#invitation-carousel').owlCarousel({
                loop: true, 
                margin: 20, 
                nav: true, // Enable navigation arrows
                dots: false, // Disable pagination dots
                autoplay: true, 
                autoplayTimeout: 3000, 
                autoplayHoverPause: true, 
                responsive: {
                    0: { items: 2 }, // Mobile devices
                    640: { items: 3 }, // Small screens/tablets
                    1024: { items: 5 } // Desktops
                }
            });

            // Configuration for the second carousel (Gift Packaging Essentials)
            $('#packaging-carousel').owlCarousel({
                loop: true, 
                margin: 20, 
                nav: true, // Enable navigation arrows
                dots: false, // Disable pagination dots
                autoplay: true, 
                autoplayTimeout: 4000, 
                autoplayHoverPause: true, 
                responsive: {
                    0: { items: 2 }, // Mobile devices
                    640: { items: 3 }, // Small screens/tablets
                    1024: { items: 4 } // Desktops
                }
            });
            
            // Close mobile menu when a navigation link is clicked
            const mobileLinks = document.querySelectorAll('#mobile-menu a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', toggleMenu);
            });
        });
