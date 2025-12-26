import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { DiningOptions } from '@/entities';

export default function DiningPage() {
  const [diningOptions, setDiningOptions] = useState<DiningOptions[]>([]);
  const [selectedDining, setSelectedDining] = useState<DiningOptions | null>(null);

  useEffect(() => {
    const fetchDining = async () => {
      const { items } = await BaseCrudService.getAll<DiningOptions>('diningoptions');
      setDiningOptions(items);
    };

    fetchDining();
  }, []);

  const formatTime = (time: any) => {
    if (!time) return '';
    // Handle time format from CMS
    if (typeof time === 'string') return time;
    return time;
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
            Dining Options
          </h1>
          <p className="font-paragraph text-xl max-w-3xl leading-relaxed">
            Savor exceptional cuisine without leaving the comfort of our hotel. From casual bites to refined dining experiences, we offer culinary options to suit every palate.
          </p>
        </motion.div>
      </section>

      {/* Dining Options Listing */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pb-24">
        <div className="space-y-20">
          {diningOptions.map((dining, index) => (
            <motion.article
              key={dining._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-t border-primary/10 pt-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Image */}
                <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  {dining.mainImage && (
                    <div className="h-[500px] overflow-hidden">
                      <Image
                        src={dining.mainImage}
                        alt={dining.name || 'Dining option'}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        width={800}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h2 className="font-heading text-4xl lg:text-5xl mb-4 tracking-tight">
                    {dining.name}
                  </h2>
                  
                  {dining.cuisineType && (
                    <p className="font-paragraph text-lg mb-6 opacity-80">
                      {dining.cuisineType}
                    </p>
                  )}

                  <p className="font-paragraph text-lg mb-8 leading-relaxed">
                    {dining.description}
                  </p>

                  {/* Dining Details */}
                  <div className="space-y-4 mb-8">
                    {(dining.openingTime || dining.closingTime) && (
                      <div className="flex items-start gap-4">
                        <Clock size={24} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-heading text-lg mb-1 tracking-wider">Hours</h3>
                          <p className="font-paragraph text-base">
                            {formatTime(dining.openingTime)} - {formatTime(dining.closingTime)}
                          </p>
                        </div>
                      </div>
                    )}

                    {dining.isReservationsRequired !== undefined && (
                      <div className="flex items-start gap-4">
                        <CheckCircle2 size={24} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-heading text-lg mb-1 tracking-wider">Reservations</h3>
                          <p className="font-paragraph text-base">
                            {dining.isReservationsRequired ? 'Required' : 'Not Required'}
                          </p>
                        </div>
                      </div>
                    )}

                    {dining.menuUrl && (
                      <div className="flex items-start gap-4">
                        <ExternalLink size={24} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-heading text-lg mb-1 tracking-wider">Menu</h3>
                          <a
                            href={dining.menuUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-paragraph text-base underline hover:opacity-60 transition-opacity"
                          >
                            View Full Menu
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedDining(dining)}
                    className="inline-block font-paragraph text-base text-primary border border-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-colors self-start"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Dining Details Modal */}
      {selectedDining && (
        <div
          className="fixed inset-0 bg-primary/80 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedDining(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-background max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedDining.mainImage && (
              <div className="h-96 overflow-hidden">
                <Image
                  src={selectedDining.mainImage}
                  alt={selectedDining.name || 'Dining option'}
                  className="w-full h-full object-cover"
                  width={1000}
                />
              </div>
            )}
            
            <div className="p-8 lg:p-12">
              <h2 className="font-heading text-4xl lg:text-5xl mb-4 tracking-tight">
                {selectedDining.name}
              </h2>
              
              {selectedDining.cuisineType && (
                <p className="font-paragraph text-xl mb-6 opacity-80">
                  {selectedDining.cuisineType}
                </p>
              )}

              <p className="font-paragraph text-lg mb-8 leading-relaxed">
                {selectedDining.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {(selectedDining.openingTime || selectedDining.closingTime) && (
                  <div>
                    <h3 className="font-heading text-lg mb-2 tracking-wider">Hours</h3>
                    <p className="font-paragraph text-base">
                      {formatTime(selectedDining.openingTime)} - {formatTime(selectedDining.closingTime)}
                    </p>
                  </div>
                )}

                {selectedDining.isReservationsRequired !== undefined && (
                  <div>
                    <h3 className="font-heading text-lg mb-2 tracking-wider">Reservations</h3>
                    <p className="font-paragraph text-base">
                      {selectedDining.isReservationsRequired ? 'Required' : 'Not Required'}
                    </p>
                  </div>
                )}
              </div>

              {selectedDining.menuUrl && (
                <div className="border-t border-primary/10 pt-6 mb-8">
                  <a
                    href={selectedDining.menuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-paragraph text-base underline hover:opacity-60 transition-opacity"
                  >
                    <ExternalLink size={20} />
                    View Full Menu
                  </a>
                </div>
              )}

              <button
                onClick={() => setSelectedDining(null)}
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
