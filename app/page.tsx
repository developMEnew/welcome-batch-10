'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Search, Home, Grid3x3, Settings, User, ArrowRight, Plus, ChevronDown } from 'lucide-react'
import Image from 'next/image'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const floatVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
}

export default function Landing() {
  const [mounted, setMounted] = useState(false)
  const [visitorCount, setVisitorCount] = useState(0)

  useEffect(() => {
    setMounted(true)
    const fetchLiveVisitors = async () => {
      try {
        const response = await fetch('/api/analytics/live-visitors', {
          method: 'GET',
        })
        if (response.ok) {
          const data = await response.json()
          setVisitorCount(data.liveVisitors || 0)
        }
      } catch (error) {
        console.error('Failed to fetch live visitors:', error)
      }
    }

    fetchLiveVisitors()
    const interval = setInterval(fetchLiveVisitors, 10000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#2a1a4d] via-[#3d2563] to-[#1a0f3d] text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Top Navigation Bar */}
        <motion.nav
          className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Search Bar */}
          <div className="w-full md:w-96 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
            <div className="relative flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#4a3a7d]/40 to-[#3d2b5a]/40 rounded-full border border-purple-400/30 backdrop-blur-xl group-hover:border-purple-400/50 transition-all">
              <Search className="w-5 h-5 text-purple-300" />
              <input
                type="text"
                placeholder="Keindahan merak itu apa sih?"
                className="bg-transparent outline-none text-sm text-white placeholder-purple-200/60 w-full"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            {/* Notification/Message Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-gradient-to-br from-[#4a3a7d]/50 to-[#3d2b5a]/50 rounded-xl border border-purple-400/30 hover:border-purple-400/60 transition-all backdrop-blur-sm"
            >
              <div className="text-lg">🔔</div>
            </motion.button>

            {/* Profile Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-gradient-to-br from-[#5a4a8d]/60 to-[#4d3b6d]/60 rounded-xl border border-amber-400/40 hover:border-amber-400/70 transition-all backdrop-blur-sm"
            >
              <div className="text-lg">✨</div>
            </motion.button>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto items-center mt-4 md:mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <p className="text-xs md:text-sm tracking-widest text-purple-300/70 mb-2 md:mb-4">
              CHALLENGE UI · WEB DESIGN
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-4 leading-tight">
              <span className="text-amber-300">KEINDAHAN</span>
              <br />
              <span className="text-amber-100 italic font-light">Merak</span>
            </h1>
            <p className="text-xs md:text-sm tracking-widest text-purple-300/60 mb-6 md:mb-8">
              ASKAR AKMIL DESIGN
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login">
                  <Button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-black font-bold rounded-full transition-all">
                    LOGIN
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup">
                  <Button className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-purple-400 text-purple-300 hover:bg-purple-400/10 font-bold rounded-full transition-all">
                    BUAT AKUN
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Bottom Navigation Icons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-3 bg-gradient-to-br from-[#4a3a7d]/50 to-[#3d2b5a]/50 rounded-xl border border-amber-400/50 hover:border-amber-400/80 transition-all"
              >
                <Home className="w-6 h-6 text-amber-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-3 bg-gradient-to-br from-[#4a3a7d]/50 to-[#3d2b5a]/50 rounded-xl border border-amber-400/50 hover:border-amber-400/80 transition-all"
              >
                <Grid3x3 className="w-6 h-6 text-amber-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-3 bg-gradient-to-br from-[#4a3a7d]/50 to-[#3d2b5a]/50 rounded-xl border border-amber-400/50 hover:border-amber-400/80 transition-all"
              >
                <Settings className="w-6 h-6 text-amber-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-3 bg-gradient-to-br from-[#4a3a7d]/50 to-[#3d2b5a]/50 rounded-xl border border-amber-400/50 hover:border-amber-400/80 transition-all"
              >
                <User className="w-6 h-6 text-amber-300" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right - Hero Image and Info Card */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 md:gap-6"
          >
            {/* Featured Peacock Image */}
            <motion.div
              className="relative rounded-3xl overflow-hidden border-2 border-purple-400/40 backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-blue-500/10 p-1"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/peacock-hero.jpg"
                  alt="Keindahan Merak"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>

            {/* Info Card */}
            <motion.div
              className="bg-gradient-to-br from-[#4a3a7d]/40 to-[#3d2b5a]/40 rounded-3xl border border-purple-400/30 backdrop-blur-xl p-6 md:p-8 hover:border-purple-400/60 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg md:text-xl font-bold text-amber-300 mb-3 md:mb-4">
                MERAK ADALAH ...
              </h3>
              <p className="text-sm md:text-base text-purple-100/80 leading-relaxed">
                Simbol keindahan, keanggunan, dan kebanggan. Merak dikenal dengan bulu ekornya yang indah dan berwarna-warni. Dalam banyak budaya, merak melambangkan kemewahan, kebijaksanaan, dan keberuntungan.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Featured Section */}
        <motion.div
          className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-8 md:mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8 md:mb-12"
          >
            <p className="text-xs md:text-sm tracking-widest text-amber-300/70 mb-2">
              PENJELASAN SINGKAT TENTANG MERAK
            </p>
          </motion.div>

          {/* Featured Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-4 md:gap-6"
            variants={containerVariants}
          >
            {/* Main Card - Left */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-1 bg-gradient-to-br from-[#4a3a7d]/40 to-[#3d2b5a]/40 rounded-3xl border border-purple-400/30 backdrop-blur-xl p-6 md:p-8 hover:border-purple-400/60 transition-all flex flex-col justify-between"
            >
              <div>
                <p className="text-sm md:text-base text-purple-100/80 leading-relaxed mb-6">
                  Merak (Pavo cristatus) adalah burung yang terkenal karena keindahan bulu ekornya yang menakjubkan. Bulu ini digunakan oleh merak jantan untuk menarik perhatian merak betina saat musim kawin.
                </p>
              </div>
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-amber-300 font-semibold text-sm hover:text-amber-200 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                Lanjutkan...
              </motion.button>
            </motion.div>

            {/* Center - Featured Image */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-1 flex items-center justify-center"
            >
              <motion.div
                className="relative w-full h-96 md:h-full rounded-3xl overflow-hidden border-2 border-amber-400/40"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/peacock-feather-close.jpg"
                  alt="Peacock Detail"
                  fill
                  className="object-cover"
                />
                {/* Golden circle frame effect */}
                <div className="absolute inset-0 rounded-3xl border-8 border-amber-400/20 pointer-events-none" />
              </motion.div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-1 bg-gradient-to-br from-[#4a3a7d]/40 to-[#3d2b5a]/40 rounded-3xl border border-purple-400/30 backdrop-blur-xl p-6 md:p-8 hover:border-purple-400/60 transition-all flex flex-col justify-between"
            >
              <div>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-amber-300 font-semibold text-sm hover:text-amber-200 transition-colors mb-4"
                >
                  <ArrowRight className="w-4 h-4" />
                  Sampe ini aja.
                </motion.button>
                <p className="text-sm md:text-base text-purple-100/80 leading-relaxed">
                  Selain indah, merak juga melambangkan nilai-nilai positif seperti kepercayaan diri, keanggunan, dan kebhakshanan. Motif bulu merak sering digunakan dalam seni, budaya, dan desain sebagai inspirasi.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex justify-center mt-12 md:mt-16"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs md:text-sm tracking-widest text-amber-300">GULIR</p>
            <div className="w-8 h-8 rounded-full border-2 border-amber-400/40 flex items-center justify-center">
              <ChevronDown className="w-4 h-4 text-amber-300" />
            </div>
          </div>
        </motion.div>

        {/* Gallery Section */}
        <motion.div
          className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-12 md:mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        >
          {/* Gallery Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            variants={containerVariants}
          >
            {/* Card 1 */}
            <motion.div
              variants={itemVariants}
              className="relative group rounded-3xl overflow-hidden border-2 border-amber-400/40 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-full aspect-square">
                <Image
                  src="/peacock-feather-close.jpg"
                  alt="Peacock Feather"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-amber-300 font-semibold"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={itemVariants}
              className="relative group rounded-3xl overflow-hidden border-2 border-amber-400/40 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-full aspect-square">
                <Image
                  src="/peacock-profile.jpg"
                  alt="Peacock Profile"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-amber-300 font-semibold"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Card 3 - Large */}
            <motion.div
              variants={itemVariants}
              className="sm:col-span-2 lg:col-span-1 lg:row-span-2 relative group rounded-3xl overflow-hidden border-2 border-amber-400/40 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-full h-full aspect-auto lg:aspect-square">
                <Image
                  src="/peacock-garden.jpg"
                  alt="Peacock in Garden"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-amber-300 font-semibold"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              variants={itemVariants}
              className="relative group rounded-3xl overflow-hidden border-2 border-amber-400/40 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-full aspect-square">
                <Image
                  src="/peacock-hero.jpg"
                  alt="Peacock Hero"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-amber-300 font-semibold"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Add Button */}
          <motion.div
            className="flex justify-end mt-8"
            variants={itemVariants}
          >
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(217, 119, 6, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full border-2 border-purple-400/50 bg-gradient-to-br from-[#4a3a7d]/50 to-[#3d2b5a]/50 flex items-center justify-center hover:border-amber-400/70 transition-all backdrop-blur-xl"
            >
              <Plus className="w-8 h-8 text-amber-300" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-16 md:mt-24 pb-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xs md:text-sm tracking-widest text-purple-300/50">
            ✨ CREATED BY MUHAMMAD FAJRI ✨
          </p>
        </motion.footer>
      </div>
    </main>
  )
}
