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

      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 w-full p-5 lg:p-10 min-h-screen bg-gray-100 dark:bg-gray-600">
  {/* Form Section */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="border-2 w-full md:w-2/3 lg:w-1/3 shadow-lg rounded-lg py-8 bg-[#d6eaf8] dark:bg-blue-950 px-6 md:px-10 flex flex-col justify-center"
  >
    <h2 className="text-3xl md:text-4xl font-bold font-serif text-blue-900 dark:text-[#d6eaf8] mb-6 text-center">
      Contact Us
    </h2>
    <p className="italic leading-snug text-blue-800 text-sm text-center dark:text-slate-300">We are here to help and answer any question you might have. We look forward to hearing from you!!</p>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-md text-blue-800 font-bold dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          pattern="[a-zA-Z ]+" 
           onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Please enter a valid name without numbers or special characters')}
           onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
          className="mt-1 block w-full px-4 py-3 rounded-md text-gray-800 dark:text-gray-300 border border-blue-900 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-md text-blue-800 font-bold dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-3 rounded-md text-gray-800 dark:text-gray-300 border border-blue-900 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-md text-blue-800 font-bold dark:text-gray-300">
          Message
        </label>
        <textarea
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 rounded-md text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
        ></textarea>
        {errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-md shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
        type="submit"
      >
        Send Message
      </motion.button>
    </form>
  </motion.div>

  {/* Cards Section */}
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col gap-5 w-full md:w-2/3 lg:w-1/4"
  >
    <div className="bg-gradient-to-l from-blue-200 via-blue-400 to-blue-600 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center md:items-start">
      <div className="bg-[#B7E0FF] rounded-full px-3 py-3 flex items-center mb-2">
        <FaPhoneAlt className="text-lg text-blue-600 dark:text-gray-800" />
      </div>
      <h3 className="text-xl font-semibold text-white dark:text-black mb-1">Call Us</h3>
      <p className="text-white dark:text-gray-600 font-bold text-lg">+1 (234) 567-890</p>
    </div>

    <div className="bg-gradient-to-tl from-blue-200 via-blue-400 to-blue-600 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center md:items-start">
      <div className="bg-[#B7E0FF] rounded-full px-3 py-3 flex items-center mb-2">
        <FaEnvelope className="text-lg text-blue-600 dark:text-gray-800" />
      </div>
      <h3 className="text-xl font-semibold text-white dark:text-black mb-1">Email Us</h3>
      <p className="text-white dark:text-gray-600 font-bold text-lg">ajaydhangar49@gmail.com</p>
    </div>

    <div className="bg-gradient-to-l from-blue-200 via-blue-400 to-blue-600 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center md:items-start">
      <div className="bg-[#B7E0FF] rounded-full px-3 py-3 flex items-center mb-2">
        <FaMapMarkerAlt className="text-lg text-blue-600 dark:text-gray-800" />
      </div>
      <h3 className="text-xl font-semibold text-white dark:text-black mb-1">Visit Us</h3>
      <p className="text-white dark:text-gray-600 font-bold text-lg">
        Mandsaur, Madhya Pradesh, India
      </p>
    </div>
  </motion.div>
</div>


    </div>
    </Layout>
  );
};

export default Contact;
