'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Home, Grid3x3, Settings, User } from 'lucide-react'

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
    transition: { duration: 0.4, ease: 'easeOut' },
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
          setVisitorCount(data.count)
        }
      } catch (error) {
        console.error('[v0] Error fetching live visitors:', error)
      }
    }
    
    fetchLiveVisitors()
    const interval = setInterval(fetchLiveVisitors, 10000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen text-foreground overflow-hidden relative bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Search and Admin Header */}
        <motion.header
          className="px-5 md:px-8 py-6 flex flex-col gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center">
            <h1 className="font-comic text-xl md:text-2xl font-700 text-primary">
              Welcome Ceremony
            </h1>
            <Link href="/admin/login">
              <Button variant="outline" className="rounded-xl border-2 border-accent/50">
                Admin
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto w-full">
            <div className="relative rounded-full bg-gradient-to-r from-accent/30 to-primary/30 p-0.5">
              <input
                type="text"
                placeholder="What would you like to know?"
                className="w-full bg-background/80 text-foreground placeholder:text-foreground/50 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </motion.header>

        {/* Main Galaksi-style container */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center px-5 md:px-8 pb-24 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full max-w-5xl space-y-8">
            {/* Hero Section with layered rounded cards */}
            <motion.div
              className="relative rounded-4xl overflow-hidden"
              variants={itemVariants}
            >
              <div className="gradient-glass-card rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 card-shadow-3d relative z-10">
                {/* Left Content */}
                <div className="flex-1 space-y-6">
                  <div>
                    <p className="text-xs md:text-sm uppercase tracking-widest text-accent font-comic font-bold mb-3">
                      Challenge ✨ Welcome Ceremony
                    </p>
                    <h2 className="text-4xl md:text-5xl font-700 text-foreground mb-4 font-comic" style={{
                      background: 'linear-gradient(135deg, hsl(45 95% 70%) 0%, hsl(0 65% 45%) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      You&apos;re in!
                    </h2>
                  </div>

                  <div className="bg-background/30 rounded-2xl p-4 border border-accent/20">
                    <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                      Join us for an interactive welcome ceremony. Ask questions, test your knowledge, and share your feedback. Make connections and celebrate together!
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Link href="/ask-question" className="flex-1">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-comic font-bold py-6">
                        ASK QUESTION
                      </Button>
                    </Link>
                    <Link href="/quiz" className="flex-1">
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl font-comic font-bold py-6">
                        START QUIZ
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Peacock Mascot */}
                <motion.div
                  className="flex-1 flex justify-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="relative w-48 h-48 md:w-64 md:h-64">
                    <Image
                      src="/peacock-mascot.jpg"
                      alt="Welcome Peacock Mascot"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
              variants={itemVariants}
            >
              {[
                { label: 'Home', icon: Home },
                { label: 'Gallery', icon: Grid3x3 },
                { label: 'Settings', icon: Settings },
                { label: 'Profile', icon: User },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="rounded-2xl gradient-glass-card p-4 card-shadow-3d flex flex-col items-center justify-center gap-2 cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/40 transition-colors">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-xs md:text-sm font-comic text-foreground/80 group-hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Info Cards - Galaksi Style Curved Layout */}
            <motion.div
              className="space-y-4"
              variants={itemVariants}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Card */}
                <div className="rounded-3xl gradient-glass-card p-6 card-shadow-3d overflow-hidden relative">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <h3 className="font-comic font-bold text-lg text-primary mb-3">Learn About Us</h3>
                    <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                      Discover what makes our welcome ceremony special. Interactive, engaging, and designed for everyone.
                    </p>
                    <button className="text-accent hover:text-accent/80 font-comic font-bold text-sm flex items-center gap-2">
                      → Continue here
                    </button>
                  </div>
                </div>

                {/* Right Card with Live Count */}
                <div className="rounded-3xl gradient-glass-card p-6 card-shadow-3d overflow-hidden relative">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <h3 className="font-comic font-bold text-lg text-primary mb-3">Join Now</h3>
                    {visitorCount > 0 && (
                      <p className="text-sm text-foreground/80 mb-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent font-bold text-xs">
                          <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse" />
                          {visitorCount} {visitorCount === 1 ? 'person' : 'people'} here now
                        </span>
                      </p>
                    )}
                    <button className="text-accent hover:text-accent/80 font-comic font-bold text-sm flex items-center gap-2">
                      → Sample this
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation Preview */}
              <div className="rounded-3xl gradient-glass-card p-8 card-shadow-3d">
                <p className="text-center text-xs uppercase tracking-widest text-foreground/60 mb-4 font-comic font-bold">
                  Explore More Activities
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: 'Ask Questions', icon: '💭' },
                    { title: 'Take Quiz', icon: '🧠' },
                    { title: 'Leaderboard', icon: '🏆' },
                    { title: 'Give Feedback', icon: '⭐' },
                  ].map((activity, index) => (
                    <Link key={index} href={
                      activity.title === 'Ask Questions' ? '/ask-question' :
                      activity.title === 'Take Quiz' ? '/quiz' :
                      activity.title === 'Leaderboard' ? '/leaderboard' :
                      '/feedback'
                    }>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="rounded-2xl bg-background/40 border border-accent/30 p-4 text-center cursor-pointer hover:border-accent/60 transition-colors"
                      >
                        <div className="text-3xl mb-2">{activity.icon}</div>
                        <p className="text-xs md:text-sm font-comic text-foreground/80 font-bold">
                          {activity.title}
                        </p>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Navigation Bar */}
        <motion.nav
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-background to-background/80 backdrop-blur-xl border-t border-accent/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="max-w-5xl mx-auto flex justify-around items-center px-5 py-3">
            {[
              { icon: Home, label: 'Home', href: '/' },
              { icon: Grid3x3, label: 'Explore', href: '/leaderboard' },
              { icon: Settings, label: 'More', href: '/feedback' },
              { icon: User, label: 'Profile', href: '/' },
            ].map((nav, index) => (
              <Link key={index} href={nav.href}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-accent/10 transition-colors"
                >
                  <nav.icon className="w-6 h-6 text-foreground/70 group-hover:text-accent" />
                  <span className="text-xs text-foreground/60 mt-1">{nav.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.nav>
      </div>
    </main>
  )
}
