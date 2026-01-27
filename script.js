let translations = {};
let pricing = {};
let currentOrderContext = null;

document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        fetch('translations.json').then(r => r.json()),
        fetch('pricing.json').then(r => r.json())
    ])
        .then(([t, p]) => {
            translations = t;
            pricing = p;
            initApp();
        })
        .catch(console.error);
});

function initApp() {
    initializeLanguage();
    setupEventListeners();
    updateRanges();
    updateInputVisibility();
    calculate();
}

function initializeLanguage() {
    const supported = ['ru', 'en'];
    let lang = 'ru';
    try {
        const browserLang = (navigator.language || 'ru').split('-')[0];
        if (supported.includes(browserLang)) lang = browserLang;
    } catch (e) { }

    const select = document.getElementById('languageSelect');
    if (select) {
        select.value = lang;
        updateLanguage(lang);
        select.addEventListener('change', (e) => updateLanguage(e.target.value));
    }
}

function updateLanguage(lang) {
    document.documentElement.lang = lang;
    if (!translations[lang]) return;

    const setText = (id, key) => {
        const el = document.getElementById(id);
        if (el && translations[lang][key]) el.textContent = translations[lang][key];
    };

    const map = {
        'brandLabel': 'brandLabel',
        'brandSubtitle': 'brandSubtitle',
        'brandLinkLabel': 'brandLinkLabel',
        'calculatorTitle': 'title',
        'currentReviewsLabel': 'currentReviewsLabel',
        'maxRatingLabel': 'maxRatingLabel',
        'currentRatingLabel': 'currentRatingLabel',
        'targetRatingLabel': 'targetRatingLabel',
        'newRatingLabel': 'newRatingLabel',
        'newRatingMinLabel': 'newRatingMinLabel',
        'newRatingMaxLabel': 'newRatingMaxLabel',
        'requiresReservationLabel': 'requiresReservation',
        'reservationCostLabel': 'reservationCostLabel',
        'additionalServicesLabel': 'additionalServicesLabel',
        'videoReviewLabel': 'videoReviewLabel',
        'exclusiveArticleLabel': 'exclusiveArticleLabel',
        'aiArticleLabel': 'aiArticleLabel',
        'articlePlacementLabel': 'articlePlacementLabel',
        'chatConsultationLabel': 'chatConsultationLabel',
        'voiceConsultationLabel': 'voiceConsultationLabel',
        'organicButtonText': 'organicButton',
        'fastButtonText': 'fastButton',
        'downloadPdfLabel': 'downloadPdfLabel',
        'modalTitle': 'modalTitle',
        'summaryTitle': 'summaryTitle',
        'reportFormatTitle': 'reportFormatTitle',
        'requestTitle': 'requestTitle',
        'objectNameLabel': 'objectNameLabel',
        'objectAddressLabel': 'objectAddressLabel',
        'discountLabel': 'discountLabel',
        'contactNameLabel': 'contactNameLabel',
        'contactPhoneLabel': 'contactPhoneLabel',
        'contactTelegramLabel': 'contactTelegramLabel',
        'contactEmailLabel': 'contactEmailLabel',
        'googleCaptchaLabel': 'googleCaptchaLabel',
        'orderCommentLabel': 'orderCommentLabel',
        'orderNoPrepayButton': 'orderNoPrepayButton',
        'payOnlineButtonLabel': 'payOnlineButton',
        'downloadPdfLabel2': 'downloadPdfLabel',
        'enterDetailsForPdf': 'enterDetailsForPdf',
        // Promos
        'promoItem1Title': 'promoItem1Title',
        'promoItem1Text': 'promoItem1Text',
        'promoItem2Title': 'promoItem2Title',
        'promoItem2Text': 'promoItem2Text',
        'promoItem3Title': 'promoItem3Title',
        'promoItem3Text': 'promoItem3Text'
    };

    Object.entries(map).forEach(([id, key]) => setText(id, key));

    const list = document.getElementById('reportFormatList');
    if (list && translations[lang].reportFormatItems) {
        list.innerHTML = translations[lang].reportFormatItems.map(i => `<li><i class="fas fa-check text-success"></i> ${i}</li>`).join('');
    }

    if (pricing && pricing.additionalServices) {
        const updatePrice = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = `${val.toFixed(0)} ₽`;
        };
        updatePrice('videoReviewPrice', pricing.additionalServices.videoReview);
        updatePrice('exclusiveArticlePrice', pricing.additionalServices.exclusiveArticle);
        updatePrice('aiArticlePrice', pricing.additionalServices.aiArticle);
        updatePrice('articlePlacementPrice', pricing.additionalServices.articlePlacement);
        updatePrice('chatConsultationPrice', pricing.additionalServices.chatConsultation);
        updatePrice('voiceConsultationPrice', pricing.additionalServices.voiceConsultation);
    }

    calculate();
}

function setupEventListeners() {
    ['currentReviews', 'maxRating', 'currentRating', 'targetRating',
        'videoReviewQty', 'exclusiveArticleQty', 'aiArticleQty', 'articlePlacementQty']
        .forEach(id => {
            const input = document.getElementById(id);
            const range = document.getElementById(id + 'Range');
            const valSpan = document.getElementById(id + 'Value');

            if (input && range) {
                const sync = (src, dest) => {
                    dest.value = src.value;
                    if (valSpan) valSpan.textContent = src.value;
                    updateInputVisibility();
                    calculate();
                };
                input.addEventListener('input', () => sync(input, range));
                range.addEventListener('input', () => sync(range, input));
            }
        });

    ['newRatingMin', 'newRatingMax', 'reservationCost'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', () => { updateInputVisibility(); calculate(); });
    });

    document.getElementById('requiresReservation')?.addEventListener('change', () => { updateInputVisibility(); calculate(); });
    document.getElementById('chatConsultationQty')?.addEventListener('change', calculate);
    document.getElementById('voiceConsultationQty')?.addEventListener('change', calculate);

    document.getElementById('servicesToggleBtn')?.addEventListener('click', function () {
        this.classList.toggle('open');
        document.getElementById('serviceInputs')?.classList.toggle('open');
    });

    document.getElementById('organicButton')?.addEventListener('click', () => showSummary(false));
    document.getElementById('fastButton')?.addEventListener('click', () => showSummary(true));

    document.getElementById('downloadPdf')?.addEventListener('click', () => {
        showSummary(true);
        document.getElementById('objectName')?.focus();
    });

    document.getElementById('modalDownloadPdf')?.addEventListener('click', prepareAndPrint);

    document.getElementById('payOnlineButton')?.addEventListener('click', () => {
        alert("Redirecting to online payment...");
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('orderModal').classList.remove('open');
            document.body.classList.remove('modal-open');
        });
    });

    const reqFields = ['objectName', 'objectAddress', 'contactName', 'contactPhone', 'contactEmail', 'contactTelegram'];
    reqFields.forEach(id => {
        document.getElementById(id)?.addEventListener('input', checkPdfRequirements);
    });
}

function checkPdfRequirements() {
    const name = document.getElementById('objectName').value.trim();
    const address = document.getElementById('objectAddress').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const tg = document.getElementById('contactTelegram').value.trim();

    // Relaxed check: Name & Address & (Phone OR Email OR Telegram)
    const isValid = name && address && (phone || email || tg);

    const btn = document.getElementById('modalDownloadPdf');
    if (btn) {
        btn.disabled = !isValid;
        if (isValid) {
            btn.classList.remove('btn-secondary');
            btn.classList.add('btn-primary');
        } else {
            btn.classList.add('btn-secondary');
            btn.classList.remove('btn-primary');
        }
    }
}

function updateInputVisibility() {
    const resGroup = document.getElementById('reservationCostGroup');
    const resCheck = document.getElementById('requiresReservation');
    if (resGroup && resCheck) {
        resGroup.style.display = resCheck.checked ? 'block' : 'none';
    }

    const max = parseFloat(document.getElementById('maxRating')?.value) || 10;
    ['currentRating', 'targetRating', 'newRatingMin', 'newRatingMax'].forEach(base => {
        const el = document.getElementById(base);
        const range = document.getElementById(base + 'Range');
        if (el) el.max = max;
        if (range) range.max = max;
    });
}

function prepareAndPrint() {
    const name = document.getElementById('objectName').value;
    const address = document.getElementById('objectAddress').value;
    const clientInfoDiv = document.getElementById('pdfClientInfo');

    const lang = document.documentElement.lang;
    const t = translations[lang];

    if (clientInfoDiv) {
        clientInfoDiv.innerHTML = `
            <p><strong>${t.objectNameLabel}:</strong> ${name}</p>
            <p><strong>${t.objectAddressLabel}:</strong> ${address}</p>
            <p><strong>${t.pdfReportTitle}:</strong> ${new Date().toLocaleDateString()}</p>
        `;
    }

    const printContainer = document.getElementById('printSummaryContainer');
    if (printContainer && currentOrderContext) {
        const r = currentOrderContext.result;
        printContainer.innerHTML = `
            <table>
                <tr>
                    <th>${t.reportTableLabel}</th>
                    <th>${t.reportTableValue}</th>
                </tr>
                <tr><td>${t.newReviewsNeeded}</td><td>${r.needed}</td></tr>
                <tr><td>${t.averageRating}</td><td>${r.avgNew.toFixed(1)}</td></tr>
                <tr><td>${t.reviewCost}</td><td>${r.reviewCostTotal.toFixed(0)} ₽</td></tr>
                
                ${r.transferCost > 0 ? `
                <tr style="background:#f0fdf4">
                    <td>${t.reserveTotalLabel}</td>
                    <td>${r.transferCost.toFixed(0)} ₽</td>
                </tr>` : ''}

                ${r.serviceCost > 0 ? `
                <tr>
                    <td>${t.additionalServices}</td>
                    <td>${r.serviceCost.toFixed(0)} ₽</td>
                </tr>` : ''}

                <tr class="total-row">
                    <td><strong>${t.serviceTotalLabel}</strong></td>
                    <td><strong>${r.totalServiceCost.toFixed(0)} ₽</strong></td>
                </tr>
                 ${r.transferCost > 0 ? `
                <tr class="total-row" style="background:#dcfce7">
                    <td><strong>${t.totalPayLabel} (+ ${t.reserveTotalLabel})</strong></td>
                    <td><strong>${r.total.toFixed(0)} ₽</strong></td>
                </tr>` : ''}
            </table>
        `;
    }

    window.print();
}

function calculate() {
    const getVal = (id) => parseFloat(document.getElementById(id)?.value) || 0;
    const getCheck = (id) => document.getElementById(id)?.checked || false;

    const currentReviews = getVal('currentReviews');
    const maxRating = getVal('maxRating') || 10;
    const currentRating = getVal('currentRating');
    const targetRating = getVal('targetRating');
    const minNew = getVal('newRatingMin');
    const maxNew = getVal('newRatingMax');

    const errDiv = document.getElementById('error');
    if (errDiv) errDiv.style.display = 'none';

    if (currentRating > maxRating || targetRating > maxRating) return;

    const avgNew = (minNew + maxNew) / 2;
    let needed = 0;
    if (avgNew > targetRating) {
        needed = Math.ceil((targetRating * currentReviews - currentRating * currentReviews) / (avgNew - targetRating));
        if (needed < 0) needed = 0;
    }

    const serviceCost =
        (getVal('videoReviewQty') * (pricing.additionalServices?.videoReview || 0)) +
        (getVal('exclusiveArticleQty') * (pricing.additionalServices?.exclusiveArticle || 0)) +
        (getVal('aiArticleQty') * (pricing.additionalServices?.aiArticle || 0)) +
        (getVal('articlePlacementQty') * (pricing.additionalServices?.articlePlacement || 0)) +
        (getCheck('chatConsultationQty') ? (pricing.additionalServices?.chatConsultation || 0) : 0) +
        (getCheck('voiceConsultationQty') ? (pricing.additionalServices?.voiceConsultation || 0) : 0);

    let perReview = 0;
    if (pricing.reviewCosts) {
        if (needed <= pricing.reviewCosts.tier1.maxReviews) perReview = pricing.reviewCosts.tier1.costPerReview;
        else if (needed <= pricing.reviewCosts.tier2.maxReviews) perReview = pricing.reviewCosts.tier2.costPerReview;
        else if (needed <= pricing.reviewCosts.tier3.maxReviews) perReview = pricing.reviewCosts.tier3.costPerReview;
        else perReview = pricing.reviewCosts.tier4.costPerReview;
    }

    const reviewCostTotal = needed * perReview;
    const processingFee = (pricing.processingFee?.base || 0) + (needed * (pricing.processingFee?.percentagePerReview || 0));
    const transferCost = document.getElementById('requiresReservation').checked ? (needed * getVal('reservationCost')) : 0;

    // Split Total
    const totalServiceCost = reviewCostTotal + processingFee + serviceCost;
    const total = totalServiceCost + transferCost; // Combined, but we focus on display split

    // Update Result Box
    const resBox = document.getElementById('result');
    const lang = document.documentElement.lang;
    const t = translations[lang];

    if (resBox && t) {
        let moneyHtml = `${totalServiceCost.toFixed(0)} ₽`;
        if (transferCost > 0) {
            moneyHtml += ` + <span style="color:var(--success)">${transferCost.toFixed(0)} ₽ (Резерв)</span>`;
        }

        resBox.innerHTML = t.result
            .replace('{count}', `<strong>${needed}</strong>`)
            .replace('{rating}', `<strong>${avgNew.toFixed(1)}</strong>`)
            .replace('{totalCost}', `<strong>${moneyHtml}</strong>`);
        resBox.style.display = 'block';
    }

    // Update Header Price
    const headerCost = document.getElementById('currentHeaderCost');
    if (headerCost) {
        if (transferCost > 0) {
            headerCost.innerHTML = `
                <span class="cost-part">${totalServiceCost.toFixed(0)} ₽</span>
                <span class="reserve-part">+ ${transferCost.toFixed(0)} ₽</span>
            `;
        } else {
            headerCost.textContent = `${totalServiceCost.toFixed(0)} ₽`;
        }
    }

    return { needed, avgNew, total, totalServiceCost, reviewCostTotal, processingFee, transferCost, serviceCost };
}


function showSummary(isFast) {
    const res = calculate();
    if (!res) return;

    const lang = document.documentElement.lang;
    const t = translations[lang];
    const context = { result: res, isFast: isFast };
    currentOrderContext = context;

    const summaryDiv = document.getElementById('orderSummary');
    if (summaryDiv && t) {
        summaryDiv.innerHTML = `
            <ul>
                <li><strong>${t.newReviewsNeeded}:</strong> ${res.needed}</li>
                <li><strong>${t.averageRating}:</strong> ${res.avgNew.toFixed(1)}</li>
                <li><strong>${t.reviewCost}:</strong> ${res.reviewCostTotal.toFixed(0)} ₽</li>
                ${res.transferCost > 0 ? `<li><strong style="color:var(--success)">${t.reserveTotalLabel}:</strong> ${res.transferCost.toFixed(0)} ₽</li>` : ''}
                ${res.serviceCost > 0 ? `<li><strong>${t.additionalServices}:</strong> ${res.serviceCost.toFixed(0)} ₽</li>` : ''}
            </ul>
            <div class="order-total">
                <div>${t.serviceTotalLabel} ${res.totalServiceCost.toFixed(0)} ₽</div>
                ${res.transferCost > 0 ? `<div style="font-size:0.9em; color:var(--success)">+ ${t.reserveTotalLabel} ${res.transferCost.toFixed(0)} ₽</div>` : ''}
            </div>
        `;
    }

    document.getElementById('orderModal').classList.add('open');
    document.body.classList.add('modal-open');
    checkPdfRequirements();
}

// Form Submit
document.getElementById('orderForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lang = document.documentElement.lang;
    const t = translations[lang];
    const status = document.getElementById('orderStatus');

    status.textContent = "Sending...";

    setTimeout(() => {
        status.textContent = t.submitSuccess || "Success!";
        status.style.color = "green";
    }, 1000);
});