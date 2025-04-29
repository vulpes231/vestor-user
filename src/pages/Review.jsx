/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    rating: 5,
    role: "Financial Advisor",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "Outstanding experience, highly recommended! The platform's intuitive design makes complex trading simple.",
  },
  {
    id: 2,
    name: "Bob Smith",
    rating: 4,
    role: "Day Trader",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "Good service with excellent tools. Execution could be a bit faster during peak hours.",
  },
  {
    id: 3,
    name: "Cleo Martinez",
    rating: 5,
    role: "Investment Manager",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "Absolutely love this platform! The analytics dashboard provides exactly what professionals need.",
  },
  {
    id: 4,
    name: "Dan Wilson",
    rating: 3,
    role: "Retail Investor",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    text: "It's decent with good basic features, but I expected more advanced charting tools.",
  },
  {
    id: 5,
    name: "Eva Chen",
    rating: 5,
    role: "Hedge Fund Analyst",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    text: "Amazing from start to finish! The API integration capabilities are industry-leading.",
  },
  {
    id: 6,
    name: "Frank Williams",
    rating: 4,
    role: "Portfolio Manager",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    text: "Really helpful support team that understands complex financial instruments.",
  },
];

const ReviewCard = ({ review }) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg p-6 space-y-4 h-full flex flex-col"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center gap-4">
      <img
        src={review.image}
        alt={review.name}
        className="w-12 h-12 rounded-full object-cover border-2 border-primary/10"
      />
      <div>
        <h4 className="font-semibold text-gray-900">{review.name}</h4>
        <p className="text-sm text-gray-500">{review.role}</p>
      </div>
    </div>

    <div className="flex gap-1 text-amber-400">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={18}
          fill={i < review.rating ? "currentColor" : "none"}
          strokeWidth={i < review.rating ? 0 : 1.5}
        />
      ))}
    </div>

    <p className="text-gray-600 flex-grow">{review.text}</p>

    <div className="text-xs text-gray-400 mt-auto">Verified Customer</div>
  </motion.div>
);

const ReviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const getDesktopSlice = () => {
    const start = currentIndex * 3;
    return reviews.slice(start, start + 3);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex(
      (prev) => (prev + 1) % Math.ceil(reviews.length / (isMobile ? 1 : 3))
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.ceil(reviews.length / (isMobile ? 1 : 3))) %
        Math.ceil(reviews.length / (isMobile ? 1 : 3))
    );
  };

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Financial Professionals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear what our clients say
            about our platform
          </p>
        </div>

        <div className="relative">
          {!isMobile && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="text-gray-700" size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition"
                aria-label="Next reviews"
              >
                <ChevronRight className="text-gray-700" size={24} />
              </button>
            </>
          )}

          {isMobile ? (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.4 }}
                className="px-4"
              >
                <ReviewCard review={reviews[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {getDesktopSlice().map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </motion.div>
          )}

          {isMobile && (
            <div className="flex justify-center mt-8 gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
