import { AnimatePresence, LazyMotion, m, domAnimation } from "framer-motion"

const fadeIn = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 }
}

const FadeIn = ({ uuid, children }) => (
  <AnimatePresence initial={false} exitBeforeEnter>
    <LazyMotion features={domAnimation} key={uuid}>
      <m.div
        variants={fadeIn}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{
          duration: 0.5
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  </AnimatePresence>
)

export default FadeIn
