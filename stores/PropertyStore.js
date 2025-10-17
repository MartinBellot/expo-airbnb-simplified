import { create } from 'zustand';

const API_URL = 'https://ondes.space/reactdata.json';

export const usePropertyStore = create((set, get) => ({
  // États initiaux
  properties: [],
  isLoading: false,
  error: null,
  lastFetchTime: null,

  fetchProperties: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(API_URL);
      console.log('Fetching properties from API:', API_URL);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des propriétés');
      }
      const data = await response.json();
      set({ 
        properties: data, 
        isLoading: false,
        lastFetchTime: new Date().toISOString()
      });
    } catch (error) {
      set({ 
        error: error.message, 
        isLoading: false 
      });
      console.error('Erreur fetch properties:', error);
    }
  },

  searchProperties: (query) => { //recherche par texte
    const { properties } = get();
    if (!query.trim()) {
      return properties;
    }
    const searchTerm = query.toLowerCase();
    return properties.filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm) ||
        property.location.toLowerCase().includes(searchTerm)
    );
  },

  sortByPriceLowToHigh: (propertiesToSort) => {
    return [...propertiesToSort].sort((a, b) => a.price - b.price);
  },

  sortByPriceHighToLow: (propertiesToSort) => {
    return [...propertiesToSort].sort((a, b) => b.price - a.price);
  },

  sortByRating: (propertiesToSort) => {
    return [...propertiesToSort].sort((a, b) => b.rating - a.rating);
  },

  filterNewListings: (propertiesToFilter) => {
    return propertiesToFilter.filter((property) => property.isNew);
  },

  applyFilter: (propertiesToFilter, filterType) => {
    const { sortByPriceLowToHigh, sortByPriceHighToLow, sortByRating, filterNewListings } = get();
    
    switch (filterType) {
      case 'price-low':
        return sortByPriceLowToHigh(propertiesToFilter);
      case 'price-high':
        return sortByPriceHighToLow(propertiesToFilter);
      case 'rating':
        return sortByRating(propertiesToFilter);
      case 'new':
        return filterNewListings(propertiesToFilter);
      case 'all':
      default:
        return propertiesToFilter;
    }
  },

  searchAndFilter: (query, filterType) => {   // Recherche et filtre combinés
    const { searchProperties, applyFilter } = get();
    const searchResults = searchProperties(query);
    return applyFilter(searchResults, filterType);
  },

  // Calcule les statistiques d'un ensemble de propriétés
  calculateStats: (propertiesToAnalyze) => {
    if (propertiesToAnalyze.length === 0) {
      return { averagePrice: 0, topRating: 0, totalCount: 0 };
    }
    
    const averagePrice = propertiesToAnalyze.reduce((sum, p) => sum + p.price, 0) / propertiesToAnalyze.length;
    const topRating = Math.max(...propertiesToAnalyze.map((p) => p.rating));
    
    return {
      averagePrice: Math.round(averagePrice),
      topRating,
      totalCount: propertiesToAnalyze.length,
    };
  },

  getPropertyById: (id) => {
    const { properties } = get();
    return properties.find((property) => property.id === id);
  },

  //reset error
  clearError: () => {
    set({ error: null });
  },
}));
