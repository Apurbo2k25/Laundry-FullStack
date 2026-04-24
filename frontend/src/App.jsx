import { useRef } from "react";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero-Section.jsx";
import Service from "./components/Service.jsx";
import BookingSection from "./components/BookingSection.jsx";
import Quality from "./components/Quality.jsx";
import Subscribe from "./components/Subscribe.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  // reference to booking section for scrolling
  const bookingRef = useRef(null);

  // function to scroll smoothly to booking section
  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans">
      {/* navbar at top */}
      <Navbar />

      {/* hero section with button to scroll to booking */}
      <Hero onBookClick={scrollToBooking} />

      {/* services section */}
      <Service />

      {/* booking section with attached ref */}
      <div ref={bookingRef}>
        <BookingSection />
      </div>

      {/* additional sections */}
      <Quality />
      <Subscribe />

      {/* footer */}
      <Footer />
    </div>
  );
}

export default App;
