import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-primary/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
        <Link to="/" className="font-heading text-xl lg:text-2xl tracking-wider text-primary">
          DRURY INN & SUITES
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/rooms" className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity">
            Rooms
          </Link>
          <Link to="/amenities" className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity">
            Amenities
          </Link>
          <Link to="/dining" className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity">
            Dining
          </Link>
          <Link to="/attractions" className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity">
            Attractions
          </Link>
          <Link to="/offers" className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity">
            Offers
          </Link>
          <Link to="/policies" className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity">
            Policies
          </Link>
          <Link to="/ratings" className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity">
            Reviews
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-primary"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-background border-t border-primary/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link
              to="/rooms"
              className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Rooms
            </Link>
            <Link
              to="/amenities"
              className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Amenities
            </Link>
            <Link
              to="/dining"
              className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Dining
            </Link>
            <Link
              to="/attractions"
              className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Attractions
            </Link>
            <Link
              to="/offers"
              className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Offers
            </Link>
            <Link
              to="/policies"
              className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Policies
            </Link>
            <Link
              to="/ratings"
              className="font-paragraph text-base text-primary hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Reviews
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
