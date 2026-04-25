import { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { AlertCircle } from "lucide-react";
import infoIcon from "../assets/info.png";

const servicesList = [
  { id: 1, name: "🧺 Wash & Fold", price: 100 },
  { id: 2, name: "👕 Dry Cleaning", price: 200 },
  { id: 3, name: "💨 Ironing", price: 30 },
  { id: 4, name: "🍷 Stain Removal", price: 500 },
  { id: 5, name: "👞 Leather Cleaning", price: 999 },
  { id: 6, name: "👗 Wedding Dress Cleaning", price: 2800 },
];

const BookingSection = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("laundryCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("laundryCart", JSON.stringify(cart));
  }, [cart]);

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  let total = 0;
  cart.forEach((item) => {
    total = total + item.price;
  });

  const addToCart = (service) => {
    setCart([...cart, service]);
    setSubmitted(false);
  };

  const removeFromCart = (serviceId) => {
    setCart(cart.filter((item) => item.id !== serviceId));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Add items first!");

    setIsLoading(true);
    try {
      await axios.post(
        "https://laundry-fullstack-rwe6.onrender.com/api/bookings",
        {
          ...formData,
          items: cart,
          totalPrice: total,
        },
      );

      await emailjs.send(
        "service_7ox7w78",
        "template_i7pz2gq",
        {
          to_email: formData.email,
          from_name: formData.name,
          phone_number: formData.phone,
          total_price: total,
        },
        "xwI_hUO1Eg41LmmUz",
      );

      setSubmitted(true);
      setCart([]);
      setFormData({ name: "", email: "", phone: "" });
    } catch (err) {
      console.error("Booking Error:", err);
      alert("Something went wrong. Check if backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row p-5 gap-5 bg-[#EEEEEE]">
      {/* LEFT DIV: SERVICE SELECTION */}
      <div className="md:w-1/2 bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold mb-2 border-b pb-2">Our Services</h2>
        <div className="space-y-4">
          {servicesList.map((s) => {
            const isInCart = cart.some((item) => item.id === s.id);
            return (
              <div
                key={s.id}
                className="flex justify-between items-center border-b py-3"
              >
                <span className="font-semibold text-gray-700">
                  {s.name} - ₹{s.price}
                </span>
                <div>
                  {isInCart ? (
                    <button
                      onClick={() => removeFromCart(s.id)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded font-bold text-sm hover:bg-red-600 transition"
                    >
                      Remove Now
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(s)}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded font-bold text-sm hover:bg-blue-500 transition"
                    >
                      + Add Items
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex items-center justify-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
          <p className="text-sm font-medium">
            Add items to the cart to proceed.
          </p>
          <AlertCircle size={18} />
        </div>
      </div>

      {/* RIGHT DIV: CART & BOOKING FORM */}
      <div className="md:w-1/2 space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-bold border-b pb-2 ">Selected Items</h3>
          <div className="grid grid-cols-4 font-semibold text-gray-700 border-b pb-2">
            <span>Sl No</span>
            <span className="col-span-2">Name</span>
            <span className="text-right">Price</span>
          </div>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 ">
              <img src={infoIcon} alt="Empty" className="w-5 h-5 mb-2" />
              <p className="text-gray-500 font-medium">No items added.</p>
            </div>
          ) : (
            <div className="max-h-60 overflow-y-auto pr-2">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 py-2 text-gray-600 border-b border-dashed items-center"
                >
                  <span>{index + 1}</span>
                  <span className="col-span-2 truncate">{item.name}</span>
                  <span className="font-bold text-gray-800 text-right">
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 pt-4 border-t-2 border-gray-100 font-bold text-xl text-blue-700 flex justify-between">
            <span>Total Price:</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white p-10 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-bold mb-6">Book Now</h3>
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="font-semibold block mb-1">Full Name:</label>
              <input
                type="text"
                placeholder="John Doe"
                required
                value={formData.name}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1">Email:</label>
                <input
                  type="email"
                  placeholder="mail@site.com"
                  required
                  value={formData.email}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Phone:</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  required
                  value={formData.phone}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-2xl font-bold shadow-lg mt-4 transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isLoading ? "Sending... Please wait!" : "Book Now"}
            </button>

            {submitted && (
              <p className="mt-4 text-green-600 font-bold text-center animate-bounce">
                Thank you For Booking the Service. We will get back to you soon!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
