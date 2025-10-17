import { create } from 'zustand';

const HOST_REVIEW_API_URL = 'https://jsonplaceholder.typicode.com/comments?_limit=20';

export const useHostReviewStore = create((set, get) => ({
  // États initiaux
  hostReviews: [],
  isLoading: false,
  error: null,

  fetchHostReviews: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(HOST_REVIEW_API_URL);
      console.log('Fetching host reviews from API:', HOST_REVIEW_API_URL);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des avis des hôtes');
      }
      const data = await response.json();
      set({ 
        hostReviews: data, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error.message, 
        isLoading: false 
      });
      console.error('Erreur fetch host reviews:', error);
    }
  },

  addHostResponse: (reviewId, responseText) => {
    const { hostReviews } = get();
    const updatedReviews = hostReviews.map((review) => {
      if (review.id == reviewId) {
        console.log('=====> Adding response to review ID:', reviewId);
        return {
          ...review,
          hostResponse: responseText,
        };
      }
      return review;
    });
    set({ hostReviews: updatedReviews });
  }
}));
