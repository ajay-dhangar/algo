import React from "react";
import { FaUser, FaLock, FaTimes } from "react-icons/fa";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showSignup, setShowSignup] = React.useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">

      {/* Modal */}

      <div className="relative w-full max-w-lg overflow-hidden rounded-[30px] bg-white shadow-2xl">

        {/* Grid Background */}
        <div
          className="
          absolute inset-0
          bg-[repeating-linear-gradient(45deg,#e5e7eb_0px,#e5e7eb_1px,transparent_1px,transparent_24px),repeating-linear-gradient(-45deg,#e5e7eb_0px,#e5e7eb_1px,transparent_1px,transparent_24px)]
          bg-[size:44px_44px]
          opacity-40
          [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0.1))]
          pointer-events-none
        "
        ></div>

        {/* Smoky Blue Glow */}
        <div
          className="
          absolute -left-24 -top-24
          h-[260px] w-[260px]
          rounded-full
          bg-blue-500/40
          blur-3xl
          pointer-events-none
        "
        ></div>

        {/* Smoky Pink Glow */}
        <div
          className="
          absolute -bottom-24 -right-24
          h-[220px] w-[220px]
          rounded-full
          bg-pink-500/35
          blur-3xl
          pointer-events-none
        "
        ></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 border-none bg-transparent p-0 text-gray-400 outline-none shadow-none transition hover:text-gray-700 focus:outline-none"
        >
          <FaTimes size={18} />
        </button>

        {/* Right Form Section */}
        <div className="relative z-10 flex flex-col justify-center bg-transparent px-6 py-10 md:px-10">

          {/* Logo */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-2xl border-[6px] border-blue-500 rotate-45">
              <div className="h-10 w-10 border-[5px] border-blue-500"></div>
            </div>

            <h1 className="text-5xl font-bold tracking-wide text-blue-500">
              {showSignup ? "SIGN UP" : "LOGIN"}
            </h1>
          </div>

          {!showSignup && (
            <>
              {/* Email */}
              <div className="mb-8">
                <div className="flex items-center">
                  <FaUser className="mr-3 text-sm text-gray-400" />

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border-0 border-b border-gray-300 bg-transparent pb-2 text-gray-600 outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-8">
                <div className="flex items-center">
                  <FaLock className="mr-3 text-sm text-gray-400" />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border-0 border-b border-gray-300 bg-transparent pb-2 text-gray-600 outline-none focus:border-gray-400"
                  />
                </div>
              </div>
            </>
          )}

          {/* Signup Form */}
          {showSignup && (
            <div className="mb-8 space-y-6">

              {/* Email */}
              <div className="flex items-center">
                <FaUser className="mr-3 text-sm text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full border-0 border-b border-gray-300 bg-transparent pb-2 text-gray-600 outline-none focus:border-gray-400"
                />
              </div>

              {/* Password */}
              <div className="flex items-center">
                <FaLock className="mr-3 text-sm text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full border-0 border-b border-gray-300 bg-transparent pb-2 text-gray-600 outline-none focus:border-gray-400"
                />
              </div>

              {/* Confirm Password */}
              <div className="flex items-center">
                <FaLock className="mr-3 text-sm text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border-0 border-b border-gray-300 bg-transparent pb-2 text-gray-600 outline-none focus:border-gray-400"
                />
              </div>

            </div>
          )}

          {/* Bottom Actions */}
          <div
            className={`mb-16 flex items-center gap-3 whitespace-nowrap ${showSignup ? "justify-end" : "justify-between"
              }`}
          >

            {/* Forgot Password */}
            {!showSignup && (
              <button className="border-none bg-transparent text-base font-medium text-blue-500 outline-none shadow-none transition duration-200 hover:scale-105 hover:text-blue-600">
                Forgot Password?
              </button>
            )}

            {/* Login Button */}
            <button
              className="rounded-full bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-1 text-lg font-semibold text-white shadow-lg transition hover:scale-105"
            >
              {showSignup ? "SIGN UP" : "LOGIN"}
            </button>
          </div>

          {/* Social Login */}
          <div className="mt-[-60px] border-t border-gray-200 pt-5">

            <p className="mb-2 text-center text-base font-medium text-gray-500">
              ─── Or Continue with ───
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Google */}
              <button className="flex items-center border-none bg-transparent text-gray-500 transition hover:scale-105 hover:text-blue-500">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                  alt="Google"
                  className="h-5 w-5"
                />
                {/* Google */}
              </button>

              {/* GitHub */}
              <button className="flex items-center border-none bg-transparent text-gray-500 transition hover:scale-105 hover:text-blue-500">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  alt="GitHub"
                  className="h-5 w-5"
                />
                {/* GitHub */}
              </button>

              {/* E-mail */}
              <button className="flex items-center border-none bg-transparent text-gray-500 transition hover:scale-105 hover:text-blue-500">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                  alt="E-mail"
                  className="h-5 w-5"
                />
              </button>

            </div>
          </div>

          {/* Back to login */}
          {showSignup && (
            <div className="mt-12 pb-4 text-center">
              <button
                onClick={() => setShowSignup(false)}
                className="border-none bg-transparent text-sm text-blue-500 hover:underline"
              >
                ← Back to Login
              </button>
            </div>
          )}

          {/* Sign Up Section */}
          {!showSignup && (
            <div className="mt-24 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <button
                  onClick={() => setShowSignup(true)}
                  className="border-none bg-transparent p-0 font-semibold text-blue-500 hover:text-blue-700 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default LoginModal;