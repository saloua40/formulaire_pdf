// Configuration et variables globales
const ADOBE_CLIENT_ID = '1933aa64c4e04bd0a8261f9e6ff445cc'; // 
const EMAIL_SERVICE_ID = 'service_imj8k36'; // 
const EMAIL_TEMPLATE_ID = 'template_b2qpm0i';
const EMAIL_USER_ID = '1a2Jh7h3J4YhNyn4';

// Ã‰tat du formulaire
let formState = {
    pdfFieldsCompleted: 0,
    totalPdfFields: 61, // Champs obligatoires selon le cahier des charges
    attachmentsUploaded: 0,
    totalAttachments: 8,
    rgpdConsent: false,
    pdfFormData: {},
    uploadedFiles: []
};

// Liste des champs obligatoires du PDF AGEFICE
const requiredPdfFields = [
    // Section 1: Point d'Accueil (7 champs)
    'point_accueil_nom', 'point_accueil_numero', 'point_accueil_interlocuteur',
    'point_accueil_adresse', 'point_accueil_code_postal', 'point_accueil_ville', 'point_accueil_telephone',
    
    // Section 2: Entreprise (7 champs obligatoires)
    'entreprise_nom', 'entreprise_mail', 'entreprise_code_ape_naf', 'entreprise_activite',
    'entreprise_adresse', 'entreprise_code_postal', 'entreprise_ville',
    
    // Section 3: Participant (11 champs)
    'participant_civilite', 'participant_nom', 'participant_nom_naissance', 'participant_prenom',
    'participant_date_naissance', 'participant_securite_sociale', 'participant_telephone',
    'participant_siret', 'participant_forme_juridique', 'participant_mail', 'participant_niveau_diplome',
    'participant_dirigeant_depuis',
    
    // Section 4: Organisme Formation (12 champs)
    'organisme_formation_raison', 'organisme_formation_numero', 'organisme_formation_adresse',
    'organisme_formation_code_postal', 'organisme_formation_ville', 'organisme_formation_siret',
    'organisme_formation_responsable_civilite', 'organisme_formation_responsable_nom',
    'organisme_formation_responsable_prenom', 'organisme_formation_responsable_tel',
    'organisme_formation_responsable_mail', 'organisme_formation_contact_nom',
    
    // Section 5: Action Formation (12 champs obligatoires)
    'type_action', 'formation_intitule_precis', 'formation_thematique', 'formation_modalite',
    'formation_date_debut', 'formation_date_fin', 'formation_cout_total', 'formation_en_entreprise',
    'formation_adresse_lieu', 'formation_code_postal_lieu', 'formation_ville_lieu', 'formateur_nom',
    
    // Section 6: ModalitÃ©s (3 champs)
    'modalites_deroulement', 'modalites_evaluation', 'nature_certification'
];

// Variables Adobe PDF
let adobeDCView = null;
let pdfLoaded = false;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('ðŸš€ Initialisation du formulaire AGEFICE...');
    initializePDF();
    initializeAttachments();
    initializeValidation();
    updateProgress();
});

// Initialisation du PDF Adobe
function initializePDF() {
    // VÃ©rifier si Adobe PDF Embed API est chargÃ©
    if (typeof AdobeDC === 'undefined') {
        console.error('âŒ Adobe PDF Embed API non chargÃ©');
        document.getElementById('adobe-dc-view').innerHTML = 
            '<p style="color: #dc3545; text-align: center; padding: 50px;">âš ï¸ Erreur de chargement du PDF. Veuillez recharger la page.</p>';
        return;
    }

    try {
        // Initialiser l'API Adobe avec une clÃ© temporaire pour la dÃ©mo
        adobeDCView = new AdobeDC.View({
            clientId: ADOBE_CLIENT_ID || 'demo-client-id', // Utilisez votre vraie clÃ© API
            divId: 'adobe-dc-view'
        });

        // Configuration pour GitHub Pages - URL du PDF
        const pdfUrl = 'const pdfUrl = 'https://github.com/saloua40/formulaire_pdf/raw/main/AGEFICE-Demande-de-prise-en-charge-2025%20PRE%20REMPLIE.pdf';'; // Nom exact du fichier sur GitHub
        
        // PrÃ©visualiser le PDF
        adobeDCView.previewFile({
            content: { location: { url: pdfUrl } },
            metaData: { fileName: 'AGEFICE-Demande-de-prise-en-charge-2025-PRE-REMPLIE.pdf' }
        }, {
            enableFormFillApi: true,
            showLeftHandPanel: false,
            showDownloadPDF: false,
            showPrintPDF: false,
            showAnnotationTools: false,
            focusOnRendering: true
        });

        // Ã‰couter les Ã©vÃ©nements de changement dans le PDF
        adobeDCView.registerCallback(
            AdobeDC.View.Enum.CallbackType.GET_FORM_DATA,
            function(formData) {
                handlePdfFormChange(formData);
            }
        );

        // Marquer le PDF comme chargÃ© aprÃ¨s un dÃ©lai
        setTimeout(() => {
            pdfLoaded = true;
            console.log('âœ… PDF AGEFICE chargÃ© avec succÃ¨s');
        }, 2000);

    } catch (error) {
        console.error('âŒ Erreur initialisation PDF:', error);
        // Affichage d'une dÃ©mo sans vraie intÃ©gration Adobe
        document.getElementById('adobe-dc-view').innerHTML = `
            <div style="border: 2px dashed #667eea; padding: 40px; text-align: center; border-radius: 10px; background: #f8f9fa;">
                <h3 style="color: #667eea; margin-bottom: 15px;">ðŸ“„ PDF AGEFICE - Mode DÃ©monstration</h3>
                <p style="color: #6c757d; margin-bottom: 20px;">
                    Pour utiliser cette application avec votre PDF AGEFICE :<br>
                    1. Obtenez une clÃ© API Adobe PDF Embed<br>
                    2. Remplacez ADOBE_CLIENT_ID dans script.js<br>
                    3. Placez votre PDF AGEFICE dans le dossier
                </p>
                <button onclick="simulatePdfFilling()" style="background: #667eea; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
                    ðŸŽ¯ Simuler le remplissage (DÃ‰MO)
                </button>
            </div>
        `;
    }
}

// Simulation du remplissage PDF pour la dÃ©mo
function simulatePdfFilling() {
    const intervals = [20, 35, 50, 70, 85, 100];
    let currentStep = 0;
    
    const simulateInterval = setInterval(() => {
        if (currentStep < intervals.length) {
            const percentage = intervals[currentStep];
            formState.pdfFieldsCompleted = Math.floor((percentage / 100) * formState.totalPdfFields);
            updateProgress();
            currentStep++;
        } else {
            clearInterval(simulateInterval);
        }
    }, 1000);
}

// Gestion des changements dans le PDF
function handlePdfFormChange(formData) {
    console.log('ðŸ“ DonnÃ©es du formulaire PDF mises Ã  jour:', formData);
    formState.pdfFormData = formData;
    
    // Compter les champs obligatoires remplis
    let filledCount = 0;
    requiredPdfFields.forEach(fieldName => {
        if (formData[fieldName] && formData[fieldName].trim() !== '') {
            filledCount++;
        }
    });
    
    formState.pdfFieldsCompleted = filledCount;
    updateProgress();
}

// Initialisation des piÃ¨ces jointes
function initializeAttachments() {
    for (let i = 1; i <= 8; i++) {
        const fileInput = document.getElementById(`pj${i}`);
        const statusSpan = document.getElementById(`status${i}`);
        
        fileInput.addEventListener('change', function(e) {
            handleFileUpload(e, i, statusSpan);
        });
    }
}

// Gestion de l'upload des fichiers
function handleFileUpload(event, index, statusElement) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validation du fichier
    const validationResult = validateFile(file);
    if (!validationResult.valid) {
        statusElement.textContent = `âŒ ${validationResult.error}`;
        statusElement.className = 'status error';
        event.target.value = ''; // Reset input
        return;
    }
    
    // Fichier valide
    statusElement.textContent = `âœ… ${file.name} (${formatFileSize(file.size)})`;
    statusElement.className = 'status uploaded';
    
    // Mettre Ã  jour l'Ã©tat
    formState.uploadedFiles[index - 1] = file;
    updateAttachmentCount();
}

// Validation des fichiers
function validateFile(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    
    if (file.size > maxSize) {
        return { valid: false, error: 'Fichier trop volumineux (max 5MB)' };
    }
    
    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: 'Format non autorisÃ© (PDF, JPG, PNG uniquement)' };
    }
    
    return { valid: true };
}

// Formatage de la taille des fichiers
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Mise Ã  jour du comptage des piÃ¨ces jointes
function updateAttachmentCount() {
    formState.attachmentsUploaded = formState.uploadedFiles.filter(file => file).length;
    updateProgress();
}

// Initialisation de la validation
function initializeValidation() {
    // Checkbox RGPD
    document.getElementById('rgpdConsent').addEventListener('change', function(e) {
        formState.rgpdConsent = e.target.checked;
        updateProgress();
    });
    
    // Bouton de soumission
    document.getElementById('submitBtn').addEventListener('click', handleSubmit);
    
    // Modals
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    document.getElementById('confirmBtn').addEventListener('click', confirmSubmit);
    document.getElementById('closeSuccessBtn').addEventListener('click', closeModal);
}

// Mise Ã  jour de la progression
function updateProgress() {
    const totalRequired = formState.totalPdfFields + formState.totalAttachments + 1; // +1 pour RGPD
    const completed = formState.pdfFieldsCompleted + formState.attachmentsUploaded + (formState.rgpdConsent ? 1 : 0);
    const percentage = Math.round((completed / totalRequired) * 100);
    
    // Mise Ã  jour de la barre de progression
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `Formulaire Ã  ${percentage}% complÃ©tÃ©`;
    
    // Calcul des Ã©lÃ©ments manquants
    const missingFields = formState.totalPdfFields - formState.pdfFieldsCompleted;
    const missingAttachments = formState.totalAttachments - formState.attachmentsUploaded;
    const missingRgpd = !formState.rgpdConsent;
    
    let missingText = '';
    const missingItems = [];
    
    if (missingFields > 0) missingItems.push(`${missingFields} champs obligatoires`);
    if (missingAttachments > 0) missingItems.push(`${missingAttachments} piÃ¨ces jointes`);
    if (missingRgpd) missingItems.push('consentement RGPD');
    
    if (missingItems.length === 0) {
        missingText = 'âœ… Formulaire complÃ¨tement rempli !';
        document.getElementById('missingItems').style.background = '#d4edda';
        document.getElementById('missingItems').style.color = '#155724';
        document.getElementById('missingItems').style.borderColor = '#28a745';
    } else {
        missingText = `âš ï¸ Manque: ${missingItems.join(' + ')}`;
    }
    
    document.getElementById('missingItems').textContent = missingText;
    
    // Activation/dÃ©sactivation du bouton
    const isComplete = percentage === 100;
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = !isComplete;
    
    if (isComplete) {
        submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        document.querySelector('.submit-help').textContent = 'ðŸŽ‰ Tout est prÃªt ! Vous pouvez envoyer votre demande.';
        document.querySelector('.submit-help').style.color = '#28a745';
    }
    
    console.log(`ðŸ“Š Progression: ${percentage}% (PDF: ${formState.pdfFieldsCompleted}/${formState.totalPdfFields}, PJ: ${formState.attachmentsUploaded}/${formState.totalAttachments}, RGPD: ${formState.rgpdConsent})`);
}

// Gestion de la soumission
function handleSubmit() {
    if (document.getElementById('submitBtn').disabled) return;
    
    // Afficher le modal de confirmation
    document.getElementById('confirmModal').style.display = 'block';
}

// Confirmation de l'envoi
function confirmSubmit() {
    closeModal();
    
    // Afficher un Ã©tat de chargement
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-icon">â³</span> Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simuler l'envoi (remplacez par votre vraie logique d'envoi)
    setTimeout(() => {
        sendFormData()
            .then(() => {
                document.getElementById('successModal').style.display = 'block';
                resetForm();
            })
            .catch((error) => {
                console.error('âŒ Erreur envoi:', error);
                alert('âŒ Erreur lors de l\'envoi. Veuillez rÃ©essayer.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    }, 2000);
}

// Envoi des donnÃ©es (Ã  personnaliser avec votre service d'email)
async function sendFormData() {
    try {
        // PrÃ©parer les donnÃ©es
        const formData = new FormData();
        
        // Ajouter les donnÃ©es du PDF
        formData.append('pdfData', JSON.stringify(formState.pdfFormData));
        
        // Ajouter les fichiers
        formState.uploadedFiles.forEach((file, index) => {
            if (file) {
                formData.append(`attachment_${index + 1}`, file);
            }
        });
        
        // Ici vous devriez intÃ©grer votre service d'email (EmailJS, service backend, etc.)
        console.log('ðŸ“§ Envoi des donnÃ©es:', {
            pdfData: formState.pdfFormData,
            attachments: formState.uploadedFiles.filter(f => f).length,
            timestamp: new Date().toISOString()
        });
        
        // Simulation de l'envoi rÃ©ussi
        return Promise.resolve('Envoi simulÃ© avec succÃ¨s');
        
    } catch (error) {
        console.error('âŒ Erreur dans sendFormData:', error);
        throw error;
    }
}

// RÃ©initialisation du formulaire
function resetForm() {
    formState = {
        pdfFieldsCompleted: 0,
        totalPdfFields: 61,
        attachmentsUploaded: 0,
        totalAttachments: 8,
        rgpdConsent: false,
        pdfFormData: {},
        uploadedFiles: []
    };
    
    // Reset des inputs de fichiers
    for (let i = 1; i <= 8; i++) {
        document.getElementById(`pj${i}`).value = '';
        document.getElementById(`status${i}`).textContent = 'âŒ Non uploadÃ©';
        document.getElementById(`status${i}`).className = 'status';
    }
    
    // Reset RGPD
    document.getElementById('rgpdConsent').checked = false;
    
    updateProgress();
}

// Fermeture des modals
function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
    document.getElementById('successModal').style.display = 'none';
}

// Fermeture des modals en cliquant Ã  l'extÃ©rieur
window.addEventListener('click', function(event) {
    const confirmModal = document.getElementById('confirmModal');
    const successModal = document.getElementById('successModal');
    
    if (event.target === confirmModal) {
        confirmModal.style.display = 'none';
    }
    if (event.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Gestion des erreurs globales
window.addEventListener('error', function(event) {
    console.error('âŒ Erreur JavaScript:', event.error);
});

// Log final d'initialisation
console.log('âœ… Script AGEFICE initialisÃ© avec succÃ¨s');
console.log('ðŸ“‹ Configuration:', {
    totalPdfFields: formState.totalPdfFields,
    totalAttachments: formState.totalAttachments,
    adobeClientId: ADOBE_CLIENT_ID ? 'ConfigurÃ©' : 'Ã€ configurer'
});
