let translations = {};
let pricing = {};
let currentOrderContext = null;

// Load translations and pricing from JSON files
Promise.all([
    fetch('translations.json').then(response => {
        if (!response.ok) throw new Error('Failed to load translations.json');
        return response.json();
    }),
    fetch('pricing.json').then(response => {
        if (!response.ok) throw new Error('Failed to load pricing.json');
        return response.json();
    })
])
    .then(([translationsData, pricingData]) => {
        translations = translationsData;
        pricing = pricingData;
        initializeLanguage();
        initializeServiceLabels();
        updateRanges(); // Initialize ranges on load
        updateInputVisibility(); // Initialize input visibility
        applyUrlParams();
    })
    .catch(error => console.error('Error loading JSON files:', error));

function initializeLanguage() {
    const supportedLangs = ['ru', 'en', 'de', 'fr', 'it', 'nl', 'pl', 'zh', 'ar'];
    let defaultLang = 'en';
    
    try {
        const browserLangs = navigator.languages 
            ? navigator.languages.map(lang => lang.split('-')[0])
            : (navigator.language ? [navigator.language.split('-')[0]] : ['en']);
        defaultLang = browserLangs.find(lang => supportedLangs.includes(lang)) || 'en';
    } catch (e) {
        console.error('Error determining browser language:', e);
    }

    const select = document.getElementById('languageSelect');
    if (select) {
        select.value = defaultLang;
        updateLanguage(defaultLang);
    } else {
        console.error('Language select element not found');
    }
}

function initializeServiceLabels() {
    const currentLang = document.getElementById('languageSelect')?.value || 'en';
    const labels = {
        requiresReservationLabel: translations[currentLang].requiresReservation,
        reservationCostLabel: translations[currentLang].reservationCost,
        additionalServicesLabel: translations[currentLang].additionalServices,
        videoReviewLabel: translations[currentLang].videoReview,
        exclusiveArticleLabel: translations[currentLang].exclusiveArticle,
        aiArticleLabel: translations[currentLang].aiArticle,
        articlePlacementLabel: translations[currentLang].articlePlacement,
        chatConsultationLabel: translations[currentLang].chatConsultation,
        voiceConsultationLabel: translations[currentLang].voiceConsultation,
        downloadPdfLabel: translations[currentLang].downloadPdf
    };

    Object.entries(labels).forEach(([id, text]) => {
        const elements = document.querySelectorAll(`#${id}`);
        elements.forEach(element => {
            if (element) element.textContent = text || '';
            else console.warn(`Element with ID ${id} not found`);
        });
    });

    // Update service prices
    const priceElements = {
        videoReviewPrice: pricing.additionalServices.videoReview.toFixed(2),
        exclusiveArticlePrice: pricing.additionalServices.exclusiveArticle.toFixed(2),
        aiArticlePrice: pricing.additionalServices.aiArticle.toFixed(2),
        articlePlacementPrice: pricing.additionalServices.articlePlacement.toFixed(2),
        chatConsultationPrice: pricing.additionalServices.chatConsultation.toFixed(2),
        voiceConsultationPrice: pricing.additionalServices.voiceConsultation.toFixed(2)
    };

    Object.entries(priceElements).forEach(([id, price]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = `${price} ₽`;
        else console.warn(`Price element with ID ${id} not found`);
    });
}

function updateLanguage(lang) {
    document.documentElement.lang = lang;
    const elements = {
        title: translations[lang].title,
        currentReviewsLabel: translations[lang].currentReviews,
        maxRatingLabel: translations[lang].maxRating,
        currentRatingLabel: translations[lang].currentRating,
        targetRatingLabel: translations[lang].targetRating,
        newRatingLabel: translations[lang].newRating,
        newRatingMinLabel: translations[lang].newRatingMin,
        newRatingMaxLabel: translations[lang].newRatingMax,
        organicButton: translations[lang].organicButton,
        fastButton: translations[lang].fastButton,
        promoTitle: translations[lang].promoTitle,
        promoSubtitle: translations[lang].promoSubtitle,
        promoItem1Title: translations[lang].promoItem1Title,
        promoItem1Text: translations[lang].promoItem1Text,
        promoItem2Title: translations[lang].promoItem2Title,
        promoItem2Text: translations[lang].promoItem2Text,
        promoItem3Title: translations[lang].promoItem3Title,
        promoItem3Text: translations[lang].promoItem3Text,
        brandLabel: translations[lang].brandLabel,
        brandSubtitle: translations[lang].brandSubtitle,
        brandLinkLabel: translations[lang].brandLinkLabel,
        summaryTitle: translations[lang].summaryTitle,
        reportFormatTitle: translations[lang].reportFormatTitle,
        requestTitle: translations[lang].requestTitle,
        platformLabel: translations[lang].platformLabel,
        discountLabel: translations[lang].discountLabel,
        contactNameLabel: translations[lang].contactNameLabel,
        contactPhoneLabel: translations[lang].contactPhoneLabel,
        contactTelegramLabel: translations[lang].contactTelegramLabel,
        contactEmailLabel: translations[lang].contactEmailLabel,
        captchaLabel: translations[lang].captchaLabel,
        orderCommentLabel: translations[lang].orderCommentLabel,
        submitOrderLabel: translations[lang].submitOrderLabel
    };

    Object.entries(elements).forEach(([id, text]) => {
        const element = document.getElementById(id);
        if (element && text) element.textContent = text;
        else console.warn(`Element with ID ${id} not found or translation missing`);
    });

    initializeServiceLabels();
    renderReportFormat(lang);
    calculate();
}

document.getElementById('languageSelect')?.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

const inputs = {
    currentReviews: document.getElementById('currentReviews'),
    currentReviewsRange: document.getElementById('currentReviewsRange'),
    maxRating: document.getElementById('maxRating'),
    maxRatingRange: document.getElementById('maxRatingRange'),
    currentRating: document.getElementById('currentRating'),
    currentRatingRange: document.getElementById('currentRatingRange'),
    targetRating: document.getElementById('targetRating'),
    targetRatingRange: document.getElementById('targetRatingRange'),
    newRatingMin: document.getElementById('newRatingMin'),
    newRatingMax: document.getElementById('newRatingMax'),
    requiresReservation: document.getElementById('requiresReservation'),
    reservationCost: document.getElementById('reservationCost'),
    videoReviewQty: document.getElementById('videoReviewQty'),
    videoReviewQtyRange: document.getElementById('videoReviewQtyRange'),
    exclusiveArticleQty: document.getElementById('exclusiveArticleQty'),
    exclusiveArticleQtyRange: document.getElementById('exclusiveArticleQtyRange'),
    aiArticleQty: document.getElementById('aiArticleQty'),
    aiArticleQtyRange: document.getElementById('aiArticleQtyRange'),
    articlePlacementQty: document.getElementById('articlePlacementQty'),
    articlePlacementQtyRange: document.getElementById('articlePlacementQtyRange'),
    chatConsultationQty: document.getElementById('chatConsultationQty'),
    voiceConsultationQty: document.getElementById('voiceConsultationQty')
};

const orderFormElements = {
    form: document.getElementById('orderForm'),
    platform: document.getElementById('platformInput'),
    discount: document.getElementById('discountInput'),
    contactName: document.getElementById('contactName'),
    contactPhone: document.getElementById('contactPhone'),
    contactTelegram: document.getElementById('contactTelegram'),
    contactEmail: document.getElementById('contactEmail'),
    captchaToken: document.getElementById('captchaToken'),
    orderComment: document.getElementById('orderComment'),
    status: document.getElementById('orderStatus')
};

const values = {
    currentReviewsValue: document.getElementById('currentReviewsValue'),
    maxRatingValue: document.getElementById('maxRatingValue'),
    currentRatingValue: document.getElementById('currentRatingValue'),
    targetRatingValue: document.getElementById('targetRatingValue'),
    videoReviewQtyValue: document.getElementById('videoReviewQtyValue'),
    exclusiveArticleQtyValue: document.getElementById('exclusiveArticleQtyValue'),
    aiArticleQtyValue: document.getElementById('aiArticleQtyValue'),
    articlePlacementQtyValue: document.getElementById('articlePlacementQtyValue')
};

function syncInputAndRange(input, range, valueDisplay) {
    if (!input || !range || !valueDisplay) {
        console.warn('Missing input, range, or value display element');
        return;
    }
    input.addEventListener('input', () => {
        range.value = input.value;
        valueDisplay.textContent = input.value;
        updateInputVisibility();
        calculate();
    });
    range.addEventListener('input', () => {
        input.value = range.value;
        valueDisplay.textContent = range.value;
        updateInputVisibility();
        calculate();
    });
}

function updateRanges() {
    const maxRating = parseFloat(inputs.maxRating.value) || 10;
    inputs.currentRating.max = maxRating;
    inputs.currentRatingRange.max = maxRating;
    inputs.targetRating.max = maxRating;
    inputs.targetRatingRange.max = maxRating;
    inputs.newRatingMin.max = maxRating;
    inputs.newRatingMax.max = maxRating;

    // Cap currentRating if it exceeds maxRating
    if (parseFloat(inputs.currentRating.value) > maxRating) {
        inputs.currentRating.value = maxRating;
        inputs.currentRatingRange.value = maxRating;
        values.currentRatingValue.textContent = maxRating;
    }
    // Cap targetRating if it exceeds maxRating
    if (parseFloat(inputs.targetRating.value) > maxRating) {
        inputs.targetRating.value = maxRating;
        inputs.targetRatingRange.value = maxRating;
        values.targetRatingValue.textContent = maxRating;
    }
    // Cap newRatingMin and newRatingMax
    if (parseFloat(inputs.newRatingMin.value) > maxRating) {
        inputs.newRatingMin.value = maxRating;
    }
    if (parseFloat(inputs.newRatingMax.value) > maxRating) {
        inputs.newRatingMax.value = maxRating;
    }

    values.currentRatingValue.textContent = inputs.currentRating.value;
    values.targetRatingValue.textContent = inputs.targetRating.value;
    updateInputVisibility();
    calculate();
}

function updateInputVisibility() {
    const groups = [
        {
            id: 'maxRatingGroup',
            check: () => {
                const val = parseFloat(inputs.currentReviews.value);
                return !isNaN(val) && val >= 0 && val <= 10000;
            }
        },
        {
            id: 'currentRatingGroup',
            check: () => {
                const val = parseFloat(inputs.maxRating.value);
                return !isNaN(val) && val >= 1 && val <= 10;
            }
        },
        {
            id: 'targetRatingGroup',
            check: () => {
                const val = parseFloat(inputs.currentRating.value);
                const maxRating = parseFloat(inputs.maxRating.value);
                return !isNaN(val) && val >= 0 && val <= maxRating;
            }
        },
        {
            id: 'newRatingGroup',
            check: () => {
                const val = parseFloat(inputs.targetRating.value);
                const maxRating = parseFloat(inputs.maxRating.value);
                const currentRating = parseFloat(inputs.currentRating.value);
                return !isNaN(val) && val >= currentRating && val <= maxRating;
            }
        },
        {
            id: 'requiresReservationGroup',
            check: () => {
                const min = parseFloat(inputs.newRatingMin.value);
                const max = parseFloat(inputs.newRatingMax.value);
                const maxRating = parseFloat(inputs.maxRating.value);
                const currentRating = parseFloat(inputs.currentRating.value);
                return !isNaN(min) && !isNaN(max) && min >= currentRating && min <= maxRating && max >= min && max <= maxRating;
            }
        },
        {
            id: 'reservationCostGroup',
            check: () => inputs.requiresReservation.checked
        }
    ];

    groups.forEach((group, index) => {
        const element = document.getElementById(group.id);
        if (element) {
            // Only show the next group if all previous groups are valid
            const isVisible = index === 0 || (group.check() && groups.slice(0, index).every(g => g.check()));
            element.style.display = isVisible ? 'block' : 'none';
        }
    });
}

syncInputAndRange(inputs.currentReviews, inputs.currentReviewsRange, values.currentReviewsValue);
syncInputAndRange(inputs.maxRating, inputs.maxRatingRange, values.maxRatingValue);
syncInputAndRange(inputs.currentRating, inputs.currentRatingRange, values.currentRatingValue);
syncInputAndRange(inputs.targetRating, inputs.targetRatingRange, values.targetRatingValue);
syncInputAndRange(inputs.videoReviewQty, inputs.videoReviewQtyRange, values.videoReviewQtyValue);
syncInputAndRange(inputs.exclusiveArticleQty, inputs.exclusiveArticleQtyRange, values.exclusiveArticleQtyValue);
syncInputAndRange(inputs.aiArticleQty, inputs.aiArticleQtyRange, values.aiArticleQtyValue);
syncInputAndRange(inputs.articlePlacementQty, inputs.articlePlacementQtyRange, values.articlePlacementQtyValue);

inputs.maxRating.addEventListener('input', updateRanges);
inputs.maxRatingRange.addEventListener('input', updateRanges);
inputs.newRatingMin.addEventListener('input', () => { updateInputVisibility(); calculate(); });
inputs.newRatingMax.addEventListener('input', () => { updateInputVisibility(); calculate(); });
inputs.requiresReservation.addEventListener('change', () => {
    updateInputVisibility();
    calculate();
});
inputs.reservationCost.addEventListener('input', () => {
    updateInputVisibility();
    calculate();
});

// Update result on additional service quantity change
inputs.chatConsultationQty.addEventListener('change', calculate);
inputs.voiceConsultationQty.addEventListener('change', calculate);

// Toggle additional services visibility
function toggleServices() {
    const services = document.getElementById('serviceInputs');
    const toggle = document.querySelector('.service-toggle');
    if (services && toggle) {
        services.classList.toggle('open');
        toggle.classList.toggle('open');
    }
}

function calculate() {
    const errorDiv = document.getElementById('error');
    const resultDiv = document.getElementById('result');
    const currentLang = document.getElementById('languageSelect')?.value || 'en';
    errorDiv.style.display = 'none';
    resultDiv.style.display = 'none';

    const currentReviews = parseFloat(inputs.currentReviews.value);
    const maxRating = parseFloat(inputs.maxRating.value);
    const currentRating = parseFloat(inputs.currentRating.value);
    const targetRating = parseFloat(inputs.targetRating.value);
    const newRatingMin = parseFloat(inputs.newRatingMin.value);
    const newRatingMax = parseFloat(inputs.newRatingMax.value);

    if (isNaN(currentReviews) || isNaN(maxRating) || isNaN(currentRating) || 
        isNaN(targetRating) || isNaN(newRatingMin) || isNaN(newRatingMax)) {
        errorDiv.textContent = translations[currentLang].errorInvalid || 'Please enter valid numbers';
        errorDiv.style.display = 'block';
        return;
    }

    if (maxRating <= 0) {
        errorDiv.textContent = translations[currentLang].errorMaxRating || 'Maximum rating must be greater than 0';
        errorDiv.style.display = 'block';
        return;
    }

    if (currentRating > maxRating || targetRating > maxRating || 
        newRatingMin > maxRating || newRatingMax > maxRating) {
        errorDiv.textContent = translations[currentLang].errorExceedMax || 'Ratings cannot exceed maximum rating';
        errorDiv.style.display = 'block';
        return;
    }

    if (newRatingMin > newRatingMax) {
        errorDiv.textContent = translations[currentLang].errorMinMax || 'Minimum new rating cannot exceed maximum';
        errorDiv.style.display = 'block';
        return;
    }

    if (targetRating < currentRating) {
        errorDiv.textContent = translations[currentLang].errorTargetLow || 'Target rating must be greater than or equal to current rating';
        errorDiv.style.display = 'block';
        return;
    }

    if (newRatingMin <= currentRating) {
        errorDiv.textContent = translations[currentLang].errorNewLow || 'New rating must be greater than current rating';
        errorDiv.style.display = 'block';
        return;
    }

    const avgNewRating = (newRatingMin + newRatingMax) / 2;
    const newReviewsNeeded = Math.ceil(
        (targetRating * (currentReviews + 0) - currentRating * currentReviews) / 
        (avgNewRating - targetRating)
    );

    if (newReviewsNeeded < 0 || !isFinite(newReviewsNeeded)) {
        errorDiv.textContent = translations[currentLang].errorImpossible || 'Cannot achieve target rating with given inputs';
        errorDiv.style.display = 'block';
        return;
    }

    // Calculate additional services costs
    const serviceQuantities = {
        videoReview: parseInt(inputs.videoReviewQty.value) || 0,
        exclusiveArticle: parseInt(inputs.exclusiveArticleQty.value) || 0,
        aiArticle: parseInt(inputs.aiArticleQty.value) || 0,
        articlePlacement: parseInt(inputs.articlePlacementQty.value) || 0,
        chatConsultation: inputs.chatConsultationQty.checked ? 1 : 0,
        voiceConsultation: inputs.voiceConsultationQty.checked ? 1 : 0
    };

    const serviceCosts = {
        videoReview: serviceQuantities.videoReview * pricing.additionalServices.videoReview,
        exclusiveArticle: serviceQuantities.exclusiveArticle * pricing.additionalServices.exclusiveArticle,
        aiArticle: serviceQuantities.aiArticle * pricing.additionalServices.aiArticle,
        articlePlacement: serviceQuantities.articlePlacement * pricing.additionalServices.articlePlacement,
        chatConsultation: serviceQuantities.chatConsultation * pricing.additionalServices.chatConsultation,
        voiceConsultation: serviceQuantities.voiceConsultation * pricing.additionalServices.voiceConsultation
    };

    // Calculate review cost
    let reviewCostPerUnit;
    if (newReviewsNeeded <= pricing.reviewCosts.tier1.maxReviews) {
        reviewCostPerUnit = pricing.reviewCosts.tier1.costPerReview;
    } else if (newReviewsNeeded <= pricing.reviewCosts.tier2.maxReviews) {
        reviewCostPerUnit = pricing.reviewCosts.tier2.costPerReview;
    } else if (newReviewsNeeded <= pricing.reviewCosts.tier3.maxReviews) {
        reviewCostPerUnit = pricing.reviewCosts.tier3.costPerReview;
    } else {
        reviewCostPerUnit = pricing.reviewCosts.tier4.costPerReview;
    }
    const totalReviewCost = newReviewsNeeded * reviewCostPerUnit;

    // Calculate processing fee
    const processingFee = pricing.processingFee.base + (newReviewsNeeded * pricing.processingFee.percentagePerReview);

    // Calculate transfer payment cost
    let transferPaymentCost = 0;
    if (inputs.requiresReservation.checked) {
        const reservationCost = parseFloat(inputs.reservationCost.value) || 0;
        if (reservationCost < 0) {
            errorDiv.textContent = translations[currentLang].errorInvalidReservationCost;
            errorDiv.style.display = 'block';
            return;
        }
        transferPaymentCost = reservationCost * newReviewsNeeded;
    }

    // Calculate total cost
    const totalCost = totalReviewCost + processingFee + transferPaymentCost +
        Object.values(serviceCosts).reduce((sum, cost) => sum + cost, 0);

    resultDiv.innerHTML = translations[currentLang].result
        .replace('{count}', `<strong>${newReviewsNeeded}</strong>`)
        .replace('{rating}', `<strong>${avgNewRating.toFixed(1)}</strong>`)
        .replace('{totalCost}', `<strong>${totalCost.toFixed(2)} ₽</strong>`);
    resultDiv.style.display = 'block';

    return { newReviewsNeeded, avgNewRating, totalCost, serviceQuantities, serviceCosts, totalReviewCost, processingFee, transferPaymentCost };
}

function calculateOrder(isFast) {
    const result = calculate();
    if (!result) return;

    const currentLang = document.getElementById('languageSelect')?.value || 'en';
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const modal = document.getElementById('orderModal');
    const orderSummaryDiv = document.getElementById('orderSummary');
    const modalTitle = document.getElementById('modalTitle');

    let finalTransferPaymentCost = 0;
    if (isFast && inputs.requiresReservation.checked) {
        const reservationCost = parseFloat(inputs.reservationCost.value) || 0;
        if (reservationCost < 0) {
            errorDiv.textContent = translations[currentLang].errorInvalidReservationCost;
            errorDiv.style.display = 'block';
            return;
        }
        finalTransferPaymentCost = reservationCost * newReviewsNeeded;
    }

    const { newReviewsNeeded, serviceQuantities, serviceCosts, totalReviewCost, processingFee } = result;
    const totalCost = totalReviewCost + processingFee + finalTransferPaymentCost +
        Object.values(serviceCosts).reduce((sum, cost) => sum + cost, 0);

    let minMonths, maxMonths;
    if (newReviewsNeeded < 100) {
        minMonths = 1;
        maxMonths = 2;
    } else if (newReviewsNeeded < 500) {
        minMonths = 2;
        maxMonths = 4;
    } else if (newReviewsNeeded < 1000) {
        minMonths = 3;
        maxMonths = 6;
    } else {
        minMonths = 4;
        maxMonths = 8;
    }

    currentOrderContext = buildOrderContext({
        result,
        isFast,
        finalTransferPaymentCost,
        minMonths,
        maxMonths,
        totalCost,
        lang: currentLang
    });

    modalTitle.textContent = translations[currentLang].modalTitle;
    orderSummaryDiv.innerHTML = buildOrderSummaryHtml(currentOrderContext, currentLang);
    modal.style.display = 'flex';
    resultDiv.style.display = 'none';
    errorDiv.style.display = 'none';

    document.getElementById('modalDownloadPdf').onclick = () => {
        generatePdf(currentOrderContext.pdfSections, currentLang);
    };
}

function generatePreliminaryPdf() {
    const result = calculate();
    if (!result) return;

    const currentLang = document.getElementById('languageSelect')?.value || 'en';
    const preliminaryContext = buildOrderContext({
        result,
        isFast: false,
        finalTransferPaymentCost: result.transferPaymentCost,
        minMonths: null,
        maxMonths: null,
        totalCost: result.totalCost,
        lang: currentLang,
        isPreliminary: true
    });
    generatePdf(preliminaryContext.pdfSections, currentLang);
}

// Close modal
document.querySelector('.close')?.addEventListener('click', () => {
    document.getElementById('orderModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

async function generatePdf(sections, lang) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    try {
        const fontResponse = await fetch('/fonts/DejaVuSans.ttf');
        const fontArrayBuffer = await fontResponse.arrayBuffer();
        const fontBase64 = arrayBufferToBase64(fontArrayBuffer);
        doc.addFileToVFS('DejaVuSans.ttf', fontBase64);
        doc.addFont('DejaVuSans.ttf', 'DejaVuSans', 'normal');
        doc.setFont('DejaVuSans', 'normal');
    } catch (e) {
        console.error('Failed to load DejaVuSans.ttf, falling back to Times', e);
        doc.setFont('times', 'normal');
    }

    let headerLogo = null;
    let headerQr = null;
    try {
        headerLogo = await fetchImageAsDataUrl('logo-vr.png');
    } catch (e) {
        console.warn('Failed to load logo for PDF header', e);
    }
    try {
        headerQr = await fetchImageAsDataUrl('https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://t.me/yourepru_bot');
    } catch (e) {
        console.warn('Failed to load QR for PDF header', e);
    }

    doc.setFillColor(240, 246, 255);
    doc.rect(0, 0, pageWidth, 40, 'F');
    if (headerLogo) {
        doc.addImage(headerLogo, 'PNG', 12, 10, 20, 20);
    }
    if (headerQr) {
        doc.addImage(headerQr, 'PNG', pageWidth - 32, 6, 24, 24);
    }
    doc.setFontSize(14);
    doc.setTextColor(31, 54, 102);
    doc.text(translations[lang].pdfHeaderTitle || 'Order Summary', pageWidth / 2, 18, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(80, 99, 133);
    doc.text(translations[lang].pdfHeaderSubtitle || '', pageWidth / 2, 26, { align: 'center' });
    doc.text(translations[lang].pdfHeaderNote || '', pageWidth / 2, 34, { align: 'center' });

    let currentY = 50;
    sections.forEach(section => {
        if (!section.rows.length) return;
        doc.setFontSize(12);
        doc.text(section.title, 14, currentY);
        if (doc.autoTable) {
            doc.autoTable({
                startY: currentY + 6,
                head: [[translations[lang].reportTableLabel, translations[lang].reportTableValue]],
                body: section.rows,
                theme: 'striped',
                headStyles: { fillColor: [61, 106, 214], textColor: 255 },
                styles: { font: 'DejaVuSans' }
            });
            currentY = doc.lastAutoTable.finalY + 10;
        } else {
            const textLines = doc.splitTextToSize(section.rows.map(row => `${row[0]}: ${row[1]}`).join('\n'), 180);
            doc.text(textLines, 14, currentY + 6);
            currentY += textLines.length * 6 + 10;
        }
    });

    doc.save('order_summary.pdf');
}

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

async function fetchImageAsDataUrl(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load image ${url}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuffer);
    return `data:image/png;base64,${base64}`;
}

document.querySelector('.organic')?.addEventListener('click', () => calculateOrder(false));
document.querySelector('.fast')?.addEventListener('click', () => calculateOrder(true));
document.getElementById('downloadPdf').onclick = () => {
    generatePreliminaryPdf();
};

function buildOrderContext({ result, isFast, finalTransferPaymentCost, minMonths, maxMonths, totalCost, lang, isPreliminary = false }) {
    const { newReviewsNeeded, avgNewRating, serviceQuantities, serviceCosts, totalReviewCost, processingFee } = result;

    const summaryRows = [
        [translations[lang].newReviewsNeeded, `${newReviewsNeeded}`],
        [translations[lang].averageRating, avgNewRating.toFixed(1)],
        [translations[lang].reviewCost, `${totalReviewCost.toFixed(2)} ₽`],
        [translations[lang].processingFee, `${processingFee.toFixed(2)} ₽`]
    ];

    if (inputs.requiresReservation.checked && !isPreliminary) {
        summaryRows.push([translations[lang].transferPaymentCostLabel, `${finalTransferPaymentCost.toFixed(2)} ₽`]);
    } else if (inputs.requiresReservation.checked && isPreliminary) {
        summaryRows.push([translations[lang].transferPaymentCostLabel, `${finalTransferPaymentCost.toFixed(2)} ₽`]);
    }

    if (minMonths && maxMonths) {
        summaryRows.push([
            translations[lang].placementPeriod,
            `${minMonths} ${translations[lang].to} ${maxMonths} ${translations[lang].months}`
        ]);
    }

    const serviceRows = [];
    if (Object.values(serviceQuantities).some(qty => qty > 0)) {
        if (serviceQuantities.videoReview > 0) {
            serviceRows.push([translations[lang].videoReview, `${serviceQuantities.videoReview} x ${pricing.additionalServices.videoReview.toFixed(2)} ₽ = ${serviceCosts.videoReview.toFixed(2)} ₽`]);
        }
        if (serviceQuantities.exclusiveArticle > 0) {
            serviceRows.push([translations[lang].exclusiveArticle, `${serviceQuantities.exclusiveArticle} x ${pricing.additionalServices.exclusiveArticle.toFixed(2)} ₽ = ${serviceCosts.exclusiveArticle.toFixed(2)} ₽`]);
        }
        if (serviceQuantities.aiArticle > 0) {
            serviceRows.push([translations[lang].aiArticle, `${serviceQuantities.aiArticle} x ${pricing.additionalServices.aiArticle.toFixed(2)} ₽ = ${serviceCosts.aiArticle.toFixed(2)} ₽`]);
        }
        if (serviceQuantities.articlePlacement > 0) {
            serviceRows.push([translations[lang].articlePlacement, `${serviceQuantities.articlePlacement} x ${pricing.additionalServices.articlePlacement.toFixed(2)} ₽ = ${serviceCosts.articlePlacement.toFixed(2)} ₽`]);
        }
        if (serviceQuantities.chatConsultation > 0) {
            serviceRows.push([translations[lang].chatConsultation, `${serviceQuantities.chatConsultation} x ${pricing.additionalServices.chatConsultation.toFixed(2)} ₽ = ${serviceCosts.chatConsultation.toFixed(2)} ₽`]);
        }
        if (serviceQuantities.voiceConsultation > 0) {
            serviceRows.push([translations[lang].voiceConsultation, `${serviceQuantities.voiceConsultation} x ${pricing.additionalServices.voiceConsultation.toFixed(2)} ₽ = ${serviceCosts.voiceConsultation.toFixed(2)} ₽`]);
        }
    }

    const pdfSections = [
        { title: translations[lang].reportSectionCalculation, rows: summaryRows },
        { title: translations[lang].reportSectionServices, rows: serviceRows },
        {
            title: translations[lang].reportSectionTotals,
            rows: [[translations[lang].totalCost, `${totalCost.toFixed(2)} ₽`]]
        }
    ].filter(section => section.rows.length > 0);

    return {
        isFast,
        result,
        minMonths,
        maxMonths,
        totalCost,
        finalTransferPaymentCost,
        summaryRows,
        serviceRows,
        pdfSections
    };
}

function buildOrderSummaryHtml(context, lang) {
    const listItems = context.summaryRows
        .map(row => `<li><strong>${row[0]}:</strong> ${row[1]}</li>`)
        .join('');
    const serviceItems = context.serviceRows.length
        ? `<li><strong>${translations[lang].additionalServices}</strong><ul>${context.serviceRows.map(row => `<li>${row[0]}: ${row[1]}</li>`).join('')}</ul></li>`
        : '';
    return `
        <ul>
            ${listItems}
            ${serviceItems}
        </ul>
        <div class="order-total">${translations[lang].totalCost}: ${context.totalCost.toFixed(2)} ₽</div>
    `;
}

function renderReportFormat(lang) {
    const list = document.getElementById('reportFormatList');
    if (!list) return;
    const items = translations[lang].reportFormatItems || [];
    list.innerHTML = items.map(item => `<li>${item}</li>`).join('');
}

function applyUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const setNumberValue = (input, range, valueDisplay, key) => {
        if (!params.has(key)) return;
        const value = params.get(key);
        if (input) input.value = value;
        if (range) range.value = value;
        if (valueDisplay) valueDisplay.textContent = value;
    };

    setNumberValue(inputs.currentReviews, inputs.currentReviewsRange, values.currentReviewsValue, 'currentReviews');
    setNumberValue(inputs.maxRating, inputs.maxRatingRange, values.maxRatingValue, 'maxRating');
    setNumberValue(inputs.currentRating, inputs.currentRatingRange, values.currentRatingValue, 'currentRating');
    setNumberValue(inputs.targetRating, inputs.targetRatingRange, values.targetRatingValue, 'targetRating');
    setNumberValue(inputs.newRatingMin, null, null, 'newRatingMin');
    setNumberValue(inputs.newRatingMax, null, null, 'newRatingMax');
    setNumberValue(inputs.videoReviewQty, inputs.videoReviewQtyRange, values.videoReviewQtyValue, 'videoReviewQty');
    setNumberValue(inputs.exclusiveArticleQty, inputs.exclusiveArticleQtyRange, values.exclusiveArticleQtyValue, 'exclusiveArticleQty');
    setNumberValue(inputs.aiArticleQty, inputs.aiArticleQtyRange, values.aiArticleQtyValue, 'aiArticleQty');
    setNumberValue(inputs.articlePlacementQty, inputs.articlePlacementQtyRange, values.articlePlacementQtyValue, 'articlePlacementQty');

    if (params.has('requiresReservation') && inputs.requiresReservation) {
        inputs.requiresReservation.checked = params.get('requiresReservation') === 'true';
    }
    if (params.has('reservationCost') && inputs.reservationCost) {
        inputs.reservationCost.value = params.get('reservationCost');
    }
    if (params.has('chatConsultation') && inputs.chatConsultationQty) {
        inputs.chatConsultationQty.checked = params.get('chatConsultation') === 'true';
    }
    if (params.has('voiceConsultation') && inputs.voiceConsultationQty) {
        inputs.voiceConsultationQty.checked = params.get('voiceConsultation') === 'true';
    }

    if (orderFormElements.platform && params.has('platform')) {
        orderFormElements.platform.value = params.get('platform');
    }
    if (orderFormElements.discount && params.has('discount')) {
        orderFormElements.discount.value = params.get('discount');
    }

    updateRanges();
    updateInputVisibility();
    calculate();
}

if (orderFormElements.form) {
    orderFormElements.form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!currentOrderContext) return;
        const currentLang = document.getElementById('languageSelect')?.value || 'en';
        const idempotencyKey = window.crypto?.randomUUID?.() || `order-${Date.now()}`;
        const payload = {
            idempotencyKey,
            language: currentLang,
            platform: orderFormElements.platform.value.trim(),
            discountNumber: orderFormElements.discount.value.trim(),
            contactName: orderFormElements.contactName.value.trim(),
            contactPhone: orderFormElements.contactPhone.value.trim(),
            contactTelegram: orderFormElements.contactTelegram.value.trim(),
            contactEmail: orderFormElements.contactEmail.value.trim(),
            comment: orderFormElements.orderComment.value.trim(),
            captchaToken: orderFormElements.captchaToken.value.trim(),
            calculation: {
                currentReviews: inputs.currentReviews.value,
                maxRating: inputs.maxRating.value,
                currentRating: inputs.currentRating.value,
                targetRating: inputs.targetRating.value,
                newRatingMin: inputs.newRatingMin.value,
                newRatingMax: inputs.newRatingMax.value,
                requiresReservation: inputs.requiresReservation.checked,
                reservationCost: inputs.reservationCost.value,
                serviceQuantities: currentOrderContext.result.serviceQuantities,
                totalCost: currentOrderContext.totalCost
            }
        };

        try {
            const response = await fetch('send_order.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Idempotency-Key': idempotencyKey
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (!response.ok || data.status !== 'ok') {
                throw new Error(data.message || 'Submission failed');
            }
            setOrderStatus('success', translations[currentLang].submitSuccess);
        } catch (error) {
            console.error('Order submission failed', error);
            setOrderStatus('error', translations[currentLang].submitError);
        }
    });
}

function setOrderStatus(type, message) {
    if (!orderFormElements.status) return;
    orderFormElements.status.className = `order-status ${type}`;
    orderFormElements.status.textContent = message;
}
