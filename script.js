let translations = {
    "ru": {
        "title": "Калькулятор исправления отзывов",
        "calculatorSubtitle": "Введите данные для расчёта",
        "currentReviewsLabel": "Текущее количество отзывов (0-10000):",
        "maxRatingLabel": "Максимальный балл (1-10):",
        "currentRatingLabel": "Текущий балл (0-Макс):",
        "targetRatingLabel": "Требуемый балл (0-Макс):",
        "newRatingLabel": "Допустимый уровень новых оценок:",
        "newRatingMinLabel": "От:",
        "newRatingMaxLabel": "До:",
        "requiresReservation": "Платформа требует платных резервирований (например, отели):",
        "reservationCostLabel": "Средняя стоимость резервирования (₽):",
        "additionalServicesLabel": "Дополнительные услуги",
        "videoReviewLabel": "Видео-обзор (0-50):",
        "exclusiveArticleLabel": "Эксклюзивная статья (0-50):",
        "aiArticleLabel": "AI статья (0-100):",
        "articlePlacementLabel": "Размещение статей/видео (0-50):",
        "chatConsultationLabel": "Консультация в чате:",
        "voiceConsultationLabel": "Голосовая консультация:",
        "downloadPdfLabel": "Скачать подсчёт улучшения рейтингов",
        "organicButton": "Органическое исправление",
        "fastButton": "Стратегическая корректировка",
        "promoTitle": "Преимущества сервиса",
        "promoItem1Title": "Быстрый запуск",
        "promoItem1Text": "Расчёт и заявка в Telegram за 2 минуты",
        "promoItem2Title": "Защита заявки",
        "promoItem2Text": "Идемпотентность + SmartCaptcha защита от DDoS",
        "promoItem3Title": "Структурированный отчёт",
        "promoItem3Text": "PDF со сметой, сроками и дополнительными услугами",
        "brandLabel": "Сервис «Ваша Репутация»",
        "brandSubtitle": "Управление рейтингом объекта на 25+ платформах",
        "brandLinkLabel": "yourep.ru",
        "summaryTitle": "Сводка расчёта",
        "reportFormatTitle": "Включено в отчёт",
        "requestTitle": "Заявка в Telegram",
        "errorInvalid": "Пожалуйста, введите действительные числа",
        "errorMaxRating": "Максимальный рейтинг должен быть больше 0",
        "errorExceedMax": "Рейтинги не могут превышать максимальный рейтинг",
        "errorMinMax": "Минимальный новый рейтинг не может превышать максимальный",
        "errorTargetLow": "Целевой рейтинг должен быть больше или равен текущему",
        "errorNewLow": "Новый рейтинг должен быть больше текущего",
        "errorImpossible": "Невозможно достичь целевого рейтинга с данными входными данными",
        "errorInvalidReservationCost": "Недопустимая стоимость резервирования",
        "result": "Необходимо <strong>{count}</strong> новых отзывов со средним рейтингом <strong>{rating}</strong>. Общая стоимость: <strong>{totalCost}</strong>.",
        "modalTitle": "Сводка заказа",
        "newReviewsNeeded": "Необходимое количество новых отзывов",
        "averageRating": "Средний рейтинг новых отзывов",
        "reviewCost": "Стоимость отзывов",
        "processingFee": "Комиссия за обработку",
        "additionalServices": "Дополнительные услуги",
        "totalCost": "Общая стоимость",
        "serviceTotalLabel": "Стоимость услуг:",
        "reserveTotalLabel": "Возвратный бюджет резервирований (возвращается):",
        "totalPayLabel": "Итого к оплате:",
        "pdfHeaderTitle": "Коммерческое предложение",
        "pdfHeaderSubtitle": "Управление репутацией",
        "pdfHeaderNote": "Подробности и связь в Telegram • yourep.ru",
        "submitSuccess": "Заявка отправлена успешно!",
        "orderSuccessTitle": "Заявка принята",
        "orderSuccessMessage": "Ожидайте — с вами свяжется менеджер. Хотите сделать ещё один расчёт или оформить новую заявку?",
        "newCalculationButton": "Сделать новый расчёт",
        "newOrderButton": "Оформить ещё одну заявку",
        "sendingStatus": "Отправляем заявку...",
        "submitError": "Не удалось отправить заявку. Попробуйте ещё раз.",
        "orderStatusTitle": "Статус заявки",
        "orderStatusClose": "Понятно",
        "orderNumberLabel": "Номер заказа",
        "emailRequiredError": "Укажите корректный email для связи.",
        "paymentModalTitle": "Статус оплаты",
        "paymentProcessingTitle": "Переходим к оплате",
        "paymentProcessingMessage": "Мы перенаправим вас в платёжную систему. После оплаты вернитесь на страницу.",
        "paymentSuccessTitle": "Оплата прошла успешно",
        "paymentSuccessMessage": "Мы получили оплату и начали обработку заявки. В ближайшее время свяжемся с вами.",
        "paymentFailureTitle": "Оплата не прошла",
        "paymentFailureMessage": "Платёж не подтверждён или был отменён. Вы можете попробовать снова.",
        "paymentPrimaryProcessing": "Понятно",
        "paymentPrimarySuccess": "Новый расчёт",
        "paymentPrimaryFailure": "Попробовать снова",
        "paymentSecondaryProcessing": "Вернуться к заявке",
        "paymentSecondarySuccess": "Новая заявка",
        "paymentSecondaryFailure": "Новый расчёт",
        "cookieNoticeTitle": "Мы используем cookies",
        "cookieNoticeText": "Этот сайт использует файлы cookie для хранения данных. Продолжая использовать сайт, вы даете согласие на работу с этими файлами.",
        "cookieNoticeAccept": "Принять",
        "cookieNoticeDecline": "Отклонить",
        "redirectingPayment": "Перенаправляем на оплату через ЮKassa...",
        "objectNameLabel": "Название объекта",
        "objectAddressLabel": "Ссылка на объект (URL)",
        "enterDetailsForPdf": "Введите данные для формирования PDF и заявки",
        "pdfReportTitle": "Коммерческое предложение",
        "pdfReportSubtitle": "Управление репутацией",
        "payOnlineButton": "Оплатить онлайн (-20%)",
        "orderNoPrepayButton": "Заказать без предоплаты",
        "headerPriceLabel": "Текущий расчёт:",
        "contactNameLabel": "Имя",
        "contactPhoneLabel": "Телефон",
        "contactEmailLabel": "Email",
        "contactTelegramLabel": "Telegram",
        "discountLabel": "Скидка",
        "orderCommentLabel": "Комментарий",
        "googleCaptchaLabel": "Подтверждение",
        "pdfObjectTitle": "Объект",
        "pdfContactTitle": "Контакт",
        "pdfNameLabel": "Имя:",
        "pdfPhoneLabel": "Телефон:",
        "pdfEmailLabel": "Email:",
        "pdfTelegramLabel": "Telegram:",
        "pdfCalculationDetailsTitle": "Детализация расчета",
        "pdfServiceCol": "Услуга",
        "pdfQtyCol": "Кол-во",
        "pdfPriceCol": "Цена за ед.",
        "pdfCostCol": "Стоимость",
        "pdfProcessingFeeLabel": "Обработка и модерация",
        "pdfRefundNote": "(возвращается после выполнения)",
        "pdfTermsTitle": "Условия и примечания",
        "pdfTermTimeTitle": "Сроки выполнения:",
        "pdfTermTimeText": "14-30 дней в зависимости от объема",
        "pdfTermWarrantyTitle": "Гарантия:",
        "pdfTermWarrantyText": "Естественный вид отзывов, соответствие рейтингу",
        "pdfTermPaymentTitle": "Оплата:",
        "pdfTermPaymentText": "Возможна поэтапная оплата 50%/50%",
        "pdfTermReserveTitle": "Резервирование:",
        "pdfTermReserveText": "Бюджет резервирования полностью возвращается",
        "pdfFooterContacts": "Контакты",
        "pdfSiteLabel": "Сайт:",
        "pdfSignature": "Подпись и печать",
        "newReviewsRowLabel": "Новые отзывы (рейтинг {rating})"
    },
    "en": {
        "title": "Review Correction Calculator",
        "calculatorSubtitle": "Enter data for calculation",
        "currentReviewsLabel": "Current number of reviews (0-10000):",
        "maxRatingLabel": "Maximum score (1-10):",
        "currentRatingLabel": "Current score (0-Max):",
        "targetRatingLabel": "Target score (0-Max):",
        "newRatingLabel": "Acceptable level of new ratings:",
        "newRatingMinLabel": "From:",
        "newRatingMaxLabel": "To:",
        "requiresReservation": "Platform requires paid reservations (e.g. hotels):",
        "reservationCostLabel": "Average reservation cost (₽):",
        "additionalServicesLabel": "Additional services",
        "videoReviewLabel": "Video review (0-50):",
        "exclusiveArticleLabel": "Exclusive article (0-50):",
        "aiArticleLabel": "AI article (0-100):",
        "articlePlacementLabel": "Article/video placement (0-50):",
        "chatConsultationLabel": "Chat consultation:",
        "voiceConsultationLabel": "Voice consultation:",
        "downloadPdfLabel": "Download rating improvement calculation",
        "organicButton": "Organic correction",
        "fastButton": "Strategic correction",
        "promoTitle": "Service Benefits",
        "promoItem1Title": "Quick Launch",
        "promoItem1Text": "Calculation & Telegram request in 2 minutes",
        "promoItem2Title": "Request Protection",
        "promoItem2Text": "Idempotency + SmartCaptcha anti-DDoS",
        "promoItem3Title": "Structured Report",
        "promoItem3Text": "PDF with estimate, timelines and extras",
        "brandLabel": "Your Reputation Service",
        "brandSubtitle": "Object rating management on 25+ platforms",
        "brandLinkLabel": "yourep.ru",
        "summaryTitle": "Calculation Summary",
        "reportFormatTitle": "Included in Report",
        "requestTitle": "Telegram Request",
        "errorInvalid": "Please enter valid numbers",
        "errorMaxRating": "Maximum rating must be greater than 0",
        "errorExceedMax": "Ratings cannot exceed maximum rating",
        "errorMinMax": "Minimum new rating cannot exceed maximum",
        "errorTargetLow": "Target rating must be greater than or equal to current",
        "errorNewLow": "New rating must be greater than current",
        "errorImpossible": "Cannot achieve target rating with given inputs",
        "errorInvalidReservationCost": "Invalid reservation cost",
        "result": "Need <strong>{count}</strong> new reviews with average rating <strong>{rating}</strong>. Total cost: <strong>{totalCost}</strong>.",
        "modalTitle": "Order Summary",
        "newReviewsNeeded": "New reviews needed",
        "averageRating": "Average new review rating",
        "reviewCost": "Review cost",
        "processingFee": "Processing fee",
        "additionalServices": "Additional services",
        "totalCost": "Total cost",
        "serviceTotalLabel": "Service cost:",
        "reserveTotalLabel": "Refundable reservation budget (returned):",
        "totalPayLabel": "Total to pay:",
        "pdfHeaderTitle": "Commercial Proposal",
        "pdfHeaderSubtitle": "Reputation Management",
        "pdfHeaderNote": "Details & contact via Telegram • yourep.ru",
        "submitSuccess": "Request sent successfully!",
        "orderSuccessTitle": "Request received",
        "orderSuccessMessage": "Please wait — our manager will contact you. Want another calculation or a new request?",
        "newCalculationButton": "Make another calculation",
        "newOrderButton": "Submit another request",
        "sendingStatus": "Sending request...",
        "submitError": "Failed to send the request. Please try again.",
        "orderStatusTitle": "Request status",
        "orderStatusClose": "Got it",
        "orderNumberLabel": "Order number",
        "emailRequiredError": "Please provide a valid email address.",
        "paymentModalTitle": "Payment status",
        "paymentProcessingTitle": "Redirecting to payment",
        "paymentProcessingMessage": "We'll redirect you to the payment system. Return after completing the payment.",
        "paymentSuccessTitle": "Payment successful",
        "paymentSuccessMessage": "We received your payment and started processing your request.",
        "paymentFailureTitle": "Payment failed",
        "paymentFailureMessage": "Payment was not confirmed or was cancelled. You can try again.",
        "paymentPrimaryProcessing": "Got it",
        "paymentPrimarySuccess": "New calculation",
        "paymentPrimaryFailure": "Try again",
        "paymentSecondaryProcessing": "Back to request",
        "paymentSecondarySuccess": "New request",
        "paymentSecondaryFailure": "New calculation",
        "cookieNoticeTitle": "We use cookies",
        "cookieNoticeText": "This website uses cookies to store data. By continuing to use the site, you consent to the use of these files.",
        "cookieNoticeAccept": "Accept",
        "cookieNoticeDecline": "Decline",
        "redirectingPayment": "Redirecting to YooKassa payment...",
        "objectNameLabel": "Object / Company Name",
        "objectAddressLabel": "Link to object (URL)",
        "enterDetailsForPdf": "Enter details to generate PDF and request",
        "pdfReportTitle": "Commercial Proposal",
        "pdfReportSubtitle": "Reputation Management",
        "payOnlineButton": "Pay Online (-20%)",
        "orderNoPrepayButton": "Order without prepayment",
        "headerPriceLabel": "Current calculation:",
        "contactNameLabel": "Name",
        "contactPhoneLabel": "Phone",
        "contactEmailLabel": "Email",
        "contactTelegramLabel": "Telegram",
        "discountLabel": "Discount",
        "orderCommentLabel": "Comment",
        "googleCaptchaLabel": "Verification",
        "pdfObjectTitle": "Object",
        "pdfContactTitle": "Contact",
        "pdfNameLabel": "Name:",
        "pdfPhoneLabel": "Phone:",
        "pdfEmailLabel": "Email:",
        "pdfTelegramLabel": "Telegram:",
        "pdfCalculationDetailsTitle": "Calculation Details",
        "pdfServiceCol": "Service",
        "pdfQtyCol": "Qty",
        "pdfPriceCol": "Unit Price",
        "pdfCostCol": "Total",
        "pdfProcessingFeeLabel": "Processing and moderation",
        "pdfRefundNote": "(refunded upon completion)",
        "pdfTermsTitle": "Terms and Notes",
        "pdfTermTimeTitle": "Timeline:",
        "pdfTermTimeText": "14-30 days depending on volume",
        "pdfTermWarrantyTitle": "Warranty:",
        "pdfTermWarrantyText": "Natural look, rating compliance",
        "pdfTermPaymentTitle": "Payment:",
        "pdfTermPaymentText": "50%/50% split payment available",
        "pdfTermReserveTitle": "Reservation:",
        "pdfTermReserveText": "Reservation budget is fully refundable",
        "pdfFooterContacts": "Contacts",
        "pdfSiteLabel": "Website:",
        "pdfSignature": "Signature and Stamp",
        "newReviewsRowLabel": "New reviews (rating {rating})"
    }
};

let pricing = null;

document.addEventListener('DOMContentLoaded', async () => {
    await loadPricing();
    initApp();
});

async function loadPricing() {
    try {
        const response = await fetch('pricing.json');
        pricing = await response.json();
    } catch (e) {
        console.error("Failed to load pricing.json", e);
        // Fallback or alert user
        alert("Ошибка загрузки цен. Пожалуйста, обновите страницу.");
    }
}

let currentOrderContext = null;
let paymentState = 'processing';

// DOMContentLoaded handled above to wait for pricing

function initApp() {
    initializeLanguage();
    initCookieNotice();
    setupEventListeners();
    updateRanges();
    updateInputVisibility();
    updateNewRatingMinMax();
    calculate();
    ensureOrderState();
    handlePaymentReturn();
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
        select.addEventListener('change', e => updateLanguage(e.target.value));
    }
}

function ensureOrderState() {
    const successNotice = document.getElementById('orderSuccessNotice');
    if (successNotice) {
        successNotice.hidden = true;
    }
    hideOrderStatusOverlay();
    setPaymentState('processing');
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('open');
        updateModalOpenState();
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('open');
        updateModalOpenState();
    }
}

function updateModalOpenState() {
    const hasOpenModal = !!document.querySelector('.modal-overlay.open');
    document.body.classList.toggle('modal-open', hasOpenModal);
}

function setOrderStatusOverlay({ type, message }) {
    const overlay = document.getElementById('orderStatusOverlay');
    if (!overlay) return;
    const icon = document.getElementById('orderStatusIcon');
    const messageEl = document.getElementById('orderStatusMessage');
    if (messageEl) {
        messageEl.textContent = message;
    }
    overlay.classList.toggle('is-success', type === 'success');
    overlay.classList.toggle('is-error', type === 'error');
    if (icon) {
        if (type === 'success') {
            icon.innerHTML = '<i class="fas fa-check-circle"></i>';
        } else if (type === 'error') {
            icon.innerHTML = '<i class="fas fa-triangle-exclamation"></i>';
        } else {
            icon.innerHTML = '';
        }
    }
    overlay.hidden = false;
}

function hideOrderStatusOverlay() {
    const overlay = document.getElementById('orderStatusOverlay');
    if (!overlay) return;
    overlay.hidden = true;
    overlay.classList.remove('is-success', 'is-error');
    const messageEl = document.getElementById('orderStatusMessage');
    if (messageEl) {
        messageEl.textContent = '';
    }
    const icon = document.getElementById('orderStatusIcon');
    if (icon) {
        icon.innerHTML = '';
    }
}

function updateLanguage(lang) {
    document.documentElement.lang = lang;
    if (!translations[lang]) return;

    const setText = (id, key) => {
        const el = document.getElementById(id);
        if (el && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    };

    const map = {
        'brandLabel': 'brandLabel',
        'brandSubtitle': 'brandSubtitle',
        'brandLinkLabel': 'brandLinkLabel',
        'calculatorTitle': 'title',
        'calculatorSubtitle': 'calculatorSubtitle',
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
        'enterDetailsForPdf': 'enterDetailsForPdf',
        'pdfReportTitle': 'pdfReportTitle',
        'pdfReportSubtitle': 'pdfReportSubtitle',
        'payOnlineButtonLabel': 'payOnlineButton',
        'orderNoPrepayButton': 'orderNoPrepayButton',
        'promoItem1Title': 'promoItem1Title',
        'promoItem1Text': 'promoItem1Text',
        'promoItem2Title': 'promoItem2Title',
        'promoItem2Text': 'promoItem2Text',
        'promoItem3Title': 'promoItem3Title',
        'promoItem3Text': 'promoItem3Text',
        'headerPriceLabel': 'headerPriceLabel',
        'contactNameLabel': 'contactNameLabel',
        'contactPhoneLabel': 'contactPhoneLabel',
        'contactEmailLabel': 'contactEmailLabel',
        'contactTelegramLabel': 'contactTelegramLabel',
        'discountLabel': 'discountLabel',
        'orderCommentLabel': 'orderCommentLabel',
        'googleCaptchaLabel': 'googleCaptchaLabel',
        'cookieNoticeTitle': 'cookieNoticeTitle',
        'cookieNoticeText': 'cookieNoticeText',
        'cookieNoticeAccept': 'cookieNoticeAccept',
        'orderSuccessTitle': 'orderSuccessTitle',
        'orderSuccessMessage': 'orderSuccessMessage',
        'newCalculationButton': 'newCalculationButton',
        'newOrderButton': 'newOrderButton',
        'orderStatusTitle': 'orderStatusTitle',
        'orderStatusClose': 'orderStatusClose',
        'paymentModalTitle': 'paymentModalTitle'
    };

    Object.entries(map).forEach(([id, key]) => setText(id, key));

    const promoTitleEl = document.querySelector('.promo-title, .features-list h4');
    if (promoTitleEl && translations[lang].promoTitle) {
        promoTitleEl.textContent = translations[lang].promoTitle;
    }

    const list = document.getElementById('reportFormatList');
    if (list && translations[lang].reportFormatItems) {
        list.innerHTML = translations[lang].reportFormatItems.map(i => `<li><i class="fas fa-check text-success"></i> ${i}</li>`).join('');
    }

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

    calculate();
    setPaymentState(paymentState);
}

function setPaymentState(state) {
    const lang = document.documentElement.lang;
    const t = translations[lang] || translations.ru;
    paymentState = state;

    const iconEl = document.getElementById('paymentStateIcon');
    const titleEl = document.getElementById('paymentStateTitle');
    const messageEl = document.getElementById('paymentStateMessage');

    if (iconEl) {
        iconEl.className = 'payment-status-icon';
        if (state === 'success') {
            iconEl.classList.add('success');
            iconEl.innerHTML = '<i class="fas fa-check"></i>';
        } else if (state === 'failure') {
            iconEl.classList.add('failure');
            iconEl.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            iconEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        }
    }

    if (titleEl) {
        titleEl.textContent = state === 'success'
            ? t.paymentSuccessTitle
            : state === 'failure'
                ? t.paymentFailureTitle
                : t.paymentProcessingTitle;
    }

    if (messageEl) {
        messageEl.textContent = state === 'success'
            ? t.paymentSuccessMessage
            : state === 'failure'
                ? t.paymentFailureMessage
                : t.paymentProcessingMessage;
    }

    const primaryAction = document.getElementById('paymentPrimaryAction');
    const secondaryAction = document.getElementById('paymentSecondaryAction');
    const tertiaryAction = document.getElementById('paymentTertiaryAction');

    if (primaryAction) {
        primaryAction.textContent = state === 'success'
            ? t.paymentPrimarySuccess
            : state === 'failure'
                ? t.paymentPrimaryFailure
                : t.paymentPrimaryProcessing;
        primaryAction.hidden = false;
    }

    if (secondaryAction) {
        secondaryAction.textContent = state === 'success'
            ? t.paymentSecondarySuccess
            : state === 'failure'
                ? t.paymentSecondaryFailure
                : t.paymentSecondaryProcessing;
        secondaryAction.hidden = false;
    }

    if (tertiaryAction) {
        tertiaryAction.hidden = true;
    }
}

function handlePaymentReturn() {
    const params = new URLSearchParams(window.location.search);
    const rawStatus = params.get('payment_status')
        || params.get('paymentStatus')
        || params.get('payment_result')
        || params.get('status');
    if (!rawStatus) return;

    const normalized = rawStatus.toLowerCase();
    const successValues = ['success', 'succeeded', 'paid', 'ok'];
    const failureValues = ['fail', 'failed', 'failure', 'canceled', 'cancelled', 'error'];

    if (successValues.includes(normalized)) {
        setPaymentState('success');
        closeModal('orderModal');
        openModal('paymentModal');
    } else if (failureValues.includes(normalized)) {
        setPaymentState('failure');
        closeModal('orderModal');
        openModal('paymentModal');
    }

    ['payment_status', 'paymentStatus', 'payment_result', 'status'].forEach(key => params.delete(key));
    const url = new URL(window.location.href);
    url.search = params.toString();
    window.history.replaceState({}, '', url.toString());
}

function initCookieNotice() {
    const notice = document.getElementById('cookieNotice');
    if (!notice) return;

    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');

    // If no choice made yet, show notice
    if (!consent) {
        notice.classList.remove('hidden');
        // Small delay for animation
        setTimeout(() => {
            notice.classList.add('visible');
        }, 100);
    } else {
        notice.classList.add('hidden');
    }
}

function getVal(id) {
    return parseFloat(document.getElementById(id)?.value) || 0;
}

function getCheck(id) {
    return !!document.getElementById(id)?.checked;
}

function setupEventListeners() {
    document.getElementById('cookieNoticeAccept')?.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        hideCookieNotice();
    });

    document.getElementById('cookieNoticeDecline')?.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        hideCookieNotice();
    });

    const inputsWithRanges = ['currentReviews', 'maxRating', 'currentRating', 'targetRating', 'videoReviewQty', 'exclusiveArticleQty', 'aiArticleQty', 'articlePlacementQty'];
    inputsWithRanges.forEach(id => {
        const input = document.getElementById(id);
        const range = document.getElementById(id + 'Range');
        const valSpan = document.getElementById(id + 'Value');

        if (input && range) {
            const sync = (src, dest) => {
                dest.value = src.value;
                if (valSpan) valSpan.textContent = src.value;
                updateInputVisibility();
                updatePlacementMax();
                updateNewRatingMinMax();
                if (id === 'currentRating') updateTargetRatingMin();
                calculate();
            };
            input.addEventListener('input', () => sync(input, range));
            range.addEventListener('input', () => sync(range, input));
        }
    });

    // Initial call
    updateTargetRatingMin();

    ['newRatingMin', 'newRatingMax', 'reservationCost', 'currentRating', 'maxRating'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', () => {
            updateInputVisibility();
            updateNewRatingMinMax();
            calculate();
        });
    });

    document.getElementById('requiresReservation')?.addEventListener('change', () => {
        updateInputVisibility();
        calculate();
    });

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

    document.getElementById('payOnlineButton')?.addEventListener('click', async () => {
        const lang = document.documentElement.lang;
        const t = translations[lang] || translations.ru;
        const button = document.getElementById('payOnlineButton');
        const status = document.getElementById('orderStatus');
        const paymentUrl = button?.dataset.yookassaUrl;
        const validation = validateOrderForm();
        if (!validation.ok) {
            if (status) {
                status.textContent = validation.message;
                status.style.color = "#dc2626";
            }
            return;
        }
        setPaymentState('processing');
        closeModal('orderModal');
        openModal('paymentModal');
        if (status) {
            status.textContent = t.redirectingPayment || "Redirecting to online payment...";
            status.style.color = "#2563eb";
        }

        try {
            const paymentPayload = buildOrderPayload('online_payment', 'payment_initiated');
            paymentPayload.paymentInitiatedAt = new Date().toISOString();
            const response = await sendOrderAction(paymentPayload);
            if (response.orderNumber) {
                currentOrderContext.orderNumber = response.orderNumber;
            }
            const paymentRedirectUrl = buildPaymentUrl(paymentUrl, paymentPayload);
            if (paymentRedirectUrl) {
                window.location.assign(paymentRedirectUrl);
            }
        } catch (error) {
            if (status) {
                status.textContent = t.submitError || "Ошибка отправки заявки.";
                status.style.color = "#dc2626";
            }
            setOrderStatusOverlay({
                type: 'error',
                message: t.submitError || "Ошибка отправки заявки."
            });
            console.error(error);
        }
    });

    document.getElementById('newCalculationButton')?.addEventListener('click', () => {
        resetOrderForm();
        closeModal('orderModal');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.getElementById('newOrderButton')?.addEventListener('click', () => {
        resetOrderForm();
        document.getElementById('orderForm')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.modalClose;
            if (targetId) {
                closeModal(targetId);
                return;
            }
            const modal = btn.closest('.modal-overlay');
            if (modal?.id) {
                closeModal(modal.id);
            }
        });
    });

    document.getElementById('orderStatusClose')?.addEventListener('click', () => {
        hideOrderStatusOverlay();
    });

    document.getElementById('paymentPrimaryAction')?.addEventListener('click', () => {
        if (paymentState === 'success') {
            resetOrderForm();
            closeModal('paymentModal');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (paymentState === 'failure') {
            closeModal('paymentModal');
            openModal('orderModal');
        } else {
            closeModal('paymentModal');
        }
    });

    document.getElementById('paymentSecondaryAction')?.addEventListener('click', () => {
        if (paymentState === 'success') {
            resetOrderForm();
            closeModal('paymentModal');
            openModal('orderModal');
        } else if (paymentState === 'failure') {
            resetOrderForm();
            closeModal('paymentModal');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            closeModal('paymentModal');
            openModal('orderModal');
        }
    });

    ['objectName', 'objectAddress', 'contactName', 'contactPhone', 'contactEmail', 'contactTelegram'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', checkPdfRequirements);
    });
}

function updateNewRatingMinMax() {
    // Получаем текущее значение целевого рейтинга
    const targetRating = getVal('targetRating');
    const maxRating = getVal('maxRating') || 10;

    const minEl = document.getElementById('newRatingMin');
    const minRange = document.getElementById('newRatingMinRange'); // Если есть range input для этого
    const maxEl = document.getElementById('newRatingMax');
    const maxRange = document.getElementById('newRatingMaxRange'); // Если есть range input

    // Минимально допустимый новый рейтинг должен быть не ниже ТРЕБУЕМОГО, 
    // так как чтобы поднять рейтинг, новые отзывы должны быть лучше текущей цели (обычно).
    // По ТЗ: "Допустимый уровень новых оценок - значение ОТ не ниже выбранного требуемого балла"

    // Но если целевой рейтинг 0, то логичнее отталкиваться от текущего или 0. 
    // Обычно targetRating >= currentRating. 
    // Безопасный минимум: targetRating
    const minVal = targetRating;

    if (minEl) minEl.min = minVal;
    if (minRange) minRange.min = minVal;

    // Если текущее значение меньше нового минимума, обновляем
    if (getVal('newRatingMin') < minVal) {
        if (minEl) minEl.value = minVal.toFixed(1);
    }

    // Верхняя граница - maxRating (обычно 10)
    if (maxEl) {
        maxEl.max = maxRating;
        // По умолчанию 10, если вдруг сбилось или пусто
        if (!maxEl.value) maxEl.value = maxRating;
    }

    // Если "До" меньше "От", подтягиваем "До"
    const currentMin = getVal('newRatingMin');
    if (getVal('newRatingMax') < currentMin) {
        if (maxEl) maxEl.value = currentMin > maxRating ? maxRating : currentMin;
    }
}

function updateTargetRatingMin() {
    const current = getVal('currentRating');
    const targetEl = document.getElementById('targetRating');
    const targetRange = document.getElementById('targetRatingRange');

    if (targetEl) targetEl.min = current;
    if (targetRange) targetRange.min = current;

    // Auto-adjust if below
    if (getVal('targetRating') < current) {
        if (targetEl) targetEl.value = current;
        if (targetRange) targetRange.value = current;
        const valSpan = document.getElementById('targetRatingValue');
        if (valSpan) valSpan.textContent = current;
    }
}

function checkPdfRequirements() {
    const name = document.getElementById('objectName')?.value.trim() || '';
    const address = document.getElementById('objectAddress')?.value.trim() || '';
    const email = document.getElementById('contactEmail')?.value.trim() || '';

    const valid = name && address && email;

    const btn = document.getElementById('modalDownloadPdf');
    if (btn) {
        btn.disabled = !valid;
        btn.classList.toggle('btn-primary', valid);
        btn.classList.toggle('btn-secondary', !valid);
    }
}

function validateOrderForm() {
    const lang = document.documentElement.lang;
    const t = translations[lang] || translations.ru;
    const name = document.getElementById('objectName')?.value.trim() || '';
    const address = document.getElementById('objectAddress')?.value.trim() || '';
    const email = document.getElementById('contactEmail')?.value.trim() || '';

    if (!name || !address || !email) {
        return { ok: false, message: t.emailRequiredError };
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
        return { ok: false, message: t.emailRequiredError };
    }

    return { ok: true };
}

function collectServiceQuantities() {
    return {
        videoReview: getVal('videoReviewQty'),
        exclusiveArticle: getVal('exclusiveArticleQty'),
        aiArticle: getVal('aiArticleQty'),
        articlePlacement: getVal('articlePlacementQty'),
        chatConsultation: getCheck('chatConsultationQty') ? 1 : 0,
        voiceConsultation: getCheck('voiceConsultationQty') ? 1 : 0
    };
}

function buildOrderPayload(orderType, action = 'order_submission') {
    const calculation = calculate();
    const orderMeta = getOrderMeta();
    const payload = {
        action,
        orderType,
        orderNumber: orderMeta.orderNumber,
        orderCreatedAt: orderMeta.orderCreatedAt,
        objectName: document.getElementById('objectName')?.value.trim() || '',
        objectAddress: document.getElementById('objectAddress')?.value.trim() || '',
        discountNumber: document.getElementById('discountInput')?.value.trim() || '',
        contactName: document.getElementById('contactName')?.value.trim() || '',
        contactPhone: document.getElementById('contactPhone')?.value.trim() || '',
        contactEmail: document.getElementById('contactEmail')?.value.trim() || '',
        contactTelegram: document.getElementById('contactTelegram')?.value.trim() || '',
        comment: document.getElementById('orderComment')?.value.trim() || '',
        strategy: currentOrderContext?.isFast ? 'fast' : 'organic',
        calculation: calculation ? {
            currentReviews: getVal('currentReviews'),
            maxRating: getVal('maxRating'),
            currentRating: getVal('currentRating'),
            targetRating: getVal('targetRating'),
            newRatingMin: getVal('newRatingMin'),
            newRatingMax: getVal('newRatingMax'),
            requiresReservation: getCheck('requiresReservation'),
            reservationCost: getVal('reservationCost'),
            serviceQuantities: collectServiceQuantities(),
            totalCost: calculation.total
        } : null
    };

    return payload;
}

async function sendOrderAction(payload) {
    const response = await fetch('send_order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': createIdempotencyKey()
        },
        body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.status !== 'ok') {
        throw new Error(data.message || 'Request failed');
    }

    return data;
}

function buildPaymentUrl(baseUrl, payload) {
    if (!baseUrl) return '';
    let url;
    try {
        url = new URL(baseUrl);
    } catch (error) {
        return baseUrl;
    }

    const metadata = {
        orderNumber: payload.orderNumber,
        orderType: payload.orderType,
        orderCreatedAt: payload.orderCreatedAt,
        objectName: payload.objectName,
        objectAddress: payload.objectAddress,
        contactName: payload.contactName,
        contactPhone: payload.contactPhone,
        contactEmail: payload.contactEmail,
        contactTelegram: payload.contactTelegram,
        totalCost: payload.calculation?.totalCost ?? null,
        strategy: payload.strategy,
        discountNumber: payload.discountNumber
    };

    url.searchParams.set('orderNumber', payload.orderNumber || '');
    url.searchParams.set('orderType', payload.orderType || '');
    if (payload.calculation?.totalCost) {
        url.searchParams.set('amount', String(payload.calculation.totalCost));
    }
    url.searchParams.set('metadata', JSON.stringify(metadata));

    return url.toString();
}

function createIdempotencyKey() {
    if (window.crypto?.randomUUID) {
        return window.crypto.randomUUID();
    }
    return `order_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function generateOrderNumber(date = new Date()) {
    const letters = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯ';
    const digits = '0123456789';
    const alphabet = letters + digits;
    const pad = value => String(value).padStart(2, '0');
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = String(date.getFullYear());
    let code = '';
    for (let i = 0; i < 5; i += 1) {
        code += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return `${day}${month}${year}-${code}`;
}

function getOrderMeta() {
    if (!currentOrderContext) {
        return { orderNumber: '', orderCreatedAt: '' };
    }
    if (!currentOrderContext.orderNumber) {
        const createdAt = new Date();
        currentOrderContext.orderNumber = generateOrderNumber(createdAt);
        currentOrderContext.orderCreatedAt = createdAt.toISOString();
    }
    return {
        orderNumber: currentOrderContext.orderNumber,
        orderCreatedAt: currentOrderContext.orderCreatedAt || ''
    };
}

function updateInputVisibility() {
    const group = document.getElementById('reservationCostGroup');
    if (group) {
        group.style.display = getCheck('requiresReservation') ? 'block' : 'none';
    }
}

function updatePlacementMax() {
    const total = getVal('videoReviewQty') + getVal('exclusiveArticleQty') + getVal('aiArticleQty');
    const range = document.getElementById('articlePlacementQtyRange');
    const input = document.getElementById('articlePlacementQty');
    const span = document.getElementById('articlePlacementQtyValue');

    if (range) {
        range.max = total;
        let current = getVal('articlePlacementQty');
        if (current > total) {
            range.value = total;
            if (input) input.value = total;
            if (span) span.textContent = total;
        }
    }
}

function showError(msg) {
    const el = document.getElementById('error');
    if (el) {
        el.textContent = msg;
        el.style.display = 'block';
    }
}

function calculate() {
    const currentReviews = getVal('currentReviews');
    const maxRating = getVal('maxRating') || 10;
    const currentRating = getVal('currentRating');
    const targetRating = getVal('targetRating');
    const minNew = getVal('newRatingMin');
    const maxNew = getVal('newRatingMax');

    const errEl = document.getElementById('error');
    if (errEl) errEl.style.display = 'none';

    const lang = document.documentElement.lang;
    const t = translations[lang] || translations.ru;

    if (isNaN(currentReviews) || currentReviews < 0 || currentReviews > 10000) {
        showError(t.errorInvalid);
        return null;
    }
    if (maxRating <= 0) {
        showError(t.errorMaxRating);
        return null;
    }
    if ([currentRating, targetRating, minNew, maxNew].some(v => v > maxRating || isNaN(v))) {
        showError(t.errorExceedMax);
        return null;
    }
    if (minNew > maxNew) {
        showError(t.errorMinMax);
        return null;
    }
    if (targetRating < currentRating - 0.000001) {
        showError(t.errorTargetLow);
        return null;
    }

    const avgNew = (minNew + maxNew) / 2;

    if (avgNew <= currentRating + 0.000001) {
        showError(t.errorNewLow);
        return null;
    }
    if (avgNew <= targetRating + 0.000001) {
        showError(t.errorImpossible);
        return null;
    }

    const needed = Math.ceil((targetRating - currentRating) * currentReviews / (avgNew - targetRating));

    if (needed <= 0 || isNaN(needed)) {
        showError(t.errorImpossible);
        return null;
    }

    const resCost = getVal('reservationCost');
    if (getCheck('requiresReservation') && (isNaN(resCost) || resCost <= 0)) {
        showError(t.errorInvalidReservationCost);
        return null;
    }

    let perReview = pricing.reviewCosts.tier4.costPerReview;
    if (needed <= pricing.reviewCosts.tier1.maxReviews) perReview = pricing.reviewCosts.tier1.costPerReview;
    else if (needed <= pricing.reviewCosts.tier2.maxReviews) perReview = pricing.reviewCosts.tier2.costPerReview;
    else if (needed <= pricing.reviewCosts.tier3.maxReviews) perReview = pricing.reviewCosts.tier3.costPerReview;

    const reviewCostTotal = needed * perReview;
    const processingFee = pricing.processingFee.base + needed * pricing.processingFee.percentagePerReview;
    const transferCostFull = getCheck('requiresReservation') ? needed * resCost : 0;
    const transferCost = Math.ceil(transferCostFull * 0.3);

    const extraCost =
        getVal('videoReviewQty') * pricing.additionalServices.videoReview +
        getVal('exclusiveArticleQty') * pricing.additionalServices.exclusiveArticle +
        getVal('aiArticleQty') * pricing.additionalServices.aiArticle +
        getVal('articlePlacementQty') * pricing.additionalServices.articlePlacement +
        (getCheck('chatConsultationQty') ? pricing.additionalServices.chatConsultation : 0) +
        (getCheck('voiceConsultationQty') ? pricing.additionalServices.voiceConsultation : 0);

    const totalServiceCost = reviewCostTotal + processingFee + extraCost;
    const total = totalServiceCost + transferCost;

    const resultBox = document.getElementById('result');
    if (resultBox) {
        let costHtml = `${totalServiceCost.toFixed(0)} ₽`;
        if (transferCost > 0) costHtml += ` + <span style="color:#16a34a">${transferCost.toFixed(0)} ₽ (резерв)</span>`;
        resultBox.innerHTML = t.result
            .replace('{count}', needed)
            .replace('{rating}', avgNew.toFixed(1))
            .replace('{totalCost}', costHtml);
        resultBox.style.display = 'block';
    }

    const headerCost = document.getElementById('currentHeaderCost');
    if (headerCost) {
        if (transferCost > 0) {
            headerCost.innerHTML = `<span class="cost-part">${totalServiceCost.toFixed(0)} ₽</span> <span class="reserve-part">+ ${transferCost.toFixed(0)} ₽</span>`;
        } else {
            headerCost.textContent = `${totalServiceCost.toFixed(0)} ₽`;
        }
    }

    return {
        needed,
        avgNew,
        total,
        totalServiceCost,
        reviewCostTotal,
        processingFee,
        transferCost,
        serviceCost: extraCost
    };
}

function showSummary(isFast) {
    const result = calculate();
    if (!result) return;

    const lang = document.documentElement.lang;
    const t = translations[lang] || translations.ru;
    const createdAt = new Date();
    currentOrderContext = {
        result,
        isFast,
        orderNumber: generateOrderNumber(createdAt),
        orderCreatedAt: createdAt.toISOString()
    };
    const orderMeta = getOrderMeta();

    const summaryEl = document.getElementById('orderSummary');
    if (summaryEl) {
        summaryEl.innerHTML = `
            <div class="summary-section">
                <table class="summary-table">
                    <tr><td>${t.orderNumberLabel}</td><td>${orderMeta.orderNumber}</td></tr>
                    <tr><td>${t.newReviewsNeeded}</td><td>${result.needed}</td></tr>
                    <tr><td>${t.averageRating}</td><td>${result.avgNew.toFixed(1)}</td></tr>
                    <tr><td>${t.reviewCost}</td><td>${result.reviewCostTotal.toFixed(0)}₽</td></tr>
                    <tr><td>${t.processingFee}</td><td>${result.processingFee.toFixed(0)}₽</td></tr>
                    ${result.serviceCost > 0 ? `<tr><td>${t.additionalServices}</td><td>${result.serviceCost.toFixed(0)}₽</td></tr>` : ''}
                    <tr class="total-row"><td><strong>${t.serviceTotalLabel}</strong></td><td><strong>${result.totalServiceCost.toFixed(0)}₽</strong></td></tr>
                    ${result.transferCost > 0 ? `
                        <tr class="reserve-row"><td><strong>${t.reserveTotalLabel}</strong></td><td><strong>${result.transferCost.toFixed(0)}₽</strong></td></tr>
                        <tr class="grand-total"><td><strong>${t.totalPayLabel}</strong></td><td><strong>${result.total.toFixed(0)}₽</strong></td></tr>
                    ` : ''}
                </table>
            </div>
            <div class="included-section">
                <h4>${t.reportFormatTitle}</h4>
                <ul>
                    ${translations[lang]?.reportFormatItems?.map(i => `<li><i class="fas fa-check text-success"></i> ${i}</li>`).join('') || ''}
                </ul>
            </div>
        `;
    }

    const status = document.getElementById('orderStatus');
    if (status) {
        status.textContent = '';
        status.style.color = '';
    }
    const successNotice = document.getElementById('orderSuccessNotice');
    if (successNotice) {
        successNotice.hidden = true;
    }
    hideOrderStatusOverlay();

    closeModal('paymentModal');
    openModal('orderModal');

    checkPdfRequirements();
}


function prepareAndPrint() {
    if (!currentOrderContext) return;

    const lang = document.documentElement.lang;
    const t = translations[lang] || translations.ru;
    const r = currentOrderContext.result;
    const orderMeta = getOrderMeta();

    const name = document.getElementById('objectName')?.value.trim() || '—';
    const address = document.getElementById('objectAddress')?.value.trim() || '—';
    const contactName = document.getElementById('contactName')?.value.trim() || '—';
    const phone = document.getElementById('contactPhone')?.value.trim() || '—';
    const email = document.getElementById('contactEmail')?.value.trim() || '—';
    const telegram = document.getElementById('contactTelegram')?.value.trim() || '—';
    const pdfDownloadedAt = new Date().toISOString();

    const container = document.getElementById('printSummaryContainer');
    if (!container) return;

    const pdfPayload = buildOrderPayload('pdf_download', 'pdf_download');
    pdfPayload.pdfDownloadedAt = pdfDownloadedAt;
    sendOrderAction(pdfPayload).catch(error => {
        console.error('Failed to notify PDF download:', error);
    });

    // Очищаем контейнер и удаляем старые стили
    container.innerHTML = '';

    // Удаляем старые стили печати, если есть
    const oldStyle = document.querySelector('style[data-print-style]');
    if (oldStyle) oldStyle.remove();

    // Собираем дополнительные услуги
    let additionalServicesHTML = '';
    let additionalServicesTotal = 0;

    const services = [
        {
            name: t.videoReviewLabel,
            qty: getVal('videoReviewQty'),
            price: pricing.additionalServices.videoReview,
            key: 'videoReviewQty'
        },
        {
            name: t.exclusiveArticleLabel,
            qty: getVal('exclusiveArticleQty'),
            price: pricing.additionalServices.exclusiveArticle,
            key: 'exclusiveArticleQty'
        },
        {
            name: t.aiArticleLabel,
            qty: getVal('aiArticleQty'),
            price: pricing.additionalServices.aiArticle,
            key: 'aiArticleQty'
        },
        {
            name: t.articlePlacementLabel,
            qty: getVal('articlePlacementQty'),
            price: pricing.additionalServices.articlePlacement,
            key: 'articlePlacementQty'
        }
    ];

    services.forEach(service => {
        if (service.qty > 0) {
            const serviceTotal = service.qty * service.price;
            additionalServicesTotal += serviceTotal;
            additionalServicesHTML += `
                <tr>
                    <td>${service.name}</td>
                    <td>${service.qty} шт</td>
                    <td>${service.price.toFixed(0)} ₽</td>
                    <td>${serviceTotal.toFixed(0)} ₽</td>
                </tr>
            `;
        }
    });

    // Консультации
    if (getCheck('chatConsultationQty')) {
        additionalServicesHTML += `
            <tr>
                <td>${t.chatConsultationLabel}</td>
                <td>1</td>
                <td>${pricing.additionalServices.chatConsultation.toFixed(0)} ₽</td>
                <td>${pricing.additionalServices.chatConsultation.toFixed(0)} ₽</td>
            </tr>
        `;
        additionalServicesTotal += pricing.additionalServices.chatConsultation;
    }

    if (getCheck('voiceConsultationQty')) {
        additionalServicesHTML += `
            <tr>
                <td>${t.voiceConsultationLabel}</td>
                <td>1</td>
                <td>${pricing.additionalServices.voiceConsultation.toFixed(0)} ₽</td>
                <td>${pricing.additionalServices.voiceConsultation.toFixed(0)} ₽</td>
            </tr>
        `;
        additionalServicesTotal += pricing.additionalServices.voiceConsultation;
    }

    // Форматируем дату
    const today = new Date();
    const formattedDate = today.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Генерируем QR код
    const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://t.me/yourepru";

    // Создаем структуру PDF - ЕДИНАЯ шапка (убрана дублирующая, используется только контейнер)
    // ВАЖНО: Мы убрали .print-header отсюда, так как он уже есть в HTML (#printHeader).
    // Мы добавим QR код и дату в #pdfClientInfo или просто выведем здесь как часть мета-данных

    // Но чтобы QR код и дата были видны, мы добавим их в начало контента, но ниже основного заголовка (который в HTML)

    container.innerHTML = `
        <div class="print-document">
            
            <!-- Мета-данные (QR и Дата) -->
            <div class="print-meta-row">
                <div class="document-date">
                    <strong>Date:</strong> ${formattedDate}
                    <div class="document-order">
                        <strong>${t.orderNumberLabel}:</strong> ${orderMeta.orderNumber}
                    </div>
                </div>
                <!-- ID/QR можно добавить сюда если нужно, но QR у нас был в шапке. --> 
                <!-- Добавим QR код справа -->
                <div class="meta-qr">
                    <img src="${qrCodeUrl}" alt="QR Code" class="qr-code-small" crossorigin="anonymous">
                </div>
            </div>

            <!-- Информация о клиенте и объекте -->
            <div class="client-info-section">
                <div class="info-column">
                    <h3><i class="fas fa-building"></i> ${t.pdfObjectTitle}</h3>
                    <div class="info-row">
                        <span class="label">${t.objectNameLabel}:</span>
                        <span class="value">${name}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">${t.objectAddressLabel}:</span>
                        <span class="value">${address}</span>
                    </div>
                </div>
                
                <div class="info-column">
                    <h3><i class="fas fa-user"></i> ${t.pdfContactTitle}</h3>
                    <div class="info-row">
                        <span class="label">${t.pdfNameLabel}</span>
                        <span class="value">${contactName}</span>
                    </div>
                    ${phone ? `
                    <div class="info-row">
                        <span class="label">${t.pdfPhoneLabel}</span>
                        <span class="value">${phone}</span>
                    </div>
                    ` : ''}
                    ${email ? `
                    <div class="info-row">
                        <span class="label">${t.pdfEmailLabel}</span>
                        <span class="value">${email}</span>
                    </div>
                    ` : ''}
                    ${telegram ? `
                    <div class="info-row">
                        <span class="label">${t.pdfTelegramLabel}</span>
                        <span class="value">${telegram}</span>
                    </div>
                    ` : ''}
                </div>
            </div>

            <!-- Основная таблица с расчетами -->
            <div class="calculation-section">
                <div class="section-header">
                    <h2>${t.pdfCalculationDetailsTitle}</h2>
                    <div class="document-id">ID: ${orderMeta.orderNumber}</div>
                </div>
                
                <table class="calculation-table">
                    <thead>
                        <tr>
                            <th width="40%">${t.pdfServiceCol}</th>
                            <th width="15%">${t.pdfQtyCol}</th>
                            <th width="20%">${t.pdfPriceCol}</th>
                            <th width="25%">${t.pdfCostCol}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Основные услуги -->
                        <tr class="main-service">
                            <td>${t.newReviewsRowLabel.replace('{rating}', r.avgNew.toFixed(1))}</td>
                            <td>${r.needed}</td>
                            <td>${Math.round(r.reviewCostTotal / r.needed).toFixed(0)} ₽</td>
                            <td>${r.reviewCostTotal.toFixed(0)} ₽</td>
                        </tr>
                        <tr>
                            <td>${t.pdfProcessingFeeLabel}</td>
                            <td></td>
                            <td></td>
                            <td>${r.processingFee.toFixed(0)} ₽</td>
                        </tr>
                        
                        <!-- Дополнительные услуги -->
                        ${additionalServicesHTML ? `
                        <tr class="section-title">
                            <td colspan="4">
                                <strong>${t.additionalServicesLabel}</strong>
                            </td>
                        </tr>
                        ${additionalServicesHTML}
                        ` : ''}
                        
                        <!-- Итоги -->
                        <tr class="summary-row service-total">
                            <td colspan="3"><strong>${t.serviceTotalLabel}</strong></td>
                            <td><strong>${r.totalServiceCost.toFixed(0)} ₽</strong></td>
                        </tr>
                        
                        ${r.transferCost > 0 ? `
                        <tr class="summary-row reserve-info">
                            <td colspan="3">
                                <strong>${t.reserveTotalLabel}</strong>
                                <div class="note">${t.pdfRefundNote}</div>
                            </td>
                            <td><strong>${r.transferCost.toFixed(0)} ₽</strong></td>
                        </tr>
                        
                        <tr class="summary-row grand-total">
                            <td colspan="3"><strong>${t.totalPayLabel}</strong></td>
                            <td><strong class="grand-total-amount">${r.total.toFixed(0)} ₽</strong></td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>

            <!-- Примечания и условия -->
            <div class="notes-section">
                <h3><i class="fas fa-info-circle"></i> ${t.pdfTermsTitle}</h3>
                <div class="notes-grid">
                    <div class="note-item">
                        <div class="note-icon">⏱️</div>
                        <div class="note-content">
                            <strong>${t.pdfTermTimeTitle}</strong> ${t.pdfTermTimeText}
                        </div>
                    </div>
                    <div class="note-item">
                        <div class="note-icon">✅</div>
                        <div class="note-content">
                            <strong>${t.pdfTermWarrantyTitle}</strong> ${t.pdfTermWarrantyText}
                        </div>
                    </div>
                    <div class="note-item">
                        <div class="note-icon">💳</div>
                        <div class="note-content">
                            <strong>${t.pdfTermPaymentTitle}</strong> ${t.pdfTermPaymentText}
                        </div>
                    </div>
                    ${r.transferCost > 0 ? `
                    <div class="note-item">
                        <div class="note-icon">↩️</div>
                        <div class="note-content">
                            <strong>${t.pdfTermReserveTitle}</strong> ${t.pdfTermReserveText}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    // Добавляем стили для печати
    const style = document.createElement('style');
    style.setAttribute('data-print-style', 'true');
    style.textContent = `
        /* Базовые стили для предпросмотра */
        .print-document {
            width: 100%;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
            color: #333;
            font-family: 'Segoe UI', 'Arial', sans-serif;
            line-height: 1.4;
            box-sizing: border-box;
        }
        
        .print-meta-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #eee;
        }

        .qr-code-small {
            width: 60px;
            height: 60px;
        }

        
        /* Информация о клиенте */
        .client-info-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
            background: #f8fafc;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
        }
        
        .info-column h3 {
            margin: 0 0 15px 0;
            font-size: 16px;
            color: #2c3e50;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .info-row {
            display: flex;
            margin-bottom: 8px;
            padding-bottom: 8px;
            border-bottom: 1px dashed #e2e8f0;
        }
        
        .info-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .info-row .label {
            width: 120px;
            font-weight: 600;
            color: #475569;
            font-size: 13px;
        }
        
        .info-row .value {
            flex: 1;
            font-size: 13px;
            color: #334155;
        }
        
        /* Расчеты */
        .calculation-section {
            margin-bottom: 30px;
        }
        
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #2563eb;
        }
        
        .section-header h2 {
            margin: 0;
            font-size: 20px;
            color: #2c3e50;
        }
        
        .document-id {
            font-size: 12px;
            color: #64748b;
            background: #f1f5f9;
            padding: 5px 10px;
            border-radius: 6px;
        }
        
        .calculation-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
        }
        
        .calculation-table th {
            background: #2c3e50;
            color: white;
            padding: 12px 8px;
            text-align: left;
            font-weight: 600;
            border: 1px solid #1a202c;
        }
        
        .calculation-table td {
            padding: 10px 8px;
            border: 1px solid #e2e8f0;
            vertical-align: top;
        }
        
        .calculation-table tbody tr:nth-child(even) {
            background: #f8fafc;
        }
        
        .main-service {
            background: #e0f2fe !important;
            font-weight: 600;
        }
        
        .section-title td {
            background: #e2e8f0 !important;
            font-weight: 700;
            color: #475569;
            padding: 12px 8px;
            border-top: 2px solid #cbd5e1;
            border-bottom: 2px solid #cbd5e1;
        }
        
        .summary-row td {
            border-top: 2px solid #cbd5e1 !important;
        }
        
        .service-total td {
            background: #dbeafe !important;
            color: #1e40af;
            font-size: 14px;
        }
        
        .reserve-info td {
            background: #dcfce7 !important;
            color: #166534;
        }
        
        .reserve-info .note {
            font-size: 11px;
            color: #15803d;
            font-weight: normal;
            margin-top: 3px;
        }
        
        .grand-total td {
            background: #fef3c7 !important;
            color: #92400e;
            font-size: 15px;
            border: 2px solid #fbbf24 !important;
        }
        
        .grand-total-amount {
            color: #92400e;
            font-size: 18px;
        }
        
        /* Примечания */
        .notes-section {
            background: #fefce8;
            border: 1px solid #fde047;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
        }
        
        .notes-section h3 {
            margin: 0 0 15px 0;
            color: #ca8a04;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }
        
        .note-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        
        .note-icon {
            font-size: 16px;
            flex-shrink: 0;
        }
        
        .note-content {
            font-size: 13px;
            color: #57534e;
        }
        
        .note-content strong {
            color: #713f12;
        }
        
        /* Футер */
        .footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
        }
        
        .contact-block h4 {
            margin: 0 0 10px 0;
            font-size: 14px;
            color: #475569;
        }
        
        .contact-block p {
            margin: 0 0 5px 0;
            font-size: 12px;
            color: #64748b;
        }
        
        .signature-block {
            text-align: center;
        }
        
        .signature-line {
            width: 200px;
            height: 1px;
            background: #334155;
            margin: 20px auto 5px;
        }
        
        .signature-block p {
            margin: 0;
            font-size: 11px;
            color: #64748b;
        }
        
        /* Стили для печати */
        @media print {
            @page {
                margin: 15mm;
                size: A4;
            }
            
            body {
                margin: 0;
                padding: 0;
                background: white !important;
                font-family: 'Arial', sans-serif;
                font-size: 11pt;
                line-height: 1.3;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            .print-document {
                width: 100%;
                margin: 0;
                padding: 0;
                box-shadow: none;
                max-width: 100%;
            }

            /* Стили для HTML шапки (#printHeader) */
            #printHeader {
                display: block !important;
                /* Убираем border отсюда, так как внутри лежит весь контент */
            }

            .print-brand {
                display: flex;
                align-items: center;
                gap: 20px;
                padding-bottom: 20px;
                border-bottom: 3px solid #2c3e50;
                margin-bottom: 25px;
                width: 100%;
            }

            .print-logo {
                width: 80px;
                height: 80px;
                object-fit: contain;
            }

            .print-brand h1 {
                margin: 0;
                font-size: 24px;
                color: #2c3e50;
            }

            .print-brand p {
                margin: 0;
                color: #64748b;
                font-size: 14px;
            }
            
            /* Управление разрывами страниц */
            #printHeader,
            .print-meta-row,
            .client-info-section {
                page-break-after: avoid;
            }
            
            .calculation-section {
                page-break-inside: avoid;
            }
            
            .footer {
                page-break-before: avoid;
            }
            
            /* Скрываем все ненужное */
            .no-print,
            .top-nav,
            .sidebar,
            .calculator-card,
            .modal-overlay,
            .modal-header,
            .close-modal,
            button,
            input,
            select,
            textarea,
            .form-control,
            .actions-row,
            #error,
            .result-box,
            .services-section {
                display: none !important;
            }
            
            /* Улучшаем видимость при печати */
            .calculation-table th {
                background-color: #333 !important;
                color: white !important;
            }
            
            .main-service {
                background-color: #f0f8ff !important;
            }
            
            .service-total td {
                background-color: #e8f4fd !important;
            }
            
            .grand-total td {
                background-color: #fff8e1 !important;
                border: 2px solid #ffd54f !important;
            }
        }
    `;

    document.head.appendChild(style);

    // Запускаем печать после загрузки
    const qrImg = container.querySelector('.qr-code-small');
    let hasPrinted = false;
    const startPrint = () => {
        if (hasPrinted) return;
        hasPrinted = true;
        setTimeout(() => {
            window.print();
            // Очищаем после печати
            setTimeout(() => {
                container.innerHTML = '';
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 1000);
        }, 800);
    };

    if (qrImg && qrImg.complete) {
        startPrint();
    } else if (qrImg) {
        qrImg.onload = startPrint;
        qrImg.onerror = startPrint;
        // Таймаут на случай проблем с загрузкой
        const fallbackTimer = setTimeout(startPrint, 3000);
        const clearFallback = () => clearTimeout(fallbackTimer);
        qrImg.addEventListener('load', clearFallback, { once: true });
        qrImg.addEventListener('error', clearFallback, { once: true });
    } else {
        startPrint();
    }
}


function updateRanges() {
    const ids = ['currentReviews', 'maxRating', 'currentRating', 'targetRating', 'videoReviewQty', 'exclusiveArticleQty', 'aiArticleQty', 'articlePlacementQty'];
    ids.forEach(id => {
        const input = document.getElementById(id);
        const range = document.getElementById(id + 'Range');
        const valueSpan = document.getElementById(id + 'Value');
        if (input && range) range.value = input.value;
        if (valueSpan) valueSpan.textContent = input?.value || '0';
    });
}

function resetOrderForm() {
    const form = document.getElementById('orderForm');
    if (form) {
        form.reset();
    }
    const status = document.getElementById('orderStatus');
    if (status) {
        status.textContent = '';
        status.style.color = '';
    }
    const successNotice = document.getElementById('orderSuccessNotice');
    if (successNotice) {
        successNotice.hidden = true;
    }
    hideOrderStatusOverlay();
    checkPdfRequirements();
}

document.getElementById('orderForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const lang = document.documentElement.lang;
    const t = translations[lang] || translations.ru;
    const status = document.getElementById('orderStatus');
    const successNotice = document.getElementById('orderSuccessNotice');

    if (successNotice) {
        successNotice.hidden = true;
    }
    hideOrderStatusOverlay();

    const validation = validateOrderForm();
    if (!validation.ok) {
        if (status) {
            status.textContent = validation.message;
            status.style.color = "#dc2626";
        }
        return;
    }

    const payload = buildOrderPayload('no_prepay', 'order_submission');
    const captchaToken = window.grecaptcha?.getResponse?.() || '';
    if (captchaToken) {
        payload.captchaToken = captchaToken;
    }

    if (status) {
        status.textContent = t.sendingStatus || "Отправка...";
        status.style.color = "#2563eb";
    }

    try {
        const data = await sendOrderAction(payload);
        if (data.orderNumber) {
            currentOrderContext.orderNumber = data.orderNumber;
        }

        if (status) {
            status.textContent = t.submitSuccess || "Заявка отправлена!";
            status.style.color = "green";
        }
        setOrderStatusOverlay({
            type: 'success',
            message: t.submitSuccess || "Заявка отправлена!"
        });
        if (successNotice) {
            successNotice.hidden = false;
        }
    } catch (error) {
        if (status) {
            status.textContent = t.submitError || "Ошибка отправки заявки.";
            status.style.color = "#dc2626";
        }
        setOrderStatusOverlay({
            type: 'error',
            message: t.submitError || "Ошибка отправки заявки."
        });
        console.error(error);
    }
});

function hideCookieNotice() {
    const notice = document.getElementById('cookieNotice');
    if (notice) {
        notice.classList.remove('visible');
        setTimeout(() => {
            notice.classList.add('hidden');
        }, 300);
    }
}
