"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ShieldCheck, Github, Linkedin } from "lucide-react"

/** Routes that render their own footer — global footer is hidden on these */
const ROUTES_WITHOUT_FOOTER = ["/dashboard", "/profile"]

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
]

export default function Footer() {
  const pathname = usePathname()

  if (ROUTES_WITHOUT_FOOTER.includes(pathname)) return null

  return (
    <motion.footer
      className="border-t border-slate-800 bg-slate-950 px-6 py-12 sm:px-10 lg:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand & Socials */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-50">
              <ShieldCheck className="h-5 w-5 text-blue-500" />
              VeriFakta
            </Link>
            <p className="max-w-sm text-sm text-slate-500">
              Platform verifikasi berita berbasis AI untuk membedakan fakta dan hoaks secara cepat dan akurat.
            </p>
            <div className="mt-2 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 transition-colors hover:text-slate-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Informasi */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-slate-50">Informasi</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/#tentang" className="transition-colors hover:text-slate-200">
                  Tentang VeriFakta
                </Link>
              </li>
              <li>
                <Link href="/#fitur" className="transition-colors hover:text-slate-200">
                  Fitur
                </Link>
              </li>
              <li>
                <Link href="/#statistik" className="transition-colors hover:text-slate-200">
                  Statistik
                </Link>
              </li>
              <li>
                <Link href="/contributor" className="transition-colors hover:text-slate-200">
                  Kontributor
                </Link>
              </li>
            </ul>
          </div>

          {/* Panduan & Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-slate-50">Panduan & Legal</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/cara-pemakaian" className="transition-colors hover:text-slate-200">
                  Cara Pemakaian
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="transition-colors hover:text-slate-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-slate-200">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-slate-200">
                  Syarat &amp; Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 flex flex-col items-center justify-center gap-2 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p className="text-xs font-medium text-slate-400">AI-Powered Hoax Detector</p>
          <p>&copy; 2026 VeriFakta. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}