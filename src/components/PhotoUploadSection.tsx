import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
  uploaderName?: string;
}

export function PhotoUploadSection() {
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [uploaderName, setUploaderName] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const photo: UploadedPhoto = {
            id: Date.now().toString() + Math.random().toString(36),
            url: e.target?.result as string,
            name: file.name,
            uploaderName: uploaderName || 'Anonymous Guest'
          };
          setUploadedPhotos((prev) => [photo, ...prev]);
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset form
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploaderName('');
    setShowUploadForm(false);
  };

  const removePhoto = (id: string) => {
    setUploadedPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-16 sm:py-20 md:py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center uppercase tracking-widest mb-4 sm:mb-6"
        >
          Share Your Moments
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4"
        >
          Were you at the celebration? Share your favorite photos from the event with us!
        </motion.p>

        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          {!showUploadForm ? (
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-black text-white py-3 px-8 sm:py-4 sm:px-12 rounded-full text-sm sm:text-base uppercase tracking-wider hover:bg-gray-800 transition-colors inline-flex items-center gap-2 sm:gap-3"
            >
              <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
              Upload Photos
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 p-6 sm:p-8 rounded-lg max-w-md mx-auto"
            >
              <h3 className="uppercase tracking-wider mb-4 sm:mb-6 text-center text-sm sm:text-base">Upload Your Photos</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-sm sm:text-base"
                />
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="photo-upload"
                />
                
                <label
                  htmlFor="photo-upload"
                  className="block w-full bg-black text-white py-3 px-6 rounded-md text-center cursor-pointer hover:bg-gray-800 transition-colors uppercase tracking-wider text-xs sm:text-sm"
                >
                  Choose Photos
                </label>

                <button
                  onClick={() => setShowUploadForm(false)}
                  className="w-full bg-white text-black py-3 px-6 rounded-md border-2 border-black hover:bg-gray-50 transition-colors uppercase tracking-wider text-xs sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {uploadedPhotos.length > 0 && (
          <div>
            <h3 className="text-center uppercase tracking-wider mb-6 sm:mb-8 text-gray-600 text-sm sm:text-base">
              Guest Photos ({uploadedPhotos.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <AnimatePresence>
                {uploadedPhotos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={photo.url}
                      alt={`Uploaded by ${photo.uploaderName}`}
                      className="w-full h-64 sm:h-72 md:h-80 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
                      <p className="text-white text-xs sm:text-sm">
                        Photo by {photo.uploaderName}
                      </p>
                    </div>
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="absolute top-2 right-2 bg-black/70 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {uploadedPhotos.length === 0 && (
          <div className="text-center py-8 sm:py-10 md:py-12">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm sm:text-base">No photos uploaded yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </motion.section>
  );
}