// Define cake objects
const cakes = [
  {
    name: "Juli Cake",
    image: "/static/pics/JuliCake.jpeg",
    price: 200,
    description: "A luxurious two-tiered cake with a design full of the class of a luxurious cake that includes precise flower sprinkles"
  },
  {
    name: "Jupiter Cake",
    image: "/static/pics/JupiterCake.jpeg",
    price: 300,
    description: "An asymmetrical four-tiered cake with a fancy sugar dough design and edible flowers."
  },
  {
    name: "Magic Garden Cake",
    image: "/static/pics/MagicGardenCake.jpeg",
    price: 200,
    description: "A two-tiered cake full of color and impressive edible flowers"
  },
  {
    name: "Nicole Cake",
    image: "/static/pics/Nicole.jpeg",
    price: 250,
    description: "A classic tiered cake with beautiful decorations"
  },
  {
    name: "Flora Cake",
    image: "/static/pics/FloraCake.jpeg",
    price: 270,
    description: "A two-story cake with dozens of flowers and details that will impress every guest at your party"
  },
  {
    name: "Yasmin Cake",
    image: "/static/pics/YasminCake.jpeg",
    price: 320,
    description: "A three-tiered cake with white flowers that will impress every guest at your party and keep it classy"
  },
  {
    name: "Decadent Delight Cake",
    image: "/static/pics/DecadentDelightCake.jpeg",
    price: 150,
    description: "A rich and decadent one-story chocolate cake, layered with smooth chocolate ganache and topped with a glossy chocolate glaze."
  },
  {
    name: "Cupcake Carnival",
    image: "/static/pics/CupcakeCarnival.jpeg",
    price: 60,
    description: "A delightful assortment of twelve cupcakes, each uniquely decorated with colorful frosting and sprinkles, perfect for any celebration."
  },
  {
    name: "Rainbow Sprinkle Cake",
    image: "/static/pics/RainbowSprinkleCake.jpeg",
    price: 140,
    description: "A vibrant one-story cake covered in a rainbow of sprinkles, making it a joyful and festive addition to any party."
  },
  {
    name: "Pretty in Pink Cake",
    image: "/static/pics/PrettyInPinkCake.jpeg",
    price: 130,
    description: "A charming one-story pink cake, adorned with delicate pink frosting and elegant piping, ideal for birthdays and special occasions."
  },
  {
    name: "Blue Blossom Cake",
    image: "/static/pics/BlueBlossomCake.jpeg",
    price: 140,
    description: "A serene one-story blue cake decorated with intricate white sugar flowers, creating a beautiful contrast and a touch of elegance."
  },
  {
    name: "Elegant Layers Cake",
    image: "/static/pics/ElegantLayersCake.jpeg",
    price: 350,
    description: "A magnificent three-story cake featuring elegant white decorations, including intricate piping and delicate sugar flowers, perfect for weddings and grand celebrations."
  },
  {
    name: "Floral Cascade Cake",
    image: "/static/pics/FloralCascadeCake.jpeg",
    price: 400,
    description: "A stunning three-story white cake adorned with colorful flowers cascading at the bottom, creating a vibrant and elegant look."
  },
  {
    name: "Blossoming Beauty Cake",
    image: "/static/pics/BlossomingBeautyCake.jpeg",
    price: 250,
    description: "A two-story cake featuring beautiful, intricately designed flowers, making it a perfect centerpiece for any special occasion."
  },
  {
    name: "Purple Delight Cake",
    image: "/static/pics/PurpleDelightCake.jpeg",
    price: 140,
    description: "A charming one-story purple cake with a smooth finish, perfect for adding a pop of color to any celebration."
  },
  {
    name: "Pink Heart Cake",
    image: "/static/pics/PinkHeartCake.jpeg",
    price: 120,
    description: "A delightful one-story pink heart-shaped cake, perfect for expressing love and affection on any special day."
  },
  {
    name: "Rose Elegance Cake",
    image: "/static/pics/RoseEleganceCake.jpeg",
    price: 280,
    description: "A sophisticated two-story white cake adorned with delicate white roses, exuding elegance and grace."
  },
  {
    name: "Majestic Tier Cake",
    image: "/static/pics/MajesticTierCake.jpeg",
    price: 500,
    description: "A magnificent five-story white cake, perfect for grand celebrations, featuring intricate designs and a timeless elegance."
  }
];

function createCakeItem(cake) {
  const cakeItem = document.createElement('div');
  cakeItem.className = 'cake-item';

  const cakeImage = document.createElement('img');
  cakeImage.src = cake.image;
  cakeImage.alt = cake.name;

  const cakeName = document.createElement('h3');
  cakeName.textContent = cake.name;

  const cakePrice = document.createElement('div');
  cakePrice.className = 'price';
  cakePrice.textContent = `$${cake.price}`;

  const customizeButton = document.createElement('button');
  customizeButton.textContent = 'Customize Cake';
  customizeButton.addEventListener('click', () => {
    // Store the cake details in sessionStorage
    sessionStorage.setItem('selectedCake', JSON.stringify(cake));
    // Redirect to the Flask route for cakeDesign
    window.location.href = '/cakeDesign';
  });

  cakeItem.appendChild(cakeImage);
  cakeItem.appendChild(cakeName);
  cakeItem.appendChild(cakePrice);
  cakeItem.appendChild(customizeButton);

  return cakeItem;
}

function renderCatalog() {
  const catalog = document.getElementById('cake-catalog');
  cakes.forEach(cake => {
    const cakeItem = createCakeItem(cake);
    catalog.appendChild(cakeItem);
  });
}

document.addEventListener('DOMContentLoaded', renderCatalog);
