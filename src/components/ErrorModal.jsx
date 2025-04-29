/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const ErrorModal = ({ error, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 right-6 z-[1000]"
        >
          <div className="bg-white shadow-lg rounded-lg overflow-hidden min-w-[280px] border-l-4 border-red-500">
            <div className="flex items-start p-4">
              <div className="flex-shrink-0">
                <MdErrorOutline className="w-6 h-6 text-red-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Error</h3>
                <p className="mt-1 text-sm text-gray-600">{error}</p>
              </div>
              <button
                onClick={() => {
                  setIsVisible(false);
                  if (onClose) onClose();
                }}
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsVisible(false);
                  if (onClose) onClose();
                }}
                className="text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorModal;
