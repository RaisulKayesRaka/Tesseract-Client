import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useTheme } from "../providers/ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();
  return (
    <>
      <hr className="dark:border-gray-700" />
      <footer className="py-10">
        <div className="mx-auto grid w-11/12 max-w-screen-xl grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            {theme === "dark" ||
            (theme === "system" &&
              window.matchMedia("(prefers-color-scheme: dark)").matches) ? (
              <img
                src="/tesseract-white.png"
                alt="Tesseract Logo"
                className="h-12"
              />
            ) : (
              <img src="/tesseract.png" alt="Tesseract Logo" className="h-12" />
            )}
            <h2 className="text-2xl font-semibold">Tesseract</h2>
            <p>
              Your one-stop platform to discover and share innovative tech
              products.
            </p>
          </div>
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <p>Email: support@tesseract.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: Dhaka, Bangladesh</p>
          </div>
          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="mx-auto mt-8 w-11/12 max-w-screen-xl border-t pt-4 text-center dark:border-gray-700">
          <p>© {new Date().getFullYear()} Tesseract. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
