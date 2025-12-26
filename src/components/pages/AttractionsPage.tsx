import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { NearbyAttractions } from '@/entities';

export default function AttractionsPage() {
  const [attractions, setAttractions] = useState<NearbyAttractions[]>([]);
  const [selectedAttraction, setSelectedAttraction] = useState<NearbyAttractions | null>(null);

  useEffect(() => {
    const fetchAttractions = async () => {
      const { items } = await BaseCrudService.getAll<NearbyAttractions>('nearbyattractions');
      setAttractions(items);
    };

    fetchAttractions();
  }, []);

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
            Nearby Attractions
          </h1>
          <p className="font-paragraph text-xl max-w-3xl leading-relaxed">
            Explore Birmingham's vibrant culture, history, and entertainment. Our prime location places you within easy reach of the city's most captivating destinations.
          </p>
        </motion.div>
      </section>

      {/* Attractions Grid */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {attractions.map((attraction, index) => (
            <motion.article
              key={attraction._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Image */}
              {attraction.attractionImage && (
                <div className="mb-6 h-96 overflow-hidden">
                  <Image
                    src={attraction.attractionImage}
                    alt={attraction.attractionName || 'Nearby attraction'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    width={700}
                  />
                </div>
              )}

              {/* Content */}
              <h2 className="font-heading text-3xl lg:text-4xl mb-4 tracking-tight">
                {attraction.attractionName}
              </h2>

              <p className="font-paragraph text-lg mb-6 leading-relaxed">
                {attraction.description}
              </p>

              {/* Details */}
              <div className="space-y-3 mb-6">
                {attraction.distanceFromHotel && (
                  <div className="flex items-start gap-3">
                    <Navigation size={20} className="text-primary mt-1 flex-shrink-0" />
                    <p className="font-paragraph text-base">
                      <span className="font-semibold">Distance:</span> {attraction.distanceFromHotel}
                    </p>
                  </div>
                )}

                {attraction.address && (
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                    <p className="font-paragraph text-base">
                      {attraction.address}
                    </p>
                  </div>
                )}

                {attraction.websiteUrl && (
                  <div className="flex items-start gap-3">
                    <ExternalLink size={20} className="text-primary mt-1 flex-shrink-0" />
                    <a
                      href={attraction.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-paragraph text-base underline hover:opacity-60 transition-opacity"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedAttraction(attraction)}
                className="inline-block font-paragraph text-base text-primary border border-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                View Details
              </button>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Attraction Details Modal */}
      {selectedAttraction && (
        <div
          className="fixed inset-0 bg-primary/80 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedAttraction(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-background max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedAttraction.attractionImage && (
              <div className="h-96 overflow-hidden">
                <Image
                  src={selectedAttraction.attractionImage}
                  alt={selectedAttraction.attractionName || 'Nearby attraction'}
                  className="w-full h-full object-cover"
                  width={1000}
                />
              </div>
            )}
            
            <div className="p-8 lg:p-12">
              <h2 className="font-heading text-4xl lg:text-5xl mb-6 tracking-tight">
                {selectedAttraction.attractionName}
              </h2>

              <p className="font-paragraph text-lg mb-8 leading-relaxed">
                {selectedAttraction.description}
              </p>

              <div className="grid grid-cols-1 gap-6 mb-8">
                {selectedAttraction.distanceFromHotel && (
                  <div>
                    <h3 className="font-heading text-lg mb-2 tracking-wider">Distance from Hotel</h3>
                    <p className="font-paragraph text-base">{selectedAttraction.distanceFromHotel}</p>
                  </div>
                )}

                {selectedAttraction.address && (
                  <div>
                    <h3 className="font-heading text-lg mb-2 tracking-wider">Address</h3>
                    <p className="font-paragraph text-base">{selectedAttraction.address}</p>
                  </div>
                )}

                {selectedAttraction.websiteUrl && (
                  <div>
                    <h3 className="font-heading text-lg mb-2 tracking-wider">Website</h3>
                    <a
                      href={selectedAttraction.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-paragraph text-base underline hover:opacity-60 transition-opacity inline-flex items-center gap-2"
                    >
                      <ExternalLink size={20} />
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedAttraction(null)}
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
