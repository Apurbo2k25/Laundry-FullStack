import machineImg from "../assets/washing-machine.png";

const Hero = ({ onBookClick }) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-6 md:p-20 bg-gray-50 min-h-[80vh]">
      {/* Text Content - Removed ml-20 for mobile, applied md:ml-20 for desktop */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left md:ml-20">
        <h1 className="text-3xl md:text-6xl font-bold text-gray-800 max-w-xl">
          Revitalize Your Clothes with Experts.
          <span className="block md:inline text-blue-600">
            {" "}
            Laundry Services!
          </span>
        </h1>

        <p className="text-gray-600 mt-5 max-w-md font-semibold text-sm md:text-base px-4 md:px-0">
          From premium dry cleaning to swift wash and fold, we deliver care and
          convenience. Schedule a pickup and rediscover the freshness of your
          clothes today!
        </p>

        <button
          onClick={onBookClick}
          className="mt-8 bg-blue-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-fit"
        >
          Book a Service Today
        </button>
      </div>

      {/* Image Section - Centered on mobile if you choose to show it, or hidden as you have it */}
      <div className="hidden md:block md:w-1/2 mt-10 md:mt-0">
        <img
          src={machineImg}
          alt="Laundry"
          className="w-full max-w-md md:max-w-125 h-auto object-contain mx-auto"
        />
      </div>
    </section>
  );
};

export default Hero;
