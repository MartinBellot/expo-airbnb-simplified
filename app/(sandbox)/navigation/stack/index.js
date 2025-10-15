import { COLORS } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StackBasicScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stack - Écran 1</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/(sandbox)/navigation/stack/stack-screen-2')}
      >
        <Text style={styles.buttonText}>Push → Écran 2</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.buttonSecondary]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 40,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 8,
    minWidth: 250,
  },
  buttonSecondary: {
    backgroundColor: COLORS.warning,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
