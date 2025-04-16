document.addEventListener('DOMContentLoaded', function() {
    // Configuration des graphiques radar
    const chartConfig = {
        type: 'radar',
        data: {
            labels: ['Configuration', 'Administration', 'Sécurité', 'Diagnostic', 'Optimisation'],
            datasets: [{
                data: [0, 0, 0, 0, 0],
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 123, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 123, 255, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    // Données pour chaque catégorie de compétences
    const competencesData = {
        reseau: [90, 85, 80, 95, 85],
        systeme: [85, 90, 75, 80, 85],
        securite: [80, 75, 90, 85, 80]
    };

    // Création des graphiques
    const reseauChart = new Chart(
        document.getElementById('reseauChart'),
        {
            ...chartConfig,
            data: {
                ...chartConfig.data,
                datasets: [{
                    ...chartConfig.data.datasets[0],
                    data: competencesData.reseau
                }]
            }
        }
    );

    const systemeChart = new Chart(
        document.getElementById('systemeChart'),
        {
            ...chartConfig,
            data: {
                ...chartConfig.data,
                datasets: [{
                    ...chartConfig.data.datasets[0],
                    data: competencesData.systeme
                }]
            }
        }
    );

    const securiteChart = new Chart(
        document.getElementById('securiteChart'),
        {
            ...chartConfig,
            data: {
                ...chartConfig.data,
                datasets: [{
                    ...chartConfig.data.datasets[0],
                    data: competencesData.securite
                }]
            }
        }
    );

    // Animation des barres de compétences
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width');
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        bar.setAttribute('data-width', width);
        observer.observe(bar);
    });

    // Animation des cartes de certification
    const certificationCards = document.querySelectorAll('.certification-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    certificationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        cardObserver.observe(card);
    });
}); 