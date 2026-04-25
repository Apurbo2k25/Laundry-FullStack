import { useState, useEffect } from "react";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import infoIcon from "../assets/info.png";

// List of services
const servicesList = [
  { id: 1, name: "🧺 Wash & Fold", price: 100 },
  { id: 2, name: "👕 Dry Cleaning", price: 200 },
  { id: 3, name: "💨 Ironing", price: 30 },
  { id: 4, name: "🍷 Stain Removal", price: 500 },
  { id: 5, name: "👞 Leather Cleaning", price: 999 },
  { id: 6, name: "👗 Wedding Dress Cleaning", price: 2800 },
];

const BookingSection = () => {
  // 1. Setup States
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("laundryCart");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Save cart to local storage so it doesn't disappear on refresh
  useEffect(() => {
    localStorage.setItem("laundryCart", JSON.stringify(cart));
  }, [cart]);

  // 3. Simple timer to hide the success message
  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  }, [submitted]);

  // 4. Calculate Total Price (Using a simple loop)
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price;
  }

  // 5. Functions for the Cart
  const addToCart = (service) => {
    setCart([...cart, service]);
    setSubmitted(false);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  // 6. Handle the Form Submit
  const handleBooking = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Please add at least one item to the cart!");
      return;
    }

    setIsLoading(true);

    try {
      // We only send data to our backend.
      // The backend will handle saving to MongoDB and sending emails.
      await axios.post(
        "https://laundry-fullstack-rwe6.onrender.com/api/bookings",
        {
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          items: cart,
          totalPrice: total,
        },
      );

      // If successful:
      setSubmitted(true);
      setCart([]); // Clear cart
      setFormData({ name: "", email: "", phone: "" }); // Clear form
    } catch (error) {
      console.error("Error:", error);
      alert("Backend is not responding. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row p-5 gap-5 bg-[#EEEEEE]">
      {/* LEFT SIDE: SERVICE LIST */}
      <div className="md:w-1/2 bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">
          Our Services
        </h2>
        <div className="space-y-4">
          {servicesList.map((s) => {
            const alreadyInCart = cart.some((item) => item.id === s.id);
            return (
              <div
                key={s.id}
                className="flex justify-between items-center border-b py-3"
              >
                <span className="font-medium text-gray-700">
                  {s.name} - ₹{s.price}
                </span>
                <div>
                  {alreadyInCart ? (
                    <button
                      onClick={() => removeFromCart(s.id)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded text-sm font-semibold"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(s)}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-semibold"
                    >
                      + Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE: CART AND FORM */}
      <div className="md:w-1/2 space-y-6">
        {/* Cart Box */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Selected Items</h3>
          {cart.length === 0 ? (
            <div className="text-center py-4">
              <img src={infoIcon} className="w-6 mx-auto mb-2" alt="info" />
              <p className="text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-gray-600 border-b border-dashed py-1"
                >
                  <span>
                    {index + 1}. {item.name}
                  </span>
                  <span className="font-bold text-gray-800">₹{item.price}</span>
                </div>
              ))}
              <div className="mt-4 pt-2 border-t flex justify-between font-bold text-blue-600 text-lg">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </div>
          )}
        </div>

        {/* Form Box */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Customer Details</h3>
          <form onSubmit={handleBooking} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border p-3 rounded-lg outline-none focus:border-blue-500"
            />
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-1/2 border p-3 rounded-lg outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-1/2 border p-3 rounded-lg outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl font-bold text-white transition ${
                isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isLoading ? "Processing..." : "Confirm Booking"}
            </button>

            {submitted && (
              <p className="text-center text-green-600 font-bold mt-2">
                Order placed! We will email you shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
