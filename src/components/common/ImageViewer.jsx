import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function ImageViewer({ viewer, onClose, closeLabel }) {
  useEffect(() => {
    if (!viewer) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [viewer, onClose])

  return (
    <AnimatePresence>
      {viewer && (
        <motion.div
          key="image-viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={viewer.title}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-full flex flex-col items-end gap-3"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>
            <img
              src={viewer.src}
              alt={viewer.title}
              className="w-full max-h-[80vh] object-contain rounded-xl bg-white"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
