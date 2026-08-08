const countries = {
  jo: {
    code: "+962",
    flag: "🇯🇴",
    nameAr: "الأردن",
    nameEn: "Jordan",
    phoneLength: 9,
    phoneExample: "7 9012 3456",
    cities: [
      "عمان", "إربد", "الزرقاء", "السلط", "الرصيفة", "مأدبا",
      "جرش", "عجلون", "الكرك", "معان", "الطفيلة",
      "البتراء", "العقبة", "وادي رم", "الرمثا", "سحاب"
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { countries };
}
