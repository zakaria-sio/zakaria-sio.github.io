document.addEventListener('DOMContentLoaded', () => {
    // Gestion du menu mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Animation au scroll
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

    // Observer les éléments à animer
    document.querySelectorAll('.presentation-content, .hero-content').forEach(el => {
        observer.observe(el);
    });

    // Animation du header au scroll
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Réponses prédéfinies du chatbot
    const chatbotResponses = {
        services: "Je propose la création de sites web via IA, l'accompagnement IA/automatisation, la modernisation d'Excel, la cybersécurité basique et des services réseau avancés (VLAN, ACL, NAT/PAT, segmentation, routage).",
        tarifs: "Je propose des forfaits flexibles adaptés à vos besoins, généralement entre 5 et 10 heures par semaine. Contactez-moi pour un devis personnalisé.",
        disponibilite: "Je suis disponible entre 5 et 10 heures par semaine selon vos besoins, avec des plages horaires flexibles.",
        lieu: "Je travaille à distance ou sur place selon vos besoins et votre localisation.",
        expertise: "Je suis formé à la mise en place de VLAN, ACL, NAT/PAT, segmentation réseau et configuration de routage pour PME.",
        demarrer: "Pour démarrer un projet, remplissez le formulaire de contact ou appelez-moi directement au 07 69 79 63 18."
    };

    // Éléments du DOM
    const chatbotIcon = document.getElementById('chatbotIcon');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChat = document.getElementById('closeChat');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const questionSelect = document.getElementById('questionSelect');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');

    // Fonction pour ajouter un message dans le chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Fonction pour gérer les questions prédéfinies
    function handleQuestion(questionType) {
        if (!questionType) return;
        const questionText = questionSelect.options[questionSelect.selectedIndex].text;
        addMessage(questionText, true);
        setTimeout(() => {
            addMessage(chatbotResponses[questionType]);
        }, 500);
        questionSelect.value = ''; // Réinitialiser le select
    }

    // Fonction pour gérer les messages personnalisés
    function handleCustomMessage(message) {
        addMessage(message, true);
        setTimeout(() => {
            addMessage("Je vous répondrai par email dans les plus brefs délais. En attendant, vous pouvez consulter les questions fréquentes ci-dessus ou me contacter directement au 07 69 79 63 18.");
        }, 500);
    }

    // Événements
    chatbotIcon.addEventListener('click', () => {
        chatbotWindow.classList.add('active');
    });

    closeChat.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    questionSelect.addEventListener('change', () => {
        handleQuestion(questionSelect.value);
    });

    sendMessage.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            handleCustomMessage(message);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                handleCustomMessage(message);
                userInput.value = '';
            }
        }
    });
}); 