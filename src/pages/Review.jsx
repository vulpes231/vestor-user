/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Alice",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "Outstanding experience, highly recommended!",
  },
  {
    id: 2,
    name: "Bob",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "Good service, could be a bit faster.",
  },
  {
    id: 3,
    name: "Cleo",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "Absolutely love this platform!",
  },
  {
    id: 4,
    name: "Dan",
    rating: 3,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    text: "It’s decent, but I expected more.",
  },
  {
    id: 5,
    name: "Eva",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    text: "Amazing from start to finish!",
  },
  {
    id: 6,
    name: "Frank",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    text: "Really helpful support team!",
  },
];

const ReviewCard = ({ review }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-md p-6 text-center space-y-4"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex justify-center gap-1 text-yellow-400">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={20}
          fill={i < review.rating ? "currentColor" : "none"}
        />
      ))}
    </div>
    <img
      src={review.image}
      alt={review.name}
      className="w-16 h-16 rounded-full mx-auto object-cover"
    />
    <p className="text-base text-gray-600">{review.text}</p>
  </motion.div>
);

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const getDesktopSlice = () => {
    const start = currentIndex * 3;
    return reviews.slice(start, start + 3);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10">
      {isMobile ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ReviewCard review={reviews[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {getDesktopSlice().map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Review;
