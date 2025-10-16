import { create } from 'zustand';

export const useTaskStore = create((set) => ({
    tasks: [],
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    removeTask: (taskId) => set((state) => ({ tasks: state.tasks.filter(task => task.id !== taskId) })),
    clearTasks: () => set({ tasks: [] }),
    toggleTaskCompletion: (taskId) => set((state) => ({
        tasks: state.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
        )
    })),
}));
