import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const faces = [
  '/images/octopus.png',
  '/images/octopus-silly1.png',
  '/images/octopus-silly2.png',
]

export default function OctopusEasterEgg() {
  const [faceIndex, setFaceIndex] = useState(0)

  const handleClick = useCallback(() => {
    setFaceIndex((i) => (i + 1) % faces.length)
  }, [])

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      aria-label="Ella the octopus"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.img
          key={faceIndex}
          src={faces[faceIndex]}
          alt="Ella"
          className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </motion.div>
    </motion.button>
  )
}
