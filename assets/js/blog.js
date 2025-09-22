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
        image: "https://placehold.co/900x600/FCA5A5/FFFFFF?text=Top+5+Ventes",
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
        image: "https://placehold.co/900x600/FCA5A5/FFFFFF?text=Fête+des+Mères",
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
        image: "https://placehold.co/900x600/FCA5A5/FFFFFF?text=Kit+Étudiant",
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
        image:
          "https://placehold.co/900x600/FCA5A5/FFFFFF?text=Locations+Véhicules",
        content:
          "Pour vos vacances, un déménagement ou un simple déplacement en ville, la location de véhicules n'a jamais été aussi simple. Découvrez notre large choix de voitures, camions et scooters disponibles sur notre plateforme. Réservez en quelques clics et prenez la route sereinement.",
        category: "Services",
        tags: ["Mobilité", "Location", "Véhicule"],
        comments: [],
      },
      {
        id: "photographier-articles",
        title: "Comment photographier vos articles pour un maximum d'impact",
        author: "Le Bon Waz Photographie",
        date: "2025-09-10",
        commentsCount: 5,
        image: "https://placehold.co/900x600/FCA5A5/FFFFFF?text=Photographie",
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
        image:
          "https://placehold.co/900x600/FCA5A5/FFFFFF?text=Vintage+Gabonais",
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
        image: "https://placehold.co/900x600/FCA5A5/FFFFFF?text=Guide+Vendeurs",
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
        image:
          "https://placehold.co/900x600/FCA5A5/FFFFFF?text=Économie+Locale",
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
                    <section id="blog-posts-container" class="space-y-8"></section>
                    <div id="pagination-container" class="flex justify-center mt-8"></div>
                `;
    const container = document.getElementById("blog-posts-container");

    postsToRender.forEach((post) => {
      const article = document.createElement("article");
      article.className = "bg-white p-6 md:p-10 rounded-lg shadow-md";
      article.innerHTML = `
                        <div class="post-img mb-4">
                            <img src="${
                              post.image
                            }" alt="Image de l'article de blog : ${
        post.title
      }" class="rounded-lg w-full h-auto" />
                        </div>
                        <h2 class="title text-2xl font-bold text-gray-800 mb-2">
                            <a href="?id=${
                              post.id
                            }" class="hover:text-blue-600">${post.title}</a>
                        </h2>
                        <div class="meta-top flex items-center space-x-4 text-sm text-gray-500 mb-4">
                            <div class="d-flex items-center">
                                <i class="bi bi-person mr-1"></i>
                                <span class="font-medium">${post.author}</span>
                            </div>
                            <div class="d-flex items-center">
                                <i class="bi bi-clock mr-1"></i>
                                <time datetime="${post.date}">${formatDate(
        post.date
      )}</time>
                            </div>
                            <div class="d-flex items-center">
                                <i class="bi bi-chat-dots mr-1"></i>
                                <span>${post.commentsCount} Commentaires</span>
                            </div>
                        </div>
                        <div class="content text-gray-700 leading-relaxed">
                            <p>${post.content.substring(0, 200)}...</p>
                            <div class="read-more mt-4">
                                <a href="?id=${
                                  post.id
                                }" class="inline-block text-blue-600 font-semibold hover:underline">Lire la suite</a>
                            </div>
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
    const totalPages = Math.ceil(blogData.posts.length / postsPerPage);

    const ul = document.createElement("ul");
    ul.className = "flex space-x-2";

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = i;
      a.className = `w-10 h-10 flex items-center justify-center rounded-full font-bold text-gray-600 transition-colors duration-200 ${
        i === currentPage
          ? "bg-blue-600 text-white shadow-md"
          : "bg-white hover:bg-gray-200"
      }`;

      a.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = i;
        renderPosts(currentPage);
      });
      li.appendChild(a);
      ul.appendChild(li);
    }
    paginationContainer.appendChild(ul);
  }

  // Affiche un article détaillé
  function renderArticle(post) {
    const pageTitleElement = document.getElementById("page-title");
    const articleContentElement = document.getElementById("article-content");
    const commentsSection = document.getElementById("comments-section");
    const paginationContainer = document.getElementById("pagination-container");

    if (pageTitleElement) pageTitleElement.textContent = post.title;
    if (paginationContainer) paginationContainer.remove();

    if (articleContentElement) {
      articleContentElement.innerHTML = `
                        <div class="post-img mb-6">
                            <img src="${
                              post.image
                            }" alt="Image de l'article : ${
        post.title
      }" class="rounded-lg w-full h-auto" />
                        </div>
                        <h2 class="title text-3xl font-bold text-gray-800 mb-2">${
                          post.title
                        }</h2>
                        <div class="meta-top flex flex-wrap items-center space-x-4 text-sm text-gray-500 mb-6">
                            <div class="flex items-center">
                                <i class="bi bi-person mr-1"></i>
                                <a href="#" class="hover:underline">${
                                  post.author
                                }</a>
                            </div>
                            <div class="flex items-center">
                                <i class="bi bi-clock mr-1"></i>
                                <a href="#" class="hover:underline"><time datetime="${
                                  post.date
                                }">${formatDate(post.date)}</time></a>
                            </div>
                            <div class="flex items-center">
                                <i class="bi bi-chat-dots mr-1"></i>
                                <a href="#comments-section" class="hover:underline">${
                                  post.commentsCount
                                } Commentaires</a>
                            </div>
                        </div>
                        <div class="content text-gray-700 leading-relaxed mb-6">
                            ${post.content}
                        </div>
                        <div class="meta-bottom flex items-center space-x-4 text-sm text-gray-500">
                            <i class="bi bi-folder"></i>
                            <ul class="flex space-x-2 list-none p-0 text-gray-600">
                                <li><a href="#" class="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300">${
                                  post.category
                                }</a></li>
                            </ul>
                            <i class="bi bi-tags"></i>
                            <ul id="article-tags" class="flex flex-wrap gap-2 list-none p-0 text-gray-600 text-sm">
                                ${post.tags
                                  .map(
                                    (tag) =>
                                      `<li><a href="#" class="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300">${tag}</a></li>`
                                  )
                                  .join("")}
                            </ul>
                        </div>
                    `;
    }

    if (commentsSection) {
      commentsSection.innerHTML = `
                        <h4 class="text-xl font-bold text-gray-800 mb-6">Commentaires (${
                          post.comments.length
                        })</h4>
                        <div id="comments-list" class="space-y-6">
                            ${post.comments
                              .map(
                                (comment) => `
                                <div class="comment flex space-x-4">
                                    <div class="comment-img flex-shrink-0">
                                        <img src="${
                                          comment.image
                                        }" alt="Photo de profil de ${
                                  comment.author
                                }" class="w-12 h-12 rounded-full" />
                                    </div>
                                    <div>
                                        <h5 class="font-bold text-gray-800">${
                                          comment.author
                                        }</h5>
                                        <time datetime="${
                                          comment.date
                                        }" class="text-sm text-gray-500 block mb-2">${formatDate(
                                  comment.date
                                )}</time>
                                        <p class="text-gray-700 leading-relaxed">${
                                          comment.text
                                        }</p>
                                    </div>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                        
                        <div class="reply-form mt-8">
                            <h4 class="text-xl font-bold text-gray-800 mb-2">Laisser un commentaire</h4>
                            <p class="text-gray-500 text-sm mb-4">Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont indiqués avec *.</p>
                            <form id="comment-form" class="space-y-4">
                                <div class="flex flex-col md:flex-row gap-4">
                                    <input name="name" type="text" class="form-control flex-1 p-3 border rounded-md focus:ring focus:ring-blue-500" placeholder="Votre nom*" required />
                                    <input name="email" type="email" class="form-control flex-1 p-3 border rounded-md focus:ring focus:ring-blue-500" placeholder="Votre e-mail*" required />
                                </div>
                                <div class="flex flex-col">
                                    <textarea name="comment" class="form-control w-full p-3 border rounded-md h-28 resize-none focus:ring focus:ring-blue-500" placeholder="Votre commentaire*" required></textarea>
                                </div>
                                <button type="submit" class="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition duration-300">Poster le commentaire</button>
                            </form>
                            <div id="comment-message" class="mt-4"></div>
                        </div>
                    `;
    }

    // Gérer la soumission du formulaire de commentaire
    const commentForm = document.getElementById("comment-form");
    if (commentForm) {
      commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const messageBox = document.getElementById("comment-message");

        messageBox.innerHTML = `
                            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                <span class="block sm:inline">Merci ${name} ! Votre commentaire a été soumis. Il sera publié après modération.</span>
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

  // Affiche les catégories
  function renderCategories() {
    const categoriesList = document.getElementById("categories-list");
    if (!categoriesList) return;

    const categories = blogData.posts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {});

    categoriesList.innerHTML = "";
    for (const category in categories) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" class="flex justify-between items-center text-gray-600 hover:text-blue-600"><span class="hover:underline">${category}</span> <span class="text-sm text-gray-400">(${categories[category]})</span></a>`;
      categoriesList.appendChild(li);
    }
  }

  // Affiche les tags
  function renderTags() {
    const tagsList = document.getElementById("tags-list");
    if (!tagsList) return;

    const allTags = new Set();
    blogData.posts.forEach((post) => {
      post.tags.forEach((tag) => allTags.add(tag));
    });

    tagsList.innerHTML = "";
    allTags.forEach((tag) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" class="bg-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors duration-200">${tag}</a>`;
      tagsList.appendChild(li);
    });
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
