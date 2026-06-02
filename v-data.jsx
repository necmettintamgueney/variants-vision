/* v-data.jsx — Real Lay's catalogue used by the network + phone PDP.
   Shows that "Lay's Potato Chips" fans out across multiple emergent
   dimensions: Style/cut, Flavor, Pack size — plus attributes read from
   the pack image. */

const LAYS = {
  brand: "Lay's",
  category: "Potato Chips",
  unit: "€",
  // dimensions that emerge from the catalogue (not a predefined schema)
  dims: {
    style: ["Classic", "Baked", "Max", "Oven Baked"],
    flavor: ["Original", "Salted", "Salt & Vinegar", "Smoky Paprika", "Red Sweet Chilli", "Yoghurt & Herbs"],
    size: ["110 g", "150 g", "175 g", "177 g", "185 g"],
  },
  products: [
    {
      id: "classic", name: "Classic", style: "Classic", flavor: "Original",
      size: "175 g", price: "2.20", img: "images/classic.png", cut: "Original cut",
      attrs: [{ t: "Gluten free", tone: "green" }, { t: "No artificial flavors", tone: "green" }],
    },
    {
      id: "salted", name: "Salted", style: "Classic", flavor: "Salted",
      size: "150 g", price: "2.20", img: "images/salted.png", cut: "Original cut",
      attrs: [{ t: "Sea salt", tone: "blue" }],
    },
    {
      id: "saltvinegar", name: "Salt & Vinegar", style: "Classic", flavor: "Salt & Vinegar",
      size: "150 g", price: "2.30", img: "images/salt-vinegar.png", cut: "Original cut",
      attrs: [{ t: "Nutri-Score D", tone: "amber", img: true }, { t: "100% best ingredients", tone: "blue" }],
    },
    {
      id: "baked", name: "Baked — Original", style: "Baked", flavor: "Original",
      size: "177 g", price: "2.60", img: "images/baked.png", cut: "Baked, not fried",
      attrs: [{ t: "50% less fat", tone: "green", img: true }, { t: "Made with olive oil", tone: "green", img: true }],
    },
    {
      id: "maxpaprika", name: "Max Smoky Paprika", style: "Max", flavor: "Smoky Paprika",
      size: "185 g", price: "2.90", img: "images/max-paprika.png", cut: "Deep ridged",
      attrs: [{ t: "Deep ridged", tone: "blue", img: true }, { t: "Big bag", tone: "ink" }],
    },
    {
      id: "maxchilli", name: "Max Red Sweet Chilli", style: "Max", flavor: "Red Sweet Chilli",
      size: "185 g", price: "2.90", img: "images/max-chilli.png", cut: "Deep ridged", isNew: true,
      attrs: [{ t: "Deep ridged", tone: "blue", img: true }, { t: "Nutri-Score", tone: "amber", img: true }],
    },
    {
      id: "ovenyoghurt", name: "Oven Baked — Yoghurt & Herbs", style: "Oven Baked", flavor: "Yoghurt & Herbs",
      size: "110 g", price: "2.40", img: "images/oven-yoghurt.png", cut: "Oven baked", isNew: true,
      attrs: [{ t: "50% less fat", tone: "green", img: true }, { t: "New recipe", tone: "purple" }],
    },
  ],
};

LAYS.priceLow = "2.20";
LAYS.priceHigh = "2.90";
function layById(id) { return LAYS.products.find((p) => p.id === id); }

Object.assign(window, { LAYS, layById });
