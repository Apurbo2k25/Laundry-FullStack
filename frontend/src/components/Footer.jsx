import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo1.png"; // Import the logo properly

const Footer = () => (
  <footer className="bg-[#EEEEEE] text-gray-800 p-10 font-semibold">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 sm:grid-cols-3 mt-15">
      <div>
        <img src={logo} alt="logo" className="h-25 w-30" />
      </div>

      <div>
        <h3 className="font-bold mb-4">About us</h3>
        <p className="text-sm font-normal">
          Laundrymark provides professional, eco-friendly garment care with
          door-to-door convenience.
        </p>
      </div>

      <div>
        <h3 className="font-bold mb-4">Important Links</h3>
        <ul className="text-sm space-y-2 font-normal">
          <li>
            <a href="#" className="hover:underline">
              About us
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact us
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-4">Contact</h3>
        <p className="text-sm font-normal">mail@site.com</p>
        <p className="text-sm font-normal">+91 91234 56780</p>
      </div>

      <div>
        <h3 className="font-bold mb-4">Follow Us</h3>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600 transition-colors">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="hover:text-pink-600 transition-colors">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </div>

    <div className="mt-10 pt-5 border-t border-gray-300 text-center text-sm font-normal">
      <p>© 2026 Laundrymark. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
