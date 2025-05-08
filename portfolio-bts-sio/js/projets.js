document.addEventListener('DOMContentLoaded', () => {
    // Données des projets
    const projets = {
        vlan: {
            titre: "Configuration VLAN",
            description: "Ce projet consistait à mettre en place une infrastructure réseau avec segmentation VLAN pour une entreprise de taille moyenne. Les objectifs principaux étaient :",
            details: [
                "Création de VLANs pour séparer les différents services (Administration, Production, Invités)",
                "Configuration du routage inter-VLAN",
                "Mise en place de la sécurité avec ACLs",
                "Documentation complète de l'infrastructure"
            ],
            technologies: ["Cisco", "VLAN", "Routage", "ACL"],
            image: "images/projets/vlan-config.jpg"
        },
        virtualisation: {
            titre: "Virtualisation d'Infrastructure",
            description: "Mise en place d'une infrastructure virtualisée complète avec VMware pour une entreprise en croissance. Les points clés du projet :",
            details: [
                "Installation et configuration de VMware ESXi",
                "Création de machines virtuelles pour différents services",
                "Mise en place de la haute disponibilité",
                "Gestion des ressources et monitoring"
            ],
            technologies: ["VMware", "ESXi", "vSphere", "Virtualisation"],
            image: "images/projets/virtualisation.jpg"
        },
        acl: {
            titre: "Mise en place d'ACL",
            description: "Configuration de listes de contrôle d'accès pour sécuriser l'infrastructure réseau. Les aspects principaux :",
            details: [
                "Analyse des besoins de sécurité",
                "Création d'ACLs standard et étendues",
                "Application des ACLs sur les interfaces appropriées",
                "Tests de sécurité et documentation"
            ],
            technologies: ["Cisco", "ACL", "Sécurité", "Routage"],
            image: "images/projets/acl-config.jpg"
        },
        nap: {
            titre: "Configuration NAP",
            description: "Mise en place de Network Access Protection pour contrôler l'accès au réseau. Les fonctionnalités implémentées :",
            details: [
                "Configuration du serveur NAP",
                "Mise en place des politiques de santé",
                "Intégration avec Active Directory",
                "Gestion des clients non conformes"
            ],
            technologies: ["Windows Server", "NAP", "Active Directory", "Sécurité"],
            image: "images/projets/nap-config.jpg"
        }
    };

    // Gestion des filtres
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projetCards = document.querySelectorAll('.projet-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mise à jour des boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Filtrage des projets
            projetCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Gestion du modal
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');
    const closeModal = modal.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-project');

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.project;
            const project = projets[projectId];

            // Remplissage du modal
            modalBody.innerHTML = `
                <img src="${project.image}" alt="${project.titre}">
                <h2>${project.titre}</h2>
                <p>${project.description}</p>
                <ul>
                    ${project.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            `;

            // Affichage du modal
            modal.style.display = 'block';
        });
    });

    // Fermeture du modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Animation des cartes au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projetCards.forEach(card => {
        observer.observe(card);
    });
}); 