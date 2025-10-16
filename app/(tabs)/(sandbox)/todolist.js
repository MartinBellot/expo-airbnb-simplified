import { COLORS } from '@/constants/colors';
import { useTaskStore } from '@/stores/TaskStore';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TodoListScreen() {
  const [taskText, setTaskText] = useState('');
  const { tasks, addTask, removeTask, toggleTaskCompletion, clearTasks } = useTaskStore();

  const handleAddTask = () => {
    if (taskText.trim()) {
      const newTask = {
        id: Date.now().toString(),
        text: taskText.trim(),
        completed: false,
      };
      addTask(newTask);
      setTaskText('');
    }
  };

  const TaskItem = ({ task }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleTaskCompletion(task.id)}
      >
        <Ionicons
          name={task.completed ? 'checkbox' : 'square-outline'}
          size={28}
          color={task.completed ? COLORS.primary : COLORS.textSecondary}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.taskText,
          task.completed && styles.taskTextCompleted,
        ]}
      >
        {task.text}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeTask(task.id)}
      >
        <Ionicons name="trash-outline" size={22} color={COLORS.error} />
      </TouchableOpacity>
    </View>
  );

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <View
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
        
        {totalCount > 0 && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              {completedCount} / {totalCount} tâches complétées
            </Text>
            {tasks.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearTasks}
              >
                <Text style={styles.clearButtonText}>Tout effacer</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter une nouvelle tâche..."
          placeholderTextColor={COLORS.textSecondary}
          value={taskText}
          onChangeText={setTaskText}
          onSubmitEditing={handleAddTask}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.addButton, !taskText.trim() && styles.addButtonDisabled]}
          onPress={handleAddTask}
          disabled={!taskText.trim()}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="checkmark-done-circle-outline" size={80} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>Aucune tâche pour le moment</Text>
          <Text style={styles.emptySubtext}>Ajoutez votre première tâche ci-dessus</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskItem task={item} />}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.primary + '10',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  statsText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: COLORS.error + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  clearButtonText: {
    color: COLORS.error,
    fontSize: 12,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.5,
  },
  listContainer: {
    padding: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  checkbox: {
    marginRight: 12,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
});
