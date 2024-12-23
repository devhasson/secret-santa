export const participantVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  removed: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};
