// Airbrb Color Palette - Theme System

// Dark Theme (Original)
export const DARK_THEME = {
  // Primary Brand Colors
  primary: '#00FF94', // Electric Neon Green
  primaryDark: '#00CC75',
  primaryLight: '#4DFFB8',
  
  // Background Colors
  background: '#000000',
  surface: 'rgba(255, 255, 255, 0.05)',
  surfaceLight: 'rgba(255, 255, 255, 0.1)',
  
  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#888888',
  textTertiary: '#666666',
  
  // Accent Colors
  accent: '#00FF94',
  accentGradientStart: '#00FF94',
  accentGradientMiddle: '#00D4AA',
  accentGradientEnd: '#00B8B8',
  
  // Status Colors
  success: '#00FF94',
  warning: '#FFD700',
  error: '#FF4444',
  
  // Border & Divider Colors
  border: 'rgba(255, 255, 255, 0.1)',
  borderActive: '#00FF94',
  divider: 'rgba(255, 255, 255, 0.05)',
};

// Light Theme
export const LIGHT_THEME = {
  // Primary Brand Colors
  primary: '#00CC75', // Green adjusted for light mode
  primaryDark: '#009958',
  primaryLight: '#00FF94',
  
  // Background Colors
  background: '#FFFFFF',
  surface: '#F5F5F5',
  surfaceLight: '#FAFAFA',
  
  // Text Colors
  textPrimary: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  
  // Accent Colors
  accent: '#00CC75',
  accentGradientStart: '#00FF94',
  accentGradientMiddle: '#00D4AA',
  accentGradientEnd: '#00B8B8',
  
  // Status Colors
  success: '#00CC75',
  warning: '#FFB800',
  error: '#FF4444',
  
  // Border & Divider Colors
  border: 'rgba(0, 0, 0, 0.1)',
  borderActive: '#00CC75',
  divider: 'rgba(0, 0, 0, 0.05)',
};

// Default export for backwards compatibility
export const COLORS = DARK_THEME;

export const APP_NAME = 'Airbrb';
