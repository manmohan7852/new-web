// HPI 1.6-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight, Star, Wifi, Coffee, Car, Dumbbell } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { HotelAmenities, RoomTypes, SpecialOffers } from '@/entities';

// --- Utility Components for Motion & Interaction ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Add a small delay via setTimeout if needed, or just let CSS handle transition-delay
        setTimeout(() => {
            element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out ${className || ''}`}>{children}</div>;
};

const ParallaxImage = ({ src, alt, className, id }: { src: string, alt: string, className?: string, id: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="w-full h-full">
        <Image
          src={src}
          alt={alt}
          width={1200}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

const StickySection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`sticky top-0 z-10 ${className}`}>
            {children}
        </div>
    )
}

// --- Main Component ---

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [amenities, setAmenities] = useState<HotelAmenities[]>([]);
  const [rooms, setRooms] = useState<RoomTypes[]>([]);
  const [offers, setOffers] = useState<SpecialOffers[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [amenitiesData, roomsData, offersData] = await Promise.all([
        BaseCrudService.getAll<HotelAmenities>('hotelamenities'),
        BaseCrudService.getAll<RoomTypes>('roomtypes'),
        BaseCrudService.getAll<SpecialOffers>('specialoffers')
      ]);
      
      setAmenities(amenitiesData.items.slice(0, 6));
      setRooms(roomsData.items.slice(0, 3));
      setOffers(offersData.items.slice(0, 2));
    };

    fetchData();
  }, []);

  // --- Custom Styles for Scoped Effects ---
  const customStyles = `
    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .text-stroke {
      -webkit-text-stroke: 1px rgba(0,0,0,0.2);
      color: transparent;
    }
    .clip-diagonal {
      clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  return (
    <div className="min-h-screen bg-background text-primary overflow-x-clip selection:bg-primary selection:text-white">
      <style>{customStyles}</style>
      <Header />

      {/* --- HERO SECTION: Replicating "SPAZIO" Layout Structure --- */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row pt-20 lg:pt-0">
        
        {/* Left Column: Typography & Negative Space */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-16 xl:p-24 bg-background z-20">
          <div className="mt-20 lg:mt-32">
            <AnimatedElement>
              <p className="font-heading text-xs lg:text-sm tracking-[0.3em] uppercase mb-8 text-gray-500">
                Birmingham Lakeshore Drive
              </p>
            </AnimatedElement>
            
            <AnimatedElement delay={200}>
              <h2 className="font-paragraph text-4xl lg:text-6xl xl:text-7xl leading-[0.9] tracking-tight mb-4">
                REFINED <br/>
                <span className="italic text-gray-400">SOUTHERN</span> <br/>
                HOSPITALITY
              </h2>
            </AnimatedElement>
          </div>

          <div className="relative mt-12 lg:mt-0">
             <AnimatedElement delay={400}>
                <h1 className="font-heading text-[15vw] lg:text-[12vw] leading-[0.8] tracking-tighter mix-blend-difference text-primary lg:-mr-40 relative z-30">
                  DRURY
                </h1>
             </AnimatedElement>
          </div>
        </div>

        {/* Right Column: Full Bleed Image */}
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen relative overflow-hidden">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src="https://static.wixstatic.com/media/9b2143_0557b51dbe894a13b29b5c16da203b9c~mv2.png?originWidth=1600&originHeight=960"
              alt="Drury Inn & Suites Birmingham Architecture"
              className="w-full h-full object-cover"
              width={1600}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* --- NARRATIVE SECTION: Magazine Style Flow --- */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-32 lg:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Sticky Title */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <AnimatedElement>
                <div className="w-12 h-[1px] bg-primary mb-8"></div>
                <h2 className="font-heading text-4xl lg:text-5xl tracking-tight leading-none mb-6">
                  A Sanctuary <br/> in the City
                </h2>
                <p className="font-paragraph text-lg text-gray-600 max-w-xs">
                  Experience the perfect balance of modern luxury and timeless comfort.
                </p>
              </AnimatedElement>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="lg:col-span-8 space-y-24">
            <AnimatedElement delay={200}>
              <p className="font-paragraph text-2xl lg:text-4xl leading-relaxed text-gray-800">
                Nestled along Lakeshore Parkway, our hotel provides a tranquil escape while keeping you connected to Birmingham's vibrant energy. Whether traveling for business or leisure, you'll discover thoughtfully designed spaces that cater to your every need.
              </p>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedElement delay={300}>
                <div className="aspect-[4/5] w-full overflow-hidden">
                   <ParallaxImage 
                      src="https://static.wixstatic.com/media/9b2143_914b03a03128463c9211046058c6af65~mv2.png?originWidth=1152&originHeight=1472" 
                      alt="Hotel Lobby Detail"
                      id="lobby-img"
                      className="w-full h-full"
                   />
                </div>
              </AnimatedElement>
              
              <div className="flex flex-col justify-center space-y-8 pt-12 md:pt-0">
                <AnimatedElement delay={400}>
                  <h3 className="font-heading text-2xl uppercase tracking-widest border-b border-gray-200 pb-4">At a Glance</h3>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-center justify-between group cursor-default">
                      <span className="font-paragraph text-xl text-gray-500 group-hover:text-primary transition-colors">Check-In</span>
                      <span className="font-heading text-lg">3:00 PM</span>
                    </li>
                    <li className="flex items-center justify-between group cursor-default">
                      <span className="font-paragraph text-xl text-gray-500 group-hover:text-primary transition-colors">Check-Out</span>
                      <span className="font-heading text-lg">11:00 AM</span>
                    </li>
                    <li className="flex items-center justify-between group cursor-default">
                      <span className="font-paragraph text-xl text-gray-500 group-hover:text-primary transition-colors">Reception</span>
                      <span className="font-heading text-lg">24 Hours</span>
                    </li>
                  </ul>
                </AnimatedElement>
                
                <AnimatedElement delay={500}>
                  <div className="bg-gray-50 p-8 mt-8 border border-gray-100">
                    <QuoteIcon className="w-8 h-8 text-gray-300 mb-4" />
                    <p className="font-paragraph text-lg italic text-gray-600">
                      "From our complimentary hot breakfast to our evening reception, we've crafted experiences that make you feel at home."
                    </p>
                  </div>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROOMS SECTION: Vertical Sticky Stack --- */}
      <section className="w-full bg-black text-white py-32 relative">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <AnimatedElement>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/20 pb-8">
              <h2 className="font-heading text-5xl lg:text-7xl tracking-tighter">ACCOMMODATIONS</h2>
              <Link to="/rooms" className="group flex items-center gap-2 text-lg font-heading tracking-widest mt-4 md:mt-0 hover:text-gray-300 transition-colors">
                VIEW ALL SUITES <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedElement>

          <div className="space-y-32">
            {rooms.map((room, index) => (
              <div key={room._id} className="group grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Image Side - Alternating */}
                <div className={`relative aspect-[16/9] lg:aspect-[4/3] overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  {room.roomImage && (
                    <Image
                      src={room.roomImage}
                      alt={room.roomTypeName || 'Room Interior'}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      width={800}
                    />
                  )}
                </div>

                {/* Content Side */}
                <div className={`${index % 2 === 1 ? 'lg:order-1 lg:text-right' : 'lg:text-left'}`}>
                  <AnimatedElement>
                    <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs tracking-widest uppercase mb-6">
                      {room.maxOccupancy ? `Up to ${room.maxOccupancy} Guests` : 'Luxury Suite'}
                    </span>
                    <h3 className="font-paragraph text-4xl lg:text-5xl mb-6 text-white">
                      {room.roomTypeName}
                    </h3>
                    <p className="font-paragraph text-xl text-gray-400 mb-8 leading-relaxed max-w-md inline-block">
                      {room.description}
                    </p>
                    
                    <div className={`flex flex-wrap gap-6 text-sm font-heading tracking-wider text-gray-300 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                      {room.bedConfiguration && (
                        <span className="flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-white rounded-full" /> {room.bedConfiguration}
                        </span>
                      )}
                      {room.roomSize && (
                        <span className="flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-white rounded-full" /> {room.roomSize}
                        </span>
                      )}
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AMENITIES SECTION: Minimalist Grid --- */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-32">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20">
          <AnimatedElement>
            <h2 className="font-heading text-4xl lg:text-6xl tracking-tight mb-4">CURATED AMENITIES</h2>
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <p className="font-paragraph text-xl text-gray-600 max-w-md text-right">
              Thoughtful touches designed to elevate your stay from routine to remarkable.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {amenities.map((amenity, index) => (
            <div key={amenity._id} className="bg-background p-12 group hover:bg-gray-50 transition-colors duration-500 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
              <div className="relative z-10">
                <div className="mb-6 text-primary/40 group-hover:text-primary transition-colors duration-300">
                   {/* Icon mapping fallback */}
                   {index === 0 ? <Wifi size={32} strokeWidth={1} /> : 
                    index === 1 ? <Coffee size={32} strokeWidth={1} /> :
                    index === 2 ? <Dumbbell size={32} strokeWidth={1} /> :
                    <Star size={32} strokeWidth={1} />
                   }
                </div>
                <h3 className="font-heading text-2xl mb-3 tracking-wide">{amenity.amenityName}</h3>
                <p className="font-paragraph text-gray-500 group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">
                  {amenity.description}
                </p>
              </div>
              
              {/* Subtle Image Reveal on Hover */}
              {amenity.amenityImage && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none">
                  <Image 
                    src={amenity.amenityImage} 
                    alt="" 
                    className="w-full h-full object-cover grayscale" 
                    width={400}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
           <Link to="/amenities" className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-heading tracking-widest text-white bg-primary transition duration-300 ease-out hover:bg-gray-900">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gray-800 group-hover:translate-x-0 ease">
                <ArrowRight className="w-5 h-5" />
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">View All Amenities</span>
              <span className="relative invisible">View All Amenities</span>
           </Link>
        </div>
      </section>

      {/* --- OFFERS SECTION: Full Bleed Banner --- */}
      {offers.length > 0 && (
        <section className="w-full py-24 bg-[#F5F5F0]">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <AnimatedElement>
              <h2 className="font-heading text-center text-sm tracking-[0.4em] uppercase mb-16 text-gray-500">Exclusive Offers</h2>
            </AnimatedElement>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {offers.map((offer, index) => (
                <div key={offer._id} className="group relative h-[500px] overflow-hidden cursor-pointer">
                  <div className="absolute inset-0">
                    {offer.offerImage ? (
                      <Image
                        src={offer.offerImage}
                        alt={offer.offerTitle || 'Offer'}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        width={800}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
                  </div>
                  
                  <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                    <AnimatedElement delay={index * 100}>
                      <h3 className="font-heading text-3xl lg:text-4xl mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {offer.offerTitle}
                      </h3>
                      <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                        <p className="font-paragraph text-lg text-gray-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {offer.offerDescription}
                        </p>
                        <span className="inline-block border-b border-white pb-1 font-heading text-sm tracking-widest">
                          VIEW DETAILS
                        </span>
                      </div>
                    </AnimatedElement>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- LOCATION & CONTACT: Architectural Layout --- */}
      <section className="w-full bg-background pt-32 pb-20 border-t border-gray-100">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Map / Visual */}
            <div className="relative h-[400px] lg:h-[600px] bg-gray-100 overflow-hidden clip-diagonal">
               <Image 
                 src="https://static.wixstatic.com/media/9b2143_23434c026e544c4992dd523abd7f9dc2~mv2.png?originWidth=768&originHeight=576"
                 alt="Map Location Visual"
                 className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
                 width={800}
               />
               <div className="absolute bottom-8 left-8 bg-white p-6 shadow-lg max-w-xs">
                  <p className="font-heading text-sm tracking-widest mb-2">BIRMINGHAM</p>
                  <p className="font-paragraph text-gray-600">1000 Lakeshore Parkway<br/>AL 35209</p>
               </div>
            </div>

            {/* Info Grid */}
            <div className="flex flex-col justify-center">
              <AnimatedElement>
                <h2 className="font-heading text-5xl mb-12 tracking-tight">Connect With Us</h2>
              </AnimatedElement>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <AnimatedElement delay={100}>
                  <div className="group">
                    <Phone className="w-6 h-6 mb-4 text-gray-400 group-hover:text-primary transition-colors" />
                    <h3 className="font-heading text-sm tracking-widest mb-2">PHONE</h3>
                    <p className="font-paragraph text-xl">(205) 290-0600</p>
                  </div>
                </AnimatedElement>

                <AnimatedElement delay={200}>
                  <div className="group">
                    <Mail className="w-6 h-6 mb-4 text-gray-400 group-hover:text-primary transition-colors" />
                    <h3 className="font-heading text-sm tracking-widest mb-2">EMAIL</h3>
                    <p className="font-paragraph text-xl">info@druryhotels.com</p>
                  </div>
                </AnimatedElement>

                <AnimatedElement delay={300}>
                  <div className="group">
                    <Clock className="w-6 h-6 mb-4 text-gray-400 group-hover:text-primary transition-colors" />
                    <h3 className="font-heading text-sm tracking-widest mb-2">FRONT DESK</h3>
                    <p className="font-paragraph text-xl">24 Hours Daily</p>
                  </div>
                </AnimatedElement>

                <AnimatedElement delay={400}>
                  <div className="group">
                    <MapPin className="w-6 h-6 mb-4 text-gray-400 group-hover:text-primary transition-colors" />
                    <h3 className="font-heading text-sm tracking-widest mb-2">LOCATION</h3>
                    <p className="font-paragraph text-xl">Lakeshore Parkway</p>
                  </div>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Helper Icon Component
function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
    </svg>
  );
}