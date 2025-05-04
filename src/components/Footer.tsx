import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-6 mt-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="font-bold text-xl text-black">B</span>
              </div>
              <span className="font-bold text-lg">Blinkit</span>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              Blinkit is India's fastest online shopping platform. Get groceries, fruits & vegetables, and other essentials delivered to your doorstep in minutes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-base mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/fruits-vegetables" className="text-text-secondary text-sm hover:text-black transition-colors">
                  Fruits & Vegetables
                </Link>
              </li>
              <li>
                <Link to="/category/dairy-breakfast" className="text-text-secondary text-sm hover:text-black transition-colors">
                  Dairy & Breakfast
                </Link>
              </li>
              <li>
                <Link to="/category/snacks-munchies" className="text-text-secondary text-sm hover:text-black transition-colors">
                  Snacks & Munchies
                </Link>
              </li>
              <li>
                <Link to="/category/atta-rice-dal" className="text-text-secondary text-sm hover:text-black transition-colors">
                  Atta, Rice & Dal
                </Link>
              </li>
              <li>
                <Link to="/category/cold-drinks-juices" className="text-text-secondary text-sm hover:text-black transition-colors">
                  Cold Drinks & Juices
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-text-secondary text-sm hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-text-secondary text-sm hover:text-black transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-text-secondary text-sm hover:text-black transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-text-secondary text-sm hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-text-secondary text-sm hover:text-black transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Phone size={18} className="text-text-secondary mt-0.5" />
                <span className="text-text-secondary text-sm">+91 1800-XXX-XXXX</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={18} className="text-text-secondary mt-0.5" />
                <span className="text-text-secondary text-sm">support@blinkit.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Download App</h4>
              <div className="flex space-x-2">
                <a href="#" className="block w-24">
                  <img
                    src="https://blinkit.com/f2d0b4d348c06a3bd97f.png"
                    alt="Download on App Store"
                    className="h-auto w-full"
                  />
                </a>
                <a href="#" className="block w-24">
                  <img
                    src="https://blinkit.com/d0c5156710e9f4992773.png"
                    alt="Get it on Google Play"
                    className="h-auto w-full"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-text-secondary text-xs text-center">
            © 2025 Blinkit Clone. All rights reserved. This is a demo project and not affiliated with the actual Blinkit service.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;