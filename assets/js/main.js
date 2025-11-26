(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  let mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
  // If a toggle isn't present in the markup on some pages, create a fallback
  if (!mobileNavToggleBtn) {
    const headerContainer =
      document.querySelector("#header .container-fluid") ||
      document.querySelector("#header");
    if (headerContainer) {
      const fallback = document.createElement("i");
      fallback.className = "mobile-nav-toggle d-xl-none bi bi-list";
      // append as last child of header container so it mirrors other pages
      headerContainer.appendChild(fallback);
      mobileNavToggleBtn = fallback;
    }
  }

  if (mobileNavToggleBtn) {
    // Improve accessibility: expose as a button and aria-expanded state
    mobileNavToggleBtn.setAttribute("role", "button");
    mobileNavToggleBtn.setAttribute("tabindex", "0");
    mobileNavToggleBtn.setAttribute("aria-expanded", "false");
  }

  function mobileNavToogle() {
    const body = document.querySelector("body");
    body.classList.toggle("mobile-nav-active");
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle("bi-list");
      mobileNavToggleBtn.classList.toggle("bi-x");
      const expanded = body.classList.contains("mobile-nav-active");
      mobileNavToggleBtn.setAttribute(
        "aria-expanded",
        expanded ? "true" : "false"
      );
    }
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
    // support keyboard activation
    mobileNavToggleBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        mobileNavToogle();
      }
    });
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document
    .querySelectorAll(".carousel-indicators")
    .forEach((carouselIndicator) => {
      carouselIndicator
        .closest(".carousel")
        .querySelectorAll(".carousel-item")
        .forEach((carouselItem, index) => {
          if (index === 0) {
            carouselIndicator.innerHTML += `<li data-bs-target="#${
              carouselIndicator.closest(".carousel").id
            }" data-bs-slide-to="${index}" class="active"></li>`;
          } else {
            carouselIndicator.innerHTML += `<li data-bs-target="#${
              carouselIndicator.closest(".carousel").id
            }" data-bs-slide-to="${index}"></li>`;
          }
        });
    });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Update CSS variable --header-height to match real header height
   * so the page content and mobile overlay keep correct offsets.
   */
  function updateHeaderHeightVar() {
    const header = document.querySelector(".header");
    if (!header) return;
    const h = header.offsetHeight || 72;
    document.documentElement.style.setProperty("--header-height", h + "px");
  }

  window.addEventListener("load", updateHeaderHeightVar);
  window.addEventListener("resize", function () {
    // small timeout for layout stabilization
    setTimeout(updateHeaderHeightVar, 100);
  });

  let currentLanguage = "fr";

  /* Newsletter Form Submission */

  document.querySelectorAll("form#newsletterForm").forEach((newsletterForm) => {
    const emailField = newsletterForm.querySelector('input[name="email"]');
    const loadingEl = newsletterForm.querySelector(".loading");
    const successEl = newsletterForm.querySelector(".sent-message");
    const errorEl = newsletterForm.querySelector(".error-message");

    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!emailField || emailField.value.trim() === "") {
        if (errorEl) {
          errorEl.textContent =
            currentLanguage === "en"
              ? "Please enter a valid email address."
              : "Veuillez saisir une adresse email valide.";
          errorEl.style.display = "block";
        }
        return;
      }

      if (errorEl) errorEl.style.display = "none";
      if (successEl) successEl.style.display = "none";
      if (loadingEl) loadingEl.style.display = "block";

      setTimeout(() => {
        if (loadingEl) loadingEl.style.display = "none";
        if (successEl) successEl.style.display = "block";
        emailField.value = "";
      }, 800);
    });
  });

  /* Theme, Language & Navigation Helpers */

  const STORAGE_KEYS = {
    theme: "lbw-theme",
    language: "lbw-language",
  };

  const translations = {
    fr: {
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.origin": "Notre histoire",
      "nav.commitments": "Nos engagements",
      "nav.team": "Notre équipe",
      "nav.testimonials": "Témoignages",
      "nav.partners": "Partenaires & Références",
      "nav.expertise": "Nos expertises",
      "nav.expertise.wazup": "WAZ'UP - E-commerce",
      "nav.expertise.mobility": "LBW-MOBILITY - Location et Achat de Véhicules",
      "nav.expertise.solar": "LBW-SOLAR - Solutions Énergétiques Solaires",
      "nav.expertise.trade": "LBW-TRADE - Centrale d'Achat",
      "nav.expertise.other": "Autres services",
      "nav.quote": "Devis",
      "nav.blog": "Actualités",
      "nav.contact": "Contact",
      "nav.cta": "Devenir partenaire",
      "hero.badge": "Efficacité commerce & logistique",
      "hero.title": "Libérez la fluidité de vos échanges B2B et B2C au Gabon",
      "hero.subtitle":
        "LeBonWaz marie le terrain gabonais et la puissance digitale pour connecter achats, livraison, mobilité et énergie en un seul écosystème hybride, fiable et traçable.",
      "hero.cta.primary": "Explorer nos expertises",
      "hero.cta.secondary": "Demander un devis",
      "hero.metric1.value": "580+",
      "hero.metric1.label": "projets et contrats livrés",
      "hero.metric2.value": "12",
      "hero.metric2.label": "secteurs stratégiques accompagnés",
      "hero.metric3.value": "24/7",
      "hero.metric3.label": "pilotage digital & logistique",
      "hero.badge1": "Plateforme + Opérations terrain",
      "hero.badge2": "Traçabilité et confiance garanties",
      "about.section.title": "Notre ADN",
      "about.section.subtitle":
        "LeBonWaz est né sur le terrain gabonais pour relier innovation, proximité humaine et impact durable.",
      "about.story.heading":
        "Un écosystème hybride construit par ceux qui vivent les frictions",
      "about.story.paragraph1":
        "Après des années à naviguer entre chaînes d'approvisionnement complexes, outils inadaptés et manque de transparence, notre équipe a conçu LeBonWaz : une plateforme qui relie digital, opérations logistiques et expertise locale pour fluidifier les échanges B2B et B2C.",
      "about.story.paragraph2":
        "Nous simplifions vos achats, vos déploiements et vos livraisons grâce à une approche « phygitale » : une technologie intuitive soutenue par des équipes de terrain, une flotte maîtrisée et un réseau de partenaires certifiés.",
      "about.story.point1.title": "Vision guidée par l'usage",
      "about.story.point1.copy":
        "Nous transformons la frustration du terrain en solutions tangibles, centrées sur l'efficacité et la performance.",
      "about.story.point2.title": "Alliance digital & mobilité",
      "about.story.point2.copy":
        "Marketplace, centrale d'achat, flotte logistique, énergie solaire : tout fonctionne ensemble et sous votre contrôle.",
      "about.story.point3.title": "Impact et confiance",
      "about.story.point3.copy":
        "Inclusion des talents locaux, traçabilité renforcée et accompagnement sur mesure pour chaque partenaire.",
      "about.story.link": "Explorer notre histoire complète",
      "about.metric1.value": "+6 ans",
      "about.metric1.label": "à façonner un commerce plus fluide",
      "about.metric2.value": "1 écosystème",
      "about.metric2.label": "digital & terrain pour vos projets",
      "about.story.caption":
        "« Nous avons créé l'outil que nous cherchions depuis des années : le bon levier pour le bon échange. »",
      "pillars.title": "Nos expertises intégrées",
      "pillars.subtitle":
        "Une chaîne de valeur unique qui combine plateforme digitale, sourcing, mobilité et énergie pour sécuriser tous vos projets.",
      "pillars.wazup.title": "WAZ'UP — Marketplace intelligente",
      "pillars.wazup.copy":
        "Digitalisez vos ventes et vos achats avec une plateforme multi-acteurs, sécurisée et connectée à la logistique LeBonWaz, pour une expérience client sans frictions.",
      "pillars.mobility.title":
        "LBW-MOBILITY — Flottes et mobilité opérationnelle",
      "pillars.mobility.copy":
        "Accédez à des solutions de location, d'achat et de pilotage de flottes adaptées à vos besoins métiers pour déplacer équipes, marchandises et matériels.",
      "pillars.solar.title": "LBW-SOLAR — Transition énergétique maîtrisée",
      "pillars.solar.copy":
        "Des solutions solaires et hybrides conçues pour sécuriser vos sites, réduire votre empreinte carbone et garantir la continuité de service.",
      "pillars.trade.title":
        "LBW-TRADE — Centrale d'achat & commerce international",
      "pillars.trade.copy":
        "Sourcing, contrôle qualité et import-export : nous sécurisons vos approvisionnements et raccourcissons vos délais d'exécution.",
      "pillars.cta": "Découvrir le pilier",
      "solutions.title": "Solutions transverses",
      "solutions.subtitle":
        "Des expertises complémentaires pour accompagner l'ensemble du cycle de vos projets et opérations.",
      "solutions.procurement.title":
        "LBW-EQUIPEMENT — Centrale d'approvisionnement",
      "solutions.procurement.copy":
        "Matériels, consommables, solutions techniques : nous gérons vos achats stratégiques avec un réseau de fournisseurs certifiés et une traçabilité complète.",
      "solutions.delivery.title":
        "LBW-DELIVERY — Livraison & logistique urbaine",
      "solutions.delivery.copy":
        "Une couverture agile pour distribuer vos produits, assurer vos tournées et piloter vos commandes avec la même exigence que vos clients.",
      "solutions.it.title": "LBW-IT — Développement sur mesure",
      "solutions.it.copy":
        "Conception d'applications, intégration systèmes et outils métiers pour digitaliser vos processus en phase avec la réalité terrain.",
      "solutions.learning.title":
        "LBW-FORMATIONS — Renforcement des compétences",
      "solutions.learning.copy":
        "Programmes d'accompagnement, formations pratiques et coaching pour accélérer l'adoption de vos solutions digitales et opérationnelles.",
      "solutions.wazgame.title": "LBW-WAZGAME — Engagement & activation",
      "solutions.wazgame.copy":
        "Des mécaniques promotionnelles et solidaires pour créer de la valeur partagée autour de vos communautés et partenaires.",
      "solutions.cta": "Voir le détail",
      "footer.address.line1": "Rond-Point d'OKALA",
      "footer.address.line2": "AKANDA, Gabon",
      "footer.phone.label": "Téléphone :",
      "footer.links": "Liens utiles",
      "footer.links.home": "Accueil",
      "footer.links.about": "Qui sommes-nous ?",
      "footer.links.expertise": "Nos expertises",
      "footer.links.contact": "Nous contacter",
      "footer.links.mentions": "Mentions légales",
      "footer.links.terms": "Conditions générales d'utilisation",
      "footer.expertise": "Nos expertises",
      "footer.wazup": "WAZ'UP",
      "footer.mobility": "LBW-MOBILITY",
      "footer.delivery": "LBW-DELIVERY",
      "footer.trade": "LBW-TRADE",
      "footer.newsletter.title": "Notre newsletter",
      "footer.newsletter.copy":
        "Abonnez-vous pour recevoir nos actualités, opportunités et cas d'usage directement dans votre boîte mail.",
      "footer.newsletter.placeholder": "Votre email",
      "footer.newsletter.cta": "S'abonner",
      "footer.newsletter.thanks":
        "Votre demande d'abonnement a été envoyée. Merci !",
      "form.loading": "Chargement",
      "cta.badge": "Passons de la vision à l'exécution",
      "cta.title":
        "Besoin d'accélérer un projet stratégique ou de structurer votre supply chain ?",
      "cta.subtitle":
        "Contactez nos équipes pour un diagnostic flash et une feuille de route adaptée à vos contraintes terrain.",
      "cta.primary": "Demander un devis personnalisé",
      "cta.secondary": "Planifier un échange",
      "about.page.title": "À propos de LeBonWaz",
      "breadcrumbs.home": "Accueil",
      "breadcrumbs.about": "À propos",
      "origin.title": "L'histoire d'origine de LeBonWaz",
      "origin.subtitle":
        "De la frustration de chaînes d'approvisionnement fragmentées à un écosystème hybride qui restitue la confiance dans les échanges.",
      "origin.step1.title": "Le Déclic\u00A0: la frustration du terrain",
      "origin.step1.text1":
        "Il y a six ans, notre équipe a été confrontée à une réalité persistante en Afrique centrale\u00A0: qu'il s'agisse de B2B ou de B2C, accéder à des fournisseurs fiables, livrer dans les temps et piloter les opérations restait un parcours d'obstacles.",
      "origin.step1.text2":
        "Les outils étaient dépassés, les chaînes logistiques opaques, et les opportunités manquaient de passerelles concrètes. Cette friction a déclenché notre mission\u00A0: organiser le commerce local pour qu'il génère de la valeur durable et équitable.",
      "origin.step2.title": "Le Voyage\u00A0: bâtir une solution hybride",
      "origin.step2.text1":
        "Rien n'a été improvisé\u00A0: nous avons arpenté le terrain, analysé les goulets d'étranglement et constaté pourquoi les plateformes standard échouaient dans le contexte gabonais.",
      "origin.step2.text2":
        "La réponse\u00A0? Combiner une plateforme digitale intuitive avec une maîtrise opérationnelle locale\u00A0: flotte logistique, réseau de partenaires, pilotage énergétique et expertise humaine. C'est ainsi qu'est né LeBonWaz, le bon outil pour le bon échange.",
      "origin.step3.title": "La Légitimité\u00A0: notre raison d'être",
      "origin.step3.text1":
        "Nous réinventons le commerce en donnant à chacun la capacité d'agir. Notre légitimité tient dans la fusion entre technologie propriétaire et parfaite connaissance du terrain gabonais.",
      "origin.step3.point1":
        "Pour les partenaires B2B\u00A0: une centralisation des achats, une flotte traçable et une exécution fiable qui sécurisent la croissance.",
      "origin.step3.point2":
        "Pour les clients B2C\u00A0: une expérience simple, sécurisée et des opportunités tangibles, soutenue par un réseau logistique qui tient ses promesses.",
      "origin.step3.text2":
        "Notre histoire prouve que nous sommes là pour réparer le système et restaurer la confiance dans le commerce local.",
      "origin.step4.title": "L'Invitation\u00A0: construire ensemble",
      "origin.step4.text1":
        "Nous vous invitons à dépasser la recherche d'un simple fournisseur. Rejoignez un partenaire dont la raison d'être est de fluidifier vos opérations et d'accélérer votre impact.",
      "origin.step4.text2":
        "Si, comme nous, vous croyez qu'un commerce plus transparent, plus efficace et plus juste est possible, vous êtes au bon endroit. Faisons converger vos ambitions et notre écosystème.",
      "engagements.title": "Nos engagements",
      "engagements.subtitle":
        "Inspirés par nos partenaires et ancrés dans notre territoire, ils guident chaque décision.",
      "engagements.commitment1.title": "Transparence et traçabilité totales",
      "engagements.commitment1.copy":
        "Des process documentés, des flux monitorés et des indicateurs partagés pour bâtir la confiance sur des faits, pas des promesses.",
      "engagements.commitment2.title": "Inclusion des talents locaux",
      "engagements.commitment2.copy":
        "Nous développons les compétences gabonaises, créons des opportunités durables et soutenons des programmes d'emploi responsables.",
      "engagements.commitment3.title": "Performance durable et responsable",
      "engagements.commitment3.copy":
        "Énergie solaire, flottes optimisées, circuits courts\u00A0: nous réduisons l'empreinte carbone de chaque projet sans compromettre les résultats.",
      "engagements.commitment4.title": "Partenariats gagnant-gagnant",
      "engagements.commitment4.copy":
        "Nous co-construisons des feuilles de route avec nos clients, partageons les retours terrain et ajustons nos solutions en continu.",
      "quote.meta.title":
        "Demande de devis - LE BON WAZ | Solutions sur mesure",
      "quote.meta.description":
        "Demandez un devis personnalisé auprès de LeBonWaz pour bénéficier d'un accompagnement sur mesure en e-commerce, logistique, mobilité ou énergie.",
      "quote.page.title": "Demande de devis personnalisé",
      "quote.page.breadcrumb": "Devis",
      "quote.badge": "Briefons votre projet",
      "quote.title":
        "Co-construisons la solution qui fluidifiera vos opérations",
      "quote.subtitle":
        "Un expert LeBonWaz vous contacte sous 48h pour cadrer vos besoins, partager un premier diagnostic et vous proposer un plan d'action chiffré.",
      "quote.list.1":
        "Audit contextualisé de vos besoins (sourcing, logistique, énergie, digital).",
      "quote.list.2":
        "Proposition sur mesure incluant délais, livrables et budget.",
      "quote.list.3":
        "Engagement de confidentialité et prise en compte de vos contraintes internes.",
      "quote.cta.phone": "Appeler directement le +241 65 73 71 22",
      "quote.form.name": "Nom et prénom*",
      "quote.form.name.placeholder": "Ex. Laure M.",
      "quote.form.company": "Organisation",
      "quote.form.company.placeholder": "Nom de votre entreprise",
      "quote.form.email": "Email professionnel*",
      "quote.form.email.placeholder": "nom@example.com",
      "quote.form.phone": "Téléphone",
      "quote.form.phone.placeholder": "+241 00 00 00 00",
      "quote.form.sector": "Secteur d'activité",
      "quote.form.sector.placeholder": "Énergie, distribution, services...",
      "quote.form.need": "Type de besoin*",
      "quote.form.need.1": "Marketplace & e-commerce",
      "quote.form.need.2": "Mobilité & flotte logistique",
      "quote.form.need.3": "Solutions énergétiques",
      "quote.form.need.4": "Centrale d'achat & sourcing",
      "quote.form.need.5": "Autre projet sur mesure",
      "quote.form.budget": "Budget estimatif",
      "quote.form.budget.placeholder": "Indiquez une estimation (optionnel)",
      "quote.form.timeline": "Délai souhaité",
      "quote.form.timeline.placeholder": "Ex. 4 semaines",
      "quote.form.message": "Décrivez votre projet*",
      "quote.form.message.placeholder":
        "Partagez votre besoin, votre contexte et vos objectifs",
      "quote.form.attach":
        "Ajouter une pièce jointe (cahier des charges, présentation...)",
      "quote.form.consent":
        "J'accepte que LeBonWaz utilise ces informations pour me recontacter et me transmettre une proposition.",
      "quote.form.submit": "Envoyer ma demande",
      "services.meta.title": "Nos expertises - Le Bon Waz",
      "services.meta.description":
        "Découvrez la gamme complète d'expertises de LeBonWaz : marketplace, logistique, mobilité, énergie et accompagnement digital sur mesure.",
      "services.page.title": "Nos expertises sur mesure",
      "services.page.breadcrumb": "Nos expertises",
      "theme.dark": "Mode sombre",
      "theme.light": "Mode clair",
      "toast.language": "Langue affichée\u00A0: Français",
    },
    en: {
      "nav.home": "Home",
      "nav.about": "About",
      "nav.origin": "Our story",
      "nav.commitments": "Our commitments",
      "nav.team": "Our team",
      "nav.testimonials": "Testimonials",
      "nav.partners": "Partners & References",
      "nav.expertise": "Our expertise",
      "nav.expertise.wazup": "WAZ'UP - E-commerce",
      "nav.expertise.mobility": "LBW-MOBILITY - Vehicle leasing & sourcing",
      "nav.expertise.solar": "LBW-SOLAR - Solar energy solutions",
      "nav.expertise.trade": "LBW-TRADE - Procurement hub",
      "nav.expertise.other": "Additional services",
      "nav.quote": "Quote",
      "nav.blog": "News",
      "nav.contact": "Contact",
      "nav.cta": "Become a partner",
      "hero.badge": "Commerce & logistics performance",
      "hero.title": "Unlock seamless B2B and B2C exchanges in Gabon",
      "hero.subtitle":
        "LeBonWaz blends the Gabonese field reality with digital power to connect purchasing, delivery, mobility and energy into a single, trusted hybrid ecosystem.",
      "hero.cta.primary": "Explore our expertise",
      "hero.cta.secondary": "Request a quote",
      "hero.metric1.value": "580+",
      "hero.metric1.label": "projects and contracts delivered",
      "hero.metric2.value": "12",
      "hero.metric2.label": "key industries supported",
      "hero.metric3.value": "24/7",
      "hero.metric3.label": "digital & logistics orchestration",
      "hero.badge1": "Digital platform + field operations",
      "hero.badge2": "Guaranteed traceability and trust",
      "about.section.title": "Our DNA",
      "about.section.subtitle":
        "Born in Gabon, LeBonWaz bridges innovation, people-centric proximity and lasting impact.",
      "about.story.heading":
        "A hybrid ecosystem built by those who feel the friction",
      "about.story.paragraph1":
        "After years dealing with complex supply chains, outdated tools and opaque networks, we created LeBonWaz\u00A0: a platform that connects digital services, logistics execution and local expertise to smooth B2B and B2C flows.",
      "about.story.paragraph2":
        "We simplify purchasing, deployments and deliveries through a “phygital” approach\u00A0: intuitive technology, on-the-ground teams, managed fleets and certified partners.",
      "about.story.point1.title": "Usage-driven vision",
      "about.story.point1.copy":
        "We turn field frustration into tangible solutions focused on efficiency and performance.",
      "about.story.point2.title": "Digital & mobility alliance",
      "about.story.point2.copy":
        "Marketplace, procurement hub, logistics fleet, solar energy: every pillar works together under your control.",
      "about.story.point3.title": "Impact and trust",
      "about.story.point3.copy":
        "We empower local talent, reinforce traceability and tailor our support to every partner.",
      "about.story.link": "Discover our full story",
      "about.metric1.value": "6+ years",
      "about.metric1.label": "shaping smoother commerce",
      "about.metric2.value": "1 ecosystem",
      "about.metric2.label": "combining digital & field operations",
      "about.story.caption":
        "“We built the tool we had been looking for: the right lever for the right exchange.”",
      "pillars.title": "Our integrated expertise",
      "pillars.subtitle":
        "A unique value chain combining digital platform, sourcing, mobility and energy to secure every project.",
      "pillars.wazup.title": "WAZ'UP — Intelligent marketplace",
      "pillars.wazup.copy":
        "Digitise your sales and purchasing with a multi-actor platform connected to LeBonWaz logistics for a frictionless customer experience.",
      "pillars.mobility.title": "LBW-MOBILITY — Operational fleets & mobility",
      "pillars.mobility.copy":
        "Lease, purchase and steer fleets tailored to your business needs to move teams, goods and equipment with confidence.",
      "pillars.solar.title": "LBW-SOLAR — Controlled energy transition",
      "pillars.solar.copy":
        "Solar and hybrid solutions designed to secure your sites, cut emissions and guarantee business continuity.",
      "pillars.trade.title":
        "LBW-TRADE — Procurement & international trade hub",
      "pillars.trade.copy":
        "Sourcing, quality control and import-export: we secure supplies and shorten delivery timelines.",
      "pillars.cta": "Explore this pillar",
      "solutions.title": "Cross-functional solutions",
      "solutions.subtitle":
        "Complementary expertise to support your entire project and operations lifecycle.",
      "solutions.procurement.title": "LBW-EQUIPEMENT — Procurement centre",
      "solutions.procurement.copy":
        "Equipment, consumables, technical solutions: we manage your strategic purchases with certified suppliers and full traceability.",
      "solutions.delivery.title": "LBW-DELIVERY — Urban logistics & delivery",
      "solutions.delivery.copy":
        "Agile coverage to distribute your products, run your routes and operate with your customers' level of excellence.",
      "solutions.it.title": "LBW-IT — Bespoke development",
      "solutions.it.copy":
        "Application design, system integration and business tools to digitise processes aligned with on-the-ground realities.",
      "solutions.learning.title": "LBW-FORMATIONS — Capability building",
      "solutions.learning.copy":
        "Coaching, practical workshops and adoption programs to accelerate the rollout of your digital and operational solutions.",
      "solutions.wazgame.title": "LBW-WAZGAME — Engagement & activation",
      "solutions.wazgame.copy":
        "Promotional and social mechanics that create shared value around your audiences and partners.",
      "solutions.cta": "View details",
      "footer.address.line1": "Okala Roundabout",
      "footer.address.line2": "Akanda, Gabon",
      "footer.phone.label": "Phone:",
      "footer.links": "Useful links",
      "footer.links.home": "Home",
      "footer.links.about": "About us",
      "footer.links.expertise": "Our expertise",
      "footer.links.contact": "Contact us",
      "footer.links.mentions": "Legal notices",
      "footer.links.terms": "Terms of use",
      "footer.expertise": "Expertise",
      "footer.wazup": "WAZ'UP",
      "footer.mobility": "LBW-MOBILITY",
      "footer.delivery": "LBW-DELIVERY",
      "footer.trade": "LBW-TRADE",
      "footer.newsletter.title": "Our newsletter",
      "footer.newsletter.copy":
        "Subscribe to receive our latest news, opportunities and case studies straight to your inbox.",
      "footer.newsletter.placeholder": "Your email",
      "footer.newsletter.cta": "Subscribe",
      "footer.newsletter.thanks":
        "Your subscription request has been sent. Thank you!",
      "form.loading": "Loading",
      "cta.badge": "Let's move from vision to execution",
      "cta.title":
        "Need to fast-track a strategic project or structure your supply chain?",
      "cta.subtitle":
        "Reach out for a rapid assessment and an actionable roadmap aligned with your field constraints.",
      "cta.primary": "Request a tailored quote",
      "cta.secondary": "Schedule a call",
      "about.page.title": "About LeBonWaz",
      "breadcrumbs.home": "Home",
      "breadcrumbs.about": "About",
      "origin.title": "The origin story of LeBonWaz",
      "origin.subtitle":
        "From fragmented supply chains to a hybrid ecosystem that rebuilds trust in trade.",
      "origin.step1.title": "The trigger\u00A0: field frustration",
      "origin.step1.text1":
        "Six years ago we faced a persistent reality in Central Africa: whether B2B or B2C, securing the right partners, delivering on time and steering operations felt like a maze.",
      "origin.step1.text2":
        "Tools were outdated, logistics opaque and opportunities lacked real connectors. This friction sparked our mission: organise local trade so it creates lasting, fair value.",
      "origin.step2.title": "The journey\u00A0: building a hybrid solution",
      "origin.step2.text1":
        "Nothing happened by chance: we walked the field, mapped bottlenecks and understood why standard platforms failed in Gabon.",
      "origin.step2.text2":
        "The answer? Pair an intuitive digital platform with local operational mastery: logistics fleets, partner network, energy management and human expertise. This is how LeBonWaz became the right tool for the right exchange.",
      "origin.step3.title": "Legitimacy\u00A0: our reason why",
      "origin.step3.text1":
        "We reinvent trade by empowering every actor. Our legitimacy lies in combining proprietary technology with deep knowledge of the Gabonese market.",
      "origin.step3.point1":
        "For B2B partners: centralised procurement, traceable fleets and reliable execution to secure growth.",
      "origin.step3.point2":
        "For B2C customers: a simple, safe experience and tangible opportunities backed by a logistics network that delivers.",
      "origin.step3.text2":
        "Our story proves we exist to fix the system and restore confidence in local commerce.",
      "origin.step4.title": "The invitation\u00A0: build together",
      "origin.step4.text1":
        "Go beyond sourcing a supplier. Join a partner whose purpose is to streamline your operations and accelerate your impact.",
      "origin.step4.text2":
        "If you believe in transparent, efficient and fair trade, you are in the right place. Let's align your ambitions with our ecosystem.",
      "engagements.title": "Our commitments",
      "engagements.subtitle":
        "Rooted in Gabon and inspired by our partners, they guide every decision we make.",
      "engagements.commitment1.title": "Full transparency and traceability",
      "engagements.commitment1.copy":
        "Documented processes, monitored flows and shared KPIs so trust rests on facts, not promises.",
      "engagements.commitment2.title": "Empowering local talent",
      "engagements.commitment2.copy":
        "We grow Gabonese skills, create lasting opportunities and support responsible employment programmes.",
      "engagements.commitment3.title": "Responsible, sustainable performance",
      "engagements.commitment3.copy":
        "Solar energy, optimised fleets, shorter loops: we cut carbon impact without compromising results.",
      "engagements.commitment4.title": "Win-win partnerships",
      "engagements.commitment4.copy":
        "We co-build roadmaps with clients, share field insights and iterate continuously on our solutions.",
      "quote.meta.title": "Request a Quote - LeBonWaz | Tailored Solutions",
      "quote.meta.description":
        "Request a customised quote from LeBonWaz and benefit from tailored support in e-commerce, logistics, mobility or energy.",
      "quote.page.title": "Request a tailored quote",
      "quote.page.breadcrumb": "Quote",
      "quote.badge": "Let's brief your project",
      "quote.title":
        "Let’s co-design the solution that will streamline your operations",
      "quote.subtitle":
        "A LeBonWaz expert will reach out within 48 hours to scope your needs, share an initial assessment and deliver a costed roadmap.",
      "quote.list.1":
        "Contextual audit of your needs (sourcing, logistics, energy, digital).",
      "quote.list.2":
        "Bespoke proposal including timelines, deliverables and budget.",
      "quote.list.3":
        "Confidentiality guaranteed and alignment with your internal requirements.",
      "quote.cta.phone": "Call us directly on +241 65 73 71 22",
      "quote.form.name": "Full name*",
      "quote.form.name.placeholder": "e.g. Laura M.",
      "quote.form.company": "Organisation",
      "quote.form.company.placeholder": "Your company name",
      "quote.form.email": "Business email*",
      "quote.form.email.placeholder": "name@example.com",
      "quote.form.phone": "Phone",
      "quote.form.phone.placeholder": "+241 00 00 00 00",
      "quote.form.sector": "Industry",
      "quote.form.sector.placeholder": "Energy, retail, services...",
      "quote.form.need": "Type of need*",
      "quote.form.need.1": "Marketplace & e-commerce",
      "quote.form.need.2": "Mobility & logistics fleet",
      "quote.form.need.3": "Energy solutions",
      "quote.form.need.4": "Procurement & sourcing hub",
      "quote.form.need.5": "Other bespoke project",
      "quote.form.budget": "Estimated budget",
      "quote.form.budget.placeholder": "Provide an estimate (optional)",
      "quote.form.timeline": "Desired timeline",
      "quote.form.timeline.placeholder": "e.g. 4 weeks",
      "quote.form.message": "Describe your project*",
      "quote.form.message.placeholder":
        "Share your needs, context and objectives",
      "quote.form.attach":
        "Add an attachment (brief, presentation, business case…)",
      "quote.form.consent":
        "I agree that LeBonWaz will use this information to contact me and share a tailored proposal.",
      "quote.form.submit": "Send my request",
      "services.meta.title": "Our expertise - LeBonWaz",
      "services.meta.description":
        "Discover the full range of LeBonWaz expertise: marketplace, logistics, mobility, energy and tailored digital support.",
      "services.page.title": "Our tailored expertise",
      "services.page.breadcrumb": "Our expertise",
      "theme.dark": "Dark mode",
      "theme.light": "Light mode",
      "toast.language": "Language set to English",
    },
  };

  const pageOverrides = {
    "partners-apply": [
      {
        selector: 'label[for="partnership_type"]',
        type: "html",
        fr: 'Type de Partenariat souhaité <span class="text-danger">*</span>',
        en: 'Desired partnership type <span class="text-danger">*</span>',
      },
      {
        selector: 'select[name="partnership_type"] option',
        type: "text",
        fr: [
          "Sélectionnez l'option principale...",
          "Vendeur sur la Marketplace WAZ'UP (E-commerce)",
          "Fournisseur LBW-MOBILITY (Vente ou Location de Véhicules)",
          "Prestataire de Services (Ex: BTP, Énergie, Autres)",
          "Autre type de collaboration",
        ],
        en: [
          "Select the primary option...",
          "WAZ'UP marketplace vendor (E-commerce)",
          "LBW-MOBILITY supplier (vehicle sales or rentals)",
          "Service provider (e.g. construction, energy, other)",
          "Other collaboration type",
        ],
      },
      {
        selector: 'label[for="company"]',
        type: "html",
        fr: 'Nom de l\'Entreprise / Raison Sociale <span class="text-danger">*</span>',
        en: 'Company name / Legal name <span class="text-danger">*</span>',
      },
      {
        selector: "#company",
        type: "attr",
        attr: "placeholder",
        fr: "Nom de l'Entreprise / Raison Sociale",
        en: "Company name / Legal name",
      },
      {
        selector: 'label[for="representative_name"]',
        type: "html",
        fr: 'Nom et Prénom du Représentant <span class="text-danger">*</span>',
        en: 'Representative\'s first and last name <span class="text-danger">*</span>',
      },
      {
        selector: "#representative_name",
        type: "attr",
        attr: "placeholder",
        fr: "Nom et Prénom du Représentant",
        en: "Representative's name",
      },
      {
        selector: 'label[for="email"]',
        type: "html",
        fr: 'Adresse Email Professionnelle <span class="text-danger">*</span>',
        en: 'Business email address <span class="text-danger">*</span>',
      },
      {
        selector: "#email",
        type: "attr",
        attr: "placeholder",
        fr: "Adresse Email Professionnelle",
        en: "Business email address",
      },
      {
        selector: 'label[for="phone"]',
        type: "html",
        fr: 'Numéro de Téléphone <span class="text-danger">*</span>',
        en: 'Phone number <span class="text-danger">*</span>',
      },
      {
        selector: "#phone",
        type: "attr",
        attr: "placeholder",
        fr: "Numéro de Téléphone (Ex: +241 6x xx xx xx)",
        en: "Phone number (e.g. +241 6x xx xx xx)",
      },
      {
        selector: 'label[for="nif_rccm"]',
        type: "text",
        fr: "NIF ou Numéro RCCM (Optionnel)",
        en: "Tax ID or RCCM number (optional)",
      },
      {
        selector: "#nif_rccm",
        type: "attr",
        attr: "placeholder",
        fr: "NIF ou Numéro RCCM (Société)",
        en: "Tax ID or RCCM number (Company)",
      },
      {
        selector: 'label[for="city_country"]',
        type: "html",
        fr: 'Ville et Pays d\'Opération <span class="text-danger">*</span>',
        en: 'City and country of operation <span class="text-danger">*</span>',
      },
      {
        selector: "#city_country",
        type: "attr",
        attr: "placeholder",
        fr: "Ville et Pays d'Opération (Ex: Libreville, Gabon)",
        en: "City and country of operation (e.g. Libreville, Gabon)",
      },
      {
        selector: 'label[for="offer_description"]',
        type: "html",
        fr: 'Décrivez votre Offre (Produits/Services) <span class="text-danger">*</span>',
        en: 'Describe your offer (products/services) <span class="text-danger">*</span>',
      },
      {
        selector: "#offer_description",
        type: "attr",
        attr: "placeholder",
        fr: "Décrivez en quelques lignes les produits, véhicules ou services que vous souhaitez proposer via notre plateforme.",
        en: "Describe in a few lines the products, vehicles or services you wish to offer via our platform.",
      },
      {
        selector: 'label[for="cgu_accept"]',
        type: "html",
        fr: 'J\'ai lu et j\'accepte les <a href="condition.html" target="_blank" class="text-decoration-underline text-primary">Conditions Générales d\'Utilisation (CGU)</a> et les termes du partenariat LE BON WAZ.<span class="text-danger">*</span>',
        en: 'I have read and accept the <a href="condition.html" target="_blank" class="text-decoration-underline text-primary">Terms of Use</a> and the LE BON WAZ partnership terms.<span class="text-danger">*</span>',
      },
      {
        selector: "#partner-form-section .loading",
        type: "text",
        fr: "Envoi en cours...",
        en: "Sending...",
      },
      {
        selector: "#partner-form-section .sent-message",
        type: "text",
        fr: "Votre candidature a été envoyée avec succès. Merci !",
        en: "Your application has been sent successfully. Thank you!",
      },
      {
        selector: '#partner-form-section button[type="submit"]',
        type: "text",
        fr: "Envoyer ma Candidature",
        en: "Submit my application",
      },
      {
        selector: "#cta-partners h2",
        type: "html",
        fr: '<i class="bi bi-question-circle-fill me-3"></i> Vous avez des questions spécifiques ?',
        en: '<i class="bi bi-question-circle-fill me-3"></i> Do you have specific questions?',
      },
      {
        selector: "#cta-partners p",
        type: "text",
        fr: "Contactez directement notre service des Partenariats pour une réponse rapide et une discussion personnalisée avant de soumettre officiellement votre candidature.",
        en: "Reach out directly to our Partnerships team for a quick response and a tailored discussion before officially submitting your application.",
      },
      {
        selector: "#cta-partners .cta-btn-custom",
        type: "text",
        fr: "Contacter notre équipe Partenariats",
        en: "Contact our partnerships team",
      },
    ],
  };

  const themeButtons = document.querySelectorAll("[data-theme-toggle]");
  const languageSelects = document.querySelectorAll("[data-language-switch]");
  const themeLabelSpans = document.querySelectorAll("[data-theme-label]");
  const translatorToast = document.querySelector(".translator-floating-toast");

  currentLanguage =
    localStorage.getItem(STORAGE_KEYS.language) ||
    document.documentElement.lang ||
    "fr";
  currentLanguage = translations[currentLanguage] ? currentLanguage : "fr";

  let currentTheme =
    localStorage.getItem(STORAGE_KEYS.theme) || detectSystemTheme();

  applyTheme(currentTheme, false);
  applyTranslations(currentLanguage);
  highlightActiveNav();

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(currentTheme);
    });
  });

  languageSelects.forEach((select) => {
    select.value = currentLanguage;
    select.addEventListener("change", (event) => {
      const selectedLanguage = event.target.value;
      applyTranslations(selectedLanguage);
      showLanguageToast(
        translations[selectedLanguage]?.["toast.language"] ||
          (selectedLanguage === "en"
            ? "Language set to English"
            : "Langue affichée : Français")
      );
    });
  });

  function highlightActiveNav() {
    const activePage = document.body.dataset.page;
    if (!activePage) return;

    document
      .querySelectorAll(`[data-page-link="${activePage}"]`)
      .forEach((link) => {
        link.classList.add("active");
        const dropdown = link.closest(".dropdown");
        if (dropdown) {
          const parentLink = dropdown.querySelector(":scope > a");
          if (parentLink) parentLink.classList.add("active");
        }
      });
  }

  function detectSystemTheme() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function applyTheme(theme, persist = true) {
    if (theme === "dark") {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
      theme = "light";
    }

    if (persist) {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    }
    updateThemeToggleLabel(theme);
  }

  function updateThemeToggleLabel(theme) {
    const labelKey = theme === "dark" ? "theme.light" : "theme.dark";
    themeLabelSpans.forEach((span) => {
      const button = span.closest("[data-theme-toggle]");
      const icon = button?.querySelector("i");
      span.dataset.i18n = labelKey;
      const translation =
        translations[currentLanguage]?.[labelKey] ||
        (theme === "dark" ? "Mode clair" : "Mode sombre");
      span.textContent = translation;
      if (icon) {
        icon.className =
          theme === "dark" ? "bi bi-brightness-high" : "bi bi-moon-stars";
      }
    });
  }

  function resolveInlineTranslation(element, language, type, key) {
    let translation =
      key && translations[language] ? translations[language][key] : undefined;

    if (translation !== undefined) {
      return translation;
    }

    const datasetKey =
      type === "placeholder"
        ? language === "en"
          ? "i18nPlaceholderEn"
          : "i18nPlaceholderFr"
        : language === "en"
        ? "i18nEn"
        : "i18nFr";

    return element.dataset?.[datasetKey];
  }

  function applyPageOverrides(language) {
    const pageKey = document.body.dataset.page;
    if (!pageKey) return;
    const overrides = pageOverrides[pageKey];
    if (!overrides) return;

    overrides.forEach((override) => {
      const elements = document.querySelectorAll(override.selector);
      if (!elements.length) return;

      elements.forEach((element, index) => {
        if (override.type === "attr" && override.attr) {
          const datasetKey =
            "i18nOriginalAttr" +
            override.attr.charAt(0).toUpperCase() +
            override.attr.slice(1);
          if (!(datasetKey in element.dataset)) {
            element.dataset[datasetKey] =
              element.getAttribute(override.attr) ?? "";
          }
          const values = language === "en" ? override.en : override.fr;
          const value = Array.isArray(values) ? values[index] : values;
          const fallback = element.dataset[datasetKey];
          element.setAttribute(override.attr, value ?? fallback);
        } else if (override.type === "text") {
          if (!("i18nOriginalText" in element.dataset)) {
            element.dataset.i18nOriginalText =
              element.textContent ?? element.innerText ?? "";
          }
          const values = language === "en" ? override.en : override.fr;
          const value = Array.isArray(values) ? values[index] : values;
          const fallback = element.dataset.i18nOriginalText;
          element.textContent = value ?? fallback;
        } else if (override.type === "html") {
          if (!("i18nOriginalHtml" in element.dataset)) {
            element.dataset.i18nOriginalHtml = element.innerHTML;
          }
          const values = language === "en" ? override.en : override.fr;
          const value = Array.isArray(values) ? values[index] : values;
          const fallback = element.dataset.i18nOriginalHtml;
          element.innerHTML = value ?? fallback;
        }
      });
    });
  }

  function applyTranslations(language) {
    if (!translations[language] && language !== "fr" && language !== "en")
      return;
    currentLanguage = language;
    document.documentElement.lang = language;
    localStorage.setItem(STORAGE_KEYS.language, language);

    languageSelects.forEach((select) => {
      select.value = language;
    });

    document
      .querySelectorAll("[data-i18n], [data-i18n-en], [data-i18n-fr]")
      .forEach((element) => {
        const key = element.dataset.i18n;
        const translation = resolveInlineTranslation(
          element,
          language,
          "text",
          key
        );
        if (translation === undefined) return;

        if (element.tagName === "META") {
          element.setAttribute("content", translation);
        } else if (element.tagName === "TITLE") {
          element.textContent = translation;
        } else if (
          element.tagName === "INPUT" &&
          ["submit", "button"].includes(element.type)
        ) {
          element.value = translation;
        } else {
          element.innerHTML = translation;
        }
      });

    document
      .querySelectorAll(
        "[data-i18n-placeholder], [data-i18n-placeholder-en], [data-i18n-placeholder-fr]"
      )
      .forEach((element) => {
        const key = element.dataset.i18nPlaceholder;
        const translation = resolveInlineTranslation(
          element,
          language,
          "placeholder",
          key
        );
        if (translation === undefined) return;
        element.setAttribute("placeholder", translation);
      });

    applyPageOverrides(language);

    updateThemeToggleLabel(currentTheme);
    document.dispatchEvent(
      new CustomEvent("lbw:language-change", { detail: { language } })
    );
  }

  function showLanguageToast(message) {
    if (!translatorToast) return;
    translatorToast.textContent = message;
    translatorToast.classList.add("show");
    setTimeout(() => {
      translatorToast.classList.remove("show");
    }, 2200);
  }
})();
