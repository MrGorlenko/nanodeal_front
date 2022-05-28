export default {
  methods: {
    setCatColor(cat) {
      let bg = ''
      if (cat === 'Спорт') bg = 'category_sport'
      else if (cat === 'Рестораны') bg = 'category_restorant'
      else if (cat === 'Красота') bg = 'category_beauty'
      else if (cat === 'Здоровье') bg = 'category_health'
      else if (cat === 'Интерьер') bg = 'category_interior'
      else if (cat === 'Электроника') bg = 'category_electricity'
      else if (cat === 'Детские товары') bg = 'category_childrens'
      else if (cat === 'Путешествия') bg = 'category_travelling'
      else if (cat === 'Одежда') bg = 'category_clothes'
      else if (cat === 'Зоотовары') bg = 'category_zoo'
      else if (cat === 'Транспорт') bg = 'category_transport'
      else if (cat === 'Бизнес') bg = 'category_business'
      else if (cat === '18+') bg = 'category_18'
      else if (cat === 'Хобби') bg = 'category_hobbie'
      else if (cat === 'Онлайн сервисы') bg = 'category_online'
      else if (cat === 'Развлечения') bg = 'category_entertainment'
      else if (cat === 'Украшения') bg = 'category_jewerly'
      else if (cat === 'Книги') bg = 'category_books'
      else if (cat === 'Прочее') bg = 'category_other'
      return bg
    },
  },
}
