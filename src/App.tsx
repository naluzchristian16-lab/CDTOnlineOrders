import { useState } from "react";

export default function CoffeeOrderingSystem() {
  const generateOrderNumber = () => {
    const now = new Date();
  
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yy = String(now.getFullYear()).slice(-2);
  
    const datePart = `${dd}${mm}${yy}`;
  
    // get last used counter per day
    const storedDate = localStorage.getItem("order_date");
    let counter = parseInt(localStorage.getItem("order_counter") || "0");
  
    if (storedDate !== datePart) {
      counter = 1;
      localStorage.setItem("order_date", datePart);
    } else {
      counter += 1;
    }
  
    localStorage.setItem("order_counter", counter);
  
    const counterStr = String(counter).padStart(4, "0");
  
    return `Order#${datePart}${counterStr}`;
  };
  const EXTRA_SHOT_PRICE = 10;
type Size = {
  label: string;
  price: number;
};

type MenuItem = {
  name: string;
  category: string;
  price?: number;
  sizes?: Size[];
};

type CartItem = {
  label: string;
  price: number;
  qty: number;
};
  // ⚠️ SET YOUR TELEGRAM CREDENTIALS HERE
  const BOT_TOKEN = "8799637148:AAFuHNFjYp8w9l9nPrVEhb7n2ZQ60LE-hao";
  const CHAT_ID = "-5109746728";

  const menu: MenuItem[] = [
    // ===== HOT (no sizes) =====
    { name: "Hot Americano", price: 69, category: "Hot" },
    { name: "Hot Spanish Latte", price: 79, category: "Hot" },
    { name: "Hot Mocha", price: 79, category: "Hot" },
    { name: "Hot Caramel Macchiato", price: 89, category: "Hot" },
    { name: "Hot Dirty Matcha", price: 89, category: "Hot" },
    { name: "Hot Strawberry Dirty Matcha", price: 99, category: "Hot" },
    { name: "Hot Strawberry Mocha", price: 89, category: "Hot" },
    { name: "Hot Strawberry Latte", price: 89, category: "Hot" },
    { name: "Hot Matcha Latte", price: 79, category: "Hot" },
    { name: "Hot Strawberry Matcha", price: 89, category: "Hot" },
  
    // ===== ICED-COFFEE =====
    {
      name: "Iced Americano",
      category: "Iced-Coffee",
      sizes: [
        { label: "Malaki", price: 89 },
        { label: "Mas Malaki", price: 99 }
      ]
    },
    {
      name: "Iced Spanish Latte",
      category: "Iced-Coffee",
      sizes: [
        { label: "Malaki", price: 89 },
        { label: "Mas Malaki", price: 99 }
      ]
    },
    {
      name: "Iced Mocha",
      category: "Iced-Coffee",
      sizes: [
        { label: "Malaki", price: 89 },
        { label: "Mas Malaki", price: 99 }
      ]
    },
    {
      name: "Iced Caramel Macchiato",
      category: "Iced-Coffee",
      sizes: [
        { label: "Malaki", price: 99 },
        { label: "Mas Malaki", price: 109 }
      ]
    },
    {
      name: "Iced Dirty Matcha",
      category: "Iced-Coffee",
      sizes: [
        { label: "Malaki", price: 99 },
        { label: "Mas Malaki", price: 109 }
      ]
    },
    {
      name: "Iced Strawberry Dirty Matcha",
      category: "Iced-Coffee",
      sizes: [
        { label: "Malaki", price: 109 },
        { label: "Mas Malaki", price: 119 }
      ]
    },
    {
      name: "Iced Strawberry Mocha",
      category: "Iced-Coffee",
      sizes: [
        { label: "Malaki", price: 99 },
        { label: "Mas Malaki", price: 109 }
      ]
    },
    {
      name: "Iced Strawberry Latte",
      category: "Iced-Coffee",
      sizes: [
        { label: "Malaki", price: 99 },
        { label: "Mas Malaki", price: 109 }
      ]
    },
    {
      name: "Blueberry Matcha",
      category: "Non-Coffee",
      sizes: [
        { label: "Malaki", price: 99 },
        { label: "Mas Malaki", price: 109 }
      ]
    },
  
    // ===== OATSIDE SERIES =====
    {
      name: "Oatside Spanish Latte",
      category: "Oatside Series",
      sizes: [
        { label: "Malaki", price: 99 },
        { label: "Mas Malaki", price: 109 }
      ]
    },
    {
      name: "Oatside Matcha Latte",
      category: "Oatside Series",
      sizes: [
        { label: "Malaki", price: 99 },
        { label: "Mas Malaki", price: 109 }
      ]
    },
    {
      name: "Oatside Strawberry Matcha",
      category: "Oatside Series",
      sizes: [
        { label: "Malaki", price: 109 },
        { label: "Mas Malaki", price: 119 }
      ]
    },
    {
      name: "Oatside Strawberry Dirty Matcha",
      category: "Oatside Series",
      sizes: [
        { label: "Malaki", price: 119 },
        { label: "Mas Malaki", price: 129 }
      ]
    },
    {
      name: "Oatside Strawberry Latte",
      category: "Oatside Series",
      sizes: [
        { label: "Malaki", price: 109 },
        { label: "Mas Malaki", price: 119 }
      ]
    },
    {
      name: "Oatside Caramel Macchiato",
      category: "Oatside Series",
      sizes: [
        { label: "Malaki", price: 109 },
        { label: "Mas Malaki", price: 119 }
      ]
    },
    {
      name: "Oatside Dirty Matcha",
      category: "Oatside Series",
      sizes: [
        { label: "Malaki", price: 109 },
        { label: "Mas Malaki", price: 119 }
      ]
    },
  
    // ===== NON-COFFEE =====
    {
      name: "Matcha Latte",
      category: "Non-Coffee",
      sizes: [
        { label: "Malaki", price: 89 },
        { label: "Mas Malaki", price: 99 }
      ]
    },
    {
      name: "Strawberry Matcha",
      category: "Non-Coffee",
      sizes: [
        { label: "Malaki", price: 99 },
        { label: "Mas Malaki", price: 109 }
      ]
    },
    {
      name: "Strawberry Milk Drink",
      category: "Non-Coffee",
      sizes: [
        { label: "Malaki", price: 79 },
        { label: "Mas Malaki", price: 89 }
      ]
    },
    {
      name: "Blueberry Milk Drink",
      category: "Non-Coffee",
      sizes: [
        { label: "Malaki", price: 79 },
        { label: "Mas Malaki", price: 89 }
      ]
    },
    {
      name: "Strawberry Choco",
      category: "Non-Coffee",
      sizes: [
        { label: "Malaki", price: 78 },
        { label: "Mas Malaki", price: 89 }
      ]
    },
    {
      name: "Green Apple Soda",
      category: "Non-Coffee",
      sizes: [
        { label: "Malaki", price: 69 },
        { label: "Mas Malaki", price: 79 }
      ]
    },
    {
      name: "Blueberry Soda",
      category: "Non-Coffee",
      sizes: [
        { label: "Malaki", price: 69 },
        { label: "Mas Malaki", price: 79 }
      ]
    }
  ];
  const categories = ["Hot", "Iced-Coffee", "Oatside Series", "Non-Coffee"];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [extraShot, setExtraShot] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const addToCart = (item, size = null, addExtra = false) => {
    const baseName = size ? `${item.name} (${size.label})` : item.name;
    const label = addExtra ? `${baseName} + Extra Shot` : baseName;

    const basePrice = size ? size.price : item.price;
    const price = addExtra ? basePrice + EXTRA_SHOT_PRICE : basePrice;

    setCart((prev) => {
      const existing = prev.find((c) => c.label === label);
      if (existing) {
        return prev.map((c) =>
          c.label === label ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { label, price, qty: 1 }];
    });

    setActiveItem(null);
    setExtraShot(false);
  };

  const increase = (label) => {
    setCart((prev) =>
      prev.map((c) => (c.label === label ? { ...c, qty: c.qty + 1 } : c))
    );
  };

  const decrease = (label) => {
    setCart((prev) =>
      prev
        .map((c) => (c.label === label ? { ...c, qty: c.qty - 1 } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const remove = (label) => {
    setCart((prev) => prev.filter((c) => c.label !== label));
  };

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  const sendToTelegram = async (text) => {
    try {
      await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text,
          }),
        }
      );
    } catch (err) {
      console.error("Telegram error", err);
    }
  };

  const confirmOrder = async () => {
    if (!name || !address || cart.length === 0) return;
  
    const orderId = generateOrderNumber();
  
    const orderText = `🧾 ${orderId}\n☕ NEW ORDER\n\nName: ${name}\nAddress: ${address}\n\nItems:\n${cart
      .map((c) => `- ${c.label} x${c.qty} = ₱${c.price * c.qty}`)
      .join("\n")}\n\nTOTAL: ₱${total}`;
  
    await sendToTelegram(orderText);
  
    alert("Order sent!");
  
    setCart([]);
    setName("");
    setAddress("");
    setSelectedCategory(null);
    setActiveItem(null);
  };

  const currentMenu = selectedCategory
    ? menu.filter((m) => m.category === selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">

      <div className="mb-3 text-center">
  <h1 className="text-xl font-bold text-black">
  <img
  src="/CFDTLOGO.png"
  alt="Coffee D' Titos Logo"
  style={{ width: "100px", height: "100px", objectFit: "contain" }}
  className="mx-auto mb-1"
/>

<h1 className="text-xl font-bold text-black">
  Coffee D' Titos'
</h1>
  </h1>

  <p className="text-sm text-[#3b2a22] font-medium">
    San Jose City, Nueva Ecija
  </p>

  <p className="text-xs text-[#5a3d2e]">
    Online Orders
  </p>
</div>

        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* CATEGORY */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setSelectedCategory(c);
                setActiveItem(null);
                setExtraShot(false);
              }}
              className={`px-3 py-1 rounded-full ${
                selectedCategory === c ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-3 mb-4">
          {currentMenu.map((item) => (
            <div key={item.name} className="border p-3 rounded-xl bg-white">
              <button
                className="flex justify-between w-full"
                onClick={() => setActiveItem(item)}
              >
                <span>{item.name}</span>
              </button>

              {activeItem?.name === item.name && item.category !== "Non-Coffee" && (
                <label className="flex items-center gap-2 mt-2 text-sm">
                  <input
                    type="checkbox"
                    checked={extraShot}
                    onChange={() => setExtraShot(!extraShot)}
                  />
                  Extra Shot (+₱{EXTRA_SHOT_PRICE})
                </label>
              )}

              {activeItem?.name === item.name && item.sizes && (
                <div className="flex gap-2 mt-2">
                  {item.sizes.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => addToCart(item, s, extraShot)}
                      className="px-3 py-1 bg-black text-white rounded"
                    >
                      {s.label} - ₱{s.price}
                    </button>
                  ))}
                </div>
              )}

              {activeItem?.name === item.name && !item.sizes && (
                <button
                  onClick={() => addToCart(item, null, extraShot)}
                  className="mt-2 px-3 py-1 bg-black text-white rounded"
                >
                  Add
                </button>
              )}
            </div>
          ))}
        </div>

        {/* CART */}
        <div className="bg-white p-3 rounded-xl">
          <p className="font-bold mb-2">Cart</p>

          <div className="flex flex-col gap-2">
            {cart.map((c) => (
              <div
                key={c.label}
                className="flex justify-between items-center border p-2 rounded"
              >
                <div>
                  <p className="text-sm">{c.label}</p>
                  <p className="text-xs text-gray-500">
                    ₱{c.price} x {c.qty} = ₱{c.price * c.qty}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <button onClick={() => decrease(c.label)}>-</button>
                  <span>{c.qty}</span>
                  <button onClick={() => increase(c.label)}>+</button>
                  <button onClick={() => remove(c.label)} className="text-red-500">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="font-bold mt-3">Total: ₱{total}</p>

          <button
            onClick={confirmOrder}
            className="w-full mt-3 bg-green-600 text-white p-3 rounded-xl"
          >
            Confirm Order
          </button>
        </div>

      </div>
    </div>
  );
}
