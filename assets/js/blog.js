document.addEventListener("DOMContentLoaded", () => {
  // Étape 1 : Définir les données des articles de blog
  // Dans une application réelle, ces données seraient récupérées depuis une API ou un fichier JSON.
  const blogPostsData = [
    {
      title: "Le top 5 des articles les plus vendus ce mois-ci",
      author: "L'équipe Le Bon Waz",
      date: "2025-09-15",
      comments: 12,
      image: "assets/img/blog/blog-recent-1.jpg",
      snippet:
        "Découvrez les articles phares et les tendances du moment sur Le Bon Waz qui ont conquis nos clients ce mois-ci. Des produits locaux aux accessoires technologiques, voici ce qui fait fureur sur notre plateforme.",
      link: "#",
    },
    {
      title: "Comment photographier vos articles pour un maximum d'impact",
      author: "Le Bon Waz Photographie",
      date: "2025-09-10",
      comments: 5,
      image: "assets/img/blog/blog-recent-2.jpg",
      snippet:
        "La qualité des photos est cruciale pour attirer l'attention des acheteurs. Apprenez nos astuces pour prendre des clichés professionnels de vos produits avec votre smartphone et booster vos ventes.",
      link: "#",
    },
    {
      title: "Les objets vintage gabonais : une demande croissante",
      author: "Le Bon Waz Découverte",
      date: "2025-09-08",
      comments: 9,
      image: "assets/img/blog/blog-recent-3.jpg",
      snippet:
        "Le marché de l'occasion et des objets de collection prend de l'ampleur. Explorez le potentiel des articles vintage et artisanaux du Gabon et comment Le Bon Waz vous aide à les valoriser auprès de la communauté.",
      link: "#",
    },
    {
      title: "Notre guide pour les nouveaux vendeurs sur Le Bon Waz",
      author: "L'équipe Le Bon Waz",
      date: "2025-09-05",
      comments: 2,
      image: "assets/img/blog/blog-recent-4.jpg",
      snippet:
        "Vous débutez sur notre plateforme ? Ce guide est fait pour vous ! Nous vous expliquons pas à pas comment créer votre boutique, publier votre première annonce et gérer vos commandes facilement.",
      link: "#",
    },
    {
      title: "L'impact de Le Bon Waz sur l'économie locale",
      author: "Le Bon Waz Actualités",
      date: "2025-09-01",
      comments: 15,
      image: "assets/img/blog/blog-recent-5.jpg",
      snippet:
        "Plus qu'une simple plateforme, Le Bon Waz est un moteur de développement. Découvrez comment nous soutenons les entrepreneurs locaux, créons des opportunités et favorisons la croissance du commerce au Gabon.",
      link: "#",
    },
  ];

  const postsPerPage = 4;
  let currentPage = 1;

  // Étape 2 : Créer une fonction pour générer le HTML d'un article
  function createPostElement(post) {
    const article = document.createElement("article");
    article.innerHTML = `
            <div class="post-img">
                <img src="${post.image}" alt="Image de l'article de blog : ${
      post.title
    }" class="img-fluid" />
            </div>
            <h2 class="title"><a href="${post.link}">${post.title}</a></h2>
            <div class="meta-top">
                <ul>
                    <li class="d-flex align-items-center">
                        <i class="bi bi-person"></i>
                        <a href="#">${post.author}</a>
                    </li>
                    <li class="d-flex align-items-center">
                        <i class="bi bi-clock"></i>
                        <a href="#"><time datetime="${post.date}">${new Date(
      post.date
    ).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}</time></a>
                    </li>
                    <li class="d-flex align-items-center">
                        <i class="bi bi-chat-dots"></i>
                        <a href="#">${post.comments} Commentaires</a>
                    </li>
                </ul>
            </div>
            <div class="content">
                <p>${post.snippet}</p>
                <div class="read-more">
                    <a href="${post.link}">Lire la suite</a>
                </div>
            </div>
        `;
    return article;
  }

  // Étape 3 : Créer une fonction pour afficher les articles
  function renderPosts(page) {
    const container = document.getElementById("blog-posts-container");
    container.innerHTML = ""; // Vider le contenu existant

    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsToRender = blogPostsData.slice(start, end);

    postsToRender.forEach((post) => {
      const articleCol = document.createElement("div");
      articleCol.className = "col-lg-12";
      articleCol.appendChild(createPostElement(post));
      container.appendChild(articleCol);
    });

    renderPagination();
  }

  // Étape 4 : Créer une fonction pour gérer la pagination
  function renderPagination() {
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(blogPostsData.length / postsPerPage);

    const ul = document.createElement("ul");
    ul.className = "pagination-list";

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = i;
      if (i === currentPage) {
        a.classList.add("active");
      }
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

  // Étape 5 : Fonction pour charger les articles récents dans la barre latérale
  function renderRecentPosts() {
    const recentPostsList = document.getElementById("recent-posts-list");
    recentPostsList.innerHTML = "";
    const recentPosts = blogPostsData.slice(0, 5); // Affiche les 5 articles les plus récents

    recentPosts.forEach((post) => {
      const postItem = document.createElement("div");
      postItem.className = "post-item";
      postItem.innerHTML = `
                <img src="${
                  post.image
                }" alt="Miniature d'article de blog" class="flex-shrink-0" />
                <div>
                    <h4><a href="${post.link}">${post.title}</a></h4>
                    <time datetime="${post.date}">${new Date(
        post.date
      ).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}</time>
                </div>
            `;
      recentPostsList.appendChild(postItem);
    });
  }

  // Étape 6 : Appeler les fonctions pour initialiser la page
  renderPosts(currentPage);
  renderRecentPosts();

  // Note : Pour les catégories et les tags, vous pouvez utiliser un concept similaire en filtrant les données par catégories ou en extrayant les mots-clés de chaque article.
});

// N'oubliez pas de lier ce fichier JS dans votre page HTML juste avant la balise </body>
// <script src="assets/js/blog-dynamic.js"></script>
