# 🏗️ Airbrb Architecture

## 📐 Code Organization

### Clean Architecture Principles

The project follows a clean, modular architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────┐
│           Presentation Layer                │
│  (Screens, Components, UI Logic)            │
├─────────────────────────────────────────────┤
│           Business Logic                    │
│  (State Management, Data Flow)              │
├─────────────────────────────────────────────┤
│           Data Layer                        │
│  (Types, Constants, Mock Data)              │
└─────────────────────────────────────────────┘
```

## 📂 Directory Structure Explained

### `/app` - Application Screens
Contains all screen-level components using Expo Router's file-based routing.

```typescript
app/
  (tabs)/
    index.tsx          // Home screen (main feed)
    explore.tsx        // Explore screen
  _layout.tsx          // Root layout
  modal.tsx            // Modal screens
```

### `/components` - Reusable Components
Organized by feature/domain for better scalability.

```typescript
components/
  home/
    Header.tsx              // App header with search
    CategoryList.tsx        // Category filter chips
    PropertyCard.tsx        // Property listing card
    InspirationBanner.tsx   // CTA banner
  ui/
    // Shared UI components
```

**Component Design Principles:**
- Single Responsibility
- Prop-based configuration
- TypeScript interfaces for props
- Styled with StyleSheet (no inline styles)

### `/constants` - Application Constants

#### `colors.ts`
Centralized color system following design tokens pattern:
```typescript
export const COLORS = {
  primary: '#00FF94',        // Brand color
  background: '#000000',     // Dark mode bg
  textPrimary: '#FFFFFF',    // Main text
  // ... semantic color names
}
```

#### `data.ts`
Mock data for development. Will be replaced with API calls:
```typescript
export const PROPERTIES: Property[] = [...]
export const CATEGORIES: Category[] = [...]
```

### `/types` - TypeScript Type Definitions

#### `property.ts`
Domain models with strong typing:
```typescript
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  isNew: boolean;
}
```

## 🎨 Styling Strategy

### Theme System
- All colors defined in `constants/colors.ts`
- Consistent spacing scale (4px base unit)
- Typography system (font sizes, weights)
- Dark mode first approach

### Component Styling
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,  // Use color constants
    padding: 20,                         // Use spacing scale
  },
});
```

## 🔄 Data Flow

```
User Interaction
      ↓
State Update (useState/useReducer)
      ↓
Component Re-render
      ↓
Animated Transitions
```

### State Management
Currently using React's built-in hooks:
- `useState` - Local component state
- `useCallback` - Memoized callbacks
- Future: Consider Zustand/Redux for global state

## 🎭 Animation Architecture

Using `react-native-reanimated` for performant animations:

```typescript
// Entrance animations
<Animated.View 
  entering={FadeInDown.delay(200).springify()}
>
  {content}
</Animated.View>
```

**Animation Guidelines:**
- Stagger delays for list items (50-100ms)
- Use spring animations for natural feel
- Keep durations between 400-800ms
- Prefer transform animations over layout

## 🧩 Component Communication

### Props Down, Events Up
```typescript
// Parent
<PropertyCard 
  property={property}        // Data down
  onPress={handlePress}      // Events up
/>

// Child
interface PropertyCardProps {
  property: Property;
  onPress: (id: string) => void;
}
```

## 📱 Platform-Specific Code

```typescript
paddingTop: Platform.OS === 'ios' ? 60 : 40,
```

Use Platform.select() for more complex differences:
```typescript
shadow: Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  android: {
    elevation: 5,
  },
})
```

## 🚀 Performance Optimizations

1. **Image Optimization**: Using Expo Image with content fit
2. **List Rendering**: Will use FlashList for large lists
3. **Memoization**: React.memo for expensive components
4. **Lazy Loading**: Dynamic imports for heavy screens

## 🔮 Future Architecture Plans

### API Integration
```typescript
// services/api.ts
export class PropertyService {
  async fetchProperties(): Promise<Property[]> {
    // API calls
  }
}
```

### Navigation
```typescript
// navigation/types.ts
export type RootStackParamList = {
  Home: undefined;
  PropertyDetail: { id: string };
  // ...
}
```

### State Management
Consider Zustand for global state:
```typescript
// stores/propertyStore.ts
export const usePropertyStore = create((set) => ({
  properties: [],
  fetchProperties: async () => { ... },
}));
```

## 📚 Best Practices

1. **TypeScript First**: Always define types before implementation
2. **Component Size**: Keep components under 200 lines
3. **Naming**: Use descriptive, semantic names
4. **Imports**: Absolute imports with `@/` alias
5. **Testing**: Write tests for business logic (TODO)
6. **Documentation**: Comment complex logic

## 🎯 Code Quality Tools

- **TypeScript**: Type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting (recommended)
- **Husky**: Pre-commit hooks (TODO)

---

This architecture is designed to scale from MVP to production-ready application.
