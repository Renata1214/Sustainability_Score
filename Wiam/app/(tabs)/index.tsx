import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  Linking,
  Animated,
} from 'react-native';
import { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Leaf,
  Sun,
  TrendingUp,
  ChevronRight,
  Calendar,
  Award,
} from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { Link } from 'expo-router';

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
        pressed && styles.metricCardPressed,
      ]}
    >
      <LinearGradient
        colors={[color, `${color}80`]} // Second color is semi-transparent
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.metricGradient}
      >
        <Icon size={24} color="#fff" />
        <Text style={styles.metricTitle}>{title}</Text>
        <Text style={styles.metricValue}>{value}</Text>
        <Text
          style={[
            styles.metricChange,
            { color: isPositive ? '#fff' : '#ffa5a5' },
          ]}
        >
          {change}%
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

interface SustainableInvestment {
  name: string;
  ticker: string;
  price: number;
  marketCap: string;
  sustainabilityRating: number;
  sector: string;
  potentialImprovement: number;
}

function InvestmentCard({ investment }: { investment: SustainableInvestment }) {
  const handlePress = () => {
    const yahooFinanceUrl = `https://finance.yahoo.com/quote/${investment.ticker}`;
    Linking.openURL(yahooFinanceUrl);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.investmentCard,
        pressed && styles.investmentCardPressed,
      ]}
    >
      <LinearGradient
        colors={['#2a2a2a', '#1f1f1f']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.investmentGradient}
      >
        <View style={styles.investmentHeader}>
          <View>
            <Text style={styles.investmentName}>{investment.name}</Text>
            <Text style={styles.investmentTicker}>{investment.ticker}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${investment.price}</Text>
            <Text style={styles.marketCap}>{investment.marketCap}</Text>
          </View>
        </View>
        <View style={styles.investmentDetails}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Sustainability Rating</Text>
            <Text style={styles.rating}>
              {investment.sustainabilityRating}/100
            </Text>
          </View>
          <View style={styles.sectorContainer}>
            <Text style={styles.sectorLabel}>Sector</Text>
            <Text style={styles.sector}>{investment.sector}</Text>
          </View>
          <View style={styles.improvementContainer}>
            <Text style={styles.improvementLabel}>
              Potential Score Improvement
            </Text>
            <Text style={styles.improvement}>
              +{investment.potentialImprovement} pts
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

function TipCard({ tip }: { tip: { title: string; text: string } }) {
  return (
    <LinearGradient
      colors={['#2a2a2a', '#232323']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.tipCard}
    >
      <Leaf size={20} color="#4ade80" />
      <View style={styles.tipContent}>
        <Text style={styles.tipTitle}>{tip.title}</Text>
        <Text style={styles.tipText}>{tip.text}</Text>
      </View>
    </LinearGradient>
  );
}

export default function DashboardScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const contentScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.98],
    extrapolate: 'clamp',
  });

  const metrics: MetricCardProps[] = [
    {
      icon: Leaf,
      title: 'Carbon Footprint',
      value: '2.5 tons',
      change: '-0.3',
      color: '#4ade80',
    },
    {
      icon: Sun,
      title: 'Investment Credit',
      value: '250 pts',
      change: '+25',
      color: '#fbbf24',
    },
  ];

  const investments: SustainableInvestment[] = [
    {
      name: 'Green Energy Fund',
      ticker: 'GEF',
      price: 78.42,
      marketCap: '$2.8B',
      sustainabilityRating: 92,
      sector: 'Renewable Energy',
      potentialImprovement: 12,
    },
    {
      name: 'Sustainable Tech Corp',
      ticker: 'STC',
      price: 145.67,
      marketCap: '$8.1B',
      sustainabilityRating: 88,
      sector: 'Technology',
      potentialImprovement: 9,
    },
    {
      name: 'Clean Water Solutions',
      ticker: 'CWS',
      price: 52.13,
      marketCap: '$1.5B',
      sustainabilityRating: 95,
      sector: 'Utilities',
      potentialImprovement: 15,
    },
  ];

  const tips = [
    {
      title: 'Reduce Standby Power',
      text: 'Unplug electronics when not in use to save up to 10% on your energy bill.',
    },
    {
      title: 'Water-Wise Gardening',
      text: 'Water plants in the early morning to reduce evaporation and water waste.',
    },
  ];

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [85, 83, 90, 87, 92, 95, 91, 278, 345, 570, 300, 587, 690, 745, 857],
      },
    ],
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  return (
    <Animated.ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      onContentSizeChange={(w, h) => setContentHeight(h)}
    >
      <View style={styles.spotlightContainer}>
        <View style={styles.spotlight} />
      </View>

      <Animated.View
        style={[
          styles.scoreContainer,
          {
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <View style={styles.scoreRow}>
          <View style={styles.scoreCircle}>
            <Text style={styles.score}>857.04</Text>
            <Text style={styles.scoreLabel}>Today's Score</Text>
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hi, Eco-Warrior!</Text>
            <Text style={styles.greetingSubtext}>You're making a difference!</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.contentWrapper,
          {
            transform: [{ scale: contentScale }],
          },
        ]}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week's Progress</Text>
          <LineChart
            data={weeklyData}
            width={Dimensions.get('window').width - 40}
            height={180}
            chartConfig={{
              backgroundColor: '#2a2a2a',
              backgroundGradientFrom: '#2a2a2a',
              backgroundGradientTo: '#2a2a2a',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(74, 222, 128, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sustainability Metrics</Text>
          <View style={styles.metricsContainer}>
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Opportunities</Text>
          {investments.map((investment, index) => (
            <InvestmentCard key={index} investment={investment} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eco Tips</Text>
          {tips.map((tip, index) => (
            <TipCard key={index} tip={tip} />
          ))}
        </View>

        <View style={styles.communityPreview}>
          <LinearGradient
            colors={['rgba(74, 222, 128, 0.2)', 'rgba(74, 222, 128, 0.05)']}
            style={styles.communityGradient}
          >
            <View style={styles.communityContent}>
              <View>
                <Text style={styles.communityTitle}>
                  Join this week's Challenge
                </Text>
                <Text style={styles.communityDescription}>
                  Buy sustainable detergent and earn 30 Green Points!
                </Text>
              </View>
              <Pressable
                style={styles.communityButton}
                onPress={() =>
                  Linking.openURL(
                    'https://www.eea.europa.eu/en/topics/in-depth/sustainability-challenges'
                  )
                }
              >
                <Text style={styles.communityButtonText}>Join</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </View>

       
      </Animated.View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  spotlightContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    overflow: 'hidden',
    zIndex: 1,
  },
  spotlight: {
    position: 'absolute',
    top: -150,
    left: '50%',
    width: 600,
    height: 600,
    marginLeft: -300,
    borderRadius: 300,
    backgroundColor: 'transparent',
    shadowColor: '#4ade80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 200,
    elevation: 20,
  },
  scoreContainer: {
    width: '100%',
    paddingTop: 60,
    paddingBottom: 20,
    zIndex: 2,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    borderWidth: 2,
    borderColor: '#4ade80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ade80',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  greetingContainer: {
    marginLeft: 20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  greetingSubtext: {
    fontSize: 16,
    color: '#4ade80',
    opacity: 0.8,
  },
  section: {
    padding: 20,
    width: '100%',
    maxWidth: 800,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  metricGradient: {
    padding: 15,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  metricChange: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
  },
  investmentCard: {
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  investmentGradient: {
    padding: 15,
  },
  investmentCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  investmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  investmentTicker: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  marketCap: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  investmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ratingContainer: {
    flex: 1,
  },
  ratingLabel: {
    fontSize: 12,
    color: '#999',
  },
  rating: {
    fontSize: 14,
    color: '#4ade80',
    fontWeight: 'bold',
    marginTop: 3,
  },
  sectorContainer: {
    flex: 1,
  },
  sectorLabel: {
    fontSize: 12,
    color: '#999',
  },
  sector: {
    fontSize: 14,
    color: '#fff',
    marginTop: 3,
  },
  improvementContainer: {
    flex: 1,
  },
  improvementLabel: {
    fontSize: 12,
    color: '#999',
  },
  improvement: {
    fontSize: 14,
    color: '#fbbf24',
    fontWeight: 'bold',
    marginTop: 3,
  },
  tipCard: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
  },
  tipContent: {
    marginLeft: 15,
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: '#999',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  communityPreview: {
    padding: 20,
    width: '100%',
    maxWidth: 800,
  },
  communityGradient: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  communityContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  communityDescription: {
    fontSize: 14,
    color: '#999',
    maxWidth: '80%',
  },
  communityButton: {
    backgroundColor: '#4ade80',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  communityButtonText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  contentWrapper: {
    width: '100%',
    alignItems: 'center',
  },
});