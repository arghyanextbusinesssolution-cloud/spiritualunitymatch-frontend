/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			spiritual: {
  				violet: {
  					'50': '#f5f3ff',
  					'100': '#ede9fe',
  					'200': '#ddd6fe',
  					'300': '#c4b5fd',
  					'400': '#a78bfa',
  					'500': '#8b5cf6',
  					'600': '#7c3aed',
  					'700': '#6d28d9',
  					'800': '#5b21b6',
  					'900': '#4c1d95'
  				},
  				blue: {
  					'50': '#eff6ff',
  					'100': '#dbeafe',
  					'200': '#bfdbfe',
  					'300': '#93c5fd',
  					'400': '#60a5fa',
  					'500': '#3b82f6',
  					'600': '#2563eb',
  					'700': '#1d4ed8',
  					'800': '#1e40af',
  					'900': '#1e3a8a'
  				}
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			brand: {
  				DEFAULT: 'hsl(var(--brand-primary))',
  				light: 'hsl(var(--brand-light))',
  			},
  			// New Stitch Design Tokens
  			"secondary": "#565e74",
  			"on-background": "#191c1e",
  			"tertiary-container": "#8455ef",
  			"primary-container": "#da3437",
  			"inverse-primary": "#ffb3ad",
  			"on-error-container": "#93000a",
  			"inverse-on-surface": "#eff1f3",
  			"surface-container-highest": "#e0e3e5",
  			"secondary-fixed": "#dae2fd",
  			"on-secondary-fixed-variant": "#3f465c",
  			"primary-fixed": "#ffdad7",
  			"on-primary-container": "#fffbff",
  			"tertiary-fixed": "#e9ddff",
  			"secondary-container": "#dae2fd",
  			"outline": "#8f6f6d",
  			"surface-bright": "#f7f9fb",
  			"inverse-surface": "#2d3133",
  			"on-tertiary-fixed": "#23005c",
  			"secondary-fixed-dim": "#bec6e0",
  			"on-surface": "#191c1e",
  			"surface-container-lowest": "#ffffff",
  			"on-secondary": "#ffffff",
  			"on-primary-fixed": "#410004",
  			"surface-dim": "#d8dadc",
  			"surface": "#f7f9fb",
  			"primary-fixed-dim": "#ffb3ad",
  			"error": "#ba1a1a",
  			"on-tertiary-fixed-variant": "#5516be",
  			"on-error": "#ffffff",
  			"surface-tint": "#b91a24",
  			"on-secondary-fixed": "#131b2e",
  			"on-primary-fixed-variant": "#930013",
  			"tertiary": "#6b38d4",
  			"on-secondary-container": "#5c647a",
  			"on-tertiary": "#ffffff",
  			"on-surface-variant": "#5b403e",
  			"on-tertiary-container": "#fffbff",
  			"error-container": "#ffdad6",
  			"tertiary-fixed-dim": "#d0bcff",
  			"outline-variant": "#e4beba",
  			"surface-container": "#eceef0",
  			"surface-variant": "#e0e3e5",
  			"surface-container-high": "#e6e8ea",
  			"surface-container-low": "#f2f4f6"
  		},
  		fontFamily: {
  			sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
  			playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
  		},
  		backgroundImage: {
  			'brand-gradient': 'linear-gradient(135deg, hsl(var(--brand-primary)) 0%, hsl(var(--brand-secondary)) 100%)',
  			'brand-gradient-light': 'linear-gradient(135deg, hsl(var(--brand-light)) 0%, white 100%)',
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'shimmer': 'shimmer 1.8s infinite ease-in-out',
  			'float': 'float 4s ease-in-out infinite',
  		},
  		keyframes: {
  			fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
  			slideUp: {
  				'0%': { transform: 'translateY(20px)', opacity: '0' },
  				'100%': { transform: 'translateY(0)', opacity: '1' }
  			},
  			shimmer: {
  				'0%': { backgroundPosition: '200% 0' },
  				'100%': { backgroundPosition: '-200% 0' }
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-12px)' }
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			xl: '3rem',
  			full: '9999px'
  		},
  		spacing: {
  			"base-unit": "8px",
  			"margin-desktop": "64px",
  			"gutter": "24px",
  			"margin-mobile": "20px",
  			"container-max": "1280px"
  		},
  		fontSize: {
  			"label-caps": ["12px", { "lineHeight": "1.0", "letterSpacing": "0.15em", "fontWeight": "700" }],
  			"body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
  			"headline-md": ["24px", { "lineHeight": "1.3", "letterSpacing": "0.02em", "fontWeight": "600" }],
  			"headline-lg-mobile": ["28px", { "lineHeight": "1.2", "fontWeight": "700" }],
  			"headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "700" }],
  			"body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
  			"display-lg": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800" }]
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

