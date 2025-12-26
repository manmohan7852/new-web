import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { CustomerReviews } from '@/entities';

export default function RatingsPage() {
  const [reviews, setReviews] = useState<CustomerReviews[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchReviews = async () => {
      const { items } = await BaseCrudService.getAll<CustomerReviews>('customerreviews');
      setReviews(items);

      // Calculate average rating
      if (items.length > 0) {
        const total = items.reduce((sum, review) => sum + (review.rating || 0), 0);
        setAverageRating(total / items.length);

        // Calculate rating distribution
        const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        items.forEach(review => {
          if (review.rating) {
            distribution[review.rating] = (distribution[review.rating] || 0) + 1;
          }
        });
        setRatingDistribution(distribution);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={star <= rating ? 'fill-primary text-primary' : 'text-primary/20'}
          />
        ))}
      </div>
    );
  };

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
            Guest Reviews
          </h1>
          <p className="font-paragraph text-xl max-w-3xl leading-relaxed">
            Read what our guests have to say about their experiences at Drury Inn & Suites Birmingham Lakeshore Drive.
          </p>
        </motion.div>
      </section>

      {/* Rating Overview */}
      <section className="w-full bg-secondary border-t border-primary/10">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            {/* Average Rating */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center border-r-0 lg:border-r border-primary/10 pr-0 lg:pr-12">
              <div className="font-heading text-7xl mb-4">
                {averageRating.toFixed(1)}
              </div>
              <div className="mb-4">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="font-paragraph text-lg">
                Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="lg:col-span-8">
              <h3 className="font-heading text-2xl mb-6 tracking-wider">
                Rating Distribution
              </h3>
              <div className="space-y-4">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingDistribution[rating] || 0;
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  
                  return (
                    <div key={rating} className="flex items-center gap-4">
                      <div className="flex items-center gap-2 w-24">
                        <span className="font-paragraph text-base">{rating}</span>
                        <Star size={16} className="fill-primary text-primary" />
                      </div>
                      <div className="flex-1 h-3 bg-primary/10 overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="font-paragraph text-base w-16 text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-20">
        <h2 className="font-heading text-4xl mb-12 tracking-tight">
          All Reviews
        </h2>

        <div className="space-y-8">
          {reviews.map((review, index) => (
            <motion.article
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border-t border-primary/10 pt-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Reviewer Info */}
                <div className="lg:col-span-3">
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="font-heading text-xl tracking-wider">
                      {review.reviewerName}
                    </h3>
                    {review.isVerifiedGuest && (
                      <span title="Verified Guest">
                        <CheckCircle2 size={20} className="text-primary mt-1 flex-shrink-0" />
                      </span>
                    )}
                  </div>
                  {review.reviewDate && (
                    <p className="font-paragraph text-sm opacity-60">
                      {formatDate(review.reviewDate)}
                    </p>
                  )}
                </div>

                {/* Review Content */}
                <div className="lg:col-span-9">
                  <div className="mb-4">
                    {review.rating && renderStars(review.rating)}
                  </div>
                  
                  {review.reviewTitle && (
                    <h4 className="font-heading text-2xl mb-3 tracking-wider">
                      {review.reviewTitle}
                    </h4>
                  )}
                  
                  {review.comment && (
                    <p className="font-paragraph text-lg leading-relaxed">
                      {review.comment}
                    </p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-20">
            <p className="font-paragraph text-xl opacity-60">
              No reviews available at this time.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
