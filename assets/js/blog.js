document.addEventListener("DOMContentLoaded", () => {
  // Données complètes pour les articles de blog et les commentaires
  const blogData = {
    posts: [
      {
        id: "top-5-ventes",
        title: "Le top 5 des articles les plus vendus ce mois-ci",
        author: "L'équipe Le Bon Waz",
        date: "2025-09-15",
        commentsCount: 12,
        image: "assets/img/blog/blog-1.jpg",
        content: `
                            <p class="text-gray-700 leading-relaxed mb-4">Découvrez les articles phares et les tendances du moment sur Le Bon Waz qui ont conquis nos clients ce mois-ci. Des produits locaux aux accessoires technologiques, voici ce qui fait fureur sur notre plateforme et pourquoi ces articles méritent toute votre attention.</p>
                            <p class="text-gray-700 leading-relaxed mb-4"><strong>1. Le Kit de Survie Urbain.</strong> Cet ensemble, comprenant une gourde réutilisable, une batterie externe solaire et un sac en tissu local, est un véritable best-seller. Il répond à un besoin croissant de produits durables et pratiques pour la vie quotidienne en ville.</p>
                            <p class="text-gray-700 leading-relaxed mb-4"><strong>2. Les écouteurs sans fil 'Waz Sound'.</strong> Conçus pour les mélomanes en déplacement, ces écouteurs offrent une qualité sonore exceptionnelle et une autonomie longue durée. Leur succès témoigne de l'appétit pour la technologie de pointe à des prix abordables.</p>
                            <p class="text-gray-700 leading-relaxed mb-4"><strong>3. Les paniers de fruits et légumes frais.</strong> En partenariat avec des agriculteurs locaux, ces paniers sont livrés directement à votre porte. La demande pour une alimentation saine et des circuits courts a fait de ce produit un incontournable sur notre plateforme.</p>
                            <p class="text-gray-700 leading-relaxed mb-4"><strong>4. L'Artisanat 'Escale Gabonaise'.</strong> Cette collection de sculptures en bois et de bijoux faits main a captivé nos clients par son authenticité et son histoire. Chaque pièce est unique, ce qui en fait un cadeau parfait pour toutes les occasions.</p>
                            <p class="text-gray-700 leading-relaxed mb-4"><strong>5. Les lampes solaires 'Lumière Verte'.</strong> Ces lampes écologiques, idéales pour le camping ou comme éclairage de secours, illustrent notre engagement pour des solutions durables. Elles offrent une solution pratique et respectueuse de l'environnement, un critère de plus en plus important pour nos clients.</p>
                            <p class="text-gray-700 leading-relaxed mb-4">Cette liste démontre la diversité des besoins de notre communauté et l'importance de l'innovation et de la proximité. Nous sommes fiers de vous offrir une plateforme où vous pouvez trouver à la fois des produits locaux de qualité et des technologies de pointe.</p>
                        `,
        category: "E-commerce",
        tags: ["Top ventes", "Produits", "Tendance"],
        comments: [
          {
            author: "Jean Dupont",
            date: "2025-09-15",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=JD",
            text: "J'ai acheté la batterie externe, c'est super pratique pour le quotidien !",
          },
          {
            author: "Marie Leblanc",
            date: "2025-09-15",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=ML",
            text: "Le panier de fruits est une excellente idée. Frais et de qualité, je suis conquise.",
          },
          {
            author: "Pierre Durand",
            date: "2025-09-16",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=PD",
            text: "J'aurais aimé voir plus d'articles artisanaux dans le top 5, mais bonne sélection !",
          },
          {
            author: "Sophie Martin",
            date: "2025-09-16",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=SM",
            text: "Les écouteurs Waz Sound sont un excellent rapport qualité-prix. J'en ai commandé une paire et je ne suis pas déçue.",
          },
          {
            author: "Lucie Bernard",
            date: "2025-09-17",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=LB",
            text: "Je viens de commander le kit de survie urbain, hâte de le recevoir.",
          },
          {
            author: "Marc Dubois",
            date: "2025-09-17",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=MD",
            text: "Bravo pour ce classement, ça donne des idées de cadeaux !",
          },
          {
            author: "Léa Petit",
            date: "2025-09-18",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=LP",
            text: "L'artisanat gabonais mérite d'être mis en lumière, c'est une excellente initiative de votre part.",
          },
          {
            author: "Pauline Leroy",
            date: "2025-09-18",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=PL",
            text: "Les lampes solaires sont géniales pour les coupures de courant. Un achat que je ne regrette pas.",
          },
          {
            author: "Antoine Gauthier",
            date: "2025-09-19",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=AG",
            text: "Le service de livraison pour le panier de fruits est impeccable, je recommande vivement.",
          },
          {
            author: "Chloe Roux",
            date: "2025-09-19",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=CR",
            text: "J'ai acheté les écouteurs pour ma fille, elle les adore !",
          },
          {
            author: "Romain Lefebvre",
            date: "2025-09-20",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=RL",
            text: "Très bon article, c'est intéressant de voir ce qui se vend bien.",
          },
          {
            author: "Emma Dubois",
            date: "2025-09-20",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=ED",
            text: "La collection 'Escale Gabonaise' est magnifique. J'ai commandé une pièce pour ma maison et je ne suis pas déçue.",
          },
        ],
      },
      {
        id: "fete-des-meres",
        title:
          "La Fête des Mères approche : trouvez le cadeau parfait sur Le Bon Waz !",
        author: "L'équipe Le Bon Waz",
        date: "2025-05-18",
        commentsCount: 25,
        image: "assets/img/blog/lbw-fete-des-mêres.jpg",
        content:
          "Cette année, célébrez votre maman avec un cadeau unique et mémorable. Découvrez notre sélection spéciale pour la Fête des Mères, des produits locaux aux créations artisanales qui sauront la toucher en plein cœur. Trouvez l'inspiration et faites-lui plaisir avec Le Bon Waz.",
        category: "Événements",
        tags: ["Fête des mères", "Cadeau", "Artisanat", "Local"],
        comments: [],
      },
      {
        id: "kit-etudiant",
        title:
          "Rentrez en force ! Le kit de l'étudiant idéal est sur Le Bon Waz",
        author: "L'équipe Le Bon Waz",
        date: "2025-09-02",
        commentsCount: 8,
        image: "assets/img/blog/lbw-kit-etudiant.jpg",
        content:
          "La rentrée universitaire est là, et nous avons préparé le guide ultime pour bien vous équiper. Du matériel de papeterie aux gadgets technologiques, découvrez notre sélection d'articles essentiels pour une année scolaire réussie. Ne manquez pas nos offres spéciales pour les étudiants !",
        category: "Conseils",
        tags: ["Étudiants", "Rentrée", "Technologie"],
        comments: [],
      },
      {
        id: "locations-vehicules",
        title:
          "Explorez en toute liberté : louez votre véhicule sur Le Bon Waz",
        author: "L'équipe Le Bon Waz",
        date: "2025-08-20",
        commentsCount: 5,
        image: "assets/img/blog/lbw-locations-vehicules.jpg",
        content:
          "Pour vos vacances, un déménagement ou un simple déplacement en ville, la location de véhicules n'a jamais été aussi simple. Découvrez notre large choix de voitures, camions et scooters disponibles sur notre plateforme. Réservez en quelques clics et prenez la route sereinement.",
        category: "Services",
        tags: ["Mobilité", "Location", "Véhicule"],
        comments: [],
      },
      {
        id: "octobre-rose",
        title:
          "Octobre Rose : Soutenons ensemble la lutte contre le cancer du sein.",
        author: "L'équipe Le Bon Waz",
        date: "2025-10-01",
        commentsCount: 5,
        image: "assets/img/blog/lbw-octobre_rose.jpeg",
        content:
          "En ce mois d'Octobre Rose, Le Bon Waz s'engage aux côtés des associations de lutte contre le cancer du sein. Découvrez comment vous pouvez contribuer à cette cause importante en achetant des produits solidaires sur notre plateforme. Ensemble, faisons la différence et soutenons la recherche et la sensibilisation.",
        category: "Campagne",
        tags: ["Cancer du sein", "Solidarité", "Santé"],
        comments: [
          {
            author: "Alice Dupont",
            date: "2025-10-02",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=AD",
            text: "Merci Le Bon Waz pour votre engagement. J'ai acheté un produit solidaire et je suis fière de contribuer à cette cause.",
          },
          {
            author: "Bruno Martin",
            date: "2025-10-02",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=BM",
            text: "C'est important de sensibiliser sur le cancer du sein. Bravo pour cette initiative.",
          },
          {
            author: "Claire Lefevre",
            date: "2025-10-03",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=CL",
            text: "J'ai partagé cette campagne avec mes amis. Plus on est de fous, plus on rit !",
          },
          {
            author: "David Moreau",
            date: "2025-10-03",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=DM",
            text: "J'espère que cette campagne aidera à financer la recherche.",
          },
          {
            author: "Emma Dubois",
            date: "2025-10-04",
            image: "https://placehold.co/50x50/334155/FFFFFF?text=ED",
            text: "J'ai acheté un t-shirt rose pour soutenir la cause. Merci Le Bon Waz !",
          },
        ],
      },
      {
        id: "photographier-articles",
        title: "Comment photographier vos articles pour un maximum d'impact",
        author: "Le Bon Waz Photographie",
        date: "2025-09-10",
        commentsCount: 5,
        image: "assets/img/blog/blog-2.jpg",
        content:
          "La qualité des photos est cruciale pour attirer l'attention des acheteurs. Apprenez nos astuces pour prendre des clichés professionnels de vos produits avec votre smartphone et booster vos ventes.",
        category: "Conseils",
        tags: ["Vente", "Photographie", "E-commerce"],
        comments: [],
      },
      {
        id: "objets-vintage",
        title: "Les objets vintage gabonais : une demande croissante",
        author: "Le Bon Waz Découverte",
        date: "2025-09-08",
        commentsCount: 9,
        image: "assets/img/blog/blog-3.jpg",
        content:
          "Le marché de l'occasion et des objets de collection prend de l'ampleur. Explorez le potentiel des articles vintage et artisanaux du Gabon et comment Le Bon Waz vous aide à les valoriser auprès de la communauté.",
        category: "Tendance",
        tags: ["Vintage", "Gabon", "Artisanat", "Découverte"],
        comments: [],
      },
      {
        id: "nouveaux-vendeurs",
        title: "Notre guide pour les nouveaux vendeurs sur Le Bon Waz",
        author: "L'équipe Le Bon Waz",
        date: "2025-09-05",
        commentsCount: 2,
        image: "assets/img/blog/blog-4.jpg",
        content:
          "Vous débutez sur notre plateforme ? Ce guide est fait pour vous ! Nous vous expliquons pas à pas comment créer votre boutique, publier votre première annonce et gérer vos commandes facilement.",
        category: "Conseils",
        tags: ["Vendeurs", "Guide", "E-commerce"],
        comments: [],
      },
      {
        id: "impact-economie-locale",
        title: "L'impact de Le Bon Waz sur l'économie locale",
        author: "Le Bon Waz Actualités",
        date: "2025-09-01",
        commentsCount: 15,
        image: "assets/img/blog/blog-inside-post.jpg",
        content:
          "Plus qu'une simple plateforme, Le Bon Waz est un moteur de développement. Découvrez comment nous soutenons les entrepreneurs locaux, créons des opportunités et favorisons la croissance du commerce au Gabon.",
        category: "Actualités",
        tags: ["Économie", "Gabon", "Développement", "Impact"],
        comments: [],
      },
    ],
  };

  const postsPerPage = 4;
  let currentPage = 1;

  // Fonction pour formater la date
  function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  }

  // --- Fonctions de rendu ---

  // Affiche la liste des articles
  function renderPosts(page) {
    const pageTitleElement = document.getElementById("page-title");
    const mainContentWrapper = document.getElementById("main-content-wrapper");
    if (pageTitleElement) pageTitleElement.textContent = "Articles de Blog";

    const postsToRender = blogData.posts.slice(
      (page - 1) * postsPerPage,
      page * postsPerPage
    );

    mainContentWrapper.innerHTML = `
        <section id="blog-posts-container" class="space-y-12"></section>
        <div id="pagination-container" class="flex justify-center mt-12"></div>
    `;
    const container = document.getElementById("blog-posts-container");

    postsToRender.forEach((post) => {
      const article = document.createElement("article");
      // CLASSE AMÉLIORÉE : ombre, bordure, coin plus arrondi, et effet de transition/survol
      article.className =
        "bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-blue-200 cursor-pointer";
      article.onclick = () => (window.location.href = `?id=${post.id}`); // Rendre tout l'article cliquable

      article.innerHTML = `
            <div class="post-img mb-6 overflow-hidden rounded-lg">
                <img 
                    src="${post.image}" 
                    alt="Image de l'article de blog : ${post.title}" 
                    class="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" 
                />
            </div>
            
            <div class="meta-top flex items-center space-x-6 text-sm text-gray-500 mb-3">
                <div class="flex items-center">
                    <i class="bi bi-person mr-2 text-blue-500"></i>
                    <span class="font-semibold text-gray-700">${
                      post.author
                    }</span>
                </div>
                <div class="flex items-center">
                    <i class="bi bi-clock mr-2 text-blue-500"></i>
                    <time datetime="${post.date}" class="italic">${formatDate(
        post.date
      )}</time>
                </div>
            </div>

            <h2 class="title text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                 ${post.title}
            </h2>
            
            <div class="flex items-center space-x-4 text-sm text-gray-500 mb-5">
                 <span class="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">${
                   post.category || "Général"
                 }</span>
                 <div class="flex items-center">
                    <i class="bi bi-chat-dots mr-2 text-gray-400"></i>
                    <span>${post.commentsCount} Commentaires</span>
                 </div>
            </div>

            <div class="content text-gray-700 leading-relaxed mb-6">
                <p>${post.content.substring(0, 200)}...</p> 
            </div>
            
            <div class="read-more">
                <a 
                    href="?id=${post.id}" 
                    class="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 font-semibold rounded-full transition-colors duration-300 hover:bg-blue-600 hover:text-white"
                >
                    Lire la suite
                    <i class="bi bi-arrow-right ml-2"></i>
                </a>
            </div>
        `;
      container.appendChild(article);
    });

    renderPagination();
  }

  // Affiche la pagination
  function renderPagination() {
    const paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) return;

    paginationContainer.innerHTML = "";
    const totalPosts = blogData.posts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // Si moins de 2 pages, on n'affiche pas la pagination
    if (totalPages <= 1) return;

    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Pagination des articles");

    const ul = document.createElement("ul");
    // AMÉLIORATION : Marge et alignement pour les boutons de navigation
    ul.className = "flex items-center space-x-3";

    // ------------------------------------
    // 1. Bouton PRÉCÉDENT
    // ------------------------------------
    const prevLi = document.createElement("li");
    const prevA = document.createElement("a");
    prevA.href = "#";
    // Désactiver le bouton si on est sur la première page
    const isPrevDisabled = currentPage === 1;

    prevA.className = `
        px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center
        ${
          isPrevDisabled
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-indigo-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:border-indigo-500"
        }
    `;
    prevA.innerHTML = '<i class="bi bi-arrow-left mr-2"></i> Précédent';

    if (!isPrevDisabled) {
      prevA.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = currentPage - 1;
        renderPosts(currentPage);
      });
    }
    prevLi.appendChild(prevA);
    ul.appendChild(prevLi);

    // ------------------------------------
    // 2. Numéros de Page
    // ------------------------------------
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = i;

      // AMÉLIORATION : Couleurs et styles pour les numéros
      a.className = `
            w-10 h-10 flex items-center justify-center rounded-full text-lg font-extrabold transition-all duration-300
            ${
              i === currentPage
                ? // État ACTIF (couleur principale plus ombre)
                  "bg-indigo-600 text-white shadow-lg transform scale-105"
                : // État INACTIF (fond blanc/clair, texte sombre, effet hover)
                  "bg-white text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 hover:shadow-md"
            }
        `;

      a.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = i;
        renderPosts(currentPage);
      });
      li.appendChild(a);
      ul.appendChild(li);
    }

    // ------------------------------------
    // 3. Bouton SUIVANT
    // ------------------------------------
    const nextLi = document.createElement("li");
    const nextA = document.createElement("a");
    nextA.href = "#";
    // Désactiver le bouton si on est sur la dernière page
    const isNextDisabled = currentPage === totalPages;

    nextA.className = `
        px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center
        ${
          isNextDisabled
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-indigo-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:border-indigo-500"
        }
    `;
    nextA.innerHTML = `Suivant <i class="bi bi-arrow-right ml-2"></i>`;

    if (!isNextDisabled) {
      nextA.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = currentPage + 1;
        renderPosts(currentPage);
      });
    }
    nextLi.appendChild(nextA);
    ul.appendChild(nextLi);

    nav.appendChild(ul);
    paginationContainer.appendChild(nav);
  }

  // Affiche un article détaillé
  function renderArticle(post) {
    const pageTitleElement = document.getElementById("page-title");
    const articleContentElement = document.getElementById("article-content");
    const commentsSection = document.getElementById("comments-section");
    const paginationContainer = document.getElementById("pagination-container");
    const mainContentWrapper = document.getElementById("main-content-wrapper"); // Récupérer le conteneur principal

    if (pageTitleElement) pageTitleElement.textContent = post.title;
    if (paginationContainer) paginationContainer.remove();

    // S'assurer que les conteneurs sont prêts pour le nouveau contenu
    if (mainContentWrapper) {
      // Optionnel : s'assurer que les sections article et commentaires sont visibles
      if (!articleContentElement) {
        mainContentWrapper.innerHTML = `
                <section id="article-content" class="bg-white p-6 md:p-12 rounded-3xl shadow-2xl hover-scale"></section>
                <section id="comments-section" class="bg-white p-6 md:p-12 rounded-3xl shadow-2xl"></section>
             `;
      }
    }

    if (articleContentElement) {
      articleContentElement.className =
        "bg-white p-6 md:p-12 rounded-[2rem] shadow-xl border border-gray-100";
      articleContentElement.innerHTML = `
            <div class="post-img mb-10">
                <img 
                    src="${post.image}" 
                    alt="Image de l'article : ${post.title}" 
                    class="rounded-2xl w-full h-auto max-h-[500px] object-cover shadow-lg" 
                />
            </div>
            
            <h2 class="title text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                ${post.title}
            </h2>
            
            <div class="meta-top flex flex-wrap items-center text-base font-medium text-gray-600 mb-10 border-b pb-4">
                <div class="flex items-center mr-6">
                    <i class="bi bi-person-circle mr-2 text-indigo-500 text-xl"></i>
                    <span class="hover:text-indigo-600 transition-colors">${
                      post.author
                    }</span>
                </div>
                <span class="text-gray-400">|</span>
                <div class="flex items-center mx-6">
                    <i class="bi bi-calendar-event mr-2 text-indigo-500 text-xl"></i>
                    <time datetime="${
                      post.date
                    }" class="italic text-sm">${formatDate(post.date)}</time>
                </div>
                <span class="text-gray-400">|</span>
                <div class="flex items-center ml-6">
                    <i class="bi bi-chat-dots mr-2 text-indigo-500 text-xl"></i>
                    <a href="#comments-section" class="hover:text-indigo-600 transition-colors">${
                      post.commentsCount
                    } Commentaires</a>
                </div>
            </div>
            
            <div class="content text-gray-800 text-lg leading-relaxed space-y-6 mb-12">
                ${post.content}
            </div>
            
            <div class="meta-bottom flex flex-wrap items-center gap-4 border-t pt-6">
                <span class="text-lg font-bold text-gray-800 flex items-center">
                    <i class="bi bi-folder-fill mr-2 text-indigo-500"></i> Catégorie:
                </span>
                <a href="#" class="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-semibold text-sm hover:bg-indigo-200 transition-colors">
                    ${post.category}
                </a>

                <span class="text-lg font-bold text-gray-800 ml-4 flex items-center">
                    <i class="bi bi-tags-fill mr-2 text-indigo-500"></i> Tags:
                </span>
                <ul id="article-tags" class="flex flex-wrap gap-3 list-none p-0 text-sm">
                    ${post.tags
                      .map(
                        (tag) =>
                          `<li><a href="#" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300 transition-colors">#${tag}</a></li>`
                      )
                      .join("")}
                </ul>
            </div>
        `;
    }

    if (commentsSection) {
      commentsSection.className =
        "bg-white p-6 md:p-12 rounded-[2rem] shadow-xl border border-gray-100";
      commentsSection.innerHTML = `
            <h4 id="comments-title" class="text-3xl font-extrabold text-gray-900 mb-10 border-b-2 pb-3 border-indigo-200">
                ${post.comments.length} Commentaires
            </h4>
            
            <div id="comments-list" class="space-y-8">
                ${post.comments
                  .map(
                    (comment) => `
                        <div class="comment flex space-x-6 border-b border-gray-100 pb-8 last:border-b-0 last:pb-0">
                            <div class="comment-img flex-shrink-0">
                                <img 
                                    src="${comment.image}" 
                                    alt="Photo de profil de ${comment.author}" 
                                    class="w-14 h-14 rounded-full object-cover border-2 border-indigo-200 shadow-md" 
                                />
                            </div>
                            <div>
                                <h5 class="font-black text-lg text-gray-800">${
                                  comment.author
                                }</h5>
                                <time 
                                    datetime="${comment.date}" 
                                    class="text-sm text-indigo-500 block mb-3"
                                >
                                    ${formatDate(comment.date)}
                                </time>
                                <p class="text-gray-700 leading-relaxed">${
                                  comment.text
                                }</p>
                            </div>
                        </div>
                    `
                  )
                  .join("")}
            </div>
            
            <div class="reply-form mt-12 pt-8 border-t border-gray-100">
                <h4 class="text-2xl font-bold text-gray-900 mb-2">Laisser un commentaire</h4>
                <p class="text-gray-500 text-sm mb-6">Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont indiqués avec *.</p>
                <form id="comment-form" class="space-y-5">
                    <div class="flex flex-col md:flex-row gap-5">
                        <input name="name" type="text" 
                            class="form-control flex-1 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                            placeholder="Votre nom*" required 
                        />
                        <input name="email" type="email" 
                            class="form-control flex-1 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                            placeholder="Votre e-mail*" required 
                        />
                    </div>
                    <div class="flex flex-col">
                        <textarea name="comment" 
                            class="form-control w-full p-4 border border-gray-300 rounded-xl h-36 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                            placeholder="Votre commentaire*" required
                        ></textarea>
                    </div>
                    <button type="submit" 
                        class="bg-indigo-600 text-white font-extrabold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02]"
                    >
                        Poster le commentaire
                    </button>
                </form>
                <div id="comment-message" class="mt-4"></div>
            </div>
        `;
    }

    // Gestion de la soumission du formulaire (inchangée mais avec de meilleures classes)
    const commentForm = document.getElementById("comment-form");
    if (commentForm) {
      commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const messageBox = document.getElementById("comment-message");

        messageBox.innerHTML = `
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative shadow-md" role="alert">
                <span class="block font-medium">✅ Merci ${name} ! Votre commentaire a été soumis. Il sera publié après modération.</span>
            </div>
        `;
        e.target.reset();
      });
    }
  }

  // Affiche les articles récents de la sidebar
  function renderRecentPosts() {
    const recentPostsList = document.getElementById("recent-posts-list");
    if (!recentPostsList) return;

    recentPostsList.innerHTML = "";
    // On prend les 3 plus récents pour la sidebar
    const recentPosts = blogData.posts.slice(0, 3);
    recentPosts.forEach((post) => {
      const postItem = document.createElement("div");
      postItem.className = "post-item flex items-center space-x-4 py-2";
      postItem.innerHTML = `
                        <img src="${
                          post.image
                        }" alt="Miniature de l'article" class="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                        <div>
                            <h4 class="text-sm font-medium leading-tight">
                                <a href="?id=${
                                  post.id
                                }" class="hover:text-blue-600">${post.title}</a>
                            </h4>
                            <time datetime="${
                              post.date
                            }" class="text-xs text-gray-500 block">${formatDate(
        post.date
      )}</time>
                        </div>
                    `;
      recentPostsList.appendChild(postItem);
    });
  }

  // Affiche les tags de la sidebar
  function renderCategories() {
    const categoriesList = document.getElementById("categories-list");
    if (!categoriesList) return;

    // 1. Logique de dénombrement des catégories (inchangée)
    const categories = blogData.posts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {});

    categoriesList.innerHTML = "";
    categoriesList.className = "space-y-3"; // Espace entre les éléments

    // Ajout d'une option pour réinitialiser le filtre
    const liAll = document.createElement("li");
    liAll.innerHTML = `<a href="#" class="flex justify-between items-center py-2 text-indigo-700 font-bold border-b border-indigo-200 hover:text-indigo-900 transition-colors duration-200">
        <span class="flex items-center"><i class="bi bi-folder-fill mr-2 text-indigo-500"></i> Toutes les catégories</span> 
        <span class="text-base font-bold">(${blogData.posts.length})</span>
    </a>`;
    liAll.querySelector("a").addEventListener("click", (e) => {
      e.preventDefault();
      // Appel de la fonction de filtrage avec une valeur nulle pour tout afficher
      filterAndRenderPosts("category", null);
    });
    categoriesList.appendChild(liAll);

    // 2. Rendu des catégories
    for (const category in categories) {
      const li = document.createElement("li");

      // AMÉLIORATION DU DESIGN
      // Vous pouvez ajouter ici une logique pour déterminer si 'category' est la catégorie active (currentFilter.value === category)
      const isActive = false;

      li.innerHTML = `
            <a href="#" class="flex justify-between items-center p-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-indigo-600 text-white shadow-md font-bold"
                : "text-gray-700 bg-gray-50 hover:bg-indigo-100 hover:text-indigo-700"
            }">
                <span class="flex items-center">
                    <i class="bi bi-folder mr-3 ${
                      isActive ? "text-white" : "text-indigo-500"
                    }"></i>
                    ${category}
                </span> 
                <span class="text-sm font-semibold ${
                  isActive ? "text-white" : "text-gray-500"
                }">(${categories[category]})</span>
            </a>
        `;

      // AJOUT DE LA LOGIQUE DE FILTRAGE
      li.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        filterAndRenderPosts("category", category);
      });
      categoriesList.appendChild(li);
    }
  }

  // --- Logique d'initialisation ---
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id");

  if (articleId) {
    const currentArticle = blogData.posts.find((post) => post.id === articleId);
    if (currentArticle) {
      renderArticle(currentArticle);
    } else {
      document.getElementById("page-title").textContent = "Article non trouvé";
      document.getElementById(
        "article-content"
      ).innerHTML = `<p class="text-center text-gray-600">L'article que vous recherchez n'existe pas.</p>`;
      const commentsSection = document.getElementById("comments-section");
      if (commentsSection) commentsSection.style.display = "none";
    }
  } else {
    renderPosts(currentPage);
  }

  // Appeler les fonctions de la barre latérale dans tous les cas
  renderRecentPosts();
  renderCategories();
  renderTags();
});
