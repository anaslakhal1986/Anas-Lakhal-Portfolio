/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        night: '#050505',
        void: '#030308',
        charcoal: '#111311',
        smoke: '#1a1c1a',
        'deep-olive': '#0f1210',
        'dark-green': '#161c17',
        'olive-border': '#2a3028',
        paper: '#e8e4dc',
        smudge: '#a8a294',
        annotate: '#6b665a',
        toxic: '#8ba362',
        'toxic-dim': '#5a7a3a',
        'dirty-yellow': '#c9b44a',
        crimson: '#8b2020',
        'crimson-glow': '#a83030',
        amber: '#b8973a',
        sepia: '#9c8a62',
      },
      boxShadow: {
        'glow-sm': '0 0 14px -5px rgba(139, 163, 98, 0.45)',
        glow: '0 0 28px -6px rgba(139, 163, 98, 0.4)',
        'glow-lg': '0 0 50px -10px rgba(139, 163, 98, 0.35)',
        panel: '0 20px 50px -28px rgba(0, 0, 0, 0.85)',
        'crimson-glow': '0 0 20px -6px rgba(139, 32, 32, 0.5)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(24px, -20px) scale(1.06)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(-14px, 10px, 0) rotate(2deg)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(var(--orbit-r, 120px)) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(var(--orbit-r, 120px)) rotate(-360deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(139, 163, 98, 0.5)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 0 7px rgba(139, 163, 98, 0)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(12%, 9%)' },
          '70%': { transform: 'translate(9%, 4%)' },
          '90%': { transform: 'translate(-1%, 7%)' },
        },
        'scan-line': {
          from: { transform: 'translateY(-10%)' },
          to: { transform: 'translateY(110vh)' },
        },
        'dossier-reveal': {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to: { clipPath: 'inset(0 0 0 0)' },
        },
        'status-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'shoot': {
          '0%': { transform: 'translate3d(0,0,0) rotate(-38deg)', opacity: '0' },
          '4%': { opacity: '0.9' },
          '16%': { transform: 'translate3d(-46vw, 32vh, 0) rotate(-38deg)', opacity: '0' },
          '100%': { transform: 'translate3d(-46vw, 32vh, 0) rotate(-38deg)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 0.9, 0.4, 1) both',
        'fade-in': 'fade-in 0.6s ease both',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float-slow 18s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        'drift-slow': 'drift 34s ease-in-out infinite reverse',
        'spin-slow': 'spin-slow 40s linear infinite',
        'spin-slower': 'spin-slow 90s linear infinite',
        orbit: 'orbit var(--orbit-duration, 18s) linear infinite',
        twinkle: 'twinkle 3.6s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
        grain: 'grain 8s steps(10) infinite',
        'scan-line': 'scan-line 22s linear infinite',
        'dossier-reveal': 'dossier-reveal 0.6s cubic-bezier(0.22, 0.9, 0.4, 1) both',
        'status-blink': 'status-blink 2.5s ease-in-out infinite',
        shoot: 'shoot 11s linear infinite',
      },
    },
  },
  plugins: [],
}