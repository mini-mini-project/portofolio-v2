document.addEventListener('DOMContentLoaded', () => {
    // Navigasi
    const navLinksDesktop = document.querySelectorAll('#desktop-nav a');
    const sections = document.querySelectorAll('.page-section');
    
    // Elemen Hamburger
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    // Fungsi utama untuk menampilkan section
    function showSection(targetId) {
        // Nonaktifkan semua section (Disperse)
        sections.forEach(section => {
            section.classList.remove('active-page');
            // Catatan: Efek disebarkan/transform otomatis dari CSS saat kelas dihapus
        });

        // Aktifkan section target (Assemble)
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            // Beri sedikit waktu untuk memicu transisi NanoTech di CSS
            setTimeout(() => {
                targetSection.classList.add('active-page');
            }, 50); 
        }
    }

    // --- Logika Hamburger Menu ---
    function toggleMobileMenu() {
        hamburgerBtn.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-open');
        // Kunci scrolling pada body
        document.body.classList.toggle('no-scroll', mobileMenu.classList.contains('is-open'));
    }
    
    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    // Event Listener Navigasi Desktop
    navLinksDesktop.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            navLinksDesktop.forEach(l => l.classList.remove('active-link'));
            link.classList.add('active-link');

            showSection(targetId);
        });
    });

    // Event Listener Navigasi Mobile (Tutup menu setelah klik)
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Tutup menu
            toggleMobileMenu();

            // Pindah Section
            showSection(targetId);
            
            // Sinkronkan kelas active di link desktop
            navLinksDesktop.forEach(l => {
                 l.classList.remove('active-link');
                 if(l.getAttribute('href') === targetId) {
                     l.classList.add('active-link');
                 }
            });
        });
    });


    // Inisialisasi: Tampilkan bagian home saat pertama kali dimuat
    const initialSectionId = window.location.hash || '#home';
    showSection(initialSectionId);
    
    // Sinkronkan link desktop saat inisialisasi
    const initialDesktopLink = document.querySelector(`a[href="${initialSectionId}"]`);
    if (initialDesktopLink) {
        initialDesktopLink.classList.add('active-link');
    }
});