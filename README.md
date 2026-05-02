# NovaNest - Premium Marketing Agency Website

A modern, production-ready marketing agency website featuring physics-based animations, multilingual support, and premium UI/UX design.

## 🎨 Features

### Hero Animation (Signature Feature)
- **Physics-based intro animation** using Matter.js
- Letters of "NovaNest" fall randomly with gravity and bounce
- Chaotic collision phase followed by smooth alignment
- Logo drop with liquid melt effect using GSAP
- Cinematic, premium feel (not childish)

### Design System
- **Color Palette**: Primary (#8a3b12 dark brown), Secondary (#eadbc8 warm beige)
- Premium marketing agency aesthetic
- Modern, minimal, slightly artistic
- Smooth shadows and soft gradients

### Multilingual Support
- Arabic and English languages
- RTL/LTR automatic layout switching
- Language switcher in navbar
- Powered by react-i18next

### Pages
1. **Home** - Hero animation, services preview, featured work
2. **About Us** - Animated text reveal, team section with hover effects
3. **Portfolio** - Social media mockups with floating likes/comments animations
4. **Contact** - Animated form with unique button hover effects
5. **Booking** - Animated pricing cards with micro-interactions

### UI/UX Animations
- Custom hover animations (not standard scale effects)
- Floating cards on hover
- Smooth scroll reveals
- Micro-interactions throughout
- Avoids generic UI library look

### Performance
- Optimized Matter.js usage with proper cleanup
- GSAP animations with memory management
- No memory leaks
- Smooth performance on various devices

## 🚀 Tech Stack

- **React 19** - Latest React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Matter.js** - 2D physics engine for animations
- **GSAP** - Advanced animation library
- **react-i18next** - Internationalization
- **react-router-dom** - Client-side routing

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NovaNest
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
NovaNest/
├── src/
│   ├── components/
│   │   ├── animations/
│   │   │   └── HeroIntroAnimation.jsx  # Physics-based hero animation
│   │   └── ui/
│   │       └── Navbar.jsx              # Responsive navbar with language switcher
│   ├── pages/
│   │   ├── Home.jsx                    # Home page with services and featured work
│   │   ├── About.jsx                   # About us with team section
│   │   ├── Portfolio.jsx               # Portfolio with social media mockups
│   │   ├── Contact.jsx                 # Contact form with animations
│   │   └── Booking.jsx                 # Pricing cards and booking
│   ├── hooks/
│   ├── utils/
│   │   └── i18n.js                     # i18n configuration
│   ├── locales/
│   │   ├── en.json                     # English translations
│   │   └── ar.json                     # Arabic translations
│   ├── App.jsx                         # Main app with routing
│   ├── main.jsx                        # Entry point
│   └── index.css                       # TailwindCSS imports
├── public/
├── tailwind.config.js                  # TailwindCSS configuration
├── postcss.config.js                   # PostCSS configuration
└── package.json
```

## 🎯 Key Components

### HeroIntroAnimation
- Uses Matter.js for physics simulation
- Letters fall randomly with gravity and collision
- GSAP handles smooth alignment transitions
- Logo melt effect with color blending
- Proper cleanup to prevent memory leaks

### Navbar
- Responsive design with mobile menu
- Language switcher (EN/AR)
- Smooth hover animations
- Scroll-based background change

### Pages
All pages feature:
- Scroll-triggered animations using GSAP ScrollTrigger
- Custom hover effects
- Responsive design
- Premium UI/UX

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

- Mobile-first approach
- Physics animation adapts to screen size
- No overflow issues
- Touch-friendly interactions

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#8a3b12',
      secondary: '#eadbc8',
    },
  },
}
```

### Translations
Edit files in `src/locales/` to add or modify translations.

### Animation Timing
Adjust timing in `HeroIntroAnimation.jsx` for the intro sequence.

## 🚀 Production Build

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

NovaNest Marketing Agency

---

Built with ❤️ using React, TailwindCSS, Matter.js, and GSAP
