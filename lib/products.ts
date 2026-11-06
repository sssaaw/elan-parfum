// ÉLAN PARFUM — демонстрационный каталог мультибрендового магазина.
// Реальные бренды представлены реальными ароматами (названия сверены с фото).
// Ароматы вымышленных домов (Maison Élan, Atelier Verre, Solaire, Bois d'Ombre,
// Élan Selection) — демонстрационные позиции магазина.

export type Gender = "women" | "men" | "unisex";
export type Category = "designer" | "niche" | "set";

export interface Volume {
  ml: number;
  price: number; // ₽
}

export interface Product {
  slug: string;
  brand: string;
  name: string;
  gender: Gender;
  category: Category;
  family: string;
  noteTags: string[]; // для подбора: древесные, цитрусовые, цветочные, восточные, свежие, гурманские
  top: string[];
  heart: string[];
  base: string[];
  character: "лёгкий" | "свежий" | "насыщенный" | "сладкий" | "глубокий";
  description: string;
  volumes: Volume[];
  popularity: number; // 1..100
  image: string; // /images/...
  gallery: string[];
  fictional?: boolean; // аромат вымышленного дома
}

export const GENDER_LABELS: Record<Gender, string> = {
  women: "Для неё",
  men: "Для него",
  unisex: "Унисекс",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  designer: "Дизайнерская",
  niche: "Нишевая",
  set: "Подарочные наборы",
};

export const NOTE_TAGS = [
  "древесные",
  "цитрусовые",
  "цветочные",
  "восточные",
  "свежие",
  "гурманские",
] as const;

export const CHARACTERS = ["лёгкий", "свежий", "насыщенный", "сладкий", "глубокий"] as const;

export const products: Product[] = [
  // ---------- Дизайнерская парфюмерия ----------
  {
    slug: "chanel-no5",
    brand: "Chanel",
    name: "N°5",
    gender: "women",
    category: "designer",
    family: "Альдегидно-цветочный",
    noteTags: ["цветочные"],
    top: ["альдегиды", "бергамот", "нероли"],
    heart: ["роза", "жасмин", "лилия"],
    base: ["сандал", "ваниль", "ветивер"],
    character: "насыщенный",
    description:
      "Абсолютная классика XX века: сияющие альдегиды поверх бархатного сердца из розы и жасмина. Аромат, который десятилетиями остаётся эталоном элегантности.",
    volumes: [
      { ml: 35, price: 12400 },
      { ml: 50, price: 15800 },
      { ml: 100, price: 21400 },
    ],
    popularity: 98,
    image: "/images/chanel-no5.jpg",
    gallery: ["/images/chanel-no5.jpg"],
  },
  {
    slug: "chanel-coco-noir",
    brand: "Chanel",
    name: "Coco Noir",
    gender: "women",
    category: "designer",
    family: "Восточно-цветочный",
    noteTags: ["восточные", "цветочные"],
    top: ["грейпфрут", "бергамот"],
    heart: ["роза", "жасмин", "нарцисс"],
    base: ["пачули", "сандал", "ваниль", "амбра"],
    character: "глубокий",
    description:
      "Ночная сторона иконы: чёрный флакон, глубокая роза и бархатные пачули. Аромат для вечера, в котором всё решает уверенность.",
    volumes: [
      { ml: 35, price: 13200 },
      { ml: 50, price: 16900 },
      { ml: 100, price: 22800 },
    ],
    popularity: 88,
    image: "/images/coco-noir.jpg",
    gallery: ["/images/coco-noir.jpg", "/images/coco-noir-alt.jpg"],
  },
  {
    slug: "chanel-coco-mademoiselle",
    brand: "Chanel",
    name: "Coco Mademoiselle",
    gender: "women",
    category: "designer",
    family: "Шипрово-цветочный",
    noteTags: ["цветочные", "восточные"],
    top: ["апельсин", "бергамот"],
    heart: ["роза", "жасмин", "личи"],
    base: ["пачули", "ветивер", "белый мускус"],
    character: "насыщенный",
    description:
      "Дерзкая и утончённая классика: яркий апельсин, майская роза и шипровая база. Один из самых узнаваемых женских ароматов современности.",
    volumes: [
      { ml: 35, price: 12800 },
      { ml: 50, price: 16400 },
      { ml: 100, price: 22400 },
    ],
    popularity: 95,
    image: "/images/coco-mademoiselle.jpg",
    gallery: ["/images/coco-mademoiselle.jpg"],
  },
  {
    slug: "chanel-chance-eau-fraiche",
    brand: "Chanel",
    name: "Chance Eau Fraîche",
    gender: "women",
    category: "designer",
    family: "Свежий цветочный",
    noteTags: ["свежие", "цитрусовые", "цветочные"],
    top: ["лимон", "цитрус"],
    heart: ["жасмин", "водная лилия"],
    base: ["белый мускус", "кедр", "ветивер"],
    character: "свежий",
    description:
      "Лёгкость и удача в круглом флаконе: цитрусовая искра, нежный жасмин и прозрачный мускус. Идеальный дневной аромат на тёплые месяцы.",
    volumes: [
      { ml: 50, price: 11200 },
      { ml: 100, price: 15600 },
    ],
    popularity: 84,
    image: "/images/chance-eau-fraiche.jpg",
    gallery: ["/images/chance-eau-fraiche.jpg"],
  },
  {
    slug: "dior-miss-dior",
    brand: "Dior",
    name: "Miss Dior",
    gender: "women",
    category: "designer",
    family: "Цветочно-шипровый",
    noteTags: ["цветочные"],
    top: ["мандарин", "розовый перец"],
    heart: ["майская роза", "пиони", "слива"],
    base: ["пачули", "белый мускус", "ваниль"],
    character: "насыщенный",
    description:
      "Гранд-бал розы и пиона в фирменном флаконе с бантом. Романтичный, но взрослый шипр — от утреннего приёма до позднего ужина.",
    volumes: [
      { ml: 30, price: 9900 },
      { ml: 50, price: 13900 },
      { ml: 100, price: 18900 },
    ],
    popularity: 93,
    image: "/images/miss-dior.jpg",
    gallery: ["/images/miss-dior.jpg", "/images/miss-dior-silk.jpg"],
  },
  {
    slug: "dior-sauvage",
    brand: "Dior",
    name: "Sauvage",
    gender: "men",
    category: "designer",
    family: "Свежий древесный",
    noteTags: ["свежие", "древесные"],
    top: ["калимантанский перец", "бергамот"],
    heart: ["лаванда", "пачули"],
    base: ["амброксан", "кедр", "лабданум"],
    character: "свежий",
    description:
      "Мужская икона десятилетия: искристый бергамот, пряный перец и дерзкая амброксановая база. Стойкий шлейф, работающий в любой ситуации.",
    volumes: [
      { ml: 60, price: 10800 },
      { ml: 100, price: 14200 },
    ],
    popularity: 97,
    image: "/images/sauvage.jpg",
    gallery: ["/images/sauvage.jpg"],
  },
  {
    slug: "givenchy-linterdit",
    brand: "Givenchy",
    name: "L'Interdit",
    gender: "women",
    category: "designer",
    family: "Цветочно-восточный",
    noteTags: ["цветочные", "восточные"],
    top: ["груша", "бергамот"],
    heart: ["тубероза", "жасмин", "флёрдоранж"],
    base: ["ветивер", "пачули", "ваниль", "амброксан"],
    character: "глубокий",
    description:
      "«Запретный» аромат с белыми цветами на тёмной базе. Тубероза и жасмин звучат дерзко, но в рамках безупречного вкуса.",
    volumes: [
      { ml: 35, price: 9400 },
      { ml: 50, price: 12400 },
      { ml: 80, price: 15800 },
    ],
    popularity: 87,
    image: "/images/linterdit.jpg",
    gallery: ["/images/linterdit.jpg"],
  },
  {
    slug: "marc-jacobs-decadence",
    brand: "Marc Jacobs",
    name: "Decadence",
    gender: "women",
    category: "designer",
    family: "Восточно-цветочный",
    noteTags: ["восточные", "гурманские"],
    top: ["шафран", "итальянский сливовый ликёр"],
    heart: ["болгарская роза", "жасмин самбак"],
    base: ["жидкая амбра", "пачули", "кожа"],
    character: "глубокий",
    description:
      "Роскошь в флаконе-сумочке с змеиным кожаным клатчем: пьянящая слива, роза и тёмная амбра. Вечерний аромат с характером.",
    volumes: [
      { ml: 30, price: 8600 },
      { ml: 50, price: 11800 },
      { ml: 100, price: 16200 },
    ],
    popularity: 79,
    image: "/images/decadence.jpg",
    gallery: ["/images/decadence.jpg"],
  },
  {
    slug: "emporio-armani-in-love-with-you",
    brand: "Emporio Armani",
    name: "In Love With You",
    gender: "unisex",
    category: "designer",
    family: "Цветочно-древесный",
    noteTags: ["цветочные", "древесные"],
    top: ["бергамот", "чёрная смородина"],
    heart: ["роза", "жасмин"],
    base: ["пачули", "кедр", "мускус"],
    character: "насыщенный",
    description:
      "Аромат-дуэт для двоих: тёплая роза и благородные древесные ноты в гранёном флаконе. Звучит одинаково хорошо на мужчине и женщине.",
    volumes: [
      { ml: 50, price: 8900 },
      { ml: 100, price: 12400 },
    ],
    popularity: 72,
    image: "/images/armani-in-love.jpg",
    gallery: ["/images/armani-in-love.jpg"],
  },
  {
    slug: "lacoste-inspiration",
    brand: "Lacoste",
    name: "Inspiration",
    gender: "women",
    category: "designer",
    family: "Цветочно-фруктовый",
    noteTags: ["цветочные", "свежие"],
    top: ["груша", "мандарин", "красное яблоко"],
    heart: ["фиалка", "гибискус", "фрезия"],
    base: ["мускус", "ирис", "кедр"],
    character: "лёгкий",
    description:
      "Ретро-классика в ребристом флаконе: сочная груша, нежная фиалка и мягкий мускус. Лёгкий оптимистичный аромат на каждый день.",
    volumes: [
      { ml: 30, price: 5400 },
      { ml: 50, price: 7600 },
    ],
    popularity: 61,
    image: "/images/lacoste-inspiration.jpg",
    gallery: ["/images/lacoste-inspiration.jpg"],
  },
  {
    slug: "issey-miyake-leau-dissey-intense",
    brand: "Issey Miyake",
    name: "L'Eau d'Issey Pour Homme Intense",
    gender: "men",
    category: "designer",
    family: "Древесно-пряный",
    noteTags: ["древесные", "свежие"],
    top: ["грейпфрут", "кипарис", "кардамон"],
    heart: ["синяя лилия", "жасмин", "корица"],
    base: ["пачули", "сандал", "амбра", "ветивер"],
    character: "насыщенный",
    description:
      "Вечерняя версия знаменитого «водного» аромата: цитрусовая свежесть переходит в тёплую пряность и глубокие древесные ноты.",
    volumes: [
      { ml: 75, price: 7900 },
      { ml: 125, price: 10900 },
    ],
    popularity: 70,
    image: "/images/issey-intense.jpg",
    gallery: ["/images/issey-intense.jpg"],
  },
  {
    slug: "joop-homme",
    brand: "JOOP!",
    name: "Homme",
    gender: "men",
    category: "designer",
    family: "Восточно-фужерный",
    noteTags: ["восточные", "гурманские"],
    top: ["апельсин", "бергамот", "кориандр"],
    heart: ["жасмин", "гелиотроп", "корица"],
    base: ["ваниль", "тонка", "пачули", "кожа"],
    character: "сладкий",
    description:
      "Легенда восьмидесятых: розовый флакон и мощный сладко-пряный шлейф. Аромат для тех, кто любит быть замеченным.",
    volumes: [
      { ml: 75, price: 5200 },
      { ml: 125, price: 7300 },
    ],
    popularity: 64,
    image: "/images/joop-homme.jpg",
    gallery: ["/images/joop-homme.jpg"],
  },
  {
    slug: "nina-ricci-lair-du-temps",
    brand: "Nina Ricci",
    name: "L'Air du Temps",
    gender: "women",
    category: "designer",
    family: "Цветочно-специевый",
    noteTags: ["цветочные", "свежие"],
    top: ["бергамот", "гвоздика"],
    heart: ["садовая роза", "жасмин", "флёрдоранж"],
    base: ["сандал", "мускус", "ирис"],
    character: "лёгкий",
    description:
      "Вечная классика 1948 года с двумя голубками на крышке: солнечный флёрдоранж, роза и мягкая пряность. Аромат-настроение «после дождя».",
    volumes: [
      { ml: 30, price: 6800 },
      { ml: 50, price: 9200 },
    ],
    popularity: 66,
    image: "/images/lair-du-temps.jpg",
    gallery: ["/images/lair-du-temps.jpg"],
  },
  {
    slug: "dolce-gabbana-the-one",
    brand: "Dolce&Gabbana",
    name: "The One for Men",
    gender: "men",
    category: "designer",
    family: "Восточно-пряный",
    noteTags: ["восточные", "гурманские"],
    top: ["кориандр", "базилик", "грейпфрут"],
    heart: ["кардамон", "имбирь", "табак"],
    base: ["кедр", "амбра", "лабданум"],
    character: "насыщенный",
    description:
      "Средиземноморская элегантность: тёплые специи, табак и амбра в золотом флаконе. Аромат-костюм: уместен всегда и везде.",
    volumes: [
      { ml: 50, price: 8200 },
      { ml: 100, price: 11500 },
    ],
    popularity: 81,
    image: "/images/the-one.jpg",
    gallery: ["/images/the-one.jpg"],
  },
  {
    slug: "dolce-gabbana-limperatrice",
    brand: "Dolce&Gabbana",
    name: "L'Impératrice 3",
    gender: "unisex",
    category: "designer",
    family: "Фруктово-цветочный",
    noteTags: ["свежие", "цветочные"],
    top: ["розовое яблоко", "цитрус", "арбуз"],
    heart: ["цикламен", "жасмин", "османтус"],
    base: ["мускус", "кипарис", "карамельное дерево"],
    character: "свежий",
    description:
      "Сочные фрукты и дуновение морского бриза в флаконе из «D&G Anthology». Лёгкий, летний, универсальный — на любой пол.",
    volumes: [
      { ml: 50, price: 6900 },
      { ml: 100, price: 9400 },
    ],
    popularity: 76,
    image: "/images/imperatrice.jpg",
    gallery: ["/images/imperatrice.jpg"],
  },
  {
    slug: "miu-miu-leau-rosee",
    brand: "Miu Miu",
    name: "L'Eau Rosée",
    gender: "women",
    category: "designer",
    family: "Цветочно-древесный",
    noteTags: ["цветочные", "свежие"],
    top: ["смородиновый бутон", "мандарин"],
    heart: ["пиони", "лилия"],
    base: ["белый кедр", "мускус"],
    character: "лёгкий",
    description:
      "Игривая свежесть в фирменном мателассé-флаконе: чёрная смородина, пиони и светлый кедр. Молодой, звонкий, весенний.",
    volumes: [
      { ml: 50, price: 8800 },
      { ml: 100, price: 11900 },
    ],
    popularity: 68,
    image: "/images/miu-miu.jpg",
    gallery: ["/images/miu-miu.jpg"],
  },
  {
    slug: "abercrombie-fitch-fierce",
    brand: "Abercrombie & Fitch",
    name: "Fierce",
    gender: "men",
    category: "designer",
    family: "Древесно-цитрусовый",
    noteTags: ["древесные", "цитрусовые"],
    top: ["лимон", "мандарин", "кардамон"],
    heart: ["жасмин", "розмарин"],
    base: ["сандал", "пачули", "ветивер", "кожа"],
    character: "свежий",
    description:
      "Фирменный аромат бренда с американского Восточного побережья: цитрусовый старт, пряное сердце и уверенная древесная база.",
    volumes: [
      { ml: 50, price: 6400 },
      { ml: 100, price: 8900 },
    ],
    popularity: 63,
    image: "/images/fierce.jpg",
    gallery: ["/images/fierce.jpg"],
  },
  {
    slug: "zara-seoul",
    brand: "Zara",
    name: "Seoul",
    gender: "unisex",
    category: "designer",
    family: "Свежий древесный",
    noteTags: ["свежие", "древесные"],
    top: ["бергамот", "зелёное яблоко"],
    heart: ["лаванда", "герань"],
    base: ["кедр", "мускус"],
    character: "свежий",
    description:
      "Городской минимализм из флакона-фляги: чистая свежесть, лёгкая лаванда и прозрачный кедр. Доступный и безусловный daily-вариант.",
    volumes: [
      { ml: 90, price: 3200 },
      { ml: 200, price: 4900 },
    ],
    popularity: 58,
    image: "/images/zara-duo.jpg",
    gallery: ["/images/zara-duo.jpg"],
  },

  // ---------- Нишевая парфюмерия ----------
  {
    slug: "kilian-smoke-for-the-soul",
    brand: "Kilian Paris",
    name: "Smoke for the Soul",
    gender: "unisex",
    category: "niche",
    family: "Древесно-восточный",
    noteTags: ["древесные", "восточные"],
    top: ["грейпфрут", "элеми"],
    heart: ["кедр", "ветивер", "кардамон"],
    base: ["дым", "бензоин", "ваниль", "пачули"],
    character: "глубокий",
    description:
      "Окутанный дымом аромат воспоминаний о лаосских храмах: смолистый кедр, сладкий бензоин и тёплая ваниль в чёрном флаконе-клатче.",
    volumes: [
      { ml: 30, price: 14600 },
      { ml: 50, price: 19800 },
    ],
    popularity: 82,
    image: "/images/kilian-smoke.jpg",
    gallery: ["/images/kilian-smoke.jpg"],
  },
  {
    slug: "serge-lutens-sa-majeste-la-rose",
    brand: "Serge Lutens",
    name: "Sa Majesté la Rose",
    gender: "unisex",
    category: "niche",
    family: "Цветочный (роза)",
    noteTags: ["цветочные"],
    top: ["роза", "гвоздика"],
    heart: ["болгарская роза", "белые цветы"],
    base: ["мед", "мускус", "сандал"],
    character: "насыщенный",
    description:
      "«Её Величество Роза» — монументальная моно-роза без приторности: медовые оттенки, восковые лепестки и королевская осанка.",
    volumes: [
      { ml: 50, price: 16400 },
      { ml: 100, price: 22600 },
    ],
    popularity: 78,
    image: "/images/serge-lutens.jpg",
    gallery: ["/images/serge-lutens.jpg"],
  },
  {
    slug: "annick-goutal-petite-cherie",
    brand: "Annick Goutal",
    name: "Petite Chérie",
    gender: "women",
    category: "niche",
    family: "Фруктово-цветочный",
    noteTags: ["гурманские", "цветочные"],
    top: ["груша", "розовый перец"],
    heart: ["роза", "жасмин", "фиалка"],
    base: ["ваниль", "мускус", "сандал"],
    character: "сладкий",
    description:
      "«Любимица» дома Goutal: спелая груша в сиропе, роза и ванильное кружево. Французская нежность в ретро-флаконе с золотой крышкой.",
    volumes: [
      { ml: 50, price: 13800 },
      { ml: 100, price: 18900 },
    ],
    popularity: 74,
    image: "/images/petite-cherie.jpg",
    gallery: ["/images/petite-cherie.jpg"],
  },
  {
    slug: "jul-et-mad-terrasse-a-saint-germain",
    brand: "Jul et Mad",
    name: "Terrasse à St-Germain",
    gender: "unisex",
    category: "niche",
    family: "Цветочно-цитрусовый",
    noteTags: ["цитрусовые", "цветочные", "свежие"],
    top: ["сицилийский лимон", "бергамот", "нероли"],
    heart: ["флёрдоранж", "жасмин", "петитгрейн"],
    base: ["белый мускус", "кедр", "амбра"],
    character: "свежий",
    description:
      "Парижская терраса весенним утром: сияющие цитрусы, флёрдоранж и чистейший мускус. Люксовая ниша ручной работы из Сен-Жермен.",
    volumes: [
      { ml: 50, price: 21600 },
      { ml: 100, price: 32400 },
    ],
    popularity: 59,
    image: "/images/niche-lineup.jpg",
    gallery: ["/images/niche-lineup.jpg"],
  },
  {
    slug: "karats-fire-in-the-dark",
    brand: "793 Karats",
    name: "Fire in the Dark",
    gender: "men",
    category: "niche",
    family: "Древесно-амбровый",
    noteTags: ["древесные", "восточные"],
    top: ["чёрный перец", "бергамот"],
    heart: ["уд", "кожа", "ирис"],
    base: ["амбра", "лабданум", "ваниль"],
    character: "глубокий",
    description:
      "Тлеющий уголь в ночи: дымный уд, мягкая кожа и тёплая амбра. Компактный чёрный флакон для тех, кто не боится темноты.",
    volumes: [
      { ml: 50, price: 12400 },
      { ml: 100, price: 17800 },
    ],
    popularity: 55,
    image: "/images/fire-noir.jpg",
    gallery: ["/images/fire-noir.jpg"],
  },
  {
    slug: "maison-elan-lumiere-blanche",
    brand: "Maison Élan",
    name: "Lumière Blanche",
    gender: "unisex",
    category: "niche",
    fictional: true,
    family: "Белый цветочно-древесный",
    noteTags: ["свежие", "цветочные", "древесные"],
    top: ["белый чай", "бергамот"],
    heart: ["флёрдоранж", "жасмин", "ирис"],
    base: ["белый кедр", "мускус", "сандал"],
    character: "лёгкий",
    description:
      "Фирменный аромат нашего бутика: утренний свет сквозь тюль — белый чай, флёрдоранж и мягкое свечение кедра. Собственная линейка ÉLAN PARFUM.",
    volumes: [
      { ml: 50, price: 9800 },
      { ml: 100, price: 14600 },
    ],
    popularity: 71,
    image: "/images/crystal-round.jpg",
    gallery: ["/images/crystal-round.jpg"],
  },
  {
    slug: "atelier-verre-figue-blanche",
    brand: "Atelier Verre",
    name: "Figue Blanche",
    gender: "unisex",
    category: "niche",
    fictional: true,
    family: "Зелёно-древесный",
    noteTags: ["древесные", "свежие"],
    top: ["инжирный лист", "лимон"],
    heart: ["инжир", "ирис", "кокосовая вода"],
    base: ["кедр", "белый мускус", "сандал"],
    character: "свежий",
    description:
      "Молочный инжир и тень средиземноморского сада: зелёная горчинка листа, сливочная мякоть плода и прохладный кедр.",
    volumes: [
      { ml: 50, price: 11200 },
      { ml: 100, price: 16400 },
    ],
    popularity: 67,
    image: "/images/marble-burgundy.jpg",
    gallery: ["/images/marble-burgundy.jpg"],
  },
  {
    slug: "atelier-verre-ambre-nomade",
    brand: "Atelier Verre",
    name: "Ambre Nomade",
    gender: "unisex",
    category: "niche",
    fictional: true,
    family: "Амброво-древесный",
    noteTags: ["восточные", "древесные"],
    top: ["шафран", "розовый перец"],
    heart: ["лабданум", "роза"],
    base: ["амбра", "уд", "ветивер"],
    character: "глубокий",
    description:
      "Караванный шлейф: пряный шафран, смолистый лабданум и тлеющая амбра. Аромат-путешествие из Марракеша в Стамбул.",
    volumes: [
      { ml: 50, price: 11800 },
      { ml: 100, price: 17200 },
    ],
    popularity: 62,
    image: "/images/marble-duo.jpg",
    gallery: ["/images/marble-duo.jpg"],
  },
  {
    slug: "bois-dombre-velours-diris",
    brand: "Bois d'Ombre",
    name: "Velours d'Iris",
    gender: "unisex",
    category: "niche",
    fictional: true,
    family: "Пудрово-древесный",
    noteTags: ["древесные", "цветочные"],
    top: ["бергамот", "кардамон"],
    heart: ["ирис", "фиалка", "жасмин"],
    base: ["сандал", "ваниль", "серая амбра"],
    character: "насыщенный",
    description:
      "Ирисовый бархат на тёмном дереве: прохладный корень фиалки, пудра и тлеющая амбра. Медленный, обволакивающий, вечерний.",
    volumes: [
      { ml: 50, price: 12600 },
      { ml: 100, price: 18400 },
    ],
    popularity: 57,
    image: "/images/blank-label.jpg",
    gallery: ["/images/blank-label.jpg"],
  },
  {
    slug: "solaire-fleur-doranger",
    brand: "Solaire",
    name: "Fleur d'Oranger 27",
    gender: "unisex",
    category: "niche",
    fictional: true,
    family: "Цветочно-цитрусовый",
    noteTags: ["цветочные", "цитрусовые", "свежие"],
    top: ["мандарин", "петитгрейн"],
    heart: ["флёрдоранж", "жасмин самбак"],
    base: ["белый мускус", "мед", "кедр"],
    character: "свежий",
    description:
      "Апрельский сад в разгар цветения: медовый флёрдоранж, звонкий мандарин и солнечный мускус. Номер 27 — адрес первого бутика дома.",
    volumes: [
      { ml: 50, price: 8600 },
      { ml: 100, price: 12800 },
    ],
    popularity: 65,
    image: "/images/orange-blossom.jpg",
    gallery: ["/images/orange-blossom.jpg"],
  },
  {
    slug: "solaire-ambre-dore",
    brand: "Solaire",
    name: "Ambre Doré",
    gender: "unisex",
    category: "niche",
    fictional: true,
    family: "Восточный",
    noteTags: ["восточные", "гурманские"],
    top: ["корица", "мандарин"],
    heart: ["лабданум", "роза", "жасмин"],
    base: ["амбра", "ваниль", "тонка", "пачули"],
    character: "сладкий",
    description:
      "Тёплый янтарь на закате: пряная корица, медовая роза и сладкая ваниль тонка. Комфортный аромат-плед для холодных месяцев.",
    volumes: [
      { ml: 50, price: 9200 },
      { ml: 100, price: 13400 },
    ],
    popularity: 60,
    image: "/images/amber-fabric.jpg",
    gallery: ["/images/amber-fabric.jpg"],
  },

  // ---------- Подарочные наборы и миниатюры ----------
  {
    slug: "maison-elan-coffret-vermeil",
    brand: "Maison Élan",
    name: "Coffret Vermeil, набор 3×15 мл",
    gender: "unisex",
    category: "set",
    fictional: true,
    family: "Три аромата дома",
    noteTags: ["цветочные", "древесные", "восточные"],
    top: ["бергамот", "инжирный лист"],
    heart: ["роза", "ирис", "флёрдоранж"],
    base: ["кедр", "амбра", "мускус"],
    character: "насыщенный",
    description:
      "Три гранёных флакона с золотыми крышками в подарочном футляре: Lumière Blanche, Figue Blanche и Ambre Nomade — вся коллекция дома в миниатюре.",
    volumes: [{ ml: 45, price: 14900 }],
    popularity: 69,
    image: "/images/vintage-gold.jpg",
    gallery: ["/images/vintage-gold.jpg", "/images/vintage-gold-rows.jpg"],
  },
  {
    slug: "lancome-miniatures-set",
    brand: "Lancôme",
    name: "Набор миниатюр, 5×5 мл",
    gender: "women",
    category: "set",
    family: "Коллекция культовых ароматов",
    noteTags: ["цветочные", "свежие", "гурманские"],
    top: ["бергамот", "цитрус"],
    heart: ["роза", "жасмин"],
    base: ["мускус", "ваниль"],
    character: "лёгкий",
    description:
      "Пять культовых ароматов дома Lancôme в дорожных миниатюрах — идеальный способ найти «свой» или подарить сразу целую коллекцию.",
    volumes: [{ ml: 25, price: 6900 }],
    popularity: 73,
    image: "/images/lancome-miniatures.jpg",
    gallery: ["/images/lancome-miniatures.jpg"],
  },
  {
    slug: "elan-selection-icons",
    brand: "Élan Selection",
    name: "Иконы стиля, набор 3×10 мл",
    gender: "unisex",
    category: "set",
    fictional: true,
    family: "Куриаторский набор бутика",
    noteTags: ["цветочные", "древесные", "свежие"],
    top: ["цитрус", "груша"],
    heart: ["жасмин", "роза", "фиалка"],
    base: ["мускус", "кедр", "амбра"],
    character: "насыщенный",
    description:
      "Авторская подборка ÉLAN PARFUM: три дизайнерских аромата разных домов в дорожном формате. Флаконы на фото — иллюстрация концепции набора.",
    volumes: [{ ml: 30, price: 8900 }],
    popularity: 66,
    image: "/images/trio-designer.jpg",
    gallery: ["/images/trio-designer.jpg"],
  },
  {
    slug: "maison-elan-rose-facette-mini",
    brand: "Maison Élan",
    name: "Rose Facette, миниатюра 10 мл",
    gender: "women",
    category: "set",
    fictional: true,
    family: "Цветочно-фруктовый",
    noteTags: ["цветочные", "гурманские"],
    top: ["груша", "мандарин"],
    heart: ["роза", "пиони"],
    base: ["мускус", "ваниль"],
    character: "сладкий",
    description:
      "Гранёная миниатюра 10 мл с розово-золотым переливом — карманный формат аромата Rose Facette и изящный подарок без повода.",
    volumes: [{ ml: 10, price: 3400 }],
    popularity: 54,
    image: "/images/faceted-mini.jpg",
    gallery: ["/images/faceted-mini.jpg"],
  },
  {
    slug: "maison-elan-coffret-decouverte",
    brand: "Maison Élan",
    name: "Coffret Découverte, набор 3×20 мл",
    gender: "unisex",
    category: "set",
    fictional: true,
    family: "Открытие коллекции",
    noteTags: ["свежие", "цветочные", "древесные"],
    top: ["лимон", "белый чай"],
    heart: ["жасмин", "флёрдоранж"],
    base: ["кедр", "мускус"],
    character: "свежий",
    description:
      "Стеклянный сервировочный набор из трёх флаконов ручной работы — знакомство с собственной линейкой ÉLAN PARFUM в подарочной упаковке.",
    volumes: [{ ml: 60, price: 12900 }],
    popularity: 52,
    image: "/images/classic-trio.jpg",
    gallery: ["/images/classic-trio.jpg"],
  },
  {
    slug: "maison-elan-santal-voyage",
    brand: "Maison Élan",
    name: "Santal Voyage",
    gender: "unisex",
    category: "niche",
    fictional: true,
    family: "Древесный (сандал)",
    noteTags: ["древесные", "восточные"],
    top: ["кардамон", "бергамот"],
    heart: ["сандал", "кедр", "лаванда"],
    base: ["ветивер", "мускус", "амбра"],
    character: "глубокий",
    description:
      "Кремовый сандал и тёплая амбра — аромат долгого путешествия. Второй бестселлер собственной линейки после Lumière Blanche.",
    volumes: [
      { ml: 50, price: 10400 },
      { ml: 100, price: 15200 },
    ],
    popularity: 64,
    image: "/images/flatlay-fur.jpg",
    gallery: ["/images/flatlay-fur.jpg"],
  },
];

// ---------- Вспомогательные функции ----------

export const brands: string[] = Array.from(new Set(products.map((p) => p.brand))).sort((a, b) =>
  a.localeCompare(b, "ru"),
);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function minPrice(p: Product): number {
  return Math.min(...p.volumes.map((v) => v.price));
}

export function maxPrice(p: Product): number {
  return Math.max(...p.volumes.map((v) => v.price));
}

export function priceRange(): [number, number] {
  return [Math.min(...products.map(minPrice)), Math.max(...products.map(maxPrice))];
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

export function relatedProducts(p: Product, count = 4): Product[] {
  const scored = products
    .filter((x) => x.slug !== p.slug)
    .map((x) => {
      let score = 0;
      if (x.brand === p.brand) score += 3;
      if (x.gender === p.gender) score += 2;
      if (x.category === p.category) score += 2;
      if (x.family === p.family) score += 3;
      score += x.noteTags.filter((t) => p.noteTags.includes(t)).length * 2;
      score += x.popularity / 50;
      return { x, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.x);
}

export interface FinderAnswers {
  gender: Gender | null;
  noteTags: string[];
  character: string | null;
}

export function findByAnswers(answers: FinderAnswers): Product[] {
  return products
    .filter((p) => p.category !== "set")
    .map((p) => {
      let score = 0;
      if (answers.gender && p.gender === answers.gender) score += 4;
      else if (answers.gender && p.gender === "unisex") score += 2;
      if (answers.noteTags.length) {
        score += p.noteTags.filter((t) => answers.noteTags.includes(t)).length * 3;
      }
      if (answers.character && p.character === answers.character) score += 4;
      return { p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.p.popularity - a.p.popularity)
    .slice(0, 6)
    .map((s) => s.p);
}
