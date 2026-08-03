/* ============================================
   MAHANTI V2 - STANDALONE VERSION
   Works on ANY hosting (GitHub Pages, Netlify, etc.)
   All data embedded - no backend required!
   ============================================ */

// ========== EMBEDDED COUNTRIES DATA (35+ countries) ==========
const COUNTRIES_DATA = {
  sa: { code: "+966", flag: "🇸🇦", nameAr: "السعودية", nameEn: "Saudi Arabia", phoneLength: 9, phoneExample: "50 123 4567", cities: ["الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "أبها", "تبوك", "بريدة", "الطائف", "حائل", "نجران", "جازان", "القصيم", "الأحساء", "خميس مشيط", "الجبيل", "ينبع", "عرعر", "القريات", "الباحة", "سكاكا", "الظهران"] },
  eg: { code: "+20", flag: "🇪🇬", nameAr: "مصر", nameEn: "Egypt", phoneLength: 10, phoneExample: "10 1234 5678", cities: ["القاهرة", "الإسكندرية", "الجيزة", "شبرا الخيمة", "بورسعيد", "السويس", "الأقصر", "أسوان", "المنصورة", "طنطا", "المحلة الكبرى", "دمياط", "الزقازيق", "أسيوط", "الفيوم", "بني سويف", "قنا", "سوهاج", "الإسماعيلية", "الغردقة", "شرم الشيخ", "العريش", "مرسى مطروح", "سيوة", "المنيا", "كفر الشيخ", "دمنهور"] },
  jo: { code: "+962", flag: "🇯🇴", nameAr: "الأردن", nameEn: "Jordan", phoneLength: 9, phoneExample: "7 9012 3456", cities: ["عمان", "إربد", "الزرقاء", "السلط", "الرصيفة", "مأدبا", "جرش", "عجلون", "الكرك", "معان", "الطفيلة", "مادبا", "البتراء", "العقبة", "وادي رم", "الرمثا", "سحاب"] },
  ae: { code: "+971", flag: "🇦🇪", nameAr: "الإمارات", nameEn: "UAE", phoneLength: 9, phoneExample: "50 123 4567", cities: ["دبي", "أبوظبي", "الشارقة", "عجمان", "رأس الخيمة", "الفجيرة", "أم القيوين", "العين", "خورفكان", "ذياب"] },
  qa: { code: "+974", flag: "🇶🇦", nameAr: "قطر", nameEn: "Qatar", phoneLength: 8, phoneExample: "33 123 456", cities: ["الدوحة", "الريان", "الخور", "الوكرة", "أم صلال", "الشمال", "الشحانية", "مسيعيد", "لوسيل", "الخور"] },
  kw: { code: "+965", flag: "🇰🇼", nameAr: "الكويت", nameEn: "Kuwait", phoneLength: 8, phoneExample: "5 123 4567", cities: ["الكويت العاصمة", "حولي", "السالمية", "الفروانية", "الأحمدي", "الجهراء", "مبارك الكبير", "الفحيحيل", "المنقف", "العدان"] },
  bh: { code: "+973", flag: "🇧🇭", nameAr: "البحرين", nameEn: "Bahrain", phoneLength: 8, phoneExample: "3 123 4567", cities: ["المنامة", "المحرق", "الرفاع", "مدينة حمد", "عيسى town", "سترة", "جد حفص", "البديع", "الحد", "الدراز"] },
  om: { code: "+968", flag: "🇴🇲", nameAr: "عمان", nameEn: "Oman", phoneLength: 8, phoneExample: "9 123 4567", cities: ["مسقط", "صلالة", "صحار", "نزوى", "صور", "الرستاق", "عبري", "إبراء", "خصب", "بركاء", "السيب", "بوشر"] },
  iq: { code: "+964", flag: "🇮🇶", nameAr: "العراق", nameEn: "Iraq", phoneLength: 10, phoneExample: "770 123 4567", cities: ["بغداد", "البصرة", "الموصل", "أربيل", "النجف", "كربلاء", "السليمانية", "كركوك", "الأنبار", "بابل", "ديالى", "صلاح الدين", "نينوى", "دهوك", "واسط", "ميسان"] },
  sy: { code: "+963", flag: "🇸🇾", nameAr: "سوريا", nameEn: "Syria", phoneLength: 9, phoneExample: "930 123 456", cities: ["دمشق", "حلب", "حمص", "اللاذقية", "حماة", "طرطوس", "دير الزور", "الرقة", "الحسكة", "إدلب", "درعا", "السويداء", "القنيطرة", "ريف دمشق"] },
  lb: { code: "+961", flag: "🇱🇧", nameAr: "لبنان", nameEn: "Lebanon", phoneLength: 8, phoneExample: "3 123 456", cities: ["بيروت", "طرابلس", "صيدا", "صور", "جبيل", "زحلة", "بعلبك", "عاليه", "جونيه", "الشوف", "عكار", "النبطية"] },
  ps: { code: "+970", flag: "🇵🇸", nameAr: "فلسطين", nameEn: "Palestine", phoneLength: 9, phoneExample: "59 123 4567", cities: ["القدس", "غزة", "رام الله", "نابلس", "الخليل", "بيت لحم", "جنين", "أريحا", "طولكرم", "قلقيلية", "رفح", "خان يونس"] },
  ye: { code: "+967", flag: "🇾🇪", nameAr: "اليمن", nameEn: "Yemen", phoneLength: 9, phoneExample: "7 123 456 78", cities: ["صنعاء", "عدن", "تعز", "الحديدة", "المكلا", "إب", "ذمار", "البيضاء", "سيئون", "المهرة", "حضرموت", "أبين"] },
  sd: { code: "+249", flag: "🇸🇩", nameAr: "السودان", nameEn: "Sudan", phoneLength: 9, phoneExample: "90 123 4567", cities: ["الخرطوم", "أم درمان", "بورتسودان", "كسلا", "الأبيض", "نيالا", "الفاشر", "القضارف", "مروي", "عطبرة", "سنار"] },
  ly: { code: "+218", flag: "🇱🇾", nameAr: "ليبيا", nameEn: "Libya", phoneLength: 9, phoneExample: "91 123 4567", cities: ["طرابلس", "بنغازي", "مصراتة", "الزاوية", "البيضاء", "سبها", "درنة", "طبرق", "سرت", "الخمس", "زليتن"] },
  dz: { code: "+213", flag: "🇩🇿", nameAr: "الجزائر", nameEn: "Algeria", phoneLength: 9, phoneExample: "5 12 34 56 78", cities: ["الجزائر العاصمة", "وهران", "قسنطينة", "عنابة", "باتنة", "سطيف", "البليدة", "تيارت", "بسكرة", "تلمسان", "سعيدة"] },
  ma: { code: "+212", flag: "🇲🇦", nameAr: "المغرب", nameEn: "Morocco", phoneLength: 9, phoneExample: "6 12 34 56 78", cities: ["الرباط", "الدار البيضاء", "مراكش", "فاس", "طنجة", "أكادير", "مكناس", "وجدة", "القنيطرة", "تطوان", "خريبكة"] },
  tn: { code: "+216", flag: "🇹🇳", nameAr: "تونس", nameEn: "Tunisia", phoneLength: 8, phoneExample: "2 123 4567", cities: ["تونس العاصمة", "صفاقس", "سوسة", "القيروان", "بنزرت", "قابس", "نابل", "المهدية", "المنستير", "قفصة", "توزر"] },
  tr: { code: "+90", flag: "🇹🇷", nameAr: "تركيا", nameEn: "Turkey", phoneLength: 10, phoneExample: "532 123 4567", cities: ["إسطنبول", "أنقرة", "إزمير", "بورصة", "أنطاليا", "أضنة", "قونيا", "غازي عنتاب", "مرسين", "ديار بكر"] },
  pk: { code: "+92", flag: "🇵🇰", nameAr: "باكستان", nameEn: "Pakistan", phoneLength: 10, phoneExample: "300 1234567", cities: ["كراتشي", "لاهور", "إسلام أباد", "فيصل آباد", "روالبندي", "غوجرانوالا", "مولتان", "بيشاور", "كويتا", "سيالكوت"] },
  in: { code: "+91", flag: "🇮🇳", nameAr: "الهند", nameEn: "India", phoneLength: 10, phoneExample: "98765 43210", cities: ["مومباي", "دلهي", "بنغالور", "حيدر أباد", "تشيناي", "كولكاتا", "بيون", "أحمد آباد", "جايبور", "سورات"] },
  id: { code: "+62", flag: "🇮🇩", nameAr: "إندونيسيا", nameEn: "Indonesia", phoneLength: 10, phoneExample: "812 3456 7890", cities: ["جاكرتا", "سورابايا", "باندونغ", "ميدان", "سيمارانغ", "ماكاسار", "بالي", "يوجياكارتا", "باتام", "بالمبانج"] },
  bd: { code: "+880", flag: "🇧🇩", nameAr: "بنغلاديش", nameEn: "Bangladesh", phoneLength: 10, phoneExample: "1712 345678", cities: ["داكا", "تشيتاغونغ", "خولنا", "راجشاهي", "سيلهيت", "باريسال", "رانجبور", "ميمينسينغ", "كوميلا"] },
  ng: { code: "+234", flag: "🇳🇬", nameAr: "نيجيريا", nameEn: "Nigeria", phoneLength: 10, phoneExample: "803 123 4567", cities: ["لاغوس", "أبوجا", "كانو", "إبادان", "بورت هاركورت", "بنين", "كادونا", "أونيتشا", "ميدوجوري", "إنوغو"] },
  us: { code: "+1", flag: "🇺🇸", nameAr: "الولايات المتحدة", nameEn: "USA", phoneLength: 10, phoneExample: "(555) 123-4567", cities: ["نيويورك", "لوس أنجلوس", "شيكاغو", "هيوستن", "فينيكس", "فيلادلفيا", "سان أنطونيو", "سان دييغو", "دالاس", "سان خوسيه"] },
  gb: { code: "+44", flag: "🇬🇧", nameAr: "المملكة المتحدة", nameEn: "UK", phoneLength: 10, phoneExample: "7700 900123", cities: ["لندن", "مانشستر", "برمنغهام", "ليدز", "غلاسكو", "شفيلد", "برادفورد", "ليفربول", "إدنبرة", "بريستول"] },
  de: { code: "+49", flag: "🇩🇪", nameAr: "ألمانيا", nameEn: "Germany", phoneLength: 10, phoneExample: "1512 3456789", cities: ["برلين", "ميونخ", "هامبورغ", "كولونيا", "فرانكفورت", "شتوتغارت", "دوسلدورف", "لايبزيغ", "دورتموند", "سنغافورة"] },
  fr: { code: "+33", flag: "🇫🇷", nameAr: "فرنسا", nameEn: "France", phoneLength: 9, phoneExample: "6 12 34 56 78", cities: ["باريس", "مرسيليا", "ليون", "تولوز", "نيس", "نانت", "ستراسبورغ", "مونبلييه", "بوردو", "ليل"] },
  it: { code: "+39", flag: "🇮🇹", nameAr: "إيطاليا", nameEn: "Italy", phoneLength: 10, phoneExample: "312 345 6789", cities: ["روما", "ميلانو", "نابولي", "تورينو", "باليرمو", "جنوة", "بولونيا", "فلورنسا", "باري", "كاتانيا"] },
  es: { code: "+34", flag: "🇪🇸", nameAr: "إسبانيا", nameEn: "Spain", phoneLength: 9, phoneExample: "612 345 678", cities: ["مدريد", "برشلونة", "فالنسيا", "إشبيلية", "سرقسطة", "مالقة", "مورسيا", "بلباو", "فالادوليد", "قرطبة"] },
  br: { code: "+55", flag: "🇧🇷", nameAr: "البرازيل", nameEn: "Brazil", phoneLength: 11, phoneExample: "(11) 91234-5678", cities: ["ساو باولو", "ريو دي جانيرو", "برازيليا", "سلفادور", "فورتاليزا", "بيلو هوريزونتي", "ماناوس", "كوريتيبا", "ريسيفي", "بورتو أليغري"] },
  cn: { code: "+86", flag: "🇨🇳", nameAr: "الصين", nameEn: "China", phoneLength: 11, phoneExample: "138 1234 5678", cities: ["بكين", "شنغهاي", "شنتشن", "قوانغتشو", "تيانجين", "تشونغتشينغ", "هونغ كونغ", "تشينغداو", "داليان", "نانجينغ"] },
  jp: { code: "+81", flag: "🇯🇵", nameAr: "اليابان", nameEn: "Japan", phoneLength: 10, phoneExample: "90-1234-5678", cities: ["طوكيو", "أوساكا", "ييوكوهاما", "ناغويا", "سابورو", "فوكوكا", "كوبه", "كاواساكي", "كيوتو", "سايتاما"] },
  ru: { code: "+7", flag: "🇷🇺", nameAr: "روسيا", nameEn: "Russia", phoneLength: 10, phoneExample: "912 345-67-89", cities: ["موسكو", "سانت بطرسبرغ", "نوفوسيبيرسك", "يكاترينبورغ", "نيجني نوفغورود", "كازان", "تشيليابينسك", "أومسك", "سمارا", "روستوف"] },
  za: { code: "+27", flag: "🇿🇦", nameAr: "جنوب أفريقيا", nameEn: "South Africa", phoneLength: 9, phoneExample: "71 123 4567", cities: ["كيب تاون", "جوهانسبرغ", "ديربان", "بريتوريا", "بورت إليزابيث", "بلومفونتين", "إيست لندن", "بولوكوان", "نيلسبرويت"] },
  au: { code: "+61", flag: "🇦🇺", nameAr: "أستراليا", nameEn: "Australia", phoneLength: 9, phoneExample: "412 345 678", cities: ["سيدني", "ملبورن", "بريسبان", "برث", "أديلايد", "غولد كوست", "كانبيرا", "نيوكاسل", "وولونغونغ"] },
  ca: { code: "+1", flag: "🇨🇦", nameAr: "كندا", nameEn: "Canada", phoneLength: 10, phoneExample: "(416) 123-4567", cities: ["تورنتو", "مونتريال", "فانكوفر", "كالجاري", "أوتاوا", "إدمونتون", "كيبيك", "وينيبيغ", "هاميلتون", "كيتشنر"] }
};

// ========== EMBEDDED TRANSLATIONS ==========
const I18N_DATA = {
  ar: {
    appName: "مهنتي", appSubtitle: "تواصل مع أصحاب المهن الحرفية - مجاني بالكامل",
    home: "🏠 الرئيسية", search: "🔍 البحث", register: "📝 التسجيل",
    workersCount: "عامل مسجل", jobsCount: "مهنة متاحة", citiesCount: "مدينة", countriesCount: "بلد",
    howItWorks: "🎯 كيف يعمل التطبيق؟",
    step1: "1️⃣ إذا كنت صاحب مهنة → سجل بياناتك مجاناً",
    step2: "2️⃣ إذا كنت باحث عن خدمة → ابحث بالمهنة والمدينة",
    step3: "3️⃣ تواصل مباشرة عبر الواتساب",
    step4: "4️⃣ بدون رسوم ولا عمولات نهائياً",
    topJobs: "⭐ المهن الأكثر طلباً", allJobs: "📋 جميع المهن المتاحة",
    registerNow: "🚀 سجل الآن كصاحب مهنة",
    searchWorkers: "البحث عن العمال", searchPlaceholder: "ابحث باسم المهنة أو العامل...",
    allCities: "📍 جميع المدن", allCountries: "🌍 جميع البلدان",
    noResults: "لا توجد نتائج", noResultsDesc: "جرب البحث بكلمات مختلفة أو تصفية أقل",
    workerCard: { location: "📍", experience: "⭐", description: "📝" },
    whatsapp: "واتساب", call: "اتصال",
    registerTitle: "التسجيل كصاحب مهنة", registerSubtitle: "سجل بياناتك مجاناً - لا رسوم ولا عمولات",
    fullName: "الاسم الكامل *", fullNamePlaceholder: "أدخل اسمك الثلاثي",
    country: "البلد *", selectCountry: "اختر البلد",
    phone: "رقم الجوال *", phonePlaceholder: "رقم الهاتف بدون كود البلد",
    job: "المهنة *", selectJob: "اختر المهنة",
    jobDesc: "وصف المهنة *", jobDescPlaceholder: "اكتب نبذة عن خبراتك وخدماتك...",
    city: "المدينة *", selectCity: "اختر المدينة",
    area: "الحي / المنطقة *", areaPlaceholder: "مثال: حي النسيم",
    experience: "سنوات الخبرة",
    lessThanYear: "أقل من سنة", years1_3: "1-3 سنوات", years3_5: "3-5 سنوات", years5_10: "5-10 سنوات", years10plus: "أكثر من 10 سنوات",
    verifyTitle: "التحقق من رقم الجوال", verifySent: "تم إرسال رمز التحقق إلى",
    viaWhatsapp: "واتساب", viaSMS: "رسالة SMS", viaEmail: "البريد الإلكتروني",
    confirmRegister: "✅ تأكيد التسجيل", resendCode: "🔄 إعادة إرسال الرمز",
    registerSuccess: "تم التسجيل بنجاح!",
    registerSuccessDesc: "أهلاً بك في مهنتي! بياناتك الآن متاحة للباحثين عن خدماتك",
    browseWorkers: "🔍 تصفح العمال",
    freeBadge: "🎁 التسجيل مجاني بالكامل - لا رسوم ولا عمولات",
    footer: "تواصل مباشر بين أصحاب المهن والباحثين عنهم", footerRights: "جميع الحقوق محفوظة",
    chooseVerifyMethod: "اختر طريقة التوثيق *", email: "البريد الإلكتروني", emailPlaceholder: "example@email.com",
    verifyMethod: "طريقة التوثيق", nextVerify: "التالي: التحقق من الرقم 📱",
    validation: {
      nameRequired: "يرجى إدخال الاسم الكامل", countryRequired: "يرجى اختيار البلد",
      phoneRequired: "يرجى إدخال رقم الجوال", phoneInvalid: "رقم الجوال غير صحيح لهذا البلد",
      jobRequired: "يرجى اختيار المهنة", cityRequired: "يرجى اختيار المدينة",
      areaRequired: "يرجى إدخال الحي / المنطقة", emailRequired: "يرجى إدخال البريد الإلكتروني",
      emailInvalid: "البريد الإلكتروني غير صحيح", otpRequired: "يرجى إدخال رمز التحقق كاملاً",
      otpInvalid: "رمز التحقق غير صحيح", otpExpired: "انتهت صلاحية رمز التحقق"
    },
    jobs: {
      builder: "🧱 بناء - طوب وقصارة", carpenter: "🪵 نجار - أبواب ودواليب",
      blacksmith: "🔩 حداد - أبواب حديد", welder: "🔥 لحام - حديد وستانلس",
      plumber: "🔧 سباك - مواسير وصرف", electrician: "⚡ كهربائي - تركيبات",
      driver: "🚗 سائق - نقل خفيف/ثقيل", painter: "🎨 صباغ - دهانات وديكور",
      tiler: "🏠 بليط - سيراميك ورخام", gypsum: "🏗️ جبس - ديكورات وأسقف",
      aluminum: "🪟 ألمنيوم - شبابيك وأبواب", ac: "❄️ تكييف - تركيب وصيانة",
      furnitureCarpenter: "🛋️ نجار أثاث", mechanic: "🔧 ميكانيكي - سيارات",
      doorBlacksmith: "🚪 حداد أبواب - درابزين", cleaner: "🧹 عامل نظافة",
      gardener: "🌳 حدائق - تنسيق", insulation: "🏠 عوازل - مائية/حرارية",
      elevator: "🛗 مصاعد - تركيب وصيانة", other: "📌 أخرى"
    }
  },
  en: {
    appName: "Mahanti", appSubtitle: "Connect with skilled tradespeople - Completely Free",
    home: "🏠 Home", search: "🔍 Search", register: "📝 Register",
    workersCount: "Workers", jobsCount: "Trades", citiesCount: "Cities", countriesCount: "Countries",
    howItWorks: "🎯 How It Works?",
    step1: "1️⃣ If you're a tradesperson → Register for free",
    step2: "2️⃣ If you need services → Search by trade & city",
    step3: "3️⃣ Connect directly via WhatsApp",
    step4: "4️⃣ No fees or commissions ever",
    topJobs: "⭐ Most Requested", allJobs: "📋 All Trades",
    registerNow: "🚀 Register Now",
    searchWorkers: "Search Workers", searchPlaceholder: "Search by trade or name...",
    allCities: "📍 All Cities", allCountries: "🌍 All Countries",
    noResults: "No Results", noResultsDesc: "Try different keywords",
    workerCard: { location: "📍", experience: "⭐", description: "📝" },
    whatsapp: "WhatsApp", call: "Call",
    registerTitle: "Register", registerSubtitle: "Free - No fees",
    fullName: "Full Name *", fullNamePlaceholder: "Your full name",
    country: "Country *", selectCountry: "Select Country",
    phone: "Phone *", phonePlaceholder: "Without country code",
    job: "Trade *", selectJob: "Select Trade",
    jobDesc: "Description *", jobDescPlaceholder: "Describe your work...",
    city: "City *", selectCity: "Select City",
    area: "Area *", areaPlaceholder: "e.g. Downtown",
    experience: "Experience",
    lessThanYear: "< 1 year", years1_3: "1-3 years", years3_5: "3-5 years", years5_10: "5-10 years", years10plus: "10+ years",
    verifyTitle: "Verify Phone", verifySent: "Code sent to",
    viaWhatsapp: "WhatsApp", viaSMS: "SMS", viaEmail: "Email",
    confirmRegister: "✅ Confirm", resendCode: "🔄 Resend",
    registerSuccess: "Success!", registerSuccessDesc: "Welcome! Your profile is visible now",
    browseWorkers: "🔍 Browse", freeBadge: "🎁 Free - No Fees",
    footer: "Direct connection between workers and customers", footerRights: "All rights reserved",
    chooseVerifyMethod: "Verification *", email: "Email", emailPlaceholder: "you@email.com",
    verifyMethod: "Method", nextVerify: "Next: Verify 📱",
    validation: {
      nameRequired: "Name required", countryRequired: "Select country",
      phoneRequired: "Phone required", phoneInvalid: "Invalid phone",
      jobRequired: "Select trade", cityRequired: "Select city",
      areaRequired: "Enter area", emailRequired: "Email required",
      emailInvalid: "Invalid email", otpRequired: "Enter full code",
      otpInvalid: "Invalid code", otpExpired: "Code expired"
    },
    jobs: {
      builder: "🧱 Builder", carpenter: "🪵 Carpenter",
      blacksmith: "🔩 Blacksmith", welder: "🔥 Welder",
      plumber: "🔧 Plumber", electrician: "⚡ Electrician",
      driver: "🚗 Driver", painter: "🎨 Painter",
      tiler: "🏠 Tiler", gypsum: "🏗️ Gypsum",
      aluminum: "🪟 Aluminum", ac: "❄️ AC Tech",
      furnitureCarpenter: "🛋️ Furniture", mechanic: "🔧 Mechanic",
      doorBlacksmith: "🚪 Door Smith", cleaner: "🧹 Cleaner",
      gardener: "🌳 Gardener", insulation: "🏠 Insulation",
      elevator: "🛗 Elevator", other: "📌 Other"
    }
  }
};

// ========== EMBEDDED WORKERS ==========
let WORKERS_DATA = [
  { id: "w1", name: "أحمد محمد العلي", phone: "966501234567", job: "بناء", jobEn: "Builder", desc: "بناء طوب وقصارة وتشطيب", descEn: "Brick, plaster & finishing", country: "sa", city: "الرياض", area: "حي النسيم", exp: "5 سنوات خبرة", expEn: "5 years", verified: true, verifyMethod: "whatsapp" },
  { id: "w2", name: "خالد عبدالرحمن", phone: "966509876543", job: "نجار", jobEn: "Carpenter", desc: "نجارة أبواب وشبابيك", descEn: "Doors & windows", country: "sa", city: "جدة", area: "حي الصفا", exp: "12 سنة خبرة", expEn: "12 years", verified: true, verifyMethod: "sms" },
  { id: "w3", name: "سلطان المطيري", phone: "966503456789", job: "حداد", jobEn: "Blacksmith", desc: "حدادة أبواب حديد", descEn: "Iron doors", country: "sa", city: "الدمام", area: "حي الفيصلية", exp: "8 سنوات خبرة", expEn: "8 years", verified: true, verifyMethod: "whatsapp" },
  { id: "w4", name: "فهد السبيعي", phone: "966508901234", job: "سائق", jobEn: "Driver", desc: "سائق نقل خفيف وثقيل", descEn: "Transport driver", country: "sa", city: "مكة", area: "حي الزاهر", exp: "10 سنوات خبرة", expEn: "10 years", verified: true, verifyMethod: "email" },
  { id: "w5", name: "محمد أحمد حسن", phone: "201012345678", job: "كهربائي", jobEn: "Electrician", desc: "كهرباء منازل", descEn: "Home electricity", country: "eg", city: "القاهرة", area: "مدينة نصر", exp: "7 سنوات خبرة", expEn: "7 years", verified: true, verifyMethod: "whatsapp" },
  { id: "w6", name: "عبدالله محمود", phone: "201198765432", job: "سباك", jobEn: "Plumber", desc: "سباكة مواسير", descEn: "Pipes & drainage", country: "eg", city: "الإسكندرية", area: "سموحة", exp: "9 سنوات خبرة", expEn: "9 years", verified: true, verifyMethod: "sms" },
  { id: "w7", name: "عمر خالد", phone: "201155443322", job: "صباغ", jobEn: "Painter", desc: "دهانات داخلية وخارجية", descEn: "Interior & exterior paint", country: "eg", city: "الجيزة", area: "الدقي", exp: "4 سنوات خبرة", expEn: "4 years", verified: true, verifyMethod: "whatsapp" },
  { id: "w8", name: "أحمد سلامة", phone: "962790123456", job: "بليط", jobEn: "Tiler", desc: "تركيب سيراميك ورخام", descEn: "Ceramic & marble", country: "jo", city: "عمان", area: "جبل عمان", exp: "11 سنة خبرة", expEn: "11 years", verified: true, verifyMethod: "whatsapp" },
  { id: "w9", name: "خالد النعيمي", phone: "962779876543", job: "لحام", jobEn: "Welder", desc: "لحام حديد وستانلس", descEn: "Iron & stainless welding", country: "jo", city: "إربد", area: "الحي الشرقي", exp: "6 سنوات خبرة", expEn: "6 years", verified: true, verifyMethod: "sms" },
  { id: "w10", name: "Ali Hassan", phone: "971501234567", job: "تكييف", jobEn: "AC Tech", desc: "تركيب وصيانة مكيفات", descEn: "AC install & repair", country: "ae", city: "دبي", area: "بر دبي", exp: "8 سنوات خبرة", expEn: "8 years", verified: true, verifyMethod: "whatsapp" },
  { id: "w11", name: "Rashid Al-Mansouri", phone: "971559876543", job: "ميكانيكي", jobEn: "Mechanic", desc: "صيانة سيارات", descEn: "Car maintenance", country: "ae", city: "أبوظبي", area: "المركزية", exp: "15 سنة خبرة", expEn: "15 years", verified: true, verifyMethod: "email" },
  { id: "w12", name: "محمد العطية", phone: "97433123456", job: "جبس", jobEn: "Gypsum", desc: "ديكورات جبس", descEn: "Gypsum decor", country: "qa", city: "الدوحة", area: "السد", exp: "10 سنوات خبرة", expEn: "10 years", verified: true, verifyMethod: "whatsapp" },
  { id: "w13", name: "علي كريم", phone: "9647701234567", job: "حداد", jobEn: "Blacksmith", desc: "حدادة عامة", descEn: "General blacksmith", country: "iq", city: "بغداد", area: "الكرادة", exp: "13 سنة خبرة", expEn: "13 years", verified: true, verifyMethod: "sms" },
  { id: "w14", name: "جورج سمعان", phone: "96131234567", job: "ألمنيوم", jobEn: "Aluminum", desc: "شبابيك ألمنيوم", descEn: "Aluminum windows", country: "lb", city: "بيروت", area: "الأشرفية", exp: "7 سنوات خبرة", expEn: "7 years", verified: true, verifyMethod: "whatsapp" },
  { id: "w15", name: "Youssef Benali", phone: "212612345678", job: "نجار", jobEn: "Carpenter", desc: "نجارة أثاث", descEn: "Furniture carpentry", country: "ma", city: "الدار البيضاء", area: "عين الدياب", exp: "20 سنة خبرة", expEn: "20 years", verified: true, verifyMethod: "email" },
  { id: "w16", name: "Mehmet Yılmaz", phone: "905321234567", job: "بناء", jobEn: "Builder", desc: "بناء وترميم", descEn: "Building & renovation", country: "tr", city: "إسطنبول", area: "فاتح", exp: "9 سنوات خبرة", expEn: "9 years", verified: true, verifyMethod: "whatsapp" }
];

// ========== APP STATE ==========
let currentLang = localStorage.getItem('mahanti_lang') || 'ar';
let currentCountryFilter = '';
let currentJobFilter = 'all';
let currentVerifyMethod = 'whatsapp';
let currentPhone = '';
let countriesData = COUNTRIES_DATA;
let translations = I18N_DATA[currentLang];

// ========== LANGUAGE ==========
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('mahanti_lang', lang);
  location.reload();
}

function t(key) {
  return key.split('.').reduce((o, p) => o && o[p], translations) || key;
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.dataset.i18n);
    if (val && val !== el.dataset.i18n) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = t(el.dataset.i18nPlaceholder);
    if (val) el.placeholder = val;
  });
}

// ========== COUNTRIES ==========
function renderCountries() {
  const grid = document.getElementById('countriesGrid');
  if (!grid) return;

  let html = '';
  for (const [code, c] of Object.entries(countriesData)) {
    const name = currentLang === 'ar' ? c.nameAr : c.nameEn;
    html += `<a href="search.html?country=${code}" class="country-chip">
      <span class="flag">${c.flag}</span>
      <span>${name}</span>
    </a>`;
  }
  grid.innerHTML = html;
}

function populateCountrySelects() {
  const regCountry = document.getElementById('regCountry');
  if (regCountry) {
    let html = `<option value="">${t('selectCountry')}</option>`;
    for (const [code, c] of Object.entries(countriesData)) {
      const name = currentLang === 'ar' ? c.nameAr : c.nameEn;
      html += `<option value="${code}">${c.flag} ${name} (${c.code})</option>`;
    }
    regCountry.innerHTML = html;
  }

  const countryFilter = document.getElementById('countryFilter');
  if (countryFilter) {
    let html = `<option value="">${currentLang === 'ar' ? '🌍 جميع البلدان' : '🌍 All Countries'}</option>`;
    for (const [code, c] of Object.entries(countriesData)) {
      const name = currentLang === 'ar' ? c.nameAr : c.nameEn;
      html += `<option value="${code}">${c.flag} ${name}</option>`;
    }
    countryFilter.innerHTML = html;
  }
}

function onRegCountryChange() {
  const code = document.getElementById('regCountry').value;
  if (!code || !countriesData[code]) return;

  const c = countriesData[code];
  document.getElementById('phoneCode').textContent = c.code;
  document.getElementById('phoneHint').textContent = 
    (currentLang === 'ar' ? 'مثال: ' : 'Example: ') + c.phoneExample;

  const citySelect = document.getElementById('regCity');
  if (citySelect) {
    let html = `<option value="">${t('selectCity')}</option>`;
    for (const city of c.cities) {
      html += `<option value="${city}">${city}</option>`;
    }
    citySelect.innerHTML = html;
  }
}

function onCountryChange() {
  currentCountryFilter = document.getElementById('countryFilter').value;
  const cityFilter = document.getElementById('cityFilter');

  if (cityFilter && currentCountryFilter && countriesData[currentCountryFilter]) {
    let html = `<option value="">${currentLang === 'ar' ? '📍 جميع المدن' : '📍 All Cities'}</option>`;
    for (const city of countriesData[currentCountryFilter].cities) {
      html += `<option value="${city}">${city}</option>`;
    }
    cityFilter.innerHTML = html;
  } else if (cityFilter) {
    cityFilter.innerHTML = `<option value="">${currentLang === 'ar' ? '📍 جميع المدن' : '📍 All Cities'}</option>`;
  }

  filterWorkers();
}

// ========== JOBS ==========
function populateJobs() {
  const el = document.getElementById('regJob');
  if (!el || !translations.jobs) return;

  let html = `<option value="">${t('selectJob')}</option>`;
  for (const [key, label] of Object.entries(translations.jobs)) {
    html += `<option value="${key}">${label}</option>`;
  }
  el.innerHTML = html;
}

function populateJobFilters() {
  const container = document.getElementById('jobFilters');
  if (!container || !translations.jobs) return;

  const allText = currentLang === 'ar' ? 'الكل' : 'All';
  let html = `<button class="filter-tag active" onclick="filterByJob('all', this)">${allText}</button>`;

  const jobEntries = Object.entries(translations.jobs);
  for (let i = 0; i < Math.min(jobEntries.length, 12); i++) {
    const [key, label] = jobEntries[i];
    const name = label.replace(/[🧱🪵🔩🔥🔧⚡🚗🎨🏠🏗️🪟❄️🛋️🚪🧹🌳🛗📌]/g, '').trim();
    html += `<button class="filter-tag" onclick="filterByJob('${key}', this)">${name}</button>`;
  }
  container.innerHTML = html;
}

// ========== STATS ==========
function loadStats() {
  const workers = WORKERS_DATA;
  const jobs = [...new Set(workers.map(w => w.job))];
  const cities = [...new Set(workers.map(w => w.city))];
  const countryCodes = [...new Set(workers.map(w => w.country))];

  const ids = ['statWorkers', 'statJobs', 'statCities', 'statCountries'];
  const vals = [workers.length, jobs.length, cities.length, countryCodes.length];
  for (let i = 0; i < ids.length; i++) {
    const el = document.getElementById(ids[i]);
    if (el) el.textContent = vals[i];
  }
}

// ========== WORKERS ==========
function loadWorkers() {
  const list = document.getElementById('workersList');
  if (!list) return;
  renderWorkers(WORKERS_DATA);
}

function renderWorkers(workers) {
  const list = document.getElementById('workersList');
  if (!list) return;

  if (workers.length === 0) {
    list.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text-gray);">
        <div style="font-size:48px;">😕</div>
        <h3 style="color:var(--primary-green);">${t('noResults')}</h3>
        <p>${t('noResultsDesc')}</p>
      </div>`;
    return;
  }

  let html = '';
  for (const w of workers) {
    const c = countriesData[w.country] || { flag: '🌍', nameAr: w.country, nameEn: w.country };
    const countryName = currentLang === 'ar' ? c.nameAr : c.nameEn;
    const jobName = currentLang === 'ar' ? w.job : (w.jobEn || w.job);
    const desc = currentLang === 'ar' ? w.desc : (w.descEn || w.desc);
    const exp = currentLang === 'ar' ? w.exp : (w.expEn || w.exp);

    html += `
    <div class="worker-card" data-job="${w.job}" data-city="${w.city}" data-country="${w.country}">
      <div class="worker-header">
        <div class="worker-name">
          ${w.name}
          <span class="worker-country">${c.flag} ${countryName}</span>
        </div>
        <div class="worker-job">${jobName}</div>
      </div>
      <div class="worker-info">
        <span>📍 ${w.city} - ${w.area}</span><br>
        <span>⭐ ${exp}</span><br>
        <span>📝 ${desc}</span>
      </div>
      <div class="worker-actions">
        <a href="https://wa.me/${w.phone}" class="btn btn-whatsapp" target="_blank">📱 ${t('whatsapp')}</a>
        <a href="tel:+${w.phone}" class="btn btn-call">📞 ${t('call')}</a>
      </div>
    </div>`;
  }
  list.innerHTML = html;
}

// ========== SEARCH & FILTER ==========
function filterWorkers() {
  const searchTerm = document.getElementById('searchInput')?.value.trim().toLowerCase() || '';
  const cityFilter = document.getElementById('cityFilter')?.value || '';
  const countryFilter = document.getElementById('countryFilter')?.value || '';

  let results = WORKERS_DATA;

  if (searchTerm) {
    results = results.filter(w => 
      w.name.toLowerCase().includes(searchTerm) ||
      w.job.toLowerCase().includes(searchTerm) ||
      w.jobEn.toLowerCase().includes(searchTerm) ||
      w.desc.toLowerCase().includes(searchTerm) ||
      w.city.toLowerCase().includes(searchTerm) ||
      w.area.toLowerCase().includes(searchTerm)
    );
  }

  if (currentJobFilter !== 'all') {
    results = results.filter(w => w.job === currentJobFilter || w.jobEn === currentJobFilter);
  }

  if (cityFilter) {
    results = results.filter(w => w.city === cityFilter);
  }

  if (countryFilter) {
    results = results.filter(w => w.country === countryFilter);
  }

  renderWorkers(results);
}

function filterByJob(job, el) {
  currentJobFilter = job;
  document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  filterWorkers();
}

// ========== REGISTRATION ==========
function selectVerify(el, method) {
  document.querySelectorAll('.verify-method').forEach(m => m.classList.remove('selected'));
  el.classList.add('selected');
  currentVerifyMethod = method;

  const methodText = document.getElementById('verifyMethodText');
  if (methodText) {
    const texts = {
      whatsapp: currentLang === 'ar' ? 'عبر الواتساب' : 'via WhatsApp',
      sms: currentLang === 'ar' ? 'عبر الرسالة القصيرة' : 'via SMS',
      email: currentLang === 'ar' ? 'عبر البريد الإلكتروني' : 'via Email'
    };
    methodText.textContent = texts[method] || '';
  }
}

function goToVerify() {
  const name = document.getElementById('regName').value.trim();
  const countryCode = document.getElementById('regCountry').value;
  const phoneRaw = document.getElementById('regPhone').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const job = document.getElementById('regJob').value;
  const city = document.getElementById('regCity').value;
  const area = document.getElementById('regArea').value.trim();
  const v = translations.validation || {};

  if (!name) { alert('⚠️ ' + (v.nameRequired || 'Name required')); return; }
  if (!countryCode) { alert('⚠️ ' + (v.countryRequired || 'Country required')); return; }
  if (!phoneRaw) { alert('⚠️ ' + (v.phoneRequired || 'Phone required')); return; }
  if (!job) { alert('⚠️ ' + (v.jobRequired || 'Job required')); return; }
  if (!city) { alert('⚠️ ' + (v.cityRequired || 'City required')); return; }
  if (!area) { alert('⚠️ ' + (v.areaRequired || 'Area required')); return; }

  const c = countriesData[countryCode];
  const codeDigits = c.code.replace('+', '');
  currentPhone = codeDigits + phoneRaw.replace(/^0+/, '');

  const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
  console.log('🔐 Demo OTP:', otpCode);

  document.getElementById('verifyPhoneNum').textContent = '+' + currentPhone;
  document.getElementById('regStep1').style.display = 'none';
  document.getElementById('regStep2').style.display = 'block';
  document.getElementById('successMsg').classList.add('show');

  window._currentOTP = otpCode;

  setTimeout(() => {
    const inputs = document.querySelectorAll('.otp-input');
    const code = otpCode.split('');
    inputs.forEach((input, i) => { if (code[i]) input.value = code[i]; });
  }, 1000);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function moveOtp(input, index) {
  input.value = input.value.replace(/[^0-9]/g, '');
  if (input.value && index < 3) {
    document.querySelectorAll('.otp-input')[index + 1].focus();
  }
  const allFilled = Array.from(document.querySelectorAll('.otp-input')).every(i => i.value.length === 1);
  if (allFilled) setTimeout(verifyOtp, 300);
}

function verifyOtp() {
  const code = Array.from(document.querySelectorAll('.otp-input')).map(i => i.value).join('');
  const v = translations.validation || {};

  if (code.length !== 4) {
    alert('⚠️ ' + (v.otpRequired || 'Enter complete code'));
    return;
  }

  if (code !== window._currentOTP) {
    alert('⚠️ ' + (v.otpInvalid || 'Invalid code'));
    return;
  }

  const countryCode = document.getElementById('regCountry').value;
  const jobKey = document.getElementById('regJob').value;
  const jobLabel = translations.jobs ? translations.jobs[jobKey] : jobKey;
  const email = document.getElementById('regEmail').value.trim();

  const newWorker = {
    id: 'w' + Date.now(),
    name: document.getElementById('regName').value.trim(),
    phone: currentPhone,
    email: email,
    job: jobLabel || jobKey,
    jobEn: jobKey,
    desc: document.getElementById('regDesc').value.trim(),
    descEn: document.getElementById('regDesc').value.trim(),
    country: countryCode,
    city: document.getElementById('regCity').value,
    area: document.getElementById('regArea').value.trim(),
    exp: document.getElementById('regExp').value,
    expEn: document.getElementById('regExp').value,
    verified: true,
    verifyMethod: currentVerifyMethod
  };

  WORKERS_DATA.push(newWorker);

  let saved = JSON.parse(localStorage.getItem('mahanti_workers') || '[]');
  saved.push(newWorker);
  localStorage.setItem('mahanti_workers', JSON.stringify(saved));

  document.getElementById('regStep2').style.display = 'none';
  document.getElementById('regStep3').style.display = 'block';
  loadStats();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resendCode() {
  const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
  window._currentOTP = otpCode;
  console.log('🔐 New Demo OTP:', otpCode);
  alert('🔄 ' + (currentLang === 'ar' ? 'تم إعادة الإرسال!' : 'Resent!'));
  document.querySelectorAll('.otp-input').forEach(input => input.value = '');
  document.querySelectorAll('.otp-input')[0].focus();
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', function() {
  const saved = JSON.parse(localStorage.getItem('mahanti_workers') || '[]');
  if (saved.length > 0) {
    WORKERS_DATA = WORKERS_DATA.concat(saved);
  }

  translations = I18N_DATA[currentLang];
  applyTranslations();
  renderCountries();
  populateCountrySelects();

  if (document.getElementById('workersList')) {
    loadWorkers();
    populateJobFilters();
  }

  if (document.getElementById('countriesGrid')) {
    loadStats();
  }

  if (document.getElementById('regJob')) {
    populateJobs();
  }

  const urlParams = new URLSearchParams(window.location.search);
  const countryParam = urlParams.get('country');
  const jobParam = urlParams.get('job');

  if (countryParam && document.getElementById('countryFilter')) {
    document.getElementById('countryFilter').value = countryParam;
    onCountryChange();
  }

  if (jobParam && document.getElementById('searchInput')) {
    document.getElementById('searchInput').value = jobParam;
    filterWorkers();
  }
});

document.addEventListener('dblclick', function(e) { e.preventDefault(); }, { passive: false });

console.log('🛠️ Mahanti V2 - Standalone - 35+ countries embedded!');
