document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".partner-form-js");
  const statusMessage = document.querySelector(".sent-message");
  const errorMessage = document.querySelector(".error-message");
  const loading = document.querySelector(".loading");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Masquer les messages précédents
      statusMessage.style.display = "none";
      errorMessage.style.display = "none";
      loading.style.display = "block";

      const data = new FormData(form);

      try {
        const response = await fetch(e.target.action, {
          method: form.method,
          body: data,
          headers: {
            Accept: "application/json",
          },
        });

        loading.style.display = "none";

        if (response.ok) {
          statusMessage.style.display = "block";
          form.reset(); // Vider le formulaire
        } else {
          const errorData = await response.json();
          errorMessage.textContent =
            errorData.error ||
            "Une erreur est survenue lors de l'envoi. Veuillez réessayer.";
          errorMessage.style.display = "block";
        }
      } catch (error) {
        loading.style.display = "none";
        errorMessage.textContent =
          "Erreur de connexion : Veuillez vérifier votre réseau.";
        errorMessage.style.display = "block";
      }
    });
  }
});
