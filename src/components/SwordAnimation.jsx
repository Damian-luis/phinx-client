import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import swordImage from '../assets/sword.png';
import { playAttackSound } from '../utils/soundManager';

const SwordAnimation = ({ isVisible, onComplete }) => {
  useEffect(() => {
    if (isVisible) {
      playAttackSound();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -1000, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 1000, opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onAnimationComplete={onComplete}
    >
      <img src={swordImage} alt="Sword" style={{ width: '300px', height: '300px' }} />
    </motion.div>
  );
};

export default SwordAnimation;



