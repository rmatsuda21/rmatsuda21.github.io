import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { FaGithub, FaLinkedin, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsNintendoSwitch } from "react-icons/bs";

import styles from "./InfoCard.module.scss";

const contactLinks = [
  {
    icon: <FaGithub />,
    label: "GitHub",
    href: "https://github.com/rmatsuda21",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/reomatsuda/",
  },
  {
    icon: <MdEmail />,
    label: "Email",
    href: "mailto:reo.matsuda@gmail.com",
  },
];

export const InfoCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + rect.width / 2,
        width: rect.width,
        height: rect.height,
      });
    }
    setIsHovered(true);
  };

  return (
    <>
      <span
        ref={cardRef}
        className={styles.card}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className={styles.name}>Reo Matsuda</span>
      </span>

      {createPortal(
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className={styles.expandedCard}
              style={{
                top: position.top,
                left: position.left,
              }}
              initial={{ opacity: 0, clipPath: "inset(0 50% 100% 50%)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0% 0%)" }}
              exit={{ opacity: 0, clipPath: "inset(0 50% 100% 50%)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className={styles.expandedName}>Reo Matsuda</span>
              <div className={styles.extra}>
                <span className={styles.tagline}>React Developer</span>

                <span className={styles.location}>
                  <FaLocationDot aria-label="Location" />
                  <span>North Carolina</span>
                </span>

                <span className={styles.game}>
                  <BsNintendoSwitch /> SSBU <strong>Jigglypuff</strong>
                </span>

                <span className={styles.links}>
                  {contactLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                      title={link.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
