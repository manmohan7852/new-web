import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { HotelAmenities } from '@/entities';

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<HotelAmenities[]>([]);
  const [amenitiesByCategory, setAmenitiesByCategory] = useState<Record<string, HotelAmenities[]>>({});

  useEffect(() => {
    const fetchAmenities = async () => {
      const { items } = await BaseCrudService.getAll<HotelAmenities>('hotelamenities');
      setAmenities(items);

      // Group by category
      const grouped = items.reduce((acc, amenity) => {
        const category = amenity.category || 'Other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(amenity);
        return acc;
      }, {} as Record<string, HotelAmenities[]>);

      setAmenitiesByCategory(grouped);
    };

    fetchAmenities();
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
            Amenities
          </h1>
          <p className="font-paragraph text-xl max-w-3xl leading-relaxed">
            Discover the comprehensive range of services and facilities designed to enhance your comfort and convenience throughout your stay.
          </p>
        </motion.div>
      </section>

      {/* Amenities by Category */}
      {Object.keys(amenitiesByCategory).length > 0 ? (
        Object.entries(amenitiesByCategory).map(([category, categoryAmenities], categoryIndex) => (
          <section
            key={category}
            className={`w-full ${categoryIndex % 2 === 0 ? 'bg-background' : 'bg-secondary border-y border-primary/10'}`}
          >
            <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-20">
              <h2 className="font-heading text-4xl mb-12 tracking-tight">
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {categoryAmenities.map((amenity, index) => (
                  <motion.div
                    key={amenity._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    {amenity.amenityImage && (
                      <div className="mb-6 h-72 overflow-hidden">
                        <Image
                          src={amenity.amenityImage}
                          alt={amenity.amenityName || 'Hotel amenity'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          width={400}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3 mb-3">
                      {amenity.isAvailable && (
                        <CheckCircle2 size={20} className="text-primary mt-1 flex-shrink-0" />
                      )}
                      <h3 className="font-heading text-2xl tracking-wider">
                        {amenity.amenityName}
                      </h3>
                    </div>
                    
                    <p className="font-paragraph text-base leading-relaxed">
                      {amenity.description}
                    </p>

                    {!amenity.isAvailable && (
                      <p className="font-paragraph text-sm mt-2 opacity-60">
                        Currently unavailable
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))
      ) : (
        /* All Amenities in One Section if no categories */
        <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                {amenity.amenityImage && (
                  <div className="mb-6 h-72 overflow-hidden">
                    <Image
                      src={amenity.amenityImage}
                      alt={amenity.amenityName || 'Hotel amenity'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={400}
                    />
                  </div>
                )}
                
                <div className="flex items-start gap-3 mb-3">
                  {amenity.isAvailable && (
                    <CheckCircle2 size={20} className="text-primary mt-1 flex-shrink-0" />
                  )}
                  <h3 className="font-heading text-2xl tracking-wider">
                    {amenity.amenityName}
                  </h3>
                </div>
                
                <p className="font-paragraph text-base leading-relaxed">
                  {amenity.description}
                </p>

                {!amenity.isAvailable && (
                  <p className="font-paragraph text-sm mt-2 opacity-60">
                    Currently unavailable
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
