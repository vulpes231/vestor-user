/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdCheckCircle } from "react-icons/md";

const Successmodal = ({ successText }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed top-6 right-6 z-[1000]"
      >
        <div className="bg-white shadow-lg rounded-lg overflow-hidden min-w-[280px] border-l-4 border-green-500">
          <div className="flex items-start p-4">
            <div className="flex-shrink-0">
              <MdCheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Success</h3>
              <p className="mt-1 text-sm text-gray-600">{successText}</p>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 flex justify-end">
            <div className="flex items-center text-sm text-green-600">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Completed
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Successmodal;
