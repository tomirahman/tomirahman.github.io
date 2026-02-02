import { motion } from "framer-motion";
import cartoonAvatar from "@/assets/cartoon-avatar.png";

interface CartoonAvatarProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const CartoonAvatar = ({ className = "", size = "md" }: CartoonAvatarProps) => {
  const sizeClasses = {
    sm: "w-24 h-24 md:w-32 md:h-32",
    md: "w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52",
    lg: "w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64"
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.8,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {/* Soft glow effect */}
      <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-2xl scale-110" />
      
      {/* Main image with hover animation */}
      <motion.img
        src={cartoonAvatar}
        alt="Tomi Rahman cartoon avatar"
        className="relative w-full h-full object-contain drop-shadow-lg"
        whileHover={{ 
          scale: 1.05,
          rotate: 2,
          transition: { duration: 0.3 }
        }}
        animate={{
          y: [0, -5, 0]
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      {/* Decorative sparkle */}
      <motion.div
        className="absolute -top-2 -right-2 text-2xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ✨
      </motion.div>
    </motion.div>
  );
};

export default CartoonAvatar;
