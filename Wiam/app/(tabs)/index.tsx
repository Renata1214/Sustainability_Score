import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Leaf, Droplet, Wind, Sun, TrendingUp, Award } from 'lucide-react-native';

interface MetricCardProps {
  icon: typeof Leaf;
  title: string;
  value: string;
  change: string;
  color: string;
}

function MetricCard({ icon: Icon, title, value, change, color }: MetricCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.metricCard,
        pressed && styles.metricCardPressed
      ]}>
      <Icon size={24} color={color} />
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={[
        styles.metricChange,
        { color: isPositive ? '#4ade80' : '#ef4444' }
      ]}>
        {change}
      </Text>
    </Pressable>
  );
}

export default function ImpactScreen() {
  const sustainabilityScore = 85;
  const metrics: MetricCardProps[] = [
    { icon: Leaf, title: 'Carbon Footprint', value: '2.5 tons', change: '-0.3', color: '#4ade80' },
    { icon: Droplet, title: 'Water Usage', value: '120L/day', change: '-5%', color: '#60a5fa' },
    { icon: Wind, title: 'Energy Saved', value: '45 kWh', change: '+12%', color: '#818cf8' },
    { icon: Sun, title: 'Solar Credits', value: '250 pts', change: '+25', color: '#fbbf24' },
    { icon: TrendingUp, title: 'Eco Score', value: '92/100', change: '+8', color: '#f472b6' },
    { icon: Award, title: 'Green Badges', value: '12 earned', change: '+2', color: '#a78bfa' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={styles.header}>
        <View style={styles.scoreSection}>
          <Text style={styles.title}>Sustainability Score</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{sustainabilityScore}</Text>
            <Text style={styles.maxScore}>/100</Text>
          </View>
          <Text style={styles.subtitle}>You're in the top 15% of eco-conscious users!</Text>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1501084817091-258c42bd1b4f' }}
          style={styles.backgroundImage}
        />
      </LinearGradient>

      <View style={styles.metricsContainer}>
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  contentContainer: {
    alignItems: 'center',
  },
  header: {
    padding: 20,
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
  },
  scoreSection: {
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4ade80',
    marginTop: 10,
    textAlign: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#4ade80',
  },
  maxScore: {
    fontSize: 24,
    color: '#666',
    marginBottom: 15,
  },
  metricsContainer: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxWidth: 800,
    width: '100%',
  },
  metricCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 20,
    width: '48%',
    marginBottom: 15,
  },
  metricCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  metricTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  metricValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  metricChange: {
    fontSize: 14,
    marginTop: 5,
  },
});