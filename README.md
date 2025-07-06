# 🚀 Kashif Deshmukh - Portfolio

A modern, responsive, and interactive portfolio website built with Next.js, showcasing my skills as a Full Stack Developer.

![Portfolio Preview](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-black?style=for-the-badge&logo=framer)

## ✨ Features

### 🎨 **Modern Design**
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Automatic theme switching with system preference
- **Smooth Animations**: Framer Motion powered animations throughout
- **Interactive Elements**: Hover effects and micro-interactions

### 🎭 **Hero Section**
- **Animated Background**: Grid pattern with flowing animated lines
- **Typewriter Effect**: Dynamic text cycling through skills and roles
- **Interactive Description**: Gradient text effect on hover
- **Profile Image Modal**: Click to view full-size profile image
- **Animated CTA Buttons**: Spring animations with hover effects

### 🛠 **Technical Features**
- **Next.js 14**: Latest React framework with App Router
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **ShadCN UI**: Beautiful, accessible component library
- **Framer Motion**: Smooth animations and transitions
- **Aceternity UI**: Modern UI components and effects

## 🚀 Live Demo

Visit my portfolio: **[Coming Soon]**

## 🛠 Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon library

### **UI Components**
- **ShadCN UI** - Re-usable component library
- **Aceternity UI** - Modern UI effects and components
- **Custom Components** - Tailored for portfolio needs

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Vercel** - Deployment platform

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Kashifkkd/kashif-portfolio.git
cd kashif-portfolio
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### 4. Build for Production
```bash
npm run build
# or
yarn build
```

## 🎨 Customization

### **Personal Information**
Update your personal details in the Hero component:
```tsx
// src/app/Hero.tsx
const typewriterWords = [
  { text: "Full Stack Developer", className: "text-blue-600 dark:text-blue-400" },
  { text: "React & Next.js Expert", className: "text-purple-600 dark:text-purple-400" },
  // Add your own skills here
];
```

### **Profile Image**
Replace the profile image:
1. Add your image to `public/kashif_profile_img.jpeg`
2. Update the image path in `src/app/Navbar.tsx`

### **Social Links**
Update your social media links in the Hero component:
```tsx
// GitHub
onClick={() => window.open('https://github.com/YOUR_USERNAME', '_blank')}

// LinkedIn
onClick={() => window.open('https://www.linkedin.com/in/YOUR_PROFILE', '_blank')}
```

### **Resume**
Add your resume:
1. Place your resume PDF in `public/resume.pdf`
2. The "View Resume" button will automatically link to it

## 📁 Project Structure

```
kashif-portfolio/
├── public/
│   ├── kashif_profile_img.jpeg    # Profile image
│   ├── mask.svg                   # SVG mask for effects
│   └── resume.pdf                 # Resume file
├── src/
│   ├── app/
│   │   ├── Hero.tsx              # Hero section component
│   │   ├── Navbar.tsx            # Navigation component
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   └── components/
│       └── ui/
│           ├── background-lines.tsx    # Animated background lines
│           ├── grid-background.tsx     # Grid pattern background
│           ├── button.tsx              # ShadCN button component
│           └── image-modal.tsx         # Profile image modal
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎯 Key Components

### **Hero Section** (`src/app/Hero.tsx`)
- Main landing section with animated content
- Typewriter effect for skills display
- Interactive description with gradient effects
- Animated CTA buttons and social links

### **Navbar** (`src/app/Navbar.tsx`)
- Responsive navigation with glass morphism effect
- Dark/light mode toggle
- Profile image with modal preview
- Smooth mobile menu animations

### **Background Effects**
- **Grid Background**: Subtle grid pattern with radial fade
- **Background Lines**: Animated flowing lines for dynamic effect
- **Combined Layers**: Multiple background effects for depth

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### **Other Platforms**
- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **GitHub Pages**: Requires static export configuration

## 🎨 Design System

### **Colors**
- **Primary**: Blue gradient (`from-blue-500 via-purple-500 to-pink-500`)
- **Text**: Dark/Light mode adaptive
- **Background**: Grid pattern with animated lines

### **Typography**
- **Headings**: Inter font family with gradient text
- **Body**: Clean, readable text with proper hierarchy
- **Responsive**: Scales appropriately across devices

### **Animations**
- **Entrance**: Staggered fade-in animations
- **Hover**: Scale and color transitions
- **Background**: Continuous flowing animations

## 🤝 Contributing

While this is my personal portfolio, I welcome feedback and suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **GitHub**: [@Kashifkkd](https://github.com/Kashifkkd)
- **LinkedIn**: [Kashif Deshmukh](https://www.linkedin.com/in/kashif-deshmukh-23797a173/)
- **Email**: [Your Email]

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by Kashif Deshmukh
