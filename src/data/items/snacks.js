
export const snacks = [
  {
    id: 10,
    name: "French Fries",
    description: "Crispy golden fries with ketchup",
    price: 120,
    category: 4,
    tags: ["hot", "quick"],
    image: "french-fries.jpg",
    available: true,
    nutritionalInfo: {
      calories: 320,
      protein: "4g",
      carbs: "42g",
      fat: "16g",
    },
    allergens: [],
  },
  {
    id: 11,
    name: "Mozzarella Sticks",
    description: "Breaded mozzarella sticks with marinara sauce",
    price: 180,
    category: 4,
    tags: ["hot", "vegetarian"],
    image: "mozzarella-sticks.jpg",
    available: true,
    nutritionalInfo: {
      calories: 380,
      protein: "14g",
      carbs: "28g",
      fat: "24g",
    },
    allergens: ["dairy", "gluten"],
  },
];
