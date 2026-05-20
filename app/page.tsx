'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Sparkles, Users, Zap, Trophy } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export default function Landing() {
  const [mounted, setMounted] = useState(false)
  const [visitorCount, setVisitorCount] = useState(0)

  useEffect(() => {
    setMounted(true)
    // Fetch live visitor count from Vercel Analytics
    const fetchLiveVisitors = async () => {
      try {
        const response = await fetch('/api/analytics/live-visitors', {
          method: 'GET',
        })
        if (response.ok) {
          const data = await response.json()
          setVisitorCount(data.count)
          console.log('[v0] Live visitors from', data.source, ':', data.count)
        }
      } catch (error) {
        console.error('[v0] Error fetching live visitors:', error)
      }
    }
    
    // Fetch immediately
    fetchLiveVisitors()
    
    // Refresh every 10 seconds
    const interval = setInterval(fetchLiveVisitors, 10000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen text-foreground overflow-hidden relative">
      {/* Decorative peacock-inspired gradients */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/25 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] opacity-60" style={{ animation: 'float 8s ease-in-out infinite' }} />
      <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-muted/15 rounded-full blur-[100px]" style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '2s' }} />

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="text-4xl sm:text-3xl">✨</div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent">
                Welcome
              </h1>
              <p className="text-sm text-foreground/70 mt-1">Ceremony & Experience</p>
            </div>
            {visitorCount > 0 && (
              <motion.div
                className="text-xs sm:text-sm text-foreground/90 ml-0 sm:ml-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl gradient-glass-card card-shadow-3d whitespace-nowrap">
                  <span className="inline-block w-2 h-2 bg-accent rounded-full" style={{ animation: 'pulse-glow 1.5s ease-in-out infinite' }} />
                  <span className="font-semibold">{visitorCount} {visitorCount === 1 ? 'person' : 'people'}</span>
                </span>
              </motion.div>
            )}
          </div>
          <Link href="/admin/login" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto text-xs sm:text-sm border-2 border-accent text-accent hover:bg-accent/10 rounded-xl transition-all btn-3d"
            >
              Admin Access
            </Button>
          </Link>
        </motion.header>

        {/* Main content */}
        <motion.div
          className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 sm:px-6 lg:px-8 py-12 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div className="text-center max-w-3xl w-full mb-4 sm:mb-8" variants={itemVariants}>
            <motion.div 
              className="mb-4 sm:mb-6 inline-block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-5xl sm:text-6xl lg:text-7xl">👑</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4" style={{
              background: 'linear-gradient(135deg, hsl(45 100% 56%) 0%, hsl(45 95% 58%) 40%, hsl(260 50% 40%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              You&apos;re In!
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/80 leading-relaxed">
              Join an extraordinary welcome experience. Connect with peers, showcase your knowledge, and make your voice heard.
            </p>
          </motion.div>

          {/* Main CTA Buttons */}
          <motion.div
            className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-10 w-full sm:max-w-2xl lg:max-w-4xl justify-center"
            variants={itemVariants}
          >
            <Link href="/ask-question" className="w-full">
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="w-full h-12 sm:h-14 bg-gradient-to-br from-secondary to-accent hover:opacity-90 text-secondary-foreground rounded-2xl font-bold text-base sm:text-lg btn-3d flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Ask a Question
                </Button>
              </motion.div>
            </Link>

            <Link href="/quiz" className="w-full">
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="w-full h-12 sm:h-14 bg-gradient-to-br from-primary to-secondary hover:opacity-90 text-primary-foreground rounded-2xl font-bold text-base sm:text-lg btn-3d flex items-center justify-center gap-2 transition-all"
                >
                  <Zap className="w-5 h-5" />
                  Take the Quiz
                </Button>
              </motion.div>
            </Link>

            <Link href="/leaderboard" className="w-full">
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="w-full h-12 sm:h-14 bg-gradient-to-br from-accent to-primary hover:opacity-90 text-accent-foreground rounded-2xl font-bold text-base sm:text-lg btn-3d flex items-center justify-center gap-2 transition-all"
                >
                  <Trophy className="w-5 h-5" />
                  Leaderboard
                </Button>
              </motion.div>
            </Link>

            <Link href="/feedback" className="w-full">
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="w-full h-12 sm:h-14 gradient-maroon-gold hover:opacity-90 text-white rounded-2xl font-bold text-base sm:text-lg btn-3d flex items-center justify-center gap-2 transition-all"
                >
                  <ArrowRight className="w-5 h-5" />
                  Your Feedback
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Feature Cards Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-12 sm:mt-16 w-full max-w-5xl"
            variants={containerVariants}
          >
            {[
              {
                title: 'Live Q&A',
                description: 'Real-time engagement',
                icon: Users,
                color: 'from-accent/20 to-primary/20'
              },
              {
                title: 'Knowledge Test',
                description: 'Fun challenges',
                icon: Zap,
                color: 'from-primary/20 to-secondary/20'
              },
              {
                title: 'Compete & Win',
                description: 'Climb the ranks',
                icon: Trophy,
                color: 'from-secondary/20 to-accent/20'
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className="group rounded-2xl overflow-hidden backdrop-blur-md"
                  variants={scaleVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className={`bg-gradient-to-br ${feature.color} p-6 sm:p-8 text-center card-shadow-3d glow-border rounded-2xl h-full flex flex-col justify-center items-center`}>
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-accent mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-base sm:text-lg text-foreground mb-1 sm:mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/70">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-12 sm:mt-16 text-center"
            variants={itemVariants}
          >
            <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-6">
              💬 Your feedback shapes our future
            </p>
            <Link href="/leaderboard">
              <Button
                variant="outline"
                className="border-2 border-accent text-accent hover:bg-accent/10 rounded-full px-6 sm:px-8 py-2 sm:py-3 font-semibold transition-all"
              >
                Explore Leaderboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
