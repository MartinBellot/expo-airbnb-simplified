import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const NavigationCard = ({ title, description, icon, route }) => (
  <Link href={route || '#'} asChild>
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardIcon}>
        <Ionicons name={icon} size={32} color={COLORS.primary} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
  
      {route && (
        <Ionicons name="chevron-forward" size={24} color={COLORS.textSecondary} />
      )}
    </TouchableOpacity>
  </Link>
);

export default function SandboxScreen() {
  const navigationTypes = [
    {
      title: 'Stack Navigation',
      description: 'Navigation empilée classique avec push/pop',
      icon: 'layers',
      route: '/(sandbox)/navigation/stack',
    },
    {
      title: 'Tabs Navigation',
      description: 'Déja implémenté dans la bottom bar :)',
      icon: 'albums',
      route: '/(sandbox)/navigation/tabs',
    },
    {
      title: 'Modal Navigation',
      description: 'Présentation modale avec animations',
      icon: 'expand',
      route: '/(sandbox)/navigation/modal',
    },
    {
      title: 'Drawer Navigation',
      description: 'Menu latéral coulissant',
      icon: 'menu',
      route: '/(sandbox)/navigation/drawer',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Essais Navigation</Text>
        <Text style={styles.subtitle}>
          Tous les types de navigation de REACT expo
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Types de Navigation</Text>
        {navigationTypes.map((nav, index) => (
          <NavigationCard key={index} title={nav['title']} description={nav['description']} icon={nav['icon']} route={nav['route']} />
        ))}
      </View>
    </ScrollView>
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
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
