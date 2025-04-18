"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Coins, Check, TrendingUp, Shield, Calendar, GraduationCap, Percent } from "lucide-react"
import { motion } from "framer-motion"

export default function AkshayTritiyaLanding() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const mainCtaRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoSectionRef = useRef<HTMLElement>(null)
  const [cycleIndex, setCycleIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [isMainCtaVisible, setIsMainCtaVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isVideoSectionVisible, setIsVideoSectionVisible] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const testimonials = [
    {
      name: "Visvesh Iyengar",
      location: "Mumbai",
      text: "Excellent app and very user friendly. The digi gold buying experience has been very smooth and seamless every time I have done any transaction through this app.",
      avatar: "👨‍💼",
      rating: 5,
    },
    {
      name: "Ferguson Costner",
      location: "Delhi",
      text: "Straight forward, easy to use. Just started and enjoying the simple interface and ease of purchasing with a company I can trust.",
      avatar: "👨",
      rating: 5,
    },
    {
      name: "Hussain Mahuvawala",
      location: "Hyderabad",
      text: "Easy to use and invest, multiple options to buy Gold and Silver. Getting delivery is straight forward and secure. Support is very responsive.",
      avatar: "👨‍🦱",
      rating: 5,
    },
    {
      name: "Srinivas Rao",
      location: "Bangalore",
      text: "It is a good application and I never faced any difficulty in opening and payment made and I rate it 5 out of 5 in giving services in a high benefits to the customer without facing any trouble.",
      avatar: "👨‍🦳",
      rating: 5,
    },
  ]

  const benefits = [
    "Invest systematically for long-term wealth",
    "Protection against market volatility",
    "Build wealth with disciplined investing",
    "Gold: A timeless store of value",
    "12% Annual Growth – Gold has delivered solid returns over the last decade!",
    "All-Time High Alert – Prices just crossed ₹9,400/gm. Get in before it rises further!",
    "Global Trust – Central banks are buying. So can you!",
    "Inflation Shield – Gold protects your wealth in uncertain times.",
    "India Loves Gold – We're the 2nd largest gold consumers globally.",
    "Trending Now – Gold SIPs are India's latest investment wave.",
    "Start with Just ₹10 – Build wealth with small daily savings.",
    "Crisis-Proof – Gold thrives during market crashes.",
    "Physical delivery in coins, bars & jewellery partnered with CaratLane.",
    "Digital Advantage – 24K purity + instant liquidity at your fingertips.",
    "Timeless Value – Gold never goes out of style.",
    "One App, One Wallet – Buy, sell, and track effortlessly.",
    "Globally Respected – Your gold is welcome anywhere.",
    "Safe & Insured – Stored securely with full protection.",
    "Better Than FDs & Real Estate – Outperformed traditional investments in 5 years.",
    "Convert to Jewelry, EMI, or Cash – Anytime, anywhere.",
    "Akshaya Tritiya = Auspicious Beginnings – Start your SIP today and bring home prosperity.",
    "Used in Tech – Gold powers your gadgets too!",
    "History-Proven Stability – Gold retains value across generations.",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % benefits.length)
    }, 3500) // Adjusted timing for better readability

    return () => clearInterval(interval)
  }, [benefits.length])

  useEffect(() => {
    // Auto-rotate testimonials every 5 seconds
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    // Add shimmer effect to gold elements
    const interval = setInterval(() => {
      const goldElements = document.querySelectorAll(".gold-shimmer")
      goldElements.forEach((el) => {
        el.classList.add("animate-shimmer")
        setTimeout(() => {
          el.classList.remove("animate-shimmer")
        }, 2000)
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Check if device is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Set up intersection observer for main CTA
    if (mainCtaRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsMainCtaVisible(entry.isIntersecting)
        },
        { threshold: 0.1 },
      )

      observer.observe(mainCtaRef.current)

      // Set up intersection observer for video section
      if (videoSectionRef.current) {
        const videoSectionObserver = new IntersectionObserver(
          ([entry]) => {
            setIsVideoSectionVisible(entry.isIntersecting)
          },
          { threshold: 0.3 },
        )

        videoSectionObserver.observe(videoSectionRef.current)

        return () => {
          observer.disconnect()
          videoSectionObserver.disconnect()
          window.removeEventListener("resize", checkIfMobile)
          window.removeEventListener("scroll", handleScroll)
        }
      }

      // Track scrolling
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setHasScrolled(true)
        } else {
          setHasScrolled(false)
        }
      }

      window.addEventListener("scroll", handleScroll)

      return () => {
        observer.disconnect()
        window.removeEventListener("resize", checkIfMobile)
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout | null = null

    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer)

      if (!hasAutoScrolled) {
        inactivityTimer = setTimeout(() => {
  if (videoRef.current) {
    videoRef.current.scrollIntoView({ behavior: "smooth" })

    // ⏳ Delay to ensure the element is rendered and in view
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false
        const playPromise = videoRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("✅ Video autoplay triggered after scroll")
            })
            .catch((err) => {
              console.log("🚫 Autoplay blocked by browser:", err)
            })
        }
        setHasAutoScrolled(true)
      }
    }, 500) // ⏱️ Delay ensures video is visible and rendered
  }
}, 20000)

    }

    // Start the timer
    resetTimer()

    // Reset timer on user activity
    const handleActivity = () => resetTimer()

    // Add event listeners for user activity
    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("click", handleActivity)
    window.addEventListener("scroll", handleActivity)
    window.addEventListener("keypress", handleActivity)

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer)
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("click", handleActivity)
      window.removeEventListener("scroll", handleActivity)
      window.removeEventListener("keypress", handleActivity)
    }
  }, [hasAutoScrolled])

  useEffect(() => {
    // Set up intersection observer for video to unmute when visible
    if (videoRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && videoRef.current) {
              videoRef.current.muted = false
            }
          })
        },
        { threshold: 0.5 },
      )

      observer.observe(videoRef.current)

      return () => {
        if (videoRef.current) observer.unobserve(videoRef.current)
      }
    }
  }, [])

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleVideoError = () => {
    console.log("Video error occurred")
    setVideoError(true)
  }

  return (
    <div className="min-h-screen bg-teal-950 text-white" ref={scrollRef}>
      {/* Header with Logo */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-teal-950/95 backdrop-blur-sm border-b border-teal-900/50 py-3 shadow-md">
        <div className="container px-4 sm:px-5 mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 p-1.5 rounded-lg transition-colors duration-300"
            >
              <img
                src="/images/augmont-invert.png"
                alt="Augmont - Gold For All"
                className="h-10 sm:h-14 w-auto"
                style={{
                  maxWidth: "150px",
                  objectFit: "contain",
                  transform: "scale(1.15)",
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-shrink-0 transition-colors duration-300"
            >
              <img
                src="/images/digital-gold-simple-hai-logo.png"
                alt="Digital GOLD Sahi Hai"
                className="h-8 sm:h-10 w-auto"
                style={{
                  maxWidth: "120px",
                  objectFit: "contain",
                  transform: "scale(1)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-28 md:pt-28 md:pb-36">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-950 to-teal-900/90"></div>
          <div className="absolute inset-0 opacity-3 bg-pattern"></div>

          {/* Animated floating elements */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 md:w-12 md:h-12 animate-float-slow">
            <div className="w-full h-full bg-augmont-gold rounded-full opacity-20"></div>
          </div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 md:w-10 md:h-10 animate-float-medium">
            <div className="w-full h-full bg-augmont-gold rounded-full opacity-20"></div>
          </div>
          <div className="absolute bottom-1/4 right-1/3 w-8 h-8 md:w-12 md:h-12 animate-float-fast">
            <div className="w-full h-full bg-augmont-gold rounded-full opacity-20"></div>
          </div>
        </div>

        <div className="container px-4 sm:px-5 mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 w-full"
            >
              {/* Combined heading with Akshay Tritiya reference */}
              <h1 className="text-3xl font-bold text-white mb-8 md:text-4xl lg:text-5xl leading-tight">
                <span className="block mb-4">This Akshay Tritiya,</span>
                <div className="relative h-24 md:h-28 lg:h-32 w-full max-w-4xl mx-auto overflow-hidden bg-teal-900/30 rounded-lg border border-augmont-gold/10 my-6 px-3 sm:px-6 animate-fade-in">
                  {benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                        cycleIndex === i ? "opacity-100 transform-none" : "opacity-0 transform translate-y-4"
                      }`}
                      style={{ transitionDelay: cycleIndex === i ? "0ms" : "0ms" }}
                    >
                      <span className="text-augmont-gold gold-shimmer text-xl md:text-2xl lg:text-3xl font-bold text-center px-4">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="block mt-4">With Gold SIP</span>
              </h1>
            </motion.div>

            <motion.div
              ref={mainCtaRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-full max-w-md mb-10"
            >
              <Link
                href="https://augmont.com/digi-gold/buy"
                className="flex items-center justify-center w-full px-6 py-4 text-base font-medium text-teal-950 transition-all bg-augmont-gold rounded-lg shadow-lg md:text-lg hover:bg-augmont-gold/90 hover:shadow-xl active:translate-y-0.5"
              >
                Start My Gold SIP Now <ArrowRight className="ml-2" size={20} />
              </Link>

              <p className="mt-3 text-sm text-center text-gray-400">No commitments. Start or stop anytime.</p>
            </motion.div>

            {/* Trust Badges - Moved up from separate section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 gap-4 md:grid-cols-4 w-full max-w-4xl"
            >
              {[
                {
                  icon: "24K",
                  text: "99.99% Pure Gold",
                  isText: true,
                },
                {
                  icon: "lock",
                  text: "Vault Secured",
                },
                {
                  icon: "shield",
                  text: "Physical Delivery",
                },
                {
                  icon: "demat",
                  text: "No Demat Required",
                  isText: true,
                },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex flex-col items-center p-3 text-center bg-teal-800/50 rounded-lg border border-teal-800/50"
                >
                  <div className="flex items-center justify-center w-12 h-12 mb-2 bg-teal-800 rounded-full gold-shimmer sm:w-14 sm:h-14">
                    {badge.isText ? (
                      badge.icon === "demat" ? (
                        <span className="text-xs font-bold text-augmont-gold sm:text-sm">NO DEMAT</span>
                      ) : (
                        <span className="text-xl font-bold text-augmont-gold sm:text-2xl">24K</span>
                      )
                    ) : (
                      <span className="text-augmont-gold">
                        {badge.icon === "lock" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        )}
                        {badge.icon === "shield" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-200">{badge.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Highlight Section */}
      <section className="py-10 bg-gradient-to-b from-teal-900 to-teal-950">
        <div className="container px-4 sm:px-5 mx-auto max-w-5xl">
          <div className="mx-auto overflow-hidden rounded-xl shadow-2xl border border-augmont-gold/30">
            <div className="w-full bg-gradient-to-r from-teal-900 to-teal-800 p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
                  <h3 className="text-xl font-semibold text-white mb-2">Gold SIP Benefits</h3>
                  <div className="relative h-16 mb-3 w-full md:w-96 overflow-hidden">
                    {benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className={`absolute inset-0 flex items-center justify-center md:justify-start transition-opacity duration-700 ${
                          cycleIndex === i ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <span className="text-augmont-gold text-base md:text-lg whitespace-normal px-2 py-1 leading-tight font-medium max-w-full">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-augmont-gold">₹50</span>
                    <span className="text-gray-400 ml-1">minimum</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Link
                    href="https://augmont.com/digi-gold/buy"
                    className="flex items-center justify-center w-20 h-20 bg-augmont-gold/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-augmont-gold/30 transition-all cursor-pointer"
                  >
                    <span className="text-5xl drop-shadow-md">💰</span>
                  </Link>
                  <Link
                    href="https://augmont.com/digi-gold/buy"
                    className="flex items-center justify-center w-20 h-20 bg-augmont-gold/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-augmont-gold/30 transition-all cursor-pointer"
                  >
                    <span className="text-5xl drop-shadow-md">✨</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Video Explainer Section */}
      <section className="py-10 bg-teal-950" ref={videoSectionRef}>
        <div className="container px-4 sm:px-5 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-bold text-white md:text-3xl">Watch How Gold SIP Works</h2>
            <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
              See how easy it is to start your wealth-building journey with Gold SIP
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden shadow-2xl border border-augmont-gold/30 bg-teal-900/50 w-full mx-auto"
          >
            <div className="relative w-full">
              {!videoError ? (
                <video
                  className="w-full h-auto object-contain max-w-3xl mx-auto"
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  ref={videoRef}
                  style={{ maxHeight: "70vh" }}
                  poster="/images/gold-background.jpg"
                  onError={handleVideoError}
                >
                  <source src="/videos/Video-815.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="flex flex-col items-center justify-center bg-teal-900 p-8 rounded-lg text-center min-h-[300px]">
                  <div className="text-5xl mb-4">📽️</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Video Unavailable</h3>
                  <p className="text-gray-300 max-w-md mx-auto mb-4">
                    The video could not be loaded. Please check your connection or try again later.
                  </p>
                  <Link
                    href="https://augmont.com/digi-gold/buy"
                    className="inline-flex items-center px-6 py-3 text-sm font-medium text-teal-950 transition-all bg-augmont-gold rounded-lg shadow-lg hover:bg-augmont-gold/90 hover:shadow-xl active:translate-y-0.5"
                  >
                    Start My Gold SIP <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
              )}

              {/* Gold shimmer overlay */}
              <div className="absolute inset-0 pointer-events-none border-2 border-augmont-gold/20 rounded-xl gold-shimmer"></div>
            </div>

            <div className="p-4 bg-teal-900/80 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-augmont-gold mr-2">📽️</span>
                <span className="text-sm font-medium text-white">Gold SIP Benefits Explained</span>
              </div>
              <div className="text-xs text-gray-400">
                <span className="inline-flex items-center">
                  <span className="mr-1 text-augmont-gold">⭐</span> Featured
                </span>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-6">
            <Link
              href="https://augmont.com/digi-gold/buy"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-teal-950 transition-all bg-augmont-gold rounded-lg shadow-lg hover:bg-augmont-gold/90 hover:shadow-xl active:translate-y-0.5"
            >
              Start My Gold SIP <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter - Moved up for better flow */}
      <section className="py-8 bg-teal-900">
        <div className="container px-4 sm:px-5 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { value: "₹50", label: "Minimum Investment" },
              { value: "12%", label: "Annual Returns" },
              { value: "No Demat", label: "Account Required" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 text-center rounded-lg bg-teal-800/50 border border-teal-800"
              >
                <div className="text-3xl font-bold text-augmont-gold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Gold SIP Section */}
      <section className="py-12 bg-teal-950">
        <div className="container px-4 sm:px-5 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-2xl font-bold text-white md:text-3xl">What is Gold SIP?</h2>
            <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
              Digital Gold is similar to physical Gold, but without the need of storage for customer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Coins className="text-augmont-gold" size={32} />,
                title: "Regular Investment",
                desc: "Gold SIP helps you regularly invest in small amounts",
              },
              {
                icon: <Calendar className="text-augmont-gold" size={32} />,
                title: "Flexible Schedule",
                desc: "You can invest on a daily, weekly, or monthly basis",
              },
              {
                icon: <TrendingUp className="text-augmont-gold" size={32} />,
                title: "Start Small",
                desc: "Starting from ₹50, you can steadily accumulate Gold over time",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col p-5 rounded-lg bg-gradient-to-br from-teal-900 to-teal-800/80 border border-teal-800 hover:border-augmont-gold/30 transition-all shadow-lg h-full"
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 bg-teal-800 rounded-full gold-shimmer">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                </div>

                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Section - Moved up for better flow */}
      <section className="py-12 text-center bg-gradient-to-b from-teal-950 to-teal-900">
        <div className="container px-4 sm:px-5 mx-auto max-w-4xl">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-augmont-gold/10 rounded-full blur-xl"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 flex items-center justify-center bg-teal-800 rounded-full gold-shimmer">
                  <span className="text-4xl">👨‍👧</span>
                </div>
              </div>

              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">For Example:</h2>

              <div className="bg-teal-900/50 p-6 rounded-lg border border-augmont-gold/20 max-w-2xl mx-auto mb-8">
                <p className="text-lg text-gray-200 leading-relaxed">
                  Varun, starts a Gold SIP for <span className="text-augmont-gold font-bold">₹5,000 per month</span>.
                  Assuming a 12% annual return, after 10 years, his investment could grow to approximately{" "}
                  <span className="text-augmont-gold font-bold">₹11 Lakhs</span>—helping him secure his daughters'
                  future.
                </p>
              </div>

              <div className="inline-flex items-center px-5 py-2 bg-teal-800/50 rounded-full">
                <span className="mr-2 text-xl text-augmont-gold">🪔</span>
                <span className="text-gray-200">This Akshay Tritiya, start your Gold SIP journey</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Invest in Gold SIP */}
      <section className="py-12 bg-teal-950">
        <div className="container px-4 sm:px-5 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-2xl font-bold text-white md:text-3xl">Why Invest in Gold SIP?</h2>
            <p className="mt-3 text-gray-300 max-w-2xl mx-auto">Make wealth-building a habit, not a one-time event</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <GraduationCap className="text-augmont-gold" size={32} />,
                title: "Life Goals",
                desc: "Gold is a trusted investment for life goals like education and marriage",
                benefits: ["Education planning", "Wedding expenses", "Retirement security"],
              },
              {
                icon: <Percent className="text-augmont-gold" size={32} />,
                title: "Capital Appreciation",
                desc: "Gold SIP offers approx. 12% annual capital appreciation with hassle-free savings",
                benefits: ["Consistent returns", "Long-term growth", "Wealth accumulation"],
              },
              {
                icon: <Shield className="text-augmont-gold" size={32} />,
                title: "Protection",
                desc: "Gold is a hedge against market volatility and inflation",
                benefits: ["Inflation protection", "Market crash buffer", "Convert to physical gold anytime"],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col p-5 rounded-lg bg-gradient-to-br from-teal-900 to-teal-800/80 border border-teal-800 hover:border-augmont-gold/30 transition-all shadow-lg h-full"
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 bg-teal-800 rounded-full gold-shimmer">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                </div>

                <p className="text-gray-300 mb-4">{item.desc}</p>

                <div className="bg-teal-900/50 p-3 rounded-md mb-4 border border-teal-800/50">
                  <p className="text-augmont-gold text-sm font-medium mb-2">Key Benefits:</p>
                  <ul className="space-y-1">
                    {item.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <Check size={16} className="text-augmont-gold mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gradient-to-b from-teal-950 to-teal-900">
        <div className="container px-4 sm:px-5 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-bold text-white md:text-3xl">What Our Customers Say</h2>
            <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied investors building their gold portfolio with Augmont
            </p>
          </motion.div>

          <div className="relative">
            {/* Desktop Testimonial Grid */}
            <div className="hidden md:grid grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg bg-gradient-to-br from-teal-900 to-teal-800 shadow-lg border border-teal-800"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-14 h-14 overflow-hidden bg-teal-700 rounded-full gold-shimmer">
                        <div className="flex items-center justify-center w-full h-full">
                          <span className="text-2xl">{testimonial.avatar}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-augmont-gold text-sm">
                            ★
                          </span>
                        ))}
                      </div>

                      <blockquote className="mb-3 text-white text-sm">"{testimonial.text}"</blockquote>

                      <div className="flex items-center">
                        <span className="text-gray-400 text-xs">{testimonial.name},</span>
                        <span className="ml-1 text-gray-500 text-xs">{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Testimonial Slider */}
            <div className="md:hidden">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-lg bg-gradient-to-br from-teal-900 to-teal-800 shadow-lg border border-teal-800"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-14 h-14 overflow-hidden bg-teal-700 rounded-full gold-shimmer">
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="text-2xl">{testimonials[testimonialIndex].avatar}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                        <span key={i} className="text-augmont-gold text-sm">
                          ★
                        </span>
                      ))}
                    </div>

                    <blockquote className="mb-3 text-white text-sm">"{testimonials[testimonialIndex].text}"</blockquote>

                    <div className="flex items-center">
                      <span className="text-gray-400 text-xs">{testimonials[testimonialIndex].name},</span>
                      <span className="ml-1 text-gray-500 text-xs">{testimonials[testimonialIndex].location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={prevTestimonial}
                  className="px-4 py-2 bg-teal-800/50 text-gray-300 rounded-lg hover:bg-teal-800 transition-colors"
                >
                  Prev
                </button>
                <button
                  onClick={nextTestimonial}
                  className="px-4 py-2 bg-teal-800/50 text-gray-300 rounded-lg hover:bg-teal-800 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-teal-950">
        <div className="container px-4 sm:px-5 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 md:text-4xl">Start Building Your Gold Portfolio Today</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Invest in Gold SIP and secure your financial future with the timeless value of gold.
            </p>

            <Link
              href="https://augmont.com/digi-gold/buy"
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-teal-950 transition-all bg-augmont-gold rounded-lg shadow-lg hover:bg-augmont-gold/90 hover:shadow-xl active:translate-y-0.5"
            >
              Get Started Now <ArrowRight className="ml-2" size={24} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-teal-900 border-t border-teal-800">
        <div className="container px-4 sm:px-5 mx-auto max-w-5xl text-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Augmont Gold. All rights reserved.</p>
        </div>
      </footer>

      {/* Sticky CTA Button - Appears when scrolled and not on video section */}
      {hasScrolled && !isMainCtaVisible && !isVideoSectionVisible && (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-4 flex justify-center animate-fade-in">
          <Link
            href="https://augmont.com/digi-gold/buy"
            className="flex items-center justify-center px-6 py-3 text-base font-medium text-teal-950 transition-all bg-augmont-gold rounded-lg shadow-xl md:text-lg hover:bg-augmont-gold/90 active:translate-y-0.5 animate-pulse"
            style={{
              animation: "pulse 2s infinite",
              boxShadow: "0 0 15px 5px rgba(212, 175, 55, 0.5)",
              maxWidth: "300px",
              width: "100%",
            }}
          >
            Start My Gold SIP Now <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      )}
    </div>
  )
}
