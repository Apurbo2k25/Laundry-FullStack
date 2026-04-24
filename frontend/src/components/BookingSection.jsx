import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { AlertCircle } from "lucide-react";
import infoIcon from "../assets/info.png";

// list of all available laundry services with id, name, and price
const servicesList = [
  { id: 1, name: "🧺 Wash & Fold", price: 100 },
  { id: 2, name: "👕 Dry Cleaning", price: 200 },
  { id: 3, name: "💨 Ironing", price: 30 },
  { id: 4, name: "🍷 Stain Removal", price: 500 },
  { id: 5, name: "👞 Leather Cleaning", price: 999 },
  { id: 6, name: "👗 Wedding Dress Cleaning", price: 2800 },
];

const BookingSection = () => {
  // cart state initialized from localStorage (to persist data after refresh)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("laundryCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  // saves cart data to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("laundryCart", JSON.stringify(cart));
  }, [cart]);

  // Calculate total using forEach
  let total = 0;
  cart.forEach((item) => {
    total = total + item.price;
  });

  const addToCart = (service) => {
    setCart([...cart, service]);
    setSubmitted(false);
  };

  const removeFromCart = (serviceId) => {
    // Filter out the item with the matching ID
    setCart(cart.filter((item) => item.id !== serviceId));
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (cart.length === 0) return alert("Add items first!");
    // Used post method for sending booking data to backend API
    try {
      await axios.post("http://localhost:5000/api/bookings", {
        ...formData,
        items: cart,
        totalPrice: total,
      });

      //Used Email.js to send email to the users
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
    }
  };

  return (
    <section className="flex flex-col md:flex-row p-5 gap-5 bg-[#EEEEEE]">
      {/* LEFT DIV: SERVICE SELECTION (*/}
      <div className="md:w-1/2 bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold mb-2 border-b pb-2">Our Services</h2>
        <div className="space-y-4">
          {/* // loop through each service to display in UI */}
          {servicesList.map((s) => {
            // Check if the service is already in the cart
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
                    /* Show ONLY Remove button if item is in cart */
                    <button
                      onClick={() => removeFromCart(s.id)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded font-bold text-sm hover:bg-red-600 transition"
                    >
                      Remove Now
                    </button>
                  ) : (
                    /* Show ONLY Add button if item is NOT in cart */
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
        <div
          className="mt-10 flex items-center justify-center gap-2 text-blue-600
         bg-blue-50 p-3 rounded-lg"
        >
          <p className="text-sm font-medium">
            Add items to the cart to proceed.
          </p>
          <AlertCircle size={18} />
        </div>
      </div>

      {/* RIGHT DIV: CART & BOOKING FORM (Grid Aligned) */}
      <div className="md:w-1/2 space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h3 className="text-2xl font-bold border-b pb-2 ">Selected Items</h3>

          <div className="grid grid-cols-4 font-semibold text-gray-700 border-b pb-2">
            <span>Sl No</span>
            <span className="col-span-2">Name</span>
            <span className="text-right">Price</span>
          </div>
          {/* // if cart is empty, show message and icon */}
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 ">
              <img src={infoIcon} alt="Empty" className="w-5 h-5 mb-2" />
              <p className="text-gray-500 font-medium">No items added.</p>
            </div>
          ) : (
            //  else show list of selected items in scrollable container
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
              className="w-full bg-green-600 text-white py-3 rounded-2xl font-bold hover:bg-green-700 shadow-lg mt-4 transition"
            >
              Book Now
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
