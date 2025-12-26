/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: customerreviews
 * Interface for CustomerReviews
 */
export interface CustomerReviews {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  reviewerName?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType text */
  comment?: string;
  /** @wixFieldType datetime */
  reviewDate?: Date | string;
  /** @wixFieldType boolean */
  isVerifiedGuest?: boolean;
  /** @wixFieldType text */
  reviewTitle?: string;
}


/**
 * Collection ID: diningoptions
 * Interface for DiningOptions
 */
export interface DiningOptions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  cuisineType?: string;
  /** @wixFieldType time */
  openingTime?: any;
  /** @wixFieldType time */
  closingTime?: any;
  /** @wixFieldType boolean */
  isReservationsRequired?: boolean;
  /** @wixFieldType url */
  menuUrl?: string;
  /** @wixFieldType image */
  mainImage?: string;
}


/**
 * Collection ID: hotelamenities
 * Interface for HotelAmenities
 */
export interface HotelAmenities {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  amenityName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  amenityImage?: string;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
  /** @wixFieldType text */
  category?: string;
}


/**
 * Collection ID: nearbyattractions
 * Interface for NearbyAttractions
 */
export interface NearbyAttractions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  attractionName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  distanceFromHotel?: string;
  /** @wixFieldType image */
  attractionImage?: string;
  /** @wixFieldType url */
  websiteUrl?: string;
  /** @wixFieldType text */
  address?: string;
}


/**
 * Collection ID: roomtypes
 * Interface for RoomTypes
 */
export interface RoomTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  roomTypeName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  bedConfiguration?: string;
  /** @wixFieldType number */
  maxOccupancy?: number;
  /** @wixFieldType text */
  roomSize?: string;
  /** @wixFieldType text */
  roomFeatures?: string;
  /** @wixFieldType image */
  roomImage?: string;
}


/**
 * Collection ID: specialoffers
 * Interface for SpecialOffers
 */
export interface SpecialOffers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  offerTitle?: string;
  /** @wixFieldType text */
  offerDescription?: string;
  /** @wixFieldType image */
  offerImage?: string;
  /** @wixFieldType date */
  validFrom?: Date | string;
  /** @wixFieldType date */
  validUntil?: Date | string;
  /** @wixFieldType text */
  termsAndConditions?: string;
  /** @wixFieldType url */
  bookingUrl?: string;
}
