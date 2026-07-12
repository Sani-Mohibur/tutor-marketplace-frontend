import Link from "next/link";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { FaFacebook, FaXTwitter, FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-300/80 dark:border-white/10 bg-gradient-to-b from-transparent via-slate-50/40 to-slate-100/60 dark:via-slate-950/20 dark:to-slate-950/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">

          {/* Brand Block */}
          <div className="flex flex-col space-y-4">
            <div className="text-3xl font-bold tracking-tight text-foreground">
              Skill
              <span className="text-emerald-500 dark:text-blue-400">Bridge</span>
            </div>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              An elite ecosystem that connects learners with expert tutors.
              Students can browse tutor profiles, view availability, and book
              sessions instantly.
            </p>
          </div>

          {/* Contact & Location */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-foreground tracking-tight text-lg">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground/80">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 text-emerald-500 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>123 Innovation Drive, Tech District<br />San Francisco, CA 94105</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-emerald-500 dark:text-blue-400 shrink-0" />
                <a href="mailto:support@skillbridge.com" className="hover:text-foreground transition-colors">support@skillbridge.com</a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-emerald-500 dark:text-blue-400 shrink-0" />
                <a href="tel:+18001234567" className="hover:text-foreground transition-colors">+1 (800) 123-4567</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-foreground tracking-tight text-lg">Follow Us</h3>
            <p className="text-sm text-muted-foreground/80">
              Stay updated with our latest news and announcements.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-2">
              <a href="https://facebook.com/farabisunny5" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="https://x.com/sanimohibur" target="_blank" rel="noopener noreferrer" aria-label="X" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors">
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/farabi_sunny202" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <div className="w-full"></div>

              <a href="https://linkedin.com/in/sani-mohibur" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.sanimohibur.me"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
              >
                {/* You can use a globe icon here from react-icons/fa6 */}
                <FaGlobe className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <hr className="border-zinc-300/80 dark:border-white/10" />

        {/* Bottom Compliance Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs pt-6">
          {/* Copyright */}
          <div className="text-muted-foreground font-medium tracking-tight text-center md:text-left">
            &copy; {currentYear} Skill Bridge. All rights reserved.
          </div>

          {/* Core Legal Routes */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-emerald-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-muted-foreground hover:text-emerald-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Terms of Service
            </Link>

            <Link
              href="/contact"
              className="text-muted-foreground hover:text-emerald-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Support Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
