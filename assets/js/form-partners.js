document.addEventListener("DOMContentLoaded", function () {
  // Sélection des éléments
  const form = document.querySelector(".partner-form-js");
  // Ces éléments doivent avoir la classe 'd-none' par défaut dans le HTML
  const statusMessage = document.querySelector(".sent-message");
  const errorMessage = document.querySelector(".error-message");
  const loading = document.querySelector(".loading");

  // Fonction utilitaire pour masquer tous les messages
  const hideMessages = () => {
    // L'opérateur de chaînage optionnel (?) empêche les erreurs si un élément n'existe pas
    statusMessage?.classList.add("d-none");
    errorMessage?.classList.add("d-none");
    loading?.classList.add("d-none");
  };

  // Initialisation : s'assurer que tous les messages sont cachés au chargement
  hideMessages();

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // 1. Masquer les messages précédents et afficher le chargement
      hideMessages();
      loading?.classList.remove("d-none");

      const data = new FormData(form);

      try {
        const response = await fetch(e.target.action, {
          method: form.method,
          body: data,
          headers: {
            // Demander une réponse JSON pour une meilleure gestion des erreurs Formspree
            Accept: "application/json",
          },
        });

        // 2. Masquer le chargement après la réponse
        loading?.classList.add("d-none");

        if (response.ok) {
          // ✅ Succès : Afficher le message de succès et vider le formulaire
          statusMessage.classList.remove("d-none");
          form.reset();

          // (Optionnel) Défiler jusqu'au message de succès pour l'UX
          statusMessage.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          // ❌ Erreur API (e.g., Formspree ou validation)
          let errorText =
            "Une erreur inconnue est survenue. Veuillez vérifier vos champs.";

          // Tenter d'extraire le message d'erreur du corps de la réponse JSON
          try {
            const errorData = await response.json();
            // Formspree utilise souvent 'error' ou 'errors'
            errorText =
              errorData.error || errorData.errors?.[0]?.message || errorText;
          } catch {
            // Si le corps n'est pas un JSON valide
            errorText = `Erreur de serveur (Code ${response.status}). Veuillez réessayer plus tard.`;
          }

          errorMessage.textContent = errorText;
          errorMessage.classList.remove("d-none");
        }
      } catch (error) {
        // ❌ Erreur Réseau (échec de la requête)
        loading?.classList.add("d-none");
        console.error("Erreur de soumission du formulaire :", error);
        errorMessage.textContent =
          "Erreur de connexion : Veuillez vérifier votre réseau et réessayer.";
        errorMessage.classList.remove("d-none");
      }
    });
  }
});
