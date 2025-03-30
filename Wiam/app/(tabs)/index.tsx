import { View, Text, StyleSheet, Image, ScrollView, Pressable, Dimensions, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Leaf, Droplet, Wind, Sun, TrendingUp, Award, ArrowUp, ArrowDown, Info } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';

interface MetricCardProps {
  icon: typeof Leaf;
  title: string;
  value: string;
  change: string;
  color: string;
}

interface ImpactProduct {
  name: string;
  image: string;
  impact: number;
  description: string;
}

interface SustainableInvestment {
  name: string;
  ticker: string;
  price: number;
  sustainabilityRating: number;
  marketCap: string;
  sector: string;
  potentialImprovement: number;
}

function ImpactProductCard({ product }: { product: ImpactProduct }) {
  const isPositive = product.impact > 0;
  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.productCard,
        pressed && styles.productCardPressed
      ]}>
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <View style={styles.impactContainer}>
          {isPositive ? (
            <ArrowUp size={16} color="#4ade80" />
          ) : (
            <ArrowDown size={16} color="#ef4444" />
          )}
          <Text style={[
            styles.impactText,
            { color: isPositive ? '#4ade80' : '#ef4444' }
          ]}>
            {Math.abs(product.impact)}% impact
          </Text>
        </View>
      </View>
    </Pressable>
  );
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
        pressed && styles.investmentCardPressed
      ]}>
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
          <Text style={styles.rating}>{investment.sustainabilityRating}/100</Text>
        </View>
        <View style={styles.sectorContainer}>
          <Text style={styles.sectorLabel}>Sector</Text>
          <Text style={styles.sector}>{investment.sector}</Text>
        </View>
        <View style={styles.improvementContainer}>
          <Text style={styles.improvementLabel}>Potential Score Improvement</Text>
          <Text style={styles.improvement}>+{investment.potentialImprovement} pts</Text>
        </View>
      </View>
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

  const historicalData = {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [{
      data: [75, 78, 80, 82, 84, 85],
    }],
  };

  const impactProducts: ImpactProduct[] = [
    {
      name: 'Reusable Water Bottle',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
      impact: 15,
      description: 'Eliminated 200+ single-use plastic bottles annually',
    },
    {
      name: 'Fast Fashion Purchase',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f',
      impact: -10,
      description: 'High water usage and carbon emissions in production',
    },
    {
      name: 'Solar Panels',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276',
      impact: 25,
      description: 'Reduced household carbon emissions by 60%',
    },
    {
      name: 'Local Produce',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9',
      impact: 8,
      description: 'Reduced transportation emissions and supported local farming',
    },
  ];

  const investments: SustainableInvestment[] = [
    {
      name: 'Green Energy Corp',
      ticker: 'GEC',
      price: 45.67,
      sustainabilityRating: 92,
      marketCap: '5.2B',
      sector: 'Renewable Energy',
      potentialImprovement: 3,
    },
    {
      name: 'Sustainable Tech',
      ticker: 'STECH',
      price: 128.45,
      sustainabilityRating: 88,
      marketCap: '12.8B',
      sector: 'Technology',
      potentialImprovement: 2,
    },
    {
      name: 'Clean Water Solutions',
      ticker: 'CWS',
      price: 34.21,
      sustainabilityRating: 95,
      marketCap: '3.1B',
      sector: 'Utilities',
      potentialImprovement: 4,
    },
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

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Score History</Text>
        <LineChart
          data={historicalData}
          width={Dimensions.get('window').width - 40}
          height={220}
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
        <Text style={styles.sectionTitle}>Top Impact Products</Text>
        {impactProducts.map((product, index) => (
          <ImpactProductCard key={index} product={product} />
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sustainable Investments</Text>
          <Pressable style={styles.infoButton}>
            <Info size={16} color="#666" />
          </Pressable>
        </View>
        <Text style={styles.disclaimer}>
          Investment information is for educational purposes only. Past performance does not guarantee future results.
        </Text>
        {investments.map((investment, index) => (
          <InvestmentCard key={index} investment={investment} />
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
  chartContainer: {
    padding: 20,
    width: '100%',
    maxWidth: 800,
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
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
  section: {
    padding: 20,
    width: '100%',
    maxWidth: 800,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  productCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  productCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
    padding: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  impactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  investmentCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  investmentCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  investmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  investmentTicker: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4ade80',
  },
  marketCap: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  investmentDetails: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 15,
  },
  ratingContainer: {
    marginBottom: 10,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  rating: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  sectorContainer: {
    marginBottom: 10,
  },
  sectorLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  sector: {
    fontSize: 16,
    color: '#fff',
  },
  improvementContainer: {
    marginTop: 5,
  },
  improvementLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  improvement: {
    fontSize: 16,
    color: '#4ade80',
    fontWeight: 'bold',
  },
  infoButton: {
    padding: 5,
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 15,
  },
});