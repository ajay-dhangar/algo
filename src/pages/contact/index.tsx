import React, { useState } from "react";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name) {
      newErrors.name = "Name is required";
      formValid = false;
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "A valid email is required";
      formValid = false;
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
      formValid = false;
    }

    setErrors(newErrors);

    if (formValid) {
      // Form is valid, show success toast
      toast.success("Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Clear form data
      setFormData({ name: "", email: "", message: "" });
    } else {
      // Show error toast for validation issues
      toast.error("Please fill out the form correctly.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout
      title="Contact Us"
      description="Get in touch with us through the contact form or visit our office."
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
          Contact <span className="text-blue-600 dark:text-yellow-400">Us</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          We would love to hear from you. Reach out to us through the form below, or visit us at our office.
        </motion.p>
      </section>

      <section className="container mx-auto py-8 px-6 md:px-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center md:items-start">
            <FaPhoneAlt className="text-3xl text-gray-600 dark:text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Call Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300">+91 702 459 2105</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center md:items-start">
            <FaEnvelope className="text-3xl text-gray-600 dark:text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Email Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300">ajaydhangar49@gmail.com</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center md:items-start">
            <FaMapMarkerAlt className="text-3xl text-gray-600 dark:text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Visit Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Mandsaur, Madhya Pradesh, India</p>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto py-12 px-6 md:px-12">
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Get In Touch
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
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              {errors.message && (
                <p className="text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-md shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 border border-gray-200 dark:border-gray-700"
              type="submit"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
    </Layout>
  );
};

export default Contact;
