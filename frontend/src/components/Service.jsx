import React from "react";

function Service() {
  return (
    <section className="w-full bg-blue-500 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-around items-center gap-8 text-white text-center">
        {/* Title Container */}
        <div className="w-full lg:w-auto">
          <h2 className="text-2xl md:text-4xl font-bold">Our Achievements</h2>
        </div>

        {/* Stats Containers */}
        <div>
          <h2 className="text-xl md:text-3xl font-bold">15+</h2>
          <p className="text-sm md:text-base">Laundry Services</p>
        </div>

        <div>
          <h2 className="text-xl md:text-3xl font-bold">240+</h2>
          <p className="text-sm md:text-base">Happy Customers</p>
        </div>

        <div>
          <h2 className="text-xl md:text-3xl font-bold">2+</h2>
          <p className="text-sm md:text-base">Years Experience</p>
        </div>
      </div>
    </section>
  );
}

export default Service;
