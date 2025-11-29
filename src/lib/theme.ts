/**
 * Dark Veil Theme Library
 * 
 * Centralized color palette and reusable styles based on the DarkVeil shader aesthetic.
 * This library provides consistent theming across all components.
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const ThemeColors = {
  // Background colors
  background: {
    primary: '#060010',      // Deep dark background
    secondary: '#0a0015',    // Slightly lighter dark
    tertiary: '#0f001a',     // Even lighter dark
    card: 'rgba(6, 0, 16, 0.6)', // Semi-transparent card background
    cardHover: 'rgba(6, 0, 16, 0.8)', // Card background on hover
  },
  
  // Accent colors - purple/pink/blue spectrum
  accent: {
    purple: '#8b5cf6',       // Primary purple
    purpleLight: '#a78bfa',  // Light purple
    purpleDark: '#6d28d9',   // Dark purple
    pink: '#ec4899',         // Pink accent
    pinkLight: '#f472b6',    // Light pink
    blue: '#3b82f6',         // Blue accent
    blueLight: '#60a5fa',    // Light blue
    cyan: '#06b6d4',         // Cyan accent
  },
  
  // Text colors
  text: {
    primary: '#f1f5f9',      // Slate-100
    secondary: '#cbd5e1',     // Slate-300
    muted: '#94a3b8',        // Slate-400
    accent: '#a78bfa',       // Light purple for highlights
  },
  
  // Border and glow colors
  border: {
    default: 'rgba(139, 92, 246, 0.2)',    // Purple border
    hover: 'rgba(139, 92, 246, 0.4)',      // Purple border on hover
    glow: 'rgba(139, 92, 246, 0.3)',       // Glow effect
    glowStrong: 'rgba(139, 92, 246, 0.5)', // Strong glow
  },
  
  // Gradient combinations
  gradients: {
    primary: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #3b82f6 100%)',
    secondary: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
    accent: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
    dark: 'linear-gradient(135deg, #060010 0%, #0a0015 50%, #0f001a 100%)',
    text: 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)',
    textHover: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
  },
} as const;

// ============================================================================
// REUSABLE STYLE OBJECTS
// ============================================================================

/**
 * Common style objects for consistent styling across components
 */
export const DarkVeilStyles = {
  // Glass morphism effects
  glass: {
    background: 'rgba(6, 0, 16, 0.4)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  
  glassCard: {
    background: 'rgba(6, 0, 16, 0.6)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '1rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
  },
  
  // Glow effects
  glow: {
    purple: {
      boxShadow: `0 0 20px ${ThemeColors.accent.purple}40, 0 0 40px ${ThemeColors.accent.purple}20`,
    },
    blue: {
      boxShadow: `0 0 20px ${ThemeColors.accent.blue}40, 0 0 40px ${ThemeColors.accent.blue}20`,
    },
    pink: {
      boxShadow: `0 0 20px ${ThemeColors.accent.pink}40, 0 0 40px ${ThemeColors.accent.pink}20`,
    },
    strong: {
      boxShadow: `0 0 40px ${ThemeColors.accent.purple}60, 0 0 80px ${ThemeColors.accent.purple}40, 0 0 120px ${ThemeColors.accent.purple}20`,
    },
  },
  
  // Hover effects
  hover: {
    scale: {
      transform: 'scale(1.05)',
      transition: 'transform 0.3s ease',
    },
    scaleLarge: {
      transform: 'scale(1.1)',
      transition: 'transform 0.3s ease',
    },
    glow: {
      boxShadow: `0 0 30px ${ThemeColors.accent.purple}50`,
      transition: 'box-shadow 0.3s ease',
    },
  },
  
  // Gradient text
  gradientText: {
    background: ThemeColors.gradients.text,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
} as const;

// ============================================================================
// TAILWIND CLASS UTILITIES
// ============================================================================

/**
 * Reusable Tailwind class combinations for common patterns
 */
export const DarkVeilClasses = {
  // Glass morphism
  glass: 'bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg',
  glassCard: 'bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl',
  
  // Gradient text
  gradientText: 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent',
  
  // Hover effects
  hoverScale: 'transition-all duration-300 hover:scale-105',
  hoverScaleLarge: 'transition-all duration-300 hover:scale-110',
  hoverGlow: 'transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]',
  
  // Button variants
  buttonPrimary: 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white hover:shadow-xl transition-all duration-300',
  buttonOutline: 'border-2 border-purple-500/20 bg-white/5 backdrop-blur-xl text-slate-200 hover:border-purple-500/40 hover:bg-white/10',
  
  // Card styles
  card: 'bg-[#0a0015] border border-[#060010] rounded-xl p-6',
  cardHover: 'bg-[#0a0015] border border-[#060010] rounded-xl p-6 hover:scale-[1.02] transition-all duration-300',
  
  // Section padding
  sectionPadding: 'py-24 px-4 md:px-8 lg:px-16',
  
  // Animations
  fadeIn: 'animate-fadeIn',
  slideUp: 'animate-slideUp',
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get gradient style object
 */
export const getGradient = (variant: 'primary' | 'secondary' | 'accent' | 'text' | 'textHover' = 'primary') => {
  return {
    background: ThemeColors.gradients[variant],
  };
};

/**
 * Get glow style object
 */
export const getGlow = (color: 'purple' | 'blue' | 'pink' | 'strong' = 'purple') => {
  return DarkVeilStyles.glow[color];
};

/**
 * Get glass style object
 */
export const getGlass = (variant: 'glass' | 'glassCard' = 'glass') => {
  return DarkVeilStyles[variant];
};

/**
 * Create gradient text style
 */
export const getGradientText = (variant: 'text' | 'textHover' = 'text') => {
  return {
    background: ThemeColors.gradients[variant],
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
};

/**
 * Get skill/tech color based on name
 */
export const getTechColor = (tech: string): string => {
  const colorMap: Record<string, string> = {
    'Python': `${ThemeColors.accent.blue}, ${ThemeColors.accent.cyan}`,
    'JavaScript': `${ThemeColors.accent.purple}, ${ThemeColors.accent.pink}`,
    'C#': `${ThemeColors.accent.purple}, ${ThemeColors.accent.pink}`,
    'PHP': `${ThemeColors.accent.blue}, ${ThemeColors.accent.purple}`,
    'Dart': `${ThemeColors.accent.blue}, ${ThemeColors.accent.purple}`,
    'React': `${ThemeColors.accent.cyan}, ${ThemeColors.accent.blue}`,
    'Flutter': `${ThemeColors.accent.blue}, ${ThemeColors.accent.cyan}`,
    'Laravel': `${ThemeColors.accent.pink}, ${ThemeColors.accent.purple}`,
    'MySQL': `${ThemeColors.accent.purple}, ${ThemeColors.accent.pink}`,
    'MSSQL': `${ThemeColors.accent.pink}, ${ThemeColors.accent.purple}`,
    'SQL': `${ThemeColors.accent.blue}, ${ThemeColors.accent.purple}`,
    '.NET': `${ThemeColors.accent.purple}, ${ThemeColors.accent.blue}`,
  };
  
  return colorMap[tech] || `${ThemeColors.accent.blue}, ${ThemeColors.accent.purple}`;
};

/**
 * Get tech badge classes
 */
export const getTechBadgeClasses = (tech: string): string => {
  const colorMap: Record<string, string> = {
    'Python': 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
    'Flutter': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/30',
    'React': 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
    'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/30',
    'C#': 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30',
    'PHP': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30',
    'MySQL': 'bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30',
    'MSSQL': 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30',
    'SQL': 'bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/30',
    'YoloV5': 'bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30',
    'CNN': 'bg-teal-500/20 text-teal-300 border-teal-500/30 hover:bg-teal-500/30',
    'Pandas': 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
    'XGBoost': 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30',
    'Logistic Regressions': 'bg-pink-500/20 text-pink-300 border-pink-500/30 hover:bg-pink-500/30',
    'Decision Tree': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30',
    'Dart': 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
    '.NET': 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30',
    'Laravel': 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30',
    'Database Migration': 'bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/30',
    'Performance Tuning': 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30',
  };
  
  return colorMap[tech] || 'bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/30';
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  colors: ThemeColors,
  styles: DarkVeilStyles,
  classes: DarkVeilClasses,
  helpers: {
    getGradient,
    getGlow,
    getGlass,
    getGradientText,
    getTechColor,
    getTechBadgeClasses,
  },
};

