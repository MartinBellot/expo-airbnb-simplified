import { COLORS } from '@/constants/colors';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CounterScreen() {
  const [count, setCount] = useState(0);


  useEffect(() => {
    console.log("count changed:", count);
  }, [count]);

  const increment = () => {
    console.log('Incrementing count from', count, 'to', count + 1);
    setCount(count => count + 1);
    console.log('New count is', count + 1);
  };

  const decrement = () => {
    console.log('Decrementing count from', count, 'to', count - 1);
    setCount(count => count - 1);
    console.log('New count is', count - 1);
  };

  const reset = () => {
    console.log('Resetting count from', count, 'to', 0);
    setCount(0);
  };

  return (
    <View style={styles.container}>

      <View style={styles.counterContainer}>
        <Text style={styles.counterLabel}>Valeur actuelle</Text>
        <Text style={styles.counterValue}>{count}</Text>

        <View style={styles.buttonsRow}>
          <TouchableOpacity 
            style={[styles.button, styles.decrementButton]} 
            onPress={decrement}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.resetButton]} 
            onPress={reset}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.incrementButton]} 
            onPress={increment}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Le compteur est {count === 0 ? 'à zéro' : count > 0 ? 'positif' : 'négatif'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  counterLabel: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  counterValue: {
    fontSize: 96,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 40,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 40,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  incrementButton: {
    backgroundColor: COLORS.primary,
  },
  decrementButton: {
    backgroundColor: '#FF6B6B',
  },
  resetButton: {
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.textSecondary,
    width: 90,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  infoBox: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    minWidth: 250,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
