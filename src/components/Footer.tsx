import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-footerbackground text-primary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="font-heading text-xl mb-6 tracking-wider">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <p className="font-paragraph text-sm">
                  1000 Lakeshore Parkway<br />
                  Birmingham, AL 35209
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" />
                <p className="font-paragraph text-sm">(205) 290-0600</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0" />
                <p className="font-paragraph text-sm">info@druryhotels.com</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-heading text-xl mb-6 tracking-wider">Front Desk Hours</h3>
            <div className="flex items-start gap-3">
              <Clock size={20} className="mt-1 flex-shrink-0" />
              <p className="font-paragraph text-sm">24 Hours Daily</p>
            </div>
          </div>

          {/* Check-In/Out */}
          <div>
            <h3 className="font-heading text-xl mb-6 tracking-wider">Check-In & Check-Out</h3>
            <div className="space-y-3">
              <p className="font-paragraph text-sm">
                <span className="font-semibold">Check-In:</span> 3:00 PM
              </p>
              <p className="font-paragraph text-sm">
                <span className="font-semibold">Check-Out:</span> 11:00 AM
              </p>
            </div>
          </div>

          {/* Hotel Name */}
          <div>
            <h3 className="font-heading text-2xl mb-4 tracking-wider">
              DRURY INN & SUITES
            </h3>
            <p className="font-paragraph text-sm">
              Birmingham Lakeshore Drive
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="font-paragraph text-sm text-center">
            © {new Date().getFullYear()} Drury Inn & Suites Birmingham Lakeshore Drive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
