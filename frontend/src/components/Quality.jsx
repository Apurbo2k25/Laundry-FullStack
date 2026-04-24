import premiumImg from "../assets/premium.png";
import supportImg from "../assets/support.png";
import deliveryImg from "../assets/delivery.png";
import priceImg from "../assets/price.png";

function Quality() {
  const qualities = [
    {
      title: "Premium Service",
      desc: "Elevate your wardrobe with our meticulous dry cleaning, ensuring garments look and feel as good as new.",
      img: premiumImg,
    },
    {
      title: "Quick Support",
      desc: "We're committed to providing prompt solutions to ensure your experience is smooth and worry-free.",
      img: supportImg,
    },
    {
      title: "Hassle Free Delivery",
      desc: "Enjoy seamless service with our convenient pickup and delivery options, tailored to your schedule.",
      img: deliveryImg,
    },
    {
      title: "Affordable Prices",
      desc: "Experience exceptional care without breaking the bank — our affordable prices make laundry day stress-free.",
      img: priceImg,
    },
  ];

  return (
    <section className="p-6 md:p-16 bg-gray-50 text-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {qualities.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-16 h-16 mx-auto mb-4 object-contain"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Quality;
