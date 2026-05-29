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
      <div className="text-foreground">

        <ToastContainer />

        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 w-full p-6 lg:p-12 min-h-screen">

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-2/3 lg:w-[480px] rounded-[32px] border border-white/10 bg-background/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] px-8 py-8 relative overflow-hidden"
          >

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Contact Us
            </h2>

            <p className="text-sm text-center text-muted-foreground mb-6 leading-relaxed">
              We are here to help and answer any question you might have. We look
              forward to hearing from you!!
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Name
                </label>

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  pattern="[a-zA-Z ]+"
                  onInvalid={(e) =>
                    (e.target as HTMLInputElement).setCustomValidity(
                      "Please enter a valid name without numbers or special characters"
                    )
                  }
                  onInput={(e) =>
                    (e.target as HTMLInputElement).setCustomValidity("")
                  }
                  className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Email
                </label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 font-semibold text-white shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300"
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
            className="flex flex-col gap-4 w-full md:w-2/3 lg:w-[320px]"
          >

            <div className="border border-border bg-background/70 backdrop-blur-xl p-5 rounded-2xl shadow-xl hover:border-yellow-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center md:items-start">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-3">
                <FaPhoneAlt className="text-yellow-500 text-lg" />
              </div>

              <h3 className="text-lg font-semibold mb-1">
                Call Us
              </h3>

              <p className="text-muted-foreground text-sm">
                +1 (234) 567-890
              </p>
            </div>

            <div className="border border-border bg-background/70 backdrop-blur-xl p-5 rounded-2xl shadow-xl hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center md:items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
                <FaEnvelope className="text-blue-500 text-lg" />
              </div>

              <h3 className="text-lg font-semibold mb-1">
                Email Us
              </h3>

              <p className="text-muted-foreground text-sm break-all">
                ajaydhangar49@gmail.com
              </p>
            </div>

            <div className="border border-border bg-background/70 backdrop-blur-xl p-5 rounded-2xl shadow-xl hover:border-green-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center md:items-start">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
                <FaMapMarkerAlt className="text-green-500 text-lg" />
              </div>

              <h3 className="text-lg font-semibold mb-1">
                Visit Us
              </h3>

              <p className="text-muted-foreground text-sm">
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
