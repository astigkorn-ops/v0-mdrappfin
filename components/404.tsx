import { Cloud, Wind, Droplets, Sun, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Animated background weather elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 text-blue-200"
        >
          <Cloud size={48} className="opacity-30" />
        </motion.div>
        <motion.div
          animate={{ x: [-30, 30, -30] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 right-20 text-indigo-200"
        >
          <Wind size={32} className="opacity-20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-1/4 text-purple-200"
        >
          <Droplets size={36} className="opacity-25" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-1/4 text-yellow-200"
        >
          <Sun size={40} className="opacity-20" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          <div className="text-center">
            {/* Main 404 Number */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6"
            >
              <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                404
              </h1>
            </motion.div>

            {/* Weather-themed subtitle */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Storm Clouds Ahead!
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Looks like you've wandered into a weather system we can't forecast. 
                The page you're looking for has been swept away by the winds of change.
              </p>
            </motion.div>

            {/* Weather icons row */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex justify-center items-center gap-6 mb-10 flex-wrap"
            >
              <div className="flex items-center gap-2 text-blue-600">
                <Cloud size={24} />
                <span className="text-sm font-medium">Missing Page</span>
              </div>
              <div className="flex items-center gap-2 text-purple-600">
                <Wind size={24} />
                <span className="text-sm font-medium">404 Error</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-600">
                <Droplets size={24} />
                <span className="text-sm font-medium">Not Found</span>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <ArrowLeft size={20} />
                Go Back
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-blue-600 hover:from-yellow-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Sun size={20} />
                Back to Home
              </a>
            </motion.div>

            {/* Additional navigation hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="mt-6 text-gray-500 text-sm"
            >
              Or check your URL – sometimes the forecast gets cloudy!
            </motion.p>
          </div>
        </div>

        {/* Footer attribution */}
       
      </div>
    </div>
  );
}
