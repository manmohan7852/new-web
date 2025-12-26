import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, FileText } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { SpecialOffers } from '@/entities';

export default function OffersPage() {
  const [offers, setOffers] = useState<SpecialOffers[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<SpecialOffers | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      const { items } = await BaseCrudService.getAll<SpecialOffers>('specialoffers');
      setOffers(items);
    };

    fetchOffers();
  }, []);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            Special Offers
          </h1>
          <p className="font-paragraph text-xl max-w-3xl leading-relaxed">
            Take advantage of our exclusive promotions and packages designed to enhance your Birmingham experience while providing exceptional value.
          </p>
        </motion.div>
      </section>

      {/* Offers Listing */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pb-24">
        <div className="space-y-20">
          {offers.map((offer, index) => (
            <motion.article
              key={offer._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-t border-primary/10 pt-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Image */}
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  {offer.offerImage && (
                    <div className="h-[500px] overflow-hidden">
                      <Image
                        src={offer.offerImage}
                        alt={offer.offerTitle || 'Special offer'}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        width={900}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`lg:col-span-5 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h2 className="font-heading text-4xl lg:text-5xl mb-6 tracking-tight">
                    {offer.offerTitle}
                  </h2>

                  <p className="font-paragraph text-lg mb-8 leading-relaxed">
                    {offer.offerDescription}
                  </p>

                  {/* Offer Details */}
                  <div className="space-y-4 mb-8">
                    {(offer.validFrom || offer.validUntil) && (
                      <div className="flex items-start gap-4">
                        <Calendar size={24} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-heading text-lg mb-1 tracking-wider">Valid Period</h3>
                          <p className="font-paragraph text-base">
                            {formatDate(offer.validFrom)} - {formatDate(offer.validUntil)}
                          </p>
                        </div>
                      </div>
                    )}

                    {offer.termsAndConditions && (
                      <div className="flex items-start gap-4">
                        <FileText size={24} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-heading text-lg mb-1 tracking-wider">Terms & Conditions</h3>
                          <p className="font-paragraph text-base line-clamp-3">
                            {offer.termsAndConditions}
                          </p>
                        </div>
                      </div>
                    )}

                    {offer.bookingUrl && (
                      <div className="flex items-start gap-4">
                        <ExternalLink size={24} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-heading text-lg mb-1 tracking-wider">Book Now</h3>
                          <a
                            href={offer.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-paragraph text-base underline hover:opacity-60 transition-opacity"
                          >
                            Reserve This Offer
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="inline-block font-paragraph text-base text-primary border border-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-colors self-start"
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Offer Details Modal */}
      {selectedOffer && (
        <div
          className="fixed inset-0 bg-primary/80 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedOffer(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-background max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedOffer.offerImage && (
              <div className="h-96 overflow-hidden">
                <Image
                  src={selectedOffer.offerImage}
                  alt={selectedOffer.offerTitle || 'Special offer'}
                  className="w-full h-full object-cover"
                  width={1000}
                />
              </div>
            )}
            
            <div className="p-8 lg:p-12">
              <h2 className="font-heading text-4xl lg:text-5xl mb-6 tracking-tight">
                {selectedOffer.offerTitle}
              </h2>

              <p className="font-paragraph text-lg mb-8 leading-relaxed">
                {selectedOffer.offerDescription}
              </p>

              <div className="space-y-6 mb-8">
                {(selectedOffer.validFrom || selectedOffer.validUntil) && (
                  <div>
                    <h3 className="font-heading text-lg mb-2 tracking-wider">Valid Period</h3>
                    <p className="font-paragraph text-base">
                      {formatDate(selectedOffer.validFrom)} - {formatDate(selectedOffer.validUntil)}
                    </p>
                  </div>
                )}

                {selectedOffer.termsAndConditions && (
                  <div>
                    <h3 className="font-heading text-lg mb-2 tracking-wider">Terms & Conditions</h3>
                    <p className="font-paragraph text-base leading-relaxed whitespace-pre-line">
                      {selectedOffer.termsAndConditions}
                    </p>
                  </div>
                )}

                {selectedOffer.bookingUrl && (
                  <div className="border-t border-primary/10 pt-6">
                    <a
                      href={selectedOffer.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-paragraph text-base text-primary border border-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ExternalLink size={20} />
                      Reserve This Offer
                    </a>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedOffer(null)}
                className="font-paragraph text-base text-primary border border-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
