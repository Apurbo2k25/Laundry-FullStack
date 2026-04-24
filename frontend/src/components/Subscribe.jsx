import React from "react";

function Subscribe() {
  return (
    <section className="w-full bg-blue-500 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around items-center gap-8">
        <h2 className=" w-100 text-3xl md:text-4xl font-bold text-white text-center">
          Subscribe To Our Newsletter
        </h2>

        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Full name"
              className="border rounded p-2 bg-white text-black outline-none w-64"
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded p-2 bg-white text-black outline-none w-64"
            />
          </div>

          <button className="bg-white text-blue-500 px-14 py-2.5 text-xl font-semibold rounded w-full md:w-fit hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}

export default Subscribe;
