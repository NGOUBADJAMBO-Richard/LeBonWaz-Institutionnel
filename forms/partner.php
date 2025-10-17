<?php
/**
 * Script de traitement du formulaire de Candidature Partenaire
 * Fichier : forms/partner.php
 *
 * Ce script est conçu pour recevoir les données POST du formulaire
 * "partner-form" et les envoyer à l'adresse e-mail spécifiée.
 */

// *******************************************************************
// 1. CONFIGURATION - ADRESSE DE DESTINATION
// *******************************************************************
$receiving_email_address = 'ngoubadjambo18@gmail.com';


// *******************************************************************
// 2. VÉRIFICATION DE LA MÉTHODE ET DES DONNÉES
// *******************************************************************
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    // Si la méthode n'est pas POST, interrompre.
    echo "Erreur: Méthode de soumission non autorisée.";
    exit;
}

// Nettoyage de base des données (pour éviter les injections d'en-tête, bien que la fonction mail ne soit pas l'idéal pour cela)
function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$partnership_type = clean_input($_POST['partnership_type'] ?? 'Non spécifié');
$company          = clean_input($_POST['company'] ?? 'Non spécifié');
$representative_name = clean_input($_POST['representative_name'] ?? 'Non spécifié');
$email            = clean_input($_POST['email'] ?? 'Non spécifié');
$phone            = clean_input($_POST['phone'] ?? 'Non spécifié');
$nif_rccm         = clean_input($_POST['nif_rccm'] ?? 'Non fourni');
$city_country     = clean_input($_POST['city_country'] ?? 'Non spécifié');
$offer_description = clean_input($_POST['offer_description'] ?? 'Pas de description');
$cgu_accept       = clean_input($_POST['cgu_accept'] ?? 'Non accepté');


// *******************************************************************
// 3. CONSTRUCTION DE L'EMAIL
// *******************************************************************

// Sujet de l'e-mail
$subject = "Nouvelle Candidature Partenaire - LE BON WAZ : " . $company;

// Corps du message en texte brut (pour compatibilité) et HTML
$email_content = "Nouvelle Candidature Partenaire reçue pour LE BON WAZ.\n\n";
$email_content .= "=========================================================\n";
$email_content .= "DÉTAILS DE LA CANDIDATURE :\n";
$email_content .= "=========================================================\n";
$email_content .= "Type de Partenariat : " . $partnership_type . "\n";
$email_content .= "Nom de l'Entreprise : " . $company . "\n";
$email_content .= "Représentant : " . $representative_name . "\n";
$email_content .= "Email : " . $email . "\n";
$email_content .= "Téléphone : " . $phone . "\n";
$email_content .= "NIF/RCCM : " . $nif_rccm . "\n";
$email_content .= "Ville/Pays : " . $city_country . "\n";
$email_content .= "Accord CGU : " . ($cgu_accept === 'accepté' ? 'OUI' : 'NON') . "\n\n";
$email_content .= "Description de l'Offre :\n" . $offer_description . "\n\n";
$email_content .= "=========================================================\n";


// En-têtes de l'e-mail
$headers  = 'From: Formulaire Partenaire <no-reply@votresite.com>' . "\r\n";
$headers .= 'Reply-To: ' . $email . "\r\n"; // Permet de répondre directement au candidat
$headers .= 'X-Mailer: PHP/' . phpversion();

// *******************************************************************
// 4. ENVOI DE L'EMAIL
// *******************************************************************

if (mail($receiving_email_address, $subject, $email_content, $headers)) {
    // Succès
    echo "OK"; 
    // Le script validate.js du template détecte "OK" pour afficher le message de succès.
} else {
    // Échec de l'envoi (peut être dû à une mauvaise configuration serveur)
    http_response_code(500);
    echo "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.";
}

?>