import logo from "../assets/logo1.png";

const Navbar = ({ onServicesClick }) => {
  return (
    <nav className="flex justify-between items-center p-5 bg-white shadow-md sticky top-0 z-50">
      <div>
        <img src={logo} alt="logo" className="h-15 w-15 ml-15" />
      </div>

      <ul className="hidden md:flex gap-10 text-xl font-semibold">
        <li
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="relative group cursor-pointer"
        >
          Home
          <span className="absolute  w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li onClick={onServicesClick} className="relative group cursor-pointer">
          Services
          <span className="absolute lw-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative group cursor-pointer">
          About Us
          <span className="absolute  w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative group cursor-pointer">
          Contact Us
          <span className="absolute  w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </li>
      </ul>

      <button
        className="bg-blue-500 text-white font-semibold 
         py-2 px-3 text-xs rounded mr-2 
         md:py-3 md:px-6 md:text-base md:mr-5 
         hover:bg-blue-600 transition-all"
      >
        <span className="md:hidden">Apurbo</span>
        <span className="hidden md:inline">Apurbo Chakrobarty</span>
      </button>
    </nav>
  );
};

export default Navbar;
