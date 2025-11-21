import { useState, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { CountdownTimer } from "./components/CountdownTimer";
import { GallerySection } from "./components/GallerySection";
import { WellWishesSection } from "./components/WellWishesSection";
import { FAQSection } from "./components/FAQSection";
import { GiftSection } from "./components/GiftSection";
import { PhotoUploadSection } from "./components/PhotoUploadSection";
// change imports to use PNGs from the assets folder
import hero9Img from "./assets/hero9.png";
import hero8Img from "./assets/hero8.png";
import hero0Img from "./assets/hero0.png";
// add new gallery asset imports
import pic8 from "./assets/pic8.png";
import pic9 from "./assets/pic9.png";
// replaced unavailable figma asset with a safe inline SVG data-URL placeholder
const heroImg1 =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%25' height='100%25' fill='%23dddddd'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666666' font-size='48'>Hero Image</text></svg>";
const heroImg2 =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%25' height='100%25' fill='%23e8e8e8'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23555555' font-size='40'>Hero Image 2</text></svg>";
const heroImg3 =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%25' height='100%25' fill='%23f2f2f2'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23444444' font-size='40'>Hero Image 3</text></svg>";
const galleryImg1 =
  "data:image/svg+xml;utf8, width='800' height='800'><rect width='100%25' height='100%25' fill='%23ededed'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666666' font-size='36'>Gallery 1</text></svg>";
const galleryImg2 =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><rect width='100%25' height='100%25' fill='%23efefef'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23555555' font-size='36'>Gallery 2</text></svg>";
const galleryImg3 =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><rect width='100%25' height='100%25' fill='%23f7f7f7'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23444444' font-size='36'>Gallery 3</text></svg>";

// Wedding date: November 22nd, 2025, 1:00 PM WAT
const WEDDING_DATE = new Date("2025-11-22T13:00:00+01:00");

export default function App() {
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    attending: "",
    message: "",
  });

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();

    // In production, this would submit to Supabase
    alert(
      `Thank you for your RSVP, ${rsvpData.firstName}!\n\nYour response has been recorded (demo mode).`
    );

    // Reset form
    setRsvpData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      attending: "",
      message: "",
    });

    setShowRSVPForm(false);
  };

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById("rsvp-section");
    rsvpSection?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setShowRSVPForm(true), 500);
  };

  // use project assets (fall back to inline SVG placeholders if needed)
  const hero9 = hero9Img || heroImg1;
  const hero8 = hero8Img || heroImg2;
  const hero0 = hero0Img || heroImg3;

  // use the new order: hero9, hero8, hero0
  const heroImages = [hero9, hero8, hero0];

  // removed the first gallery image to avoid cutting off the head
  // include pic8 and pic9 from the assets folder
  const galleryImages = [pic8, pic9];

  // New: detect md+ breakpoint and slideshow state for mobile
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 768px)").matches;
  });
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    // for older browsers EventListener fallback
    if (mq.addEventListener) mq.addEventListener("change", onChange as any);
    else mq.addListener(onChange as any);
    return () => {
      if (mq.removeEventListener)
        mq.removeEventListener("change", onChange as any);
      else mq.removeListener(onChange as any);
    };
  }, []);

  // auto-advance only on mobile
  useEffect(() => {
    if (isDesktop) return; // do not auto-advance on desktop
    const interval = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isDesktop, heroImages.length]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = document.querySelector(".gallery-fix");
    if (!container) return;

    const applyCentering = () => {
      // target first <img> inside gallery-fix
      const firstImg = container.querySelector<HTMLImageElement>("img");
      if (firstImg) {
        firstImg.style.setProperty(
          "object-position",
          "center center",
          "important"
        );
        firstImg.style.setProperty("object-fit", "cover", "important");
      }

      // target elements that use background-image inline style
      const bgItem = container.querySelector<HTMLElement>(
        '[style*="background-image"]'
      );
      if (bgItem) {
        bgItem.style.setProperty(
          "background-position",
          "center center",
          "important"
        );
        bgItem.style.setProperty("background-size", "cover", "important");
      }

      // also attempt to target any gallery-item wrapper that may control img positioning
      const firstWrapperImg = container.querySelector<HTMLElement>(
        ".gallery-item img, .gallery-photo img"
      );
      if (firstWrapperImg && firstWrapperImg instanceof HTMLImageElement) {
        firstWrapperImg.style.setProperty(
          "object-position",
          "center center",
          "important"
        );
        firstWrapperImg.style.setProperty("object-fit", "cover", "important");
      }
    };

    // initial apply (with a small timeout to allow lazy-loaded images to mount)
    const t = window.setTimeout(applyCentering, 150);

    // re-apply on resize (mobile ↔ desktop) — debounce lightly
    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(applyCentering, 120);
    };
    window.addEventListener("resize", onResize);

    // observe gallery container for DOM changes (lazy load, hydration)
    const observer = new MutationObserver(() => {
      applyCentering();
    });
    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "src", "class"],
    });

    // cleanup
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [galleryImages.length]);

  // helper fallback: set image src to placeholder if import fails at runtime
  const handleImgError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    fallback: string
  ) => {
    const img = e.currentTarget;
    if (img.src !== fallback) {
      img.src = fallback;
      img.style.objectPosition = "center center";
      img.style.objectFit = "cover";
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Desktop: keep 3-column split */}
        {isDesktop ? (
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-0">
            {heroImages.map((img, index) => (
              <div key={index} className="relative h-full">
                {/* use plain <img> to ensure imported assets render in the hero */}
                <img
                  src={img as string}
                  alt={`Wedding photo ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => handleImgError(e as any, heroImg1)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent md:bg-black/50"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Mobile: single-image slideshow with fade + dots */
          <div className="absolute inset-0">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              {/* plain <img> for mobile slideshow too */}
              <img
                src={heroImages[currentSlide] as string}
                alt={`Wedding photo ${currentSlide + 1}`}
                className={`w-full h-full object-cover object-center`}
                onError={(e) => handleImgError(e as any, heroImg1)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            </motion.div>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full ${
                    i === currentSlide ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8 max-w-4xl mx-auto w-full py-6 hero-fix">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs sm:text-sm uppercase tracking-widest"
            >
              We're getting married 💍
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              // allow breaking inside the long hashtag on small screens and keep comfortable leading
              className="px-2 sm:px-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl break-words leading-tight whitespace-normal"
            >
              #FromNovemberTillForever
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="py-2 md:py-4"
            >
              <CountdownTimer targetDate={WEDDING_DATE} compact />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="pt-2"
            >
              <button
                onClick={scrollToRSVP}
                className="bg-white text-black py-3 px-8 sm:py-4 sm:px-12 rounded-full text-sm sm:text-base uppercase tracking-wider hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
              >
                RSVP Now
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Countdown Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-16 sm:py-20 md:py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <CountdownTimer targetDate={WEDDING_DATE} />

          <p className="mt-8 sm:mt-10 md:mt-12 mb-6 sm:mb-8 text-gray-600 px-4">
            Join us as we begin our forever together 💕
          </p>

          <button
            onClick={scrollToRSVP}
            className="bg-black text-white py-3 px-8 sm:py-4 sm:px-12 rounded-full text-sm sm:text-base uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            RSVP Now
          </button>
        </div>
      </motion.section>

      {/* Gallery Section */}
      {/* Mobile fixes:
         - center gallery images & background-image gallery items so faces/heads aren't cropped
         - target the first gallery image specifically
         - prevent hero heading overflow on very small screens
      */}
      <style>{`
        @media (max-width: 767px) {
          /* hero: keep heading on one line and scale down to fit */
          .hero-fix {
            padding-left: 1rem;
            padding-right: 1rem;
            box-sizing: border-box;
          }
          .hero-fix h1 {
            white-space: nowrap !important;          /* do not wrap */
            overflow: hidden;                        /* hide any tiny overflow */
            text-overflow: clip;
            font-size: clamp(18px, 6vw, 28px) !important; /* scale responsively */
            line-height: 1 !important;
            hyphens: none !important;
          }

          /* gallery: prefer centered focal point for <img> and background images */
          .gallery-fix img {
            object-position: center center !important;
            object-fit: cover !important;
          }
          /* some gallery implementations use background-image on items — center them too */
          .gallery-fix [style*="background-image"] {
            background-position: center center !important;
            background-size: cover !important;
          }
          /* ensure first gallery item is centered as well */
          .gallery-fix img:first-of-type,
          .gallery-fix .gallery-item:first-of-type img {
            object-position: center center !important;
          }
        }
      `}</style>
      <div className="gallery-fix">
        <GallerySection images={galleryImages} />
      </div>

      {/* Photo Upload Section */}
      <PhotoUploadSection />

      {/* Well Wishes Section */}
      <WellWishesSection />

      {/* The Schedule Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-white"
      >
        <div className="max-w-5xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center uppercase tracking-widest mb-4"
          >
            The Schedule
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-gray-600 mb-12"
          >
            Event of The Wedding
          </motion.p>

          <div className="space-y-8 mb-12">
            {/* Church Program */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <h3 className="uppercase tracking-wider text-sm mb-4 text-center">
                Church Program
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 justify-center">
                  <Calendar className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p>Sat, Nov 22nd 2025 | 1:00 PM (WAT)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 justify-center">
                  <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p>
                      The Peace Apostolic Church
                      <br />
                      Ado-Odo, Ogun State
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reception */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <h3 className="uppercase tracking-wider text-sm mb-4 text-center">
                Reception
              </h3>
              <div className="flex items-start gap-4 justify-center">
                <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                <div className="text-center">
                  <p className="text-sm text-gray-600">Location</p>
                  <p>Opposite Ado-Odo High School</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <p className="uppercase tracking-wider text-sm mb-4">
              Colours of the Day
            </p>
            <div className="flex justify-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                className="w-12 h-12 rounded-full bg-emerald-600 border-2 border-gray-300"
                title="Emerald Green"
              ></motion.div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                className="w-12 h-12 rounded-full bg-amber-400 border-2 border-gray-300"
                title="Gold"
              ></motion.div>
            </div>
          </motion.div>

          <div className="text-center">
            <button
              onClick={scrollToRSVP}
              className="bg-black text-white py-4 px-12 rounded-full uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              RSVP Now
            </button>
          </div>
        </div>
      </motion.section>

      {/* RSVP Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        id="rsvp-section"
        className="py-24 bg-black text-white"
      >
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-center uppercase tracking-widest mb-12">RSVP</h2>

          {!showRSVPForm ? (
            <div className="text-center">
              <p className="mb-8 text-gray-300">
                Please confirm your attendance
              </p>
              <button
                onClick={() => setShowRSVPForm(true)}
                className="bg-white text-black py-4 px-12 rounded-full uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                Fill RSVP Form
              </button>
            </div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleRSVP}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={rsvpData.firstName}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, firstName: e.target.value })
                  }
                  className="px-6 py-4 rounded-lg bg-gray-900 border border-gray-700 focus:border-white focus:outline-none transition-colors text-white placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={rsvpData.lastName}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, lastName: e.target.value })
                  }
                  className="px-6 py-4 rounded-lg bg-gray-900 border border-gray-700 focus:border-white focus:outline-none transition-colors text-white placeholder-gray-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={rsvpData.email}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, email: e.target.value })
                  }
                  className="px-6 py-4 rounded-lg bg-gray-900 border border-gray-700 focus:border-white focus:outline-none transition-colors text-white placeholder-gray-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={rsvpData.phone}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, phone: e.target.value })
                  }
                  className="px-6 py-4 rounded-lg bg-gray-900 border border-gray-700 focus:border-white focus:outline-none transition-colors text-white placeholder-gray-500"
                />
              </div>

              <select
                required
                value={rsvpData.attending}
                onChange={(e) =>
                  setRsvpData({ ...rsvpData, attending: e.target.value })
                }
                className="w-full px-6 py-4 rounded-lg bg-gray-900 border border-gray-700 focus:border-white focus:outline-none transition-colors text-white"
              >
                <option value="">Will you attend?</option>
                <option value="yes">Yes, I'll be there!</option>
                <option value="no">Sorry, I can't make it</option>
              </select>

              <textarea
                placeholder="Message / Song request"
                rows={4}
                value={rsvpData.message}
                onChange={(e) =>
                  setRsvpData({ ...rsvpData, message: e.target.value })
                }
                className="w-full px-6 py-4 rounded-lg bg-gray-900 border border-gray-700 focus:border-white focus:outline-none transition-colors text-white placeholder-gray-500"
              />

              <button
                type="submit"
                className="w-full bg-white text-black py-4 px-8 rounded-full uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                Submit RSVP
              </button>

              <p className="text-center text-sm text-gray-400 italic">
                By submitting, you confirm attendance and agree to the event
                guidelines.
              </p>
            </motion.form>
          )}
        </div>
      </motion.section>

      {/* Gift Section */}
      

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="bg-black text-white py-16 sm:py-20 md:py-24 text-center relative overflow-hidden">
        {/* Scrolling Text */}
        <div className="flex items-center justify-center pointer-events-none mb-8 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span
              className="text-white px-4 sm:px-6 md:px-8"
              style={{
                fontFamily: "'Snell Roundhand', cursive",
                fontSize: "clamp(40px, 8vw, 82px)",
              }}
            >
              Ife & Oluwasegun • Ife & Oluwasegun • Ife & Oluwasegun • Ife &
              Oluwasegun •
            </span>
            <span
              className="text-white px-4 sm:px-6 md:px-8"
              style={{
                fontFamily: "'Snell Roundhand', cursive",
                fontSize: "clamp(40px, 8vw, 82px)",
              }}
            >
              Ife & Oluwasegun • Ife & Oluwasegun • Ife & Oluwasegun • Ife &
              Oluwasegun •
            </span>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-400">
            Built by Chidera Frankie
          </p>
        </div>
      </footer>
    </div>
  );
}
