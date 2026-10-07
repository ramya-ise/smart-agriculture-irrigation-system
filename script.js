/**
 * PALLAVI K R - FRESHER SOFTWARE ENGINEER PORTFOLIO JAVASCRIPT
 * Handles Theme Toggling, Navigation Scroll-Spy, Mobile Menu, 
 * Project Modals, Interactive AI Chat Simulation & Contact Form.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
   * 1. Theme Toggle & System Preference Detection (Prompt 2 & 13)
   * ------------------------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const themeModeText = document.querySelector('.theme-mode-text');

  // Check saved preference or fallback to system media query
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);

    const isDark = theme === 'dark';
    const iconClass = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    
    if (themeToggle) {
      themeToggle.querySelector('i').className = iconClass;
      if (themeModeText) themeModeText.textContent = isDark ? 'Dark' : 'Light';
    }
    if (mobileThemeToggle) {
      mobileThemeToggle.querySelector('i').className = iconClass;
    }
  }

  function toggleCurrentTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleCurrentTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleCurrentTheme);

  // Listen to OS theme changes if user hasn't set explicit preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('portfolio-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });


  /* ------------------------------------------------------------------------
   * 2. Mobile Drawer Navigation (Hamburger Menu)
   * ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menuToggle');
  const sidebarNav = document.getElementById('sidebarNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && sidebarNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = sidebarNav.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (sidebarNav.classList.contains('open')) {
          sidebarNav.classList.remove('open');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }


  /* ------------------------------------------------------------------------
   * 3. Vertical Navbar Active Scroll Spy (Prompt 3 & 13)
   * ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('.content-section');

  function updateActiveNavLink() {
    let currentSectionId = 'hero';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSectionId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();


  /* ------------------------------------------------------------------------
   * 4. Typewriter Animation for Hero Tagline (Prompt 2 & 14)
   * ------------------------------------------------------------------------ */
  const typewriterElement = document.getElementById('typewriterText');
  const phrases = [
    'Aspiring Software Engineer',
    'Full-Stack Web Developer',
    'Problem Solver & DSA Enthusiast',
    'Java & Python Programmer',
    '2025 Computer Science Graduate'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of phrase
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400; // Pause before new phrase
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();


  /* ------------------------------------------------------------------------
   * 5. Projects Data & Clickable Modal Logic (Prompt 7)
   * Connected to clickable project thumbnails and detail buttons
   * ------------------------------------------------------------------------ */
  const projectsData = {
    1: {
      category: 'EMBEDDED SYSTEMS & IOT',
      title: 'Greenhouse Monitoring and Control System',
      bannerClass: 'banner-emerald',
      bannerIcon: 'fa-seedling',
      description: 'An automated agricultural micro-climate control system developed with Arduino and C++. Continuously tracks temperature, relative humidity, and soil moisture levels using calibrated sensors to regulate automated irrigation valves and ventilation fans.',
      features: [
        'Monitored temperature, humidity, and soil moisture using DHT11 and soil sensors.',
        'Automated irrigation and ventilation mechanisms via microcontroller relay triggers.',
        'Improved plant growth conditions and reduced water wastage significantly.',
        'Real-time LCD telemetry display and fail-safe automated cutoff limits.'
      ],
      tech: ['Arduino IDE', 'Embedded C++', 'DHT11 Sensor', 'Soil Moisture Sensor', 'Relays', 'IoT'],
      github: 'https://github.com/ramya-ise',
      demo: '#'
    },
    2: {
      category: 'SMART AUTOMATION & SENSORS',
      title: 'Smart Waste Segregation System',
      bannerClass: 'banner-blue',
      bannerIcon: 'fa-recycle',
      description: 'An automated municipal waste classification prototype designed to automatically identify, classify, and segregate wet organic waste from dry recyclable refuse using sensors and microcontroller logic.',
      features: [
        'Automatically segregated wet and dry waste at the collection stage.',
        'Used moisture and inductive proximity sensors with an Arduino microcontroller for accurate waste detection.',
        'Servo motor flap mechanism for mechanical diversion into designated bins.',
        'Improved waste management efficiency and accelerated community recycling workflows.'
      ],
      tech: ['Embedded C++', 'Arduino IDE', 'Moisture Sensors', 'Ultrasonic Sensors', 'Servo Actuators'],
      github: 'https://github.com/ramya-ise',
      demo: '#'
    },
    3: {
      category: 'AI & MACHINE LEARNING',
      title: 'AI Crop Health & Soil Predictor',
      bannerClass: 'banner-purple',
      bannerIcon: 'fa-brain',
      description: 'An intelligent agricultural decision-support model that analyzes soil chemical composition and climatic indicators to predict optimal crop varieties and detect early nutrient deficiencies.',
      features: [
        'Supervised machine learning classification algorithms trained on agro-climatic datasets.',
        'Evaluates soil N-P-K nutrient profiles, temperature, pH, and rainfall metrics.',
        'Interactive Python-driven analytics dashboard with high accuracy predictions.',
        'Actionable fertilizer and crop rotation recommendations.'
      ],
      tech: ['Python', 'Scikit-Learn', 'NumPy', 'Pandas', 'Data Structures & Algorithms'],
      github: 'https://github.com/ramya-ise',
      demo: '#'
    },
    4: {
      category: 'HARDWARE & EMBEDDED C',
      title: 'Smart IoT Energy & Power Monitor',
      bannerClass: 'banner-amber',
      bannerIcon: 'fa-bolt',
      description: 'A smart energy monitoring system engineered to capture real-time AC voltage, current consumption, and power factor metrics with automated surge protection.',
      features: [
        'Real-time power dissipation calculation and cumulative energy consumption tracking.',
        'Automated overload protection relays to disconnect power during voltage spikes.',
        'Modular embedded C++ firmware with fast sensor sampling rates.',
        'Comprehensive performance logging for industrial power efficiency.'
      ],
      tech: ['C / C++', 'Microcontroller', 'Current Sensors', 'Relay Switching', 'Embedded Systems'],
      github: 'https://github.com/ramya-ise',
      demo: '#'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalBanner = document.getElementById('modalBanner');
  const modalBannerIcon = document.getElementById('modalBannerIcon');
  const modalDescription = document.getElementById('modalDescription');
  const modalFeaturesList = document.getElementById('modalFeaturesList');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalGithubLink = document.getElementById('modalGithubLink');
  const modalDemoLink = document.getElementById('modalDemoLink');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalBanner.className = `modal-pixel-banner ${data.bannerClass}`;
    modalBannerIcon.className = `fa-solid ${data.bannerIcon}`;
    modalDescription.textContent = data.description;

    // Populate features list
    modalFeaturesList.innerHTML = '';
    data.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      modalFeaturesList.appendChild(li);
    });

    // Populate tech stack
    modalTechStack.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-pill';
      span.textContent = t;
      modalTechStack.appendChild(span);
    });

    modalGithubLink.href = data.github;
    modalDemoLink.href = data.demo;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  document.querySelectorAll('.open-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pId = btn.getAttribute('data-project');
      openProjectModal(pId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });


  /* ------------------------------------------------------------------------
   * 6. AI Chat Interface Integration (Prompt 10)
   * ------------------------------------------------------------------------ */
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const clearChatBtn = document.getElementById('clearChatBtn');

  // Automated intelligent knowledge base for simulated responses
  const aiKnowledgeBase = [
    {
      keywords: ['skill', 'stack', 'technology', 'technologies', 'programming', 'language', 'c', 'python', 'oops'],
      response: "Ramya is proficient in C, Python, Data Structures & Algorithms, Object-Oriented Programming (OOPs), Fundamentals of AI & Machine Learning, and tools like Git and GitHub."
    },
    {
      keywords: ['project', 'projects', 'build', 'work', 'greenhouse', 'waste', 'segregation', 'arduino'],
      response: "Ramya's featured projects include:\n1. 🌿 **Greenhouse Monitoring and Control System** (Arduino IDE, C++) – automated irrigation, sensor-based temperature & soil moisture monitoring.\n2. ♻️ **Smart Waste Segregation System** (Embedded C++, Arduino IDE) – automatic sensor-driven wet/dry waste separation."
    },
    {
      keywords: ['contact', 'email', 'phone', 'reach', 'message', 'hire', 'location'],
      response: "You can reach Ramya directly via email at **krramya212@gmail.com** or phone at **+91-9686031104**. She is also on GitHub at **github.com/ramya-ise** and LinkedIn!"
    },
    {
      keywords: ['resume', 'cv', 'download', 'pdf', 'education', 'college', 'degree'],
      response: "Ramya is pursuing her Bachelor of Engineering in Information Science and Engineering (2025–2029) at Adichunchanagiri Institute of Technology (VTU). You can download her official Resume PDF directly from the sidebar or About section."
    },
    {
      keywords: ['experience', 'hackathon', 'sih', 'smart india'],
      response: "Ramya is a **Smart India Hackathon (SIH)** participant with experience in innovative problem-solving and team-based embedded/software engineering solutions!"
    },
    {
      keywords: ['hello', 'hi', 'hey', 'greetings', 'who are you'],
      response: "Hello there! 👋 I am Ramya's AI Assistant. Feel free to ask me anything about her skills, projects, hackathons, or how to get in touch!"
    }
  ];

  function appendChatMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}-msg`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'msg-avatar';
    avatarDiv.innerHTML = sender === 'bot' ? '<i class="fa-solid fa-robot"></i>' : '<i class="fa-solid fa-user"></i>';

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'msg-bubble';
    
    // Format simple linebreaks and bold text
    const formattedText = text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    bubbleDiv.innerHTML = `<p>${formattedText}</p>`;

    msgDiv.appendChild(avatarDiv);
    msgDiv.appendChild(bubbleDiv);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function simulateAiResponse(userQuery) {
    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot-msg typing-indicator-msg';
    typingDiv.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="msg-bubble"><p><i class="fa-solid fa-ellipsis fa-fade"></i> Thinking...</p></div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate AI generation delay
    setTimeout(() => {
      typingDiv.remove();

      /* ----------------------------------------------------------------------
       * BACKEND API INTEGRATION POINT (Prompt 10 note):
       * To integrate with a real OpenAI or Google Gemini API:
       * const response = await fetch('/api/chat', {
       *    method: 'POST',
       *    headers: { 'Content-Type': 'application/json' },
       *    body: JSON.stringify({ message: userQuery })
       * });
       * const data = await response.json();
       * appendChatMessage('bot', data.reply);
       * ---------------------------------------------------------------------- */

      const queryLower = userQuery.toLowerCase();
      let matchedResponse = null;

      for (const item of aiKnowledgeBase) {
        if (item.keywords.some(kw => queryLower.includes(kw))) {
          matchedResponse = item.response;
          break;
        }
      }

      if (!matchedResponse) {
        matchedResponse = "That's a great question! Pallavi is a motivated fresher software engineer with skills in Full-Stack Web Development, Java, Python, and modern web architectures. You can drop a message in the Contact Form below to discuss directly!";
      }

      appendChatMessage('bot', matchedResponse);
    }, 650);
  }

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = chatInput.value.trim();
      if (!query) return;

      appendChatMessage('user', query);
      chatInput.value = '';
      simulateAiResponse(query);
    });
  }

  // Quick Prompt Buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-btn')) {
      const query = e.target.getAttribute('data-query');
      if (query) {
        appendChatMessage('user', query);
        simulateAiResponse(query);
      }
    }
  });

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      chatMessages.innerHTML = `
        <div class="chat-msg bot-msg">
          <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
          <div class="msg-bubble">
            <p>Chat cleared. Feel free to ask another question about Pallavi's profile!</p>
            <div class="quick-prompts">
              <button class="quick-btn" data-query="What are your core technical skills?">🛠️ Core Skills</button>
              <button class="quick-btn" data-query="Tell me about your best projects">🚀 Best Projects</button>
              <button class="quick-btn" data-query="How can I contact Pallavi?">📬 Contact Info</button>
            </div>
          </div>
        </div>
      `;
    });
  }


  /* ------------------------------------------------------------------------
   * 7. Contact Form Validation & Simulated Email API (Prompt 11)
   * ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const userMessage = document.getElementById('userMessage');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const submitBtn = document.getElementById('submitBtn');
  const formFeedback = document.getElementById('formFeedback');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!userName.value.trim()) {
        userName.classList.add('invalid');
        nameError.classList.add('visible');
        isValid = false;
      } else {
        userName.classList.remove('invalid');
        nameError.classList.remove('visible');
      }

      // Validate Email
      if (!validateEmail(userEmail.value.trim())) {
        userEmail.classList.add('invalid');
        emailError.classList.add('visible');
        isValid = false;
      } else {
        userEmail.classList.remove('invalid');
        emailError.classList.remove('visible');
      }

      // Validate Message
      if (!userMessage.value.trim()) {
        userMessage.classList.add('invalid');
        messageError.classList.add('visible');
        isValid = false;
      } else {
        userMessage.classList.remove('invalid');
        messageError.classList.remove('visible');
      }

      if (!isValid) return;

      // Submit state animation
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      formFeedback.className = 'form-feedback';
      formFeedback.textContent = '';

      /* ----------------------------------------------------------------------
       * BACKEND EMAIL SERVICE INTEGRATION POINT (Prompt 11 note):
       * Integrate with Resend API / Formspree / EmailJS:
       * 
       * await fetch('https://api.resend.com/emails', {
       *   method: 'POST',
       *   headers: {
       *     'Authorization': 'Bearer ' + RESEND_API_KEY,
       *     'Content-Type': 'application/json'
       *   },
       *   body: JSON.stringify({
       *     from: 'onboarding@resend.dev',
       *     to: 'pallavikr.dev@gmail.com',
       *     subject: userSubject.value || 'New Portfolio Message',
       *     html: `<p><strong>Name:</strong> ${userName.value}</p><p><strong>Email:</strong> ${userEmail.value}</p><p>${userMessage.value}</p>`
       *   })
       * });
       * ---------------------------------------------------------------------- */

      // Simulated network latency
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
        
        contactForm.reset();

        setTimeout(() => {
          formFeedback.style.display = 'none';
        }, 6000);
      }, 1200);
    });
  }

});
