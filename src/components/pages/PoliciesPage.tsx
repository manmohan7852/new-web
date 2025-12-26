import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto pt-32 pb-16 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-6xl lg:text-7xl mb-6 tracking-tight">
            Hotel Policies
          </h1>
          <p className="font-paragraph text-xl max-w-3xl leading-relaxed">
            Please review our policies to ensure a smooth and enjoyable stay. We're committed to providing clear guidelines that enhance your experience.
          </p>
        </motion.div>
      </section>

      {/* Pet Policy Section */}
      <section className="w-full bg-secondary border-t border-primary/10">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl lg:text-5xl mb-8 tracking-tight">
              Pet Policy
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="font-heading text-2xl mb-6 tracking-wider flex items-center gap-3">
                  <CheckCircle2 size={28} className="text-primary" />
                  We Welcome Pets
                </h3>
                <div className="space-y-4 font-paragraph text-lg leading-relaxed">
                  <p>
                    At Drury Inn & Suites Birmingham Lakeshore Drive, we understand that pets are part of the family. We're pleased to welcome your furry companions.
                  </p>
                  <ul className="space-y-3 ml-6">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Pets are allowed in designated rooms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Maximum of 2 pets per room</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Weight limit: 80 pounds per pet</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>No additional pet fees</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl mb-6 tracking-wider flex items-center gap-3">
                  <Info size={28} className="text-primary" />
                  Pet Guidelines
                </h3>
                <div className="space-y-4 font-paragraph text-lg leading-relaxed">
                  <p>
                    To ensure a comfortable stay for all guests, we ask that you follow these guidelines:
                  </p>
                  <ul className="space-y-3 ml-6">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Pets must be leashed in all public areas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Pets should not be left unattended in guest rooms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Guests are responsible for cleaning up after their pets</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Pets must be well-behaved and not disturb other guests</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* General Policies Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl lg:text-5xl mb-12 tracking-tight">
            General Policies
          </h2>

          <div className="space-y-12">
            {/* Check-In/Check-Out */}
            <div className="border-t border-primary/10 pt-8">
              <h3 className="font-heading text-2xl mb-4 tracking-wider">
                Check-In & Check-Out
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-paragraph text-lg">
                <div>
                  <p className="mb-2"><span className="font-semibold">Check-In Time:</span> 3:00 PM</p>
                  <p className="leading-relaxed opacity-80">
                    Early check-in is subject to availability. Please contact the front desk if you plan to arrive before 3:00 PM.
                  </p>
                </div>
                <div>
                  <p className="mb-2"><span className="font-semibold">Check-Out Time:</span> 11:00 AM</p>
                  <p className="leading-relaxed opacity-80">
                    Late check-out may be available upon request and is subject to availability and additional charges.
                  </p>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="border-t border-primary/10 pt-8">
              <h3 className="font-heading text-2xl mb-4 tracking-wider">
                Cancellation Policy
              </h3>
              <div className="font-paragraph text-lg leading-relaxed space-y-3">
                <p>
                  Reservations may be cancelled up to 6:00 PM on the day of arrival without penalty. Cancellations made after this time or no-shows will be charged for one night's stay plus applicable taxes.
                </p>
                <p>
                  Special event dates and group reservations may have different cancellation policies. Please review your confirmation for specific details.
                </p>
              </div>
            </div>

            {/* Payment Policy */}
            <div className="border-t border-primary/10 pt-8">
              <h3 className="font-heading text-2xl mb-4 tracking-wider">
                Payment Policy
              </h3>
              <div className="font-paragraph text-lg leading-relaxed space-y-3">
                <p>
                  We accept all major credit cards including Visa, MasterCard, American Express, and Discover. A valid credit card is required at check-in for incidental charges.
                </p>
                <p>
                  Payment is due at check-out. Guests may request an itemized receipt at the front desk.
                </p>
              </div>
            </div>

            {/* Smoking Policy */}
            <div className="border-t border-primary/10 pt-8">
              <h3 className="font-heading text-2xl mb-4 tracking-wider flex items-center gap-3">
                <XCircle size={24} className="text-primary" />
                Smoking Policy
              </h3>
              <div className="font-paragraph text-lg leading-relaxed">
                <p>
                  Drury Inn & Suites Birmingham Lakeshore Drive is a 100% smoke-free property. Smoking is not permitted in any guest rooms, public areas, or enclosed spaces. Designated outdoor smoking areas are available. Violation of this policy will result in a cleaning fee of $250.
                </p>
              </div>
            </div>

            {/* Parking */}
            <div className="border-t border-primary/10 pt-8">
              <h3 className="font-heading text-2xl mb-4 tracking-wider">
                Parking
              </h3>
              <div className="font-paragraph text-lg leading-relaxed">
                <p>
                  Complimentary self-parking is available for all registered guests. Oversized vehicles and RVs may require special parking arrangements. Please contact the front desk for assistance.
                </p>
              </div>
            </div>

            {/* Accessibility */}
            <div className="border-t border-primary/10 pt-8">
              <h3 className="font-heading text-2xl mb-4 tracking-wider">
                Accessibility
              </h3>
              <div className="font-paragraph text-lg leading-relaxed">
                <p>
                  We are committed to providing accessible accommodations for guests with disabilities. ADA-compliant rooms are available upon request. Please contact us in advance to ensure we can meet your specific needs.
                </p>
              </div>
            </div>

            {/* Guest Conduct */}
            <div className="border-t border-primary/10 pt-8">
              <h3 className="font-heading text-2xl mb-4 tracking-wider">
                Guest Conduct
              </h3>
              <div className="font-paragraph text-lg leading-relaxed space-y-3">
                <p>
                  We ask all guests to be respectful of other guests and hotel property. Excessive noise, disruptive behavior, or damage to hotel property may result in immediate eviction without refund.
                </p>
                <p>
                  The hotel reserves the right to refuse service to anyone who violates hotel policies or engages in illegal activities.
                </p>
              </div>
            </div>

            {/* Lost and Found */}
            <div className="border-t border-primary/10 pt-8">
              <h3 className="font-heading text-2xl mb-4 tracking-wider">
                Lost and Found
              </h3>
              <div className="font-paragraph text-lg leading-relaxed">
                <p>
                  Items left behind will be held for 30 days. Please contact the front desk at (205) 290-0600 to inquire about lost items. The hotel is not responsible for lost or stolen items.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
