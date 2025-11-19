import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WellWish {
  id: number;
  name: string;
  message: string;
}

const mockWishes: WellWish[] = [
  {
    id: 1,
    name: 'JOAN OLUMIDE',
    message: 'Congratulations! Wishing you love and laughter forever. So happy for you both ❤️'
  },
  {
    id: 2,
    name: 'SARAH ADENIKE',
    message: 'May your marriage be filled with endless joy, understanding, and beautiful moments together 💕'
  },
  {
    id: 3,
    name: 'DAVID OKONKWO',
    message: 'To a lifetime of happiness and love! Cheers to your forever after 🥂'
  },
  {
    id: 4,
    name: 'BLESSING CHIAMAKA',
    message: 'Your love story is an inspiration. Wishing you both all the happiness in the world! 💖'
  }
];

export function WellWishesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newWish, setNewWish] = useState({ name: '', message: '' });
  const [wishes, setWishes] = useState(mockWishes);

  const handlePostWish = () => {
    if (newWish.name && newWish.message) {
      const wish: WellWish = {
        id: wishes.length + 1,
        name: newWish.name.toUpperCase(),
        message: newWish.message
      };
      setWishes([wish, ...wishes]);
      setNewWish({ name: '', message: '' });
      setShowPostForm(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 to-white pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-8 relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center uppercase tracking-widest mb-16"
        >
          Well Wishes
        </motion.h2>
        
        {!showAll && !showPostForm && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#F8E7E7] p-12 rounded-lg shadow-md mb-8 max-w-2xl mx-auto"
          >
            <p className="uppercase tracking-wider text-sm mb-4">{wishes[currentIndex].name}</p>
            <p className="text-gray-800 leading-relaxed">{wishes[currentIndex].message}</p>
          </motion.div>
        )}

        {showAll && (
          <div className="grid gap-6 mb-8 max-w-3xl mx-auto">
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#F8E7E7] p-8 rounded-lg shadow-md"
              >
                <p className="uppercase tracking-wider text-sm mb-3">{wish.name}</p>
                <p className="text-gray-800 leading-relaxed">{wish.message}</p>
              </motion.div>
            ))}
          </div>
        )}

        {showPostForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F8E7E7] p-12 rounded-lg shadow-md mb-8 max-w-2xl mx-auto"
          >
            <h3 className="uppercase tracking-wider mb-6 text-center">Post Your Wish</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={newWish.name}
                onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white"
              />
              <textarea
                placeholder="Your message for the couple..."
                value={newWish.message}
                onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white"
              />
              <div className="flex gap-4">
                <button
                  onClick={handlePostWish}
                  className="flex-1 bg-black text-white py-3 px-8 rounded-full uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowPostForm(false)}
                  className="flex-1 bg-white text-black py-3 px-8 rounded-full uppercase tracking-wider text-sm border-2 border-black hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {!showPostForm && (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-white text-black py-3 px-8 rounded-full uppercase tracking-wider text-sm border-2 border-black hover:bg-gray-50 transition-colors"
            >
              {showAll ? 'Show Less' : 'View All'}
            </button>
            <button
              onClick={() => {
                setShowPostForm(true);
                setShowAll(false);
              }}
              className="bg-black text-white py-3 px-8 rounded-full uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors"
            >
              Post a Wish
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
