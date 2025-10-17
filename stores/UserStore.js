import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: {
    id: '1',
    firstName: 'Martin',
    lastName: 'Bellot',
    email: 'martin.bellot@example.com',
    phone: '+33781771236',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: null,
    address: {
      street: '9 rue d Inkermann',
      city: 'Rennes',
      state: 'Rennes',
      zipCode: '35000',
      country: 'France',
    },
    joinDate: '2023-01-15',
    verified: true,
  },

  updateUser: (userData) => set((state) => ({
    user: { ...state.user, ...userData }
  })),

  updateAddress: (addressData) => set((state) => ({
    user: {
      ...state.user,
      address: { ...state.user.address, ...addressData }
    }
  })),
}));
