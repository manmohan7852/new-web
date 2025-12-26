import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Maximize2, Bed } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { RoomTypes } from '@/entities';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomTypes[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomTypes | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const { items } = await BaseCrudService.getAll<RoomTypes>('roomtypes');
      setRooms(items);
    };

    fetchRooms();
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
            Our Rooms
          </h1>
          <p className="font-paragraph text-xl max-w-3xl leading-relaxed">
            Each room is meticulously designed to provide comfort, functionality, and style. Choose the perfect space for your Birmingham stay.
          </p>
        </motion.div>
      </section>

      {/* Rooms Listing */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pb-24">
        <div className="space-y-20">
          {rooms.map((room, index) => (
            <motion.article
              key={room._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-t border-primary/10 pt-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Image */}
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  {room.roomImage && (
                    <div className="h-[500px] overflow-hidden">
                      <Image
                        src={room.roomImage}
                        alt={room.roomTypeName || 'Hotel room'}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        width={900}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`lg:col-span-5 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h2 className="font-heading text-4xl lg:text-5xl mb-6 tracking-tight">
                    {room.roomTypeName}
                  </h2>
                  
                  <p className="font-paragraph text-lg mb-8 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Room Details Grid */}
                  <div className="grid grid-cols-1 gap-6 mb-8">
                    {room.bedConfiguration && (
                      <div className="flex items-start gap-4">
                        <Bed size={24} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-heading text-lg mb-1 tracking-wider">Bed Configuration</h3>
                          <p className="font-paragraph text-base">{room.bedConfiguration}</p>
                        </div>
                      </div>
                    )}

                    {room.maxOccupancy && (
                      <div className="flex items-start gap-4">
                        <Users size={24} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-heading text-lg mb-1 tracking-wider">Maximum Occupancy</h3>
                          <p className="font-paragraph text-base">Up to {room.maxOccupancy} guests</p>
                        </div>
                      </div>
                    )}

                    {room.roomSize && (
                      <div className="flex items-start gap-4">
                        <Maximize2 size={24} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-heading text-lg mb-1 tracking-wider">Room Size</h3>
                          <p className="font-paragraph text-base">{room.roomSize}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Room Features */}
                  {room.roomFeatures && (
                    <div className="border-t border-primary/10 pt-6">
                      <h3 className="font-heading text-xl mb-4 tracking-wider">Features & Amenities</h3>
                      <p className="font-paragraph text-base leading-relaxed whitespace-pre-line">
                        {room.roomFeatures}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="mt-8 inline-block font-paragraph text-base text-primary border border-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-colors self-start"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Room Details Modal */}
      {selectedRoom && (
        <div
          className="fixed inset-0 bg-primary/80 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedRoom(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-background max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedRoom.roomImage && (
              <div className="h-96 overflow-hidden">
                <Image
                  src={selectedRoom.roomImage}
                  alt={selectedRoom.roomTypeName || 'Hotel room'}
                  className="w-full h-full object-cover"
                  width={1000}
                />
              </div>
            )}
            
            <div className="p-8 lg:p-12">
              <h2 className="font-heading text-4xl lg:text-5xl mb-6 tracking-tight">
                {selectedRoom.roomTypeName}
              </h2>
              
              <p className="font-paragraph text-lg mb-8 leading-relaxed">
                {selectedRoom.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {selectedRoom.bedConfiguration && (
                  <div>
                    <h3 className="font-heading text-lg mb-2 tracking-wider">Bed Configuration</h3>
                    <p className="font-paragraph text-base">{selectedRoom.bedConfiguration}</p>
                  </div>
                )}

                {selectedRoom.maxOccupancy && (
                  <div>
                    <h3 className="font-heading text-lg mb-2 tracking-wider">Maximum Occupancy</h3>
                    <p className="font-paragraph text-base">Up to {selectedRoom.maxOccupancy} guests</p>
                  </div>
                )}

                {selectedRoom.roomSize && (
                  <div>
                    <h3 className="font-heading text-lg mb-2 tracking-wider">Room Size</h3>
                    <p className="font-paragraph text-base">{selectedRoom.roomSize}</p>
                  </div>
                )}
              </div>

              {selectedRoom.roomFeatures && (
                <div className="border-t border-primary/10 pt-6 mb-8">
                  <h3 className="font-heading text-xl mb-4 tracking-wider">Features & Amenities</h3>
                  <p className="font-paragraph text-base leading-relaxed whitespace-pre-line">
                    {selectedRoom.roomFeatures}
                  </p>
                </div>
              )}

              <button
                onClick={() => setSelectedRoom(null)}
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
