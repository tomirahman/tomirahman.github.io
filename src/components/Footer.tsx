import { motion } from "framer-motion";
import { Mail, Instagram, Linkedin, Twitter, Send } from "lucide-react";
import { MaskReveal, MagneticButton } from "./ui/GSAPAnimations";
import FloatingCryptoIcons from "./FloatingCryptoIcons";
import AnalogClock from "./ui/AnalogClock";

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

interface FooterProps {
  email?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
}

const Footer = ({ email, socialLinks }: FooterProps) => {
  const socialItems = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", href: email ? `mailto:${email}` : undefined },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter/X", href: socialLinks?.twitter },
    { icon: <Send className="w-5 h-5" />, label: "Telegram", href: socialLinks?.telegram },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: socialLinks?.instagram },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: socialLinks?.linkedin },
    { icon: <DiscordIcon className="w-5 h-5" />, label: "Discord", href: socialLinks?.discord },
  ].filter(item => item.href);

  return (
    <footer id="contact" className="py-20 px-6 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Floating Crypto Icons */}
      <FloatingCryptoIcons section="footer" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Contact Header */}
        <div className="text-center mb-12">
          <MaskReveal>
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Let's Connect
            </h2>
          </MaskReveal>
          <motion.p
            className="font-body text-primary-foreground/70 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Available for Web3 infrastructure, community, and ecosystem opportunities
          </motion.p>
        </div>

        {/* Social Links - With magnetic effect */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {socialItems.map((item, index) => (
            <MagneticButton key={item.label} strength={0.3}>
              <motion.a
                href={item.href}
                target={item.href?.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 border border-primary-foreground/20 hover:border-primary-foreground/40 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <span className="font-body text-sm">{item.label}</span>
              </motion.a>
            </MagneticButton>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-primary-foreground/20 mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Footer bottom */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="font-display text-xl tracking-tight">
            Tomi Rahman
          </div>

          {/* Analog Clock */}
          <AnalogClock />

          <div className="font-body text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
