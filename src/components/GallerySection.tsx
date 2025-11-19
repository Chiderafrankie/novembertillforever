import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GallerySectionProps {
  images: string[];
}

export function GallerySection({ images }: GallerySectionProps) {
  const [activeTab, setActiveTab] = useState<'videos' | 'images'>('images');

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-16 sm:py-20 md:py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-center uppercase tracking-widest mb-8 sm:mb-10 md:mb-12">Gallery</h2>
        
        <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-14 md:mb-16">
          <button
            onClick={() => setActiveTab('videos')}
            className={`uppercase tracking-wider text-xs sm:text-sm transition-colors ${
              activeTab === 'videos' ? 'text-black' : 'text-gray-400'
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`uppercase tracking-wider text-xs sm:text-sm transition-colors ${
              activeTab === 'images' ? 'text-black' : 'text-gray-400'
            }`}
          >
            <span className="hidden sm:inline">Images (It Takes a Village)</span>
            <span className="sm:hidden">Images</span>
          </button>
        </div>

        {activeTab === 'images' && (
          <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            {images.map((img, index) => {
              const rotations = ['-rotate-2', 'rotate-1', '-rotate-1'];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`bg-white p-3 sm:p-4 shadow-xl ${rotations[index % 3]} hover:rotate-0 transition-transform duration-300 w-full sm:w-auto`}
                  style={{ maxWidth: '320px' }}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-64 sm:h-72 md:h-80 object-cover"
                  />
                  <div className="h-8 sm:h-10 md:h-12"></div>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="text-center text-gray-400 py-12 sm:py-16 md:py-20">
            <p>Videos coming soon...</p>
          </div>
        )}
      </div>
    </motion.section>
  );
}