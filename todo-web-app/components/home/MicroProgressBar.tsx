import { motion } from 'framer-motion'

interface MicroProgressBarProps {
  activeSection: number
  totalSections: number
  colorClass: string
  visible: boolean
}

export const MicroProgressBar = ({ activeSection, totalSections, colorClass, visible }: MicroProgressBarProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: visible ? 1 : 0 }}
    transition={{ duration: 0.4 }}
    className={`fixed top-0 left-0 w-full h-1 z-50 bg-gray-200/40`}
    style={{ pointerEvents: 'none' }}
  >
    <motion.div
      className={`h-full ${colorClass} rounded-r-full`}
      initial={{ width: 0 }}
      animate={{ width: `${((activeSection + 1) / totalSections) * 100}%` }}
      transition={{ duration: 0.5 }}
    />
  </motion.div>
)