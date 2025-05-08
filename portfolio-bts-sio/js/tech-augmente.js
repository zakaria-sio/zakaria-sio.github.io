document.addEventListener('DOMContentLoaded', () => {
    // Éléments du DOM pour la section À propos
    const aboutButton = document.getElementById('aboutButton');
    const aboutSection = document.getElementById('aboutSection');
    const closeAbout = document.getElementById('closeAbout');

    // Ouvrir la section À propos
    aboutButton.addEventListener('click', () => {
        aboutSection.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le défilement de la page
    });

    // Fermer la section À propos
    closeAbout.addEventListener('click', () => {
        aboutSection.classList.remove('active');
        document.body.style.overflow = ''; // Réactiver le défilement de la page
    });

    // Fermer la section en cliquant en dehors
    aboutSection.addEventListener('click', (e) => {
        if (e.target === aboutSection) {
            aboutSection.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Fermer la section avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutSection.classList.contains('active')) {
            aboutSection.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Animation des cartes de méthode au scroll
    const methodCards = document.querySelectorAll('.method-card');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    methodCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}); 