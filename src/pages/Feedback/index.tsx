import React, { useState } from "react";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,  // Changed rating type to number
    feedback: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = { name: "", email: "", rating: "", feedback: "" };

    if (!formData.name) {
      newErrors.name = "Name is required";
      formValid = false;
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "A valid email is required";
      formValid = false;
    }

    if (formData.rating === 0) {
      newErrors.rating = "Rating is required";
      formValid = false;
    }

    if (!formData.feedback) {
      newErrors.feedback = "Feedback is required";
      formValid = false;
    }

    setErrors(newErrors);

    if (formValid) {
      // Show success toast
      toast.success("Thank you for your feedback!", {
        position: "top-right",
        autoClose: 3000,
      });
      
      // Clear form data
      setFormData({ name: "", email: "", rating: 0, feedback: "" });
    } else {
      // Show error toast
      toast.error("Please fill out the form correctly.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout
      title="Feedback"
      description="We value your feedback to help us improve."
    >
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <ToastContainer />
        <section className="container mx-auto py-12 px-6 md:px-12 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Give Us Your <span className="text-blue-600 dark:text-yellow-400">Feedback</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Your feedback helps us improve our services. Please fill out the form below.
          </motion.p>
        </section>

        <section className="container mx-auto py-12 px-6 md:px-12">
          <motion.div
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Share Your Thoughts
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rating
                </label>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <motion.button
                      key={num}
                      type="button"
                      onClick={() => handleRatingClick(num)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 text-2xl ${
                        formData.rating === num
                          ? "bg-blue-600 text-white rounded-full"
                          : "bg-gray-200 dark:bg-gray-700 rounded-full"
                      }`}
                    >
                      {num === 1
                        ? "😡"
                        : num === 2
                        ? "😕"
                        : num === 3
                        ? "😐"
                        : num === 4
                        ? "🙂"
                        : "😄"}
                    </motion.button>
                  ))}
                </div>
                {errors.rating && (
                  <p className="text-sm text-red-600">{errors.rating}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Feedback
                </label>
                <textarea
                  name="feedback"
                  rows={5}
                  value={formData.feedback}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                {errors.feedback && (
                  <p className="text-sm text-red-600">{errors.feedback}</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-md shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                type="submit"
              >
                Submit Feedback
              </motion.button>
            </form>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default Feedback;
