import React, { useState, useEffect, useMemo, useRef } from 'react';
import './App.css';

// ============================================================================
// KOZMO MEBEL — MULTILINGUAL DICTIONARY (UZ / RU / EN)
// ============================================================================

const TRANSLATIONS = {
  uz: {
    nav: {
      catalog: 'Katalog (35)',
      collections: 'Kolleksiyalar',
      philosophy: 'Falsafa',
      bespoke: 'Individual Buyurtma',
      showroom: 'Shourum',
      wishlist: 'Tanlanganlar',
      cart: 'Savatcha',
    },
    hero: {
      eyebrow: 'TOSHKENT • ARXITEKTURA VA INTERYER STUDIYASI',
      title: 'Shakl, Materiallar va Sokinlik Muvozanati',
      subtitle:
        'Kozmo Mebel — tabiiy eman, yong‘oq, travertin toshi va qo‘l mehnati uyg‘unligida yaratilgan 35 xil mualliflik mebellari kolleksiyasi.',
      ctaPrimary: 'Katalogni ko‘rish',
      ctaSecondary: 'Shourumga yozilish',
      stat1Num: '35+',
      stat1Text: 'Mualliflik modellari',
      stat2Num: '14 kun',
      stat2Text: 'Individual tayyorlash',
      stat3Num: '5 yil',
      stat3Text: 'Karkas uchun kafolat',
    },
    marquee: [
      'TABIIY EMAN VA YONG‘OQ YOG‘OCHI',
      'ITALIYA BUKLE VA ZIG‘IR MATOLARI',
      'RIM TRAVERTINI VA MARMAR',
      'QO‘L MEHNATI SIFATI',
      'TOSHKENT BO‘YLAB BEPUL YETKAZISH',
      'EKOLOGIK TOZA QOPLAMALAR',
    ],
    catalog: {
      title: 'To‘liq Mebel Katalogi',
      subtitle: 'Barcha 35 ta model buyurtma asosida siz tanlagan o‘lcham va materialda tayyorlanadi.',
      searchPlaceholder: 'Mahsulot nomi yoki material bo‘yicha qidirish...',
      showing: 'Ko‘rsatilmoqda:',
      itemsCount: 'ta mahsulot',
      categories: {
        all: 'Barchasi',
        sofas: 'Divanlar',
        tables: 'Stollar',
        chairs: 'Kreslo va Stullar',
        beds: 'Yotoqxona',
        storage: 'Saqlash tizimlari',
        lighting: 'Yoritish',
      },
      sortBy: 'Saralash:',
      sortDefault: 'Tavsiya etilgan',
      sortPriceAsc: 'Narx: arzondan qimmatga',
      sortPriceDesc: 'Narx: qimmatdan arzonga',
      quickView: 'Batafsil',
      addToCart: 'Savatchaga',
      added: 'Qo‘shildi ✓',
      dimensions: 'O‘lchamlar:',
      material: 'Material:',
      leadTime: 'Tayyorlash:',
      noResults: 'Qidiruv bo‘yicha mahsulot topilmadi.',
      resetFilters: 'Filtrlarni tozalash',
    },
    philosophy: {
      eyebrow: 'BIZNING YONDASHUV',
      title: 'Vaqt sinovidan o‘tadigan estetikaga sodiqlik',
      p1: 'Biz o‘tkinchi trendlar ortidan quvmaymiz. Kozmo Mebel ustaxonasida yaratilgan har bir jihoz tabiiy materiallarning asl go‘zalligini ochib berishga qaratilgan.',
      p2: 'Quritilgan eman hamda Amerika yong‘og‘i yog‘ochlari Belgiya va Italiya to‘qimachilik fabrikalarining yuqori zichlikdagi matolari bilan birlashtiriladi.',
      feat1Title: 'Anatomik Ergonomika',
      feat1Desc: 'Har bir o‘rindiq burchagi va yumshoqlik darajasi uzoq yillik qulaylik uchun hisoblab chiqilgan.',
      feat2Title: 'Xomashyo Nazorati',
      feat2Desc: 'Yog‘och namligi 8% dan oshmasligi maxsus kameralarda qat’iy nazorat qilinadi.',
      feat3Title: 'Usta Imzosi',
      feat3Desc: 'Har bir mahsulot yig‘ilgandan so‘ng uch bosqichli sifat tekshiruvidan o‘tadi.',
    },
    bespoke: {
      eyebrow: 'INDIVIDUAL LOYIHA',
      title: 'Interyeringizga mos maxsus o‘lcham kerakmi?',
      desc: 'Arxitektor va dizaynerlarimiz chizmalaringiz yoki xona o‘lchamlari asosida 3D vizualizatsiya va aniq smeta tayyorlab berishadi.',
      namePlaceholder: 'Ismingiz',
      phonePlaceholder: '+998 (__) ___-__-__',
      roomType: 'Xona turi',
      rooms: ['Mehmonxona', 'Yotoqxona', 'Oshxona', 'Ofis / Kabinet', 'To‘liq xonadon'],
      submitBtn: 'Bepul konsultatsiya olish',
      successMsg: 'Arizangiz qabul qilindi. Dizaynerimiz 15 daqiqa ichida bog‘lanadi.',
    },
    showroom: {
      eyebrow: 'TOSHKENT SHOURUMI',
      title: 'Materiallarni o‘z qo‘lingiz bilan his qiling',
      addressLabel: 'Manzil:',
      address: 'Toshkent sh., Mirzo Ulug‘bek tumani, Mustaqillik shoh ko‘chasi, 75-uy',
      hoursLabel: 'Ish vaqti:',
      hours: 'Har kuni: 10:00 — 20:00 (Dam olish kunlarisiz)',
      phoneLabel: 'Aloqa markazi:',
      phone: '+998 71 200-45-88',
    },
    cart: {
      title: 'Sizning Savatchangiz',
      empty: 'Savatchangiz hozircha bo‘sh',
      emptySub: 'Katalogdan o‘zingizga ma’qul kelgan mebellarni tanlang.',
      total: 'Jami summa:',
      deliveryNote: 'Toshkent shahri ichida yetkazib berish va o‘rnatish bepul.',
      checkoutBtn: 'Buyurtmani rasmiylashtirish',
      orderFormTitle: 'Buyurtma ma’lumotlari',
      confirmOrder: 'Buyurtmani tasdiqlash',
      orderSuccessTitle: 'Buyurtmangiz qabul qilindi!',
      orderSuccessDesc: 'Menejerimiz tez orada tafsilotlarni aniqlashtirish uchun siz bilan bog‘lanadi.',
    },
    footer: {
      tagline: 'Zamonaviy hayot tarzi uchun arxitektura darajasidagi mebellar.',
      rights: '© 2026 Kozmo Mebel. Barcha huquqlar himoyalangan.',
    },
  },
  ru: {
    nav: {
      catalog: 'Каталог (35)',
      collections: 'Коллекции',
      philosophy: 'Философия',
      bespoke: 'На заказ',
      showroom: 'Шоурум',
      wishlist: 'Избранное',
      cart: 'Корзина',
    },
    hero: {
      eyebrow: 'ТАШКЕНТ • СТУДИЯ АРХИТЕКТУРЫ И ИНТЕРЬЕРА',
      title: 'Баланс Формы, Фактуры и Тишины',
      subtitle:
        'Kozmo Mebel — коллекция из 35 авторских предметов мебели на стыке натурального дуба, ореха, травертина и ручного мастерства.',
      ctaPrimary: 'Смотреть каталог',
      ctaSecondary: 'Запись в шоурум',
      stat1Num: '35+',
      stat1Text: 'Авторских моделей',
      stat2Num: '14 дней',
      stat2Text: 'Срок изготовления',
      stat3Num: '5 лет',
      stat3Text: 'Гарантия на каркас',
    },
    marquee: [
      'МАССИВ НАТУРАЛЬНОГО ДУБА И ОРЕХА',
      'ИТАЛЬЯНСКИЕ ТКАНИ БУКЛЕ И ЛЁН',
      'РИМСКИЙ ТРАВЕРТИН И МРАМОР',
      'РУЧНАЯ СБОРКА МАСТЕРОВ',
      'БЕСПЛАТНАЯ ДОСТАВКА ПО ТАШКЕНТУ',
      'ЭКОЛОГИЧНЫЕ ПОКРЫТИЯ',
    ],
    catalog: {
      title: 'Полный Каталог Мебели',
      subtitle: 'Все 35 моделей создаются индивидуально в выбранном вами размере и отделке.',
      searchPlaceholder: 'Поиск по названию или материалу...',
      showing: 'Показано:',
      itemsCount: 'товаров',
      categories: {
        all: 'Все',
        sofas: 'Диваны',
        tables: 'Столы',
        chairs: 'Кресла и Стулья',
        beds: 'Спальня',
        storage: 'Хранение',
        lighting: 'Освещение',
      },
      sortBy: 'Сортировка:',
      sortDefault: 'Рекомендуемые',
      sortPriceAsc: 'Цена: по возрастанию',
      sortPriceDesc: 'Цена: по убыванию',
      quickView: 'Подробнее',
      addToCart: 'В корзину',
      added: 'Добавлено ✓',
      dimensions: 'Габариты:',
      material: 'Материалы:',
      leadTime: 'Изготовление:',
      noResults: 'По вашему запросу ничего не найдено.',
      resetFilters: 'Сбросить фильтры',
    },
    philosophy: {
      eyebrow: 'НАШ ПОДХОД',
      title: 'Преданность эстетике вне времени',
      p1: 'Мы не гонимся за мимолетными трендами. Каждый предмет в мастерской Kozmo Mebel создан для того, чтобы раскрыть природную красоту материалов.',
      p2: 'Высушенный массив дуба и американского ореха сочетается с высокоплотным текстилем бельгийских и итальянских мануфактур.',
      feat1Title: 'Анатомическая Эргономика',
      feat1Desc: 'Угол наклона спинки и плотность наполнителя выверены для многолетнего комфорта.',
      feat2Title: 'Контроль Сырья',
      feat2Desc: 'Влажность древесины строго контролируется в сушильных камерах на уровне 8%.',
      feat3Title: 'Подпись Мастера',
      feat3Desc: 'Каждое изделие проходит трехступенчатый контроль качества перед отправкой.',
    },
    bespoke: {
      eyebrow: 'ИНДИВИДУАЛЬНЫЙ ПРОЕКТ',
      title: 'Нужен нестандартный размер под ваш интерьер?',
      desc: 'Наши архитекторы подготовят 3D-визуализацию и точный расчет стоимости по вашим чертежам или размерам комнаты.',
      namePlaceholder: 'Ваше имя',
      phonePlaceholder: '+998 (__) ___-__-__',
      roomType: 'Тип помещения',
      rooms: ['Гостиная', 'Спальня', 'Кухня / Столовая', 'Кабинет / Офис', 'Вся квартира'],
      submitBtn: 'Получить консультацию',
      successMsg: 'Заявка принята. Наш дизайнер свяжется с вами в течение 15 минут.',
    },
    showroom: {
      eyebrow: 'ШОУРУМ В ТАШКЕНТЕ',
      title: 'Ощутите фактуру материалов вживую',
      addressLabel: 'Адрес:',
      address: 'г. Ташкент, Мирзо-Улугбекский район, пр-т Мустакиллик, 75',
      hoursLabel: 'Режим работы:',
      hours: 'Ежедневно: 10:00 — 20:00 (Без выходных)',
      phoneLabel: 'Контакт-центр:',
      phone: '+998 71 200-45-88',
    },
    cart: {
      title: 'Ваша Корзина',
      empty: 'Корзина пока пуста',
      emptySub: 'Выберите понравившиеся предметы интерьера из нашего каталога.',
      total: 'Итого:',
      deliveryNote: 'Доставка и профессиональная сборка по Ташкенту — бесплатно.',
      checkoutBtn: 'Оформить заказ',
      orderFormTitle: 'Данные для доставки',
      confirmOrder: 'Подтвердить заказ',
      orderSuccessTitle: 'Ваш заказ успешно принят!',
      orderSuccessDesc: 'Менеджер свяжется с вами в ближайшее время для уточнения деталей.',
    },
    footer: {
      tagline: 'Мебель архитектурного уровня для современной жизни.',
      rights: '© 2026 Kozmo Mebel. Все права защищены.',
    },
  },
  en: {
    nav: {
      catalog: 'Catalog (35)',
      collections: 'Collections',
      philosophy: 'Philosophy',
      bespoke: 'Bespoke',
      showroom: 'Showroom',
      wishlist: 'Saved',
      cart: 'Cart',
    },
    hero: {
      eyebrow: 'TASHKENT • ARCHITECTURE & INTERIOR STUDIO',
      title: 'Balance of Form, Texture and Stillness',
      subtitle:
        'Kozmo Mebel is a curated collection of 35 signature furniture pieces crafted from solid oak, walnut, Roman travertine, and artisanal joinery.',
      ctaPrimary: 'Explore Catalog',
      ctaSecondary: 'Book Showroom Visit',
      stat1Num: '35+',
      stat1Text: 'Signature designs',
      stat2Num: '14 days',
      stat2Text: 'Custom production',
      stat3Num: '5 years',
      stat3Text: 'Frame warranty',
    },
    marquee: [
      'SOLID EUROPEAN OAK & WALNUT',
      'ITALIAN BOUCLÉ & LINEN FABRICS',
      'ROMAN TRAVERTINE & MARBLE',
      'ARTISANAL HANDCRAFTED JOINERY',
      'COMPLIMENTARY TASHKENT DELIVERY',
      'ECO-FRIENDLY FINISHES',
    ],
    catalog: {
      title: 'Complete Furniture Catalog',
      subtitle: 'All 35 pieces are crafted to order in your preferred dimensions and finish.',
      searchPlaceholder: 'Search by product name or material...',
      showing: 'Showing:',
      itemsCount: 'pieces',
      categories: {
        all: 'All Pieces',
        sofas: 'Sofas',
        tables: 'Tables',
        chairs: 'Chairs & Lounge',
        beds: 'Bedroom',
        storage: 'Storage',
        lighting: 'Lighting',
      },
      sortBy: 'Sort by:',
      sortDefault: 'Featured',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      quickView: 'Details',
      addToCart: 'Add to Cart',
      added: 'Added ✓',
      dimensions: 'Dimensions:',
      material: 'Materials:',
      leadTime: 'Lead Time:',
      noResults: 'No pieces match your current filter.',
      resetFilters: 'Reset filters',
    },
    philosophy: {
      eyebrow: 'OUR APPROACH',
      title: 'Devotion to timeless architectural aesthetics',
      p1: 'We do not chase fleeting seasonal trends. Every object crafted in the Kozmo Mebel workshop is designed to reveal the honest beauty of raw materials.',
      p2: 'Kiln-dried solid oak and American walnut are paired with high-martindale upholstery from Belgian and Italian textile mills.',
      feat1Title: 'Anatomical Ergonomics',
      feat1Desc: 'Seat angles and multi-density foam layers are calibrated for decades of comfort.',
      feat2Title: 'Timber Control',
      feat2Desc: 'Wood moisture is strictly maintained at 8% in climate-controlled chambers.',
      feat3Title: 'Master Signature',
      feat3Desc: 'Every piece undergoes a three-stage quality inspection prior to dispatch.',
    },
    bespoke: {
      eyebrow: 'BESPOKE COMMISSION',
      title: 'Need custom dimensions for your interior?',
      desc: 'Our architects will prepare 3D visualizations and an exact estimate based on your floor plans or room measurements.',
      namePlaceholder: 'Your Name',
      phonePlaceholder: '+998 (__) ___-__-__',
      roomType: 'Space Type',
      rooms: ['Living Room', 'Bedroom', 'Dining / Kitchen', 'Executive Office', 'Full Residence'],
      submitBtn: 'Request Free Consultation',
      successMsg: 'Request received. Our lead designer will contact you within 15 minutes.',
    },
    showroom: {
      eyebrow: 'TASHKENT SHOWROOM',
      title: 'Experience tactile materiality in person',
      addressLabel: 'Address:',
      address: '75 Mustaqillik Avenue, Mirzo-Ulugbek District, Tashkent',
      hoursLabel: 'Opening Hours:',
      hours: 'Daily: 10:00 — 20:00',
      phoneLabel: 'Concierge:',
      phone: '+998 71 200-45-88',
    },
    cart: {
      title: 'Your Selection',
      empty: 'Your cart is currently empty',
      emptySub: 'Explore our curated collection to add architectural pieces.',
      total: 'Total:',
      deliveryNote: 'Complimentary white-glove delivery and assembly across Tashkent.',
      checkoutBtn: 'Proceed to Checkout',
      orderFormTitle: 'Delivery Details',
      confirmOrder: 'Confirm Order',
      orderSuccessTitle: 'Your order has been placed!',
      orderSuccessDesc: 'Our concierge will reach out shortly to confirm delivery timing.',
    },
    footer: {
      tagline: 'Architectural-grade furniture for contemporary living.',
      rights: '© 2026 Kozmo Mebel. All rights reserved.',
    },
  },
};

// ============================================================================
// MATERIAL SWATCH PALETTE
// ============================================================================
const MAT = {
  ivoryBoucle: { id: 'ivory-boucle', name: 'Fil suyagi Bukle', hex: '#EDE8DF' },
  warmTaupe: { id: 'warm-taupe', name: 'Issiq Taupe zig‘ir', hex: '#A89B8C' },
  charcoalWool: { id: 'charcoal-wool', name: 'Ko‘mir jun mato', hex: '#383634' },
  naturalOak: { id: 'natural-oak', name: 'Tabiiy Eman', hex: '#C5A378' },
  smokedWalnut: { id: 'smoked-walnut', name: 'Dudlangan Yong‘oq', hex: '#5C4332' },
  ebonizedAsh: { id: 'ebonized-ash', name: 'Qora Shumtol', hex: '#262423' },
  cognacLeather: { id: 'cognac-leather', name: 'Konyak charm', hex: '#9E5834' },
  sandLinen: { id: 'sand-linen', name: 'Qumrang zig‘ir', hex: '#D8CFC2' },
  oliveVelvet: { id: 'olive-velvet', name: 'Zaytun baxmal', hex: '#555E4B' },
  romanTravertine: { id: 'roman-travertine', name: 'Rim Travertini', hex: '#DFD6C7' },
  neroMarquina: { id: 'nero-marquina', name: 'Qora Marmar', hex: '#232323' },
  brushedBrass: { id: 'brushed-brass', name: 'Jilolangan Latun', hex: '#B59A63' },
  terracottaLinen: { id: 'terracotta-linen', name: 'Terrakota zig‘ir', hex: '#B85D3B' },
};

const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=85`;

// ============================================================================
// 35 CURATED FURNITURE PRODUCTS
// ============================================================================
const PRODUCTS = [
  // --- SOFAS (6) ---
  {
    id: 'km-01', category: 'sofas',
    name: { uz: 'Sora Modulli Divani', ru: 'Модульный диван Sora', en: 'Sora Modular Sofa' },
    price: 18500000, dimensions: '280 × 105 × 72 sm', leadTime: '14 kun', tag: 'Bestseller',
    image: U('1555041469-a586c61ea9bc'), secondaryImage: U('1493663284031-b7e3aefcae8e'),
    materials: [MAT.ivoryBoucle, MAT.warmTaupe, MAT.charcoalWool],
    description: {
      uz: 'Past profilli arxitektura va chuqur o‘rindiqlar uyg‘unligi. Mustahkam eman karkas va Italiya bukle matosi bilan qoplangan.',
      ru: 'Низкопрофильная архитектура и глубокая посадка. Каркас из массива дуба и обивка из итальянского букле.',
      en: 'Low-profile architecture meets deep seating comfort. Built on a solid oak plinth with Italian bouclé upholstery.',
    },
  },
  {
    id: 'km-02', category: 'sofas',
    name: { uz: 'Noma Daybed Kushetkasi', ru: 'Кушетка Noma Daybed', en: 'Noma Architectural Daybed' },
    price: 12600000, dimensions: '200 × 85 × 42 sm', leadTime: '12 kun', tag: 'Architect Choice',
    image: U('1540574163026-643ea20ade25'), secondaryImage: U('1550254478-ead40cc54513'),
    materials: [MAT.cognacLeather, MAT.ivoryBoucle],
    description: {
      uz: 'Keng mehmonxonalar, kutubxona yoki galereya makonlari uchun mo‘ljallangan minimalist kushetka.',
      ru: 'Минималистичная кушетка для просторных гостиных, библиотек или галерейных пространств.',
      en: 'Minimalist daybed designed to anchor open-plan living rooms, libraries, or gallery spaces.',
    },
  },
  {
    id: 'km-03', category: 'sofas',
    name: { uz: 'Vesper Burchak Divani', ru: 'Угловой диван Vesper', en: 'Vesper L-Shape Sectional' },
    price: 24900000, dimensions: '320 × 175 × 74 sm', leadTime: '16 kun', tag: 'Signature',
    image: U('1493663284031-b7e3aefcae8e'), secondaryImage: U('1555041469-a586c61ea9bc'),
    materials: [MAT.sandLinen, MAT.charcoalWool, MAT.oliveVelvet],
    description: {
      uz: 'Katta oilaviy mehmonxonalar uchun mo‘ljallangan keng burchakli divan. Yechiladigan zig‘ir g‘iloflar bilan.',
      ru: 'Просторный угловой диван для семейной гостиной со съемными чехлами из бельгийского льна.',
      en: 'Generous L-shaped sectional sofa crafted for expansive living spaces with removable Belgian linen covers.',
    },
  },
  {
    id: 'km-04', category: 'sofas',
    name: { uz: 'Kanso 3-O‘rindiqli Divan', ru: 'Трехместный диван Kanso', en: 'Kanso 3-Seater Sofa' },
    price: 15800000, dimensions: '235 × 96 × 75 sm', leadTime: '12 kun', tag: null,
    image: U('1550254478-ead40cc54513'), secondaryImage: U('1586023492125-27b2c045efd7'),
    materials: [MAT.warmTaupe, MAT.ivoryBoucle],
    description: {
      uz: 'Yapon wabi-sabi falsafasi asosida yaratilgan ixcham va nafis chiziqli uch kishilik divan.',
      ru: 'Компактный трехместный диван с чистыми линиями, вдохновленный эстетикой ваби-саби.',
      en: 'Compact three-seater sofa with clean architectural lines inspired by Japanese wabi-sabi.',
    },
  },
  {
    id: 'km-05', category: 'sofas',
    name: { uz: 'Atrium Charm Divani', ru: 'Кожаный диван Atrium', en: 'Atrium Full-Grain Leather Sofa' },
    price: 27400000, dimensions: '245 × 98 × 73 sm', leadTime: '18 kun', tag: 'Limited',
    image: U('1512212621149-107ffe572d2f'), secondaryImage: U('1540574163026-643ea20ade25'),
    materials: [MAT.cognacLeather, MAT.ebonizedAsh],
    description: {
      uz: 'Tabiiy anilin charmdan tikilgan va yong‘oq oyoqlarga o‘rnatilgan statusli kabinet divani.',
      ru: 'Статусный диван из натуральной анилиновой кожи на ножках из массива американского ореха.',
      en: 'Executive sofa upholstered in full-grain aniline leather resting on solid walnut timber legs.',
    },
  },
  {
    id: 'km-06', category: 'sofas',
    name: { uz: 'Tori Ikki O‘rindiqli Loveseat', ru: 'Двухместный диван Tori', en: 'Tori Compact Loveseat' },
    price: 11200000, dimensions: '175 × 90 × 76 sm', leadTime: '10 kun', tag: 'New',
    image: U('1586023492125-27b2c045efd7'), secondaryImage: U('1555041469-a586c61ea9bc'),
    materials: [MAT.terracottaLinen, MAT.sandLinen],
    description: {
      uz: 'Kichik mehmonxona, studiya yoki yotoqxona dam olish zonasi uchun ideal ikki kishilik divan.',
      ru: 'Идеальный двухместный диван для студии, спальни или уютной зоны чтения.',
      en: 'Proportionally balanced two-seater loveseat ideal for reading nooks, studios, or bedrooms.',
    },
  },

  // --- TABLES (7) ---
  {
    id: 'km-07', category: 'tables',
    name: { uz: 'Monolith Eman Ovqatlanish Stoli', ru: 'Обеденный стол Monolith', en: 'Monolith Solid Oak Dining Table' },
    price: 14200000, dimensions: '220 × 100 × 75 sm', leadTime: '10 kun', tag: 'Signature',
    image: U('1577140917170-285929fb55b7'), secondaryImage: U('1530018607912-eff2daa1bac4'),
    materials: [MAT.naturalOak, MAT.smokedWalnut, MAT.ebonizedAsh],
    description: {
      uz: '40 mm qalinlikdagi yaxlit eman taxtasidan ishlangan monumental stol. Tabiiy moy va mum bilan himoyalangan.',
      ru: 'Монументальный стол из цельного массива дуба толщиной 40 мм. Покрыт натуральным маслом и воском.',
      en: 'Monumental dining table crafted from 40mm solid oak planks, finished with natural matte oil and beeswax.',
    },
  },
  {
    id: 'km-08', category: 'tables',
    name: { uz: 'Travertin Plinth Jurnal Stoli', ru: 'Журнальный столик Travertine', en: 'Travertine Plinth Coffee Table' },
    price: 7400000, dimensions: '120 × 70 × 36 sm', leadTime: '12 kun', tag: 'Limited',
    image: U('1533090481720-856c6e3c1fdc'), secondaryImage: U('1581539250439-c96689b516dd'),
    materials: [MAT.romanTravertine, MAT.neroMarquina],
    description: {
      uz: 'Tabiiy g‘ovakli travertin toshidan qo‘lda kesilgan jurnal stoli. Har bir toshning naqshi takrorlanmasdir.',
      ru: 'Журнальный столик из натурального пористого травертина. Рисунок каждого каменного блока уникален.',
      en: 'Hand-honed natural porous travertine coffee table. Each stone slab carries an unrepeatable pattern.',
    },
  },
  {
    id: 'km-09', category: 'tables',
    name: { uz: 'Kyoto Dumaloq Ovqatlanish Stoli', ru: 'Круглый стол Kyoto', en: 'Kyoto Round Pedestal Table' },
    price: 13500000, dimensions: 'Ø 135 × 75 sm', leadTime: '12 kun', tag: 'Bestseller',
    image: U('1530018607912-eff2daa1bac4'), secondaryImage: U('1577140917170-285929fb55b7'),
    materials: [MAT.smokedWalnut, MAT.naturalOak],
    description: {
      uz: 'Markaziy ustunli dumaloq stol — 6 kishilik samimiy suhbatlar uchun qulay va keng oyoq makonini ta’minlaydi.',
      ru: 'Круглый стол на центральной опоре обеспечивает максимум пространства для ног и комфортное общение.',
      en: 'Architectural pedestal dining table comfortably seating six with unobstructed legroom.',
    },
  },
  {
    id: 'km-10', category: 'tables',
    name: { uz: 'Architect Ish Stoli (Desk)', ru: 'Письменный стол Architect', en: 'Architect Executive Desk' },
    price: 11800000, dimensions: '160 × 75 × 75 sm', leadTime: '14 kun', tag: null,
    image: U('1518455027359-f3f8164ba6bd'), secondaryImage: U('1595515106969-1ce29566ff1c'),
    materials: [MAT.smokedWalnut, MAT.ebonizedAsh],
    description: {
      uz: 'Yashirin kabel kanallari va ikkita tortmaga ega minimalist uy ofisi va kabinet stoli.',
      ru: 'Минималистичный рабочий стол для кабинета со скрытыми кабель-каналами и двумя ящиками.',
      en: 'Minimalist executive desk featuring concealed cable management and two soft-close drawers.',
    },
  },
  {
    id: 'km-11', category: 'tables',
    name: { uz: 'Pebble Yon Stolcha (Side Table)', ru: 'Приставной столик Pebble', en: 'Pebble Solid Oak Side Table' },
    price: 3200000, dimensions: '45 × 45 × 52 sm', leadTime: '7 kun', tag: 'New',
    image: U('1581539250439-c96689b516dd'), secondaryImage: U('1533090481720-856c6e3c1fdc'),
    materials: [MAT.naturalOak, MAT.ebonizedAsh],
    description: {
      uz: 'Divan yoki kreslo yoniga qahva va kitob qo‘yish uchun ixcham, haykaltaroshlik shaklidagi yog‘och stolcha.',
      ru: 'Компактный скульптурный столик из массива дерева для размещения рядом с диваном или креслом.',
      en: 'Sculptural solid timber side table designed to nest effortlessly beside lounge chairs or sofas.',
    },
  },
  {
    id: 'km-12', category: 'tables',
    name: { uz: 'Linea Kirish Konsol Stoli', ru: 'Консольный стол Linea', en: 'Linea Entryway Console Table' },
    price: 6400000, dimensions: '140 × 38 × 80 sm', leadTime: '10 kun', tag: null,
    image: U('1595515106969-1ce29566ff1c'), secondaryImage: U('1518455027359-f3f8164ba6bd'),
    materials: [MAT.ebonizedAsh, MAT.naturalOak],
    description: {
      uz: 'Dahliz yoki mehmonxona devori bo‘ylab joylashtirish uchun ingichka va nafis arxitektura konsoli.',
      ru: 'Тонкая и изящная консоль для прихожей или акцентной стены в гостиной.',
      en: 'Slender architectural console table tailored for entryways, hallways, or behind sofas.',
    },
  },
  {
    id: 'km-13', category: 'tables',
    name: { uz: 'Duo Nesting Jurnal Stollari', ru: 'Комплект столиков Duo Nesting', en: 'Duo Nesting Coffee Tables' },
    price: 8100000, dimensions: '90×90 / 65×65 sm', leadTime: '10 kun', tag: null,
    image: U('1565793298595-6a879b1d9492'), secondaryImage: U('1533090481720-856c6e3c1fdc'),
    materials: [MAT.naturalOak, MAT.romanTravertine],
    description: {
      uz: 'Bir-birining ostiga kiruvchi ikki xil balandlikdagi jurnal stollari to‘plami.',
      ru: 'Набор из двух журнальных столиков разной высоты, задвигающихся один под другой.',
      en: 'Interlocking pair of multi-level coffee tables combining solid oak and honed stone.',
    },
  },

  // --- CHAIRS (7) ---
  {
    id: 'km-14', category: 'chairs',
    name: { uz: 'Kuro Lounge Kreslosi', ru: 'Кресло для отдыха Kuro', en: 'Kuro Lounge Armchair' },
    price: 6800000, dimensions: '78 × 82 × 74 sm', leadTime: '7 kun', tag: 'Bestseller',
    image: U('1567538096630-e0c55bd6374c'), secondaryImage: U('1598300042247-d088f8ab3a91'),
    materials: [MAT.cognacLeather, MAT.sandLinen, MAT.oliveVelvet],
    description: {
      uz: 'Yapon minimalizmi va Skandinaviya ergonomikasi ilhomida yaratilgan egri suyanchiqli dam olish kreslosi.',
      ru: 'Кресло с изогнутой спинкой, вдохновленное японским минимализмом и скандинавской эргономикой.',
      en: 'Sculpted lounge chair inspired by Japanese minimalism and Scandinavian joinery traditions.',
    },
  },
  {
    id: 'km-15', category: 'chairs',
    name: { uz: 'Oslo Ovqatlanish Stuli (2 dona)', ru: 'Обеденный стул Oslo (2 шт.)', en: 'Oslo Dining Chair (Set of 2)' },
    price: 5200000, dimensions: '52 × 54 × 79 sm', leadTime: '10 kun', tag: null,
    image: U('1503602642458-232111445657'), secondaryImage: U('1519947486511-46149fa0a254'),
    materials: [MAT.naturalOak, MAT.ebonizedAsh],
    description: {
      uz: 'Yengil vazn, ammo yuqori mustahkamlikka ega klassik Skandinaviya uslubidagi ovqatlanish stullari.',
      ru: 'Легкие, но невероятно прочные обеденные стулья в классическом скандинавском исполнении.',
      en: 'Lightweight yet remarkably sturdy dining chairs featuring steam-bent solid timber backrests.',
    },
  },
  {
    id: 'km-16', category: 'chairs',
    name: { uz: 'Cloud Bukle Kreslosi', ru: 'Кресло Cloud в ткани букле', en: 'Cloud Bouclé Swivel Chair' },
    price: 7900000, dimensions: '86 × 84 × 72 sm', leadTime: '10 kun', tag: 'New',
    image: U('1598300042247-d088f8ab3a91'), secondaryImage: U('1567538096630-e0c55bd6374c'),
    materials: [MAT.ivoryBoucle, MAT.warmTaupe],
    description: {
      uz: '360 daraja aylanuvchi yashirin mexanizm va yumshoq bukle qoplamali qulay kreslo.',
      ru: 'Уютное кресло со скрытым поворотным механизмом на 360 градусов и обивкой из мягкого букле.',
      en: 'Generously proportioned swivel lounge chair featuring a concealed 360-degree steel base.',
    },
  },
  {
    id: 'km-17', category: 'chairs',
    name: { uz: 'Vienne Rattan Kreslo', ru: 'Кресло Vienne с ротангом', en: 'Vienne Cane & Oak Armchair' },
    price: 4900000, dimensions: '58 × 56 × 78 sm', leadTime: '12 kun', tag: 'Signature',
    image: U('1519947486511-46149fa0a254'), secondaryImage: U('1503602642458-232111445657'),
    materials: [MAT.naturalOak, MAT.smokedWalnut],
    description: {
      uz: 'Tabiiy eman ramka va qo‘lda to‘qilgan Vena rattan to‘ri uyg‘unligidagi yengil stul.',
      ru: 'Легкий стул из массива дуба со спинкой из натурального плетеного ротанга.',
      en: 'Hand-woven natural cane backrest framed in kiln-dried European solid oak.',
    },
  },
  {
    id: 'km-18', category: 'chairs',
    name: { uz: 'Nordic Bar Stuli (75 sm)', ru: 'Барный стул Nordic (75 см)', en: 'Nordic Counter Bar Stool' },
    price: 3400000, dimensions: '44 × 46 × 75 sm', leadTime: '9 kun', tag: null,
    image: U('1506439773649-6e0eb8cfb237'), secondaryImage: U('1503602642458-232111445657'),
    materials: [MAT.ebonizedAsh, MAT.naturalOak, MAT.cognacLeather],
    description: {
      uz: 'Oshxona orolchasi va bar peshtaxtalari uchun latun oyoq qo‘ygichli ergonomik bar stuli.',
      ru: 'Эргономичный барный стул с латунной подножкой для кухонного острова или барной стойки.',
      en: 'Ergonomic counter stool with a brushed brass footrest designed for kitchen islands.',
    },
  },
  {
    id: 'km-19', category: 'chairs',
    name: { uz: 'Atelier Ofis Kreslosi', ru: 'Кабинетное кресло Atelier', en: 'Atelier Leather Task Chair' },
    price: 8600000, dimensions: '64 × 64 × 88 sm', leadTime: '14 kun', tag: null,
    image: U('1580480055273-228ff5388ef8'), secondaryImage: U('1567538096630-e0c55bd6374c'),
    materials: [MAT.cognacLeather, MAT.charcoalWool],
    description: {
      uz: 'Balandligi sozlanadigan va egiluvchan suyanchiqqa ega zamonaviy rahbar ofis kreslosi.',
      ru: 'Современное кабинетное кресло с регулировкой высоты и эргономичной поддержкой поясницы.',
      en: 'Sculpted ergonomic executive task chair with height adjustment and solid wood armrests.',
    },
  },
  {
    id: 'km-20', category: 'chairs',
    name: { uz: 'Sora Ottoman Puf', ru: 'Пуф-оттоманка Sora', en: 'Sora Upholstered Ottoman' },
    price: 3900000, dimensions: '85 × 65 × 41 sm', leadTime: '7 kun', tag: null,
    image: U('1540574163026-643ea20ade25'), secondaryImage: U('1598300042247-d088f8ab3a91'),
    materials: [MAT.ivoryBoucle, MAT.terracottaLinen],
    description: {
      uz: 'Sora divaniga qo‘shimcha oyoq qo‘ygich yoki alohida jurnal stoli sifatida ishlatiladigan puf.',
      ru: 'Универсальный пуф, который служит продолжением дивана Sora или дополнительным посадочным местом.',
      en: 'Versatile upholstered ottoman designed to pair with the Sora sofa or stand alone.',
    },
  },

  // --- BEDROOM (5) ---
  {
    id: 'km-21', category: 'beds',
    name: { uz: 'Tatami Past Karavoti (King)', ru: 'Низкая кровать Tatami (King)', en: 'Tatami Low Platform Bed' },
    price: 16900000, dimensions: '215 × 195 × 88 sm', leadTime: '14 kun', tag: 'Signature',
    image: U('1505693416388-ac5ce068fe85'), secondaryImage: U('1522771739844-6a9f6d5f14af'),
    materials: [MAT.naturalOak, MAT.smokedWalnut],
    description: {
      uz: 'Yapon me’morchiligi uslubidagi keng bortli eman karavot. Ortopedik lamellar tizimi bilan jihozlangan.',
      ru: 'Кровать-платформа из массива дуба с широкими бортами и ортопедическим основанием.',
      en: 'Japanese-inspired solid oak platform bed featuring wide perimeter ledges and orthopedic slats.',
    },
  },
  {
    id: 'km-22', category: 'beds',
    name: { uz: 'Serene Yumshoq Boshli Karavot', ru: 'Кровать Serene с мягким изголовьем', en: 'Serene Linen Upholstered Bed' },
    price: 18200000, dimensions: '220 × 190 × 105 sm', leadTime: '15 kun', tag: 'Bestseller',
    image: U('1522771739844-6a9f6d5f14af'), secondaryImage: U('1505693416388-ac5ce068fe85'),
    materials: [MAT.sandLinen, MAT.ivoryBoucle, MAT.warmTaupe],
    description: {
      uz: 'Kechki kitob mutolaasi uchun qulay, qalin yumshoq suyanchiqqa ega zig‘ir matoli karavot.',
      ru: 'Кровать с мягким высоким изголовьем из натурального льна для комфортного чтения перед сном.',
      en: 'Plush linen-upholstered headboard bed engineered for restful support and quiet bedroom luxury.',
    },
  },
  {
    id: 'km-23', category: 'beds',
    name: { uz: 'Kuro Tungi Tumba (Nightstand)', ru: 'Прикроватная тумба Kuro', en: 'Kuro Floating Nightstand' },
    price: 3600000, dimensions: '55 × 42 × 48 sm', leadTime: '9 kun', tag: null,
    image: U('1532372320572-cda25653a26d'), secondaryImage: U('1505693416388-ac5ce068fe85'),
    materials: [MAT.naturalOak, MAT.smokedWalnut],
    description: {
      uz: 'Yashirin tortmali va ochiq tokchali tabiiy yog‘och tungi tumbasi.',
      ru: 'Прикроватная тумба из массива дерева со скрытым ящиком и открытой нишей.',
      en: 'Solid timber bedside table with a concealed soft-close drawer and open book shelf.',
    },
  },
  {
    id: 'km-24', category: 'beds',
    name: { uz: 'Solis Yotoqxona Skameykasi', ru: 'Банкетка для спальни Solis', en: 'Solis Woven Bedroom Bench' },
    price: 4800000, dimensions: '145 × 45 × 44 sm', leadTime: '10 kun', tag: 'New',
    image: U('1540574163026-643ea20ade25'), secondaryImage: U('1522771739844-6a9f6d5f14af'),
    materials: [MAT.naturalOak, MAT.cognacLeather],
    description: {
      uz: 'Karavot etagiga yoki dahlizga qo‘yish uchun qo‘lda to‘qilgan charm tasmalardan yasalgan skameyka.',
      ru: 'Банкетка из массива дуба с плетеным сиденьем из натуральных кожаных ремней.',
      en: 'Hand-woven saddle leather straps stretched over a solid European oak frame.',
    },
  },
  {
    id: 'km-25', category: 'beds',
    name: { uz: 'Aura To‘liq Bo‘yli Ko‘zgu', ru: 'Напольное зеркало Aura', en: 'Aura Full-Length Floor Mirror' },
    price: 5100000, dimensions: '75 × 5 × 185 sm', leadTime: '8 kun', tag: null,
    image: U('1618220179428-22790b461013'), secondaryImage: U('1505693416388-ac5ce068fe85'),
    materials: [MAT.smokedWalnut, MAT.naturalOak, MAT.ebonizedAsh],
    description: {
      uz: 'Keng eman ramkali, xonaga yorug‘lik va kenglik bag‘ishlovchi katta pol ko‘zgusi.',
      ru: 'Большое напольное зеркало в глубокой раме из массива дерева, визуально расширяющее пространство.',
      en: 'Architectural full-length leaning mirror framed in deep solid timber.',
    },
  },

  // --- STORAGE (5) ---
  {
    id: 'km-26', category: 'storage',
    name: { uz: 'Aalto Relyefli Konsol-Komod', ru: 'Консоль-комод Aalto', en: 'Aalto Fluted Sideboard' },
    price: 11900000, dimensions: '180 × 45 × 78 sm', leadTime: '14 kun', tag: 'Bestseller',
    image: U('1595428774223-ef52624120d2'), secondaryImage: U('1505693416388-ac5ce068fe85'),
    materials: [MAT.naturalOak, MAT.smokedWalnut],
    description: {
      uz: 'Relyefli yog‘och eshiklar va shovqinsiz Blum mexanizmlari bilan jihozlangan keng saqlash konsoli.',
      ru: 'Вместительный комод с рифлеными фасадами из массива и бесшумной фурнитурой Blum.',
      en: 'Spacious credenza featuring hand-fluted solid timber doors and soft-close German hardware.',
    },
  },
  {
    id: 'km-27', category: 'storage',
    name: { uz: 'Grid Arxitektura Kitob Javoni', ru: 'Стеллаж для книг Grid', en: 'Grid Modular Bookshelf' },
    price: 13400000, dimensions: '160 × 38 × 200 sm', leadTime: '14 kun', tag: 'Architect Choice',
    image: U('1594620302200-9a762244a156'), secondaryImage: U('1595428774223-ef52624120d2'),
    materials: [MAT.smokedWalnut, MAT.ebonizedAsh],
    description: {
      uz: 'Xonani zonalarga ajratish yoki kutubxona tashkil etish uchun ikki tomonlama ochiq stelaj.',
      ru: 'Двусторонний открытый стеллаж для зонирования пространства или домашней библиотеки.',
      en: 'Open-back architectural shelving unit ideal for libraries or room division.',
    },
  },
  {
    id: 'km-28', category: 'storage',
    name: { uz: 'Monolith TV Tumba (220 sm)', ru: 'ТВ-тумба Monolith (220 см)', en: 'Monolith Media Credenza' },
    price: 10800000, dimensions: '220 × 45 × 52 sm', leadTime: '12 kun', tag: null,
    image: U('1595428774223-ef52624120d2'), secondaryImage: U('1594620302200-9a762244a156'),
    materials: [MAT.ebonizedAsh, MAT.naturalOak],
    description: {
      uz: 'Audio-video texnikalar uchun ventilyatsiya va yashirin sim yo‘llariga ega past TV konsoli.',
      ru: 'Низкая медиа-консоль со скрытым кабель-менеджментом и вентиляцией для техники.',
      en: 'Low-slung media console with acoustic-friendly slatted doors and concealed wiring channels.',
    },
  },
  {
    id: 'km-29', category: 'storage',
    name: { uz: 'Sora 6-Tortmali Komod', ru: 'Комод Sora на 6 ящиков', en: 'Sora 6-Drawer Tall Dresser' },
    price: 12900000, dimensions: '135 × 48 × 92 sm', leadTime: '14 kun', tag: null,
    image: U('1532372320572-cda25653a26d'), secondaryImage: U('1595428774223-ef52624120d2'),
    materials: [MAT.naturalOak, MAT.smokedWalnut],
    description: {
      uz: 'Tutqichsiz (push-to-open) tizimli va ichki qismi baxmal bilan qoplangan keng kiyim komodi.',
      ru: 'Вместительный комод с системой открывания нажатием и бархатной отделкой внутренних ящиков.',
      en: 'Handleless six-drawer chest crafted from solid European oak with lined interior compartments.',
    },
  },
  {
    id: 'km-30', category: 'storage',
    name: { uz: 'Vesper 2-Eshikli Garderob Shkafi', ru: 'Платяной шкаф Vesper', en: 'Vesper Solid Timber Wardrobe' },
    price: 21500000, dimensions: '120 × 60 × 215 sm', leadTime: '18 kun', tag: 'Custom Size',
    image: U('1594620302200-9a762244a156'), secondaryImage: U('1532372320572-cda25653a26d'),
    materials: [MAT.naturalOak, MAT.ebonizedAsh],
    description: {
      uz: 'Ichki LED yoritish tizimi va latun ilgichlarga ega monumental kiyim shkafi.',
      ru: 'Монументальный шкаф с интегрированной LED-подсветкой и латунной штангой для одежды.',
      en: 'Freestanding architectural wardrobe featuring integrated warm LED lighting and solid brass rails.',
    },
  },

  // --- LIGHTING (5) ---
  {
    id: 'km-31', category: 'lighting',
    name: { uz: 'Vesper Alabaster Pol Chirog‘i', ru: 'Торшер Vesper из алебастра', en: 'Vesper Alabaster Floor Lamp' },
    price: 4500000, dimensions: '35 × 35 × 145 sm', leadTime: '5 kun', tag: 'Signature',
    image: U('1513506003901-1e6a229e2d15'), secondaryImage: U('1507473885765-e6ed057f782c'),
    materials: [MAT.brushedBrass, MAT.ebonizedAsh],
    description: {
      uz: 'Ispan alabaster toshi va latun asosli pol chirog‘i. Xonaga yumshoq, tarqoq va iliq nur taratadi.',
      ru: 'Торшер из испанского алебастра и латуни. Создает мягкое, рассеянное и теплое освещение.',
      en: 'Spanish alabaster diffuser paired with a solid brass stem, casting a warm architectural glow.',
    },
  },
  {
    id: 'km-32', category: 'lighting',
    name: { uz: 'Halo Osma Qandil (Pendant)', ru: 'Подвесной светильник Halo', en: 'Halo Linear Brass Pendant' },
    price: 5600000, dimensions: '140 × 12 × 110 sm', leadTime: '7 kun', tag: 'New',
    image: U('1540932239986-30128078f3c5'), secondaryImage: U('1513506003901-1e6a229e2d15'),
    materials: [MAT.brushedBrass, MAT.ebonizedAsh],
    description: {
      uz: 'Ovqatlanish stoli yoki oshxona orolchasi ustiga osiladigan dimmerli chiziqli qandil.',
      ru: 'Линейный подвесной светильник с диммером для освещения обеденной зоны.',
      en: 'Dimmable linear suspension light crafted from brushed solid brass for dining tables.',
    },
  },
  {
    id: 'km-33', category: 'lighting',
    name: { uz: 'Kanso Keramika Stol Chirog‘i', ru: 'Настольная лампа Kanso', en: 'Kanso Stoneware Table Lamp' },
    price: 2800000, dimensions: '32 × 32 × 46 sm', leadTime: '5 kun', tag: null,
    image: U('1507473885765-e6ed057f782c'), secondaryImage: U('1540932239986-30128078f3c5'),
    materials: [MAT.romanTravertine, MAT.sandLinen],
    description: {
      uz: 'Qo‘lda kulolchilik usulida yasalgan asos va tabiiy zig‘ir abajurli tungi chiroq.',
      ru: 'Настольная лампа с керамическим основанием ручной работы и абажуром из натурального льна.',
      en: 'Hand-thrown stoneware base topped with a raw Belgian linen drum shade.',
    },
  },
  {
    id: 'km-34', category: 'lighting',
    name: { uz: 'Eclipse Devor Brasi (Sconce)', ru: 'Настенное бра Eclipse', en: 'Eclipse Travertine Wall Sconce' },
    price: 2400000, dimensions: '26 × 10 × 26 sm', leadTime: '6 kun', tag: null,
    image: U('1513506003901-1e6a229e2d15'), secondaryImage: U('1507473885765-e6ed057f782c'),
    materials: [MAT.romanTravertine, MAT.brushedBrass],
    description: {
      uz: 'Tabiiy travertin disk ortidan taraluvchi yumshoq devor yoritgichi.',
      ru: 'Архитектурное настенное бра с мягкой фоновой подсветкой из-за диска травертина.',
      en: 'Architectural wall sconce casting an indirect halo glow behind a honed travertine disc.',
    },
  },
  {
    id: 'km-35', category: 'lighting',
    name: { uz: 'Arc Haykaltarosh Torsher', ru: 'Скульптурный торшер Arc', en: 'Arc Cantilevered Floor Lamp' },
    price: 6200000, dimensions: '115 × 38 × 195 sm', leadTime: '10 kun', tag: 'Limited',
    image: U('1540932239986-30128078f3c5'), secondaryImage: U('1513506003901-1e6a229e2d15'),
    materials: [MAT.neroMarquina, MAT.brushedBrass],
    description: {
      uz: 'Og‘ir qora marmar asosli va egiluvchan latun yoyli zamonaviy mehmonxona torsheri.',
      ru: 'Массивный торшер на основании из черного мрамора с изогнутой латунной дугой.',
      en: 'Cantilevered brass arc floor lamp anchored by a solid Nero Marquina marble counterweight.',
    },
  },
];

// ============================================================================
// UTILITIES
// ============================================================================

const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' UZS';

function useScrollReveal(dependencyKey) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [dependencyKey]);
}

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  const [lang, setLang] = useState('uz');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [wishlist, setWishlist] = useState(['km-01', 'km-07']);
  const [cart, setCart] = useState([
    { product: PRODUCTS[13], material: PRODUCTS[13].materials[0], quantity: 1 },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedModalMaterial, setSelectedModalMaterial] = useState(null);
  const [justAddedId, setJustAddedId] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const [bespokeForm, setBespokeForm] = useState({ name: '', phone: '', roomIndex: 0 });
  const [bespokeSubmitted, setBespokeSubmitted] = useState(false);

  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [orderForm, setOrderForm] = useState({ fullName: '', phone: '', address: '' });

  const t = TRANSLATIONS[lang];
  const catalogRef = useRef(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;
      const nameMatch =
        item.name.uz.toLowerCase().includes(query) ||
        item.name.ru.toLowerCase().includes(query) ||
        item.name.en.toLowerCase().includes(query);
      const matMatch = item.materials.some((m) => m.name.toLowerCase().includes(query));
      return matchesCategory && (nameMatch || matMatch);
    }).sort((a, b) => {
      if (sortOrder === 'price-asc') return a.price - b.price;
      if (sortOrder === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [activeCategory, searchQuery, sortOrder]);

  useScrollReveal(`${activeCategory}-${searchQuery}-${sortOrder}`);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isCartOpen || selectedProduct || isMobileMenuOpen ? 'hidden' : '';
  }, [isCartOpen, selectedProduct, isMobileMenuOpen]);

  const toggleWishlist = (productId, e) => {
    if (e) e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleAddToCart = (product, material = product.materials[0]) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.material.id === material.id
      );
      if (idx > -1) {
        return prevCart.map((item, i) => (i === idx ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prevCart, { product, material, quantity: 1 }];
    });
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1300);
  };

  const updateCartQuantity = (index, delta) => {
    setCart((prev) => {
      const newQty = prev[index].quantity + delta;
      if (newQty <= 0) return prev.filter((_, i) => i !== index);
      return prev.map((item, i) => (i === index ? { ...item, quantity: newQty } : item));
    });
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedModalMaterial(product.materials[0]);
  };

  const handleBespokeSubmit = (e) => {
    e.preventDefault();
    if (!bespokeForm.name.trim() || !bespokeForm.phone.trim()) return;
    setBespokeSubmitted(true);
    setBespokeForm({ name: '', phone: '', roomIndex: 0 });
  };

  const handleOrderConfirm = (e) => {
    e.preventDefault();
    if (!orderForm.fullName.trim() || !orderForm.phone.trim()) return;
    setCheckoutStep('success');
    setCart([]);
  };

  const resetAndCloseCart = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setCheckoutStep('cart');
      setOrderForm({ fullName: '', phone: '', address: '' });
    }, 350);
  };

  const getCategoryCount = (catKey) =>
    catKey === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === catKey).length;

  const navItems = [
    ['#catalog', t.nav.catalog],
    ['#philosophy', t.nav.philosophy],
    ['#bespoke', t.nav.bespoke],
    ['#showroom', t.nav.showroom],
  ];

  return (
    <div className="kozmo-app">
      {/* HEADER */}
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <a href="#top" className="brand-logo" aria-label="Kozmo Mebel">
            <span className="logo-mark" />
            <span className="logo-text">KOZMO MEBEL</span>
          </a>

          <nav className="desktop-nav">
            {navItems.map(([href, label]) => (
              <a key={href} href={href} className="nav-link">{label}</a>
            ))}
          </nav>

          <div className="header-actions">
            <div className="lang-switcher" role="group" aria-label="Language switcher">
              {['uz', 'ru', 'en'].map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`lang-btn ${lang === code ? 'is-active' : ''}`}
                  onClick={() => setLang(code)}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="wishlist-pill" title={t.nav.wishlist}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{wishlist.length}</span>
            </div>

            <button type="button" className="cart-trigger" onClick={() => setIsCartOpen(true)} aria-label={t.nav.cart}>
              <span>{t.nav.cart}</span>
              <span className="cart-badge">{totalCartItems}</span>
            </button>

            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>

        <div className={`mobile-nav-panel ${isMobileMenuOpen ? 'is-open' : ''}`}>
          <div className="mobile-nav-links">
            {navItems.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setIsMobileMenuOpen(false)}>{label}</a>
            ))}
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="eyebrow-tag animate-fade-up">{t.hero.eyebrow}</div>
              <h1 className="hero-title animate-fade-up delay-1">{t.hero.title}</h1>
              <p className="hero-subtitle animate-fade-up delay-2">{t.hero.subtitle}</p>

              <div className="hero-cta-group animate-fade-up delay-3">
                <a href="#catalog" className="btn btn-primary">
                  <span>{t.hero.ctaPrimary}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3.333 8H12.667M12.667 8L8.667 4M12.667 8L8.667 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </a>
                <a href="#showroom" className="btn btn-outline">{t.hero.ctaSecondary}</a>
              </div>

              <div className="hero-metrics animate-fade-up delay-4">
                <div className="metric-item">
                  <strong className="metric-value">{t.hero.stat1Num}</strong>
                  <span className="metric-label">{t.hero.stat1Text}</span>
                </div>
                <div className="metric-divider" />
                <div className="metric-item">
                  <strong className="metric-value">{t.hero.stat2Num}</strong>
                  <span className="metric-label">{t.hero.stat2Text}</span>
                </div>
                <div className="metric-divider" />
                <div className="metric-item">
                  <strong className="metric-value">{t.hero.stat3Num}</strong>
                  <span className="metric-label">{t.hero.stat3Text}</span>
                </div>
              </div>
            </div>

            <div className="hero-visual animate-fade-in delay-2">
              <div className="hero-image-frame">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85"
                  alt="Kozmo Mebel Minimalist Interior"
                  className="hero-img"
                />
                <div className="hero-caption-card">
                  <span className="caption-code">KOLLEKSIYA 2026 • 35 MODEL</span>
                  <p className="caption-name">Sora Sofa & Travertine Table</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee-strip" aria-hidden="true">
          <div className="marquee-track">
            {[...t.marquee, ...t.marquee].map((text, idx) => (
              <div key={idx} className="marquee-item">
                <span>{text}</span>
                <span className="marquee-dot">■</span>
              </div>
            ))}
          </div>
        </div>

        {/* CATALOG */}
        <section id="catalog" className="catalog-section" ref={catalogRef}>
          <div className="container">
            <div className="section-header-row reveal-on-scroll">
              <div>
                <h2 className="section-title">{t.catalog.title}</h2>
                <p className="section-desc">{t.catalog.subtitle}</p>
              </div>

              <div className="catalog-controls-right">
                <div className="search-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.catalog.searchPlaceholder}
                    className="search-input"
                  />
                  {searchQuery && (
                    <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">
                      ✕
                    </button>
                  )}
                </div>

                <div className="sort-control">
                  <label htmlFor="sort-select">{t.catalog.sortBy}</label>
                  <select id="sort-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="editorial-select">
                    <option value="default">{t.catalog.sortDefault}</option>
                    <option value="price-asc">{t.catalog.sortPriceAsc}</option>
                    <option value="price-desc">{t.catalog.sortPriceDesc}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="filter-bar-wrapper reveal-on-scroll">
              <div className="filter-bar">
                {Object.entries(t.catalog.categories).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    className={`filter-tab ${activeCategory === key ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(key)}
                  >
                    <span>{label}</span>
                    <span className="tab-count">{getCategoryCount(key)}</span>
                  </button>
                ))}
              </div>
              <div className="results-counter">
                {t.catalog.showing} <strong>{filteredProducts.length}</strong> {t.catalog.itemsCount}
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="empty-catalog-state">
                <p>{t.catalog.noResults}</p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                >
                  {t.catalog.resetFilters}
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => {
                  const isSaved = wishlist.includes(product.id);
                  return (
                    <article key={product.id} className="product-card reveal-on-scroll">
                      <div
                        className="product-media"
                        onClick={() => openProductModal(product)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && openProductModal(product)}
                      >
                        {product.tag && <span className="product-badge">{product.tag}</span>}

                        <button
                          type="button"
                          className={`wishlist-card-btn ${isSaved ? 'is-saved' : ''}`}
                          onClick={(e) => toggleWishlist(product.id, e)}
                          aria-label="Save item"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </button>

                        <img src={product.image} alt={product.name[lang]} className="product-img primary" loading="lazy" />
                        <img src={product.secondaryImage} alt="" className="product-img secondary" loading="lazy" />

                        <div className="product-overlay-actions">
                          <button
                            type="button"
                            className="quick-view-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              openProductModal(product);
                            }}
                          >
                            {t.catalog.quickView}
                          </button>
                        </div>
                      </div>

                      <div className="product-info">
                        <div className="product-top-meta">
                          <span className="product-dims">{product.dimensions}</span>
                          <div className="swatch-row" title={t.catalog.material}>
                            {product.materials.map((mat) => (
                              <span key={mat.id} className="swatch-dot" style={{ backgroundColor: mat.hex }} title={mat.name} />
                            ))}
                          </div>
                        </div>

                        <h3 className="product-title" onClick={() => openProductModal(product)}>
                          {product.name[lang]}
                        </h3>

                        <div className="product-bottom-row">
                          <span className="product-price">{formatPrice(product.price)}</span>
                          <button
                            type="button"
                            className={`add-cart-inline ${justAddedId === product.id ? 'is-added' : ''}`}
                            onClick={() => handleAddToCart(product)}
                          >
                            {justAddedId === product.id ? t.catalog.added : t.catalog.addToCart}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section id="philosophy" className="philosophy-section">
          <div className="container philosophy-grid">
            <div className="philosophy-visual reveal-on-scroll">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"
                alt="Kozmo Mebel Craftsmanship"
                className="philosophy-img"
              />
              <div className="wood-sample-card">
                <div className="sample-swatches">
                  <span style={{ backgroundColor: '#C5A378' }} />
                  <span style={{ backgroundColor: '#5C4332' }} />
                  <span style={{ backgroundColor: '#EDE8DF' }} />
                  <span style={{ backgroundColor: '#DFD6C7' }} />
                </div>
                <p>FSC sertifikatlangan tabiiy yog‘och, travertin va Belgiya tekstili</p>
              </div>
            </div>

            <div className="philosophy-content reveal-on-scroll">
              <span className="eyebrow-tag">{t.philosophy.eyebrow}</span>
              <h2 className="section-title">{t.philosophy.title}</h2>
              <p className="philosophy-lead">{t.philosophy.p1}</p>
              <p className="philosophy-body">{t.philosophy.p2}</p>

              <div className="pillars-list">
                {[1, 2, 3].map((n) => (
                  <div className="pillar-item" key={n}>
                    <span className="pillar-num">0{n}</span>
                    <div>
                      <h4>{t.philosophy[`feat${n}Title`]}</h4>
                      <p>{t.philosophy[`feat${n}Desc`]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BESPOKE */}
        <section id="bespoke" className="bespoke-section">
          <div className="container bespoke-box reveal-on-scroll">
            <div className="bespoke-info">
              <span className="eyebrow-tag light">{t.bespoke.eyebrow}</span>
              <h2 className="bespoke-title">{t.bespoke.title}</h2>
              <p className="bespoke-desc">{t.bespoke.desc}</p>
            </div>

            <div className="bespoke-form-wrapper">
              {bespokeSubmitted ? (
                <div className="form-success-box">
                  <div className="check-square">✓</div>
                  <p>{t.bespoke.successMsg}</p>
                  <button type="button" className="btn btn-outline-light" onClick={() => setBespokeSubmitted(false)}>
                    OK
                  </button>
                </div>
              ) : (
                <form className="bespoke-form" onSubmit={handleBespokeSubmit}>
                  <div className="form-row">
                    <input
                      type="text"
                      required
                      placeholder={t.bespoke.namePlaceholder}
                      value={bespokeForm.name}
                      onChange={(e) => setBespokeForm({ ...bespokeForm, name: e.target.value })}
                      className="dark-input"
                    />
                    <input
                      type="tel"
                      required
                      placeholder={t.bespoke.phonePlaceholder}
                      value={bespokeForm.phone}
                      onChange={(e) => setBespokeForm({ ...bespokeForm, phone: e.target.value })}
                      className="dark-input"
                    />
                  </div>

                  <div className="room-selector">
                    <label>{t.bespoke.roomType}:</label>
                    <div className="room-chips">
                      {t.bespoke.rooms.map((room, i) => (
                        <button
                          key={room}
                          type="button"
                          className={`room-chip ${bespokeForm.roomIndex === i ? 'is-selected' : ''}`}
                          onClick={() => setBespokeForm({ ...bespokeForm, roomIndex: i })}
                        >
                          {room}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-terracotta full-width">
                    {t.bespoke.submitBtn}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* SHOWROOM */}
        <section id="showroom" className="showroom-section">
          <div className="container showroom-grid reveal-on-scroll">
            <div className="showroom-details">
              <span className="eyebrow-tag">{t.showroom.eyebrow}</span>
              <h2 className="section-title">{t.showroom.title}</h2>

              <div className="showroom-meta-list">
                <div className="meta-block">
                  <span className="meta-label">{t.showroom.addressLabel}</span>
                  <p className="meta-val">{t.showroom.address}</p>
                </div>
                <div className="meta-block">
                  <span className="meta-label">{t.showroom.hoursLabel}</span>
                  <p className="meta-val">{t.showroom.hours}</p>
                </div>
                <div className="meta-block">
                  <span className="meta-label">{t.showroom.phoneLabel}</span>
                  <a href="tel:+998712004588" className="meta-val phone-link">{t.showroom.phone}</a>
                </div>
              </div>
            </div>

            <div className="showroom-visual">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                alt="Kozmo Mebel Tashkent Showroom"
                className="showroom-img"
              />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="logo-text">KOZMO MEBEL</span>
            <p>{t.footer.tagline}</p>
          </div>

          <div className="footer-links">
            {navItems.map(([href, label]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </div>

          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://t.me" target="_blank" rel="noreferrer">Telegram</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>{t.footer.rights}</span>
          <span>TASHKENT, UZBEKISTAN</span>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close-btn" onClick={() => setSelectedProduct(null)} aria-label="Close modal">
              ✕
            </button>

            <div className="modal-grid">
              <div className="modal-image-col">
                <img src={selectedProduct.image} alt={selectedProduct.name[lang]} />
              </div>

              <div className="modal-info-col">
                {selectedProduct.tag && <span className="modal-tag">{selectedProduct.tag}</span>}
                <h2 className="modal-title">{selectedProduct.name[lang]}</h2>
                <p className="modal-price">{formatPrice(selectedProduct.price)}</p>
                <p className="modal-desc">{selectedProduct.description[lang]}</p>

                <div className="modal-specs">
                  <div className="spec-row">
                    <span>{t.catalog.dimensions}</span>
                    <strong>{selectedProduct.dimensions}</strong>
                  </div>
                  <div className="spec-row">
                    <span>{t.catalog.leadTime}</span>
                    <strong>{selectedProduct.leadTime}</strong>
                  </div>
                </div>

                <div className="modal-material-picker">
                  <span className="picker-label">
                    {t.catalog.material} <strong>{selectedModalMaterial && selectedModalMaterial.name}</strong>
                  </span>
                  <div className="picker-swatches">
                    {selectedProduct.materials.map((mat) => (
                      <button
                        key={mat.id}
                        type="button"
                        className={`picker-swatch-btn ${selectedModalMaterial?.id === mat.id ? 'is-selected' : ''}`}
                        onClick={() => setSelectedModalMaterial(mat)}
                        title={mat.name}
                      >
                        <span style={{ backgroundColor: mat.hex }} />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary full-width"
                  onClick={() => {
                    handleAddToCart(selectedProduct, selectedModalMaterial);
                    setSelectedProduct(null);
                    setIsCartOpen(true);
                  }}
                >
                  {t.catalog.addToCart} — {formatPrice(selectedProduct.price)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      <div className={`drawer-backdrop ${isCartOpen ? 'is-open' : ''}`} onClick={resetAndCloseCart}>
        <aside className={`cart-drawer ${isCartOpen ? 'is-open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <h3>{t.cart.title} ({totalCartItems})</h3>
            <button type="button" className="drawer-close" onClick={resetAndCloseCart}>✕</button>
          </div>

          {checkoutStep === 'success' ? (
            <div className="drawer-success-state">
              <div className="success-icon">✓</div>
              <h4>{t.cart.orderSuccessTitle}</h4>
              <p>{t.cart.orderSuccessDesc}</p>
              <button type="button" className="btn btn-primary" onClick={resetAndCloseCart}>
                {t.hero.ctaPrimary}
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="drawer-empty-state">
              <p className="empty-title">{t.cart.empty}</p>
              <p className="empty-sub">{t.cart.emptySub}</p>
            </div>
          ) : checkoutStep === 'cart' ? (
            <>
              <div className="drawer-items">
                {cart.map((item, idx) => (
                  <div key={`${item.product.id}-${item.material.id}`} className="cart-item">
                    <img src={item.product.image} alt={item.product.name[lang]} />
                    <div className="cart-item-body">
                      <h4>{item.product.name[lang]}</h4>
                      <span className="cart-item-mat">
                        <i style={{ backgroundColor: item.material.hex }} />
                        {item.material.name}
                      </span>
                      <div className="cart-item-controls">
                        <div className="qty-box">
                          <button type="button" onClick={() => updateCartQuantity(idx, -1)}>−</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateCartQuantity(idx, 1)}>+</button>
                        </div>
                        <span className="cart-item-price">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="drawer-footer">
                <p className="delivery-note">{t.cart.deliveryNote}</p>
                <div className="total-row">
                  <span>{t.cart.total}</span>
                  <strong>{formatPrice(totalCartPrice)}</strong>
                </div>
                <button type="button" className="btn btn-primary full-width" onClick={() => setCheckoutStep('form')}>
                  {t.cart.checkoutBtn}
                </button>
              </div>
            </>
          ) : (
            <form className="drawer-checkout-form" onSubmit={handleOrderConfirm}>
              <h4>{t.cart.orderFormTitle}</h4>
              <label>
                <span>{t.bespoke.namePlaceholder}</span>
                <input
                  type="text"
                  required
                  value={orderForm.fullName}
                  onChange={(e) => setOrderForm({ ...orderForm, fullName: e.target.value })}
                />
              </label>
              <label>
                <span>{t.bespoke.phonePlaceholder}</span>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                />
              </label>
              <label>
                <span>{t.showroom.addressLabel}</span>
                <input
                  type="text"
                  required
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                />
              </label>

              <div className="total-row">
                <span>{t.cart.total}</span>
                <strong>{formatPrice(totalCartPrice)}</strong>
              </div>

              <div className="checkout-btns">
                <button type="button" className="btn btn-outline" onClick={() => setCheckoutStep('cart')}>←</button>
                <button type="submit" className="btn btn-primary">{t.cart.confirmOrder}</button>
              </div>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}
