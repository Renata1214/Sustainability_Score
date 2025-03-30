import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import leaderboardJson from '../data/leaderboard.json';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const leaderboardData = leaderboardJson.leaderboard;
const harmfulProducts = leaderboardJson.harmful_products_user_001;

export default function LeaderboardScreen() {
  const getMedalEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  const isNegativeScore = (score: number) => score < 0;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.column}>
          <Text style={styles.title}>🏆 Global Sustainability Leaderboard</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.leaderboardContainer}>
              {leaderboardData.map((item, index) => (
                <LinearGradient
                  key={item.user_id}
                  colors={[
                    'rgba(28, 28, 30, 0.95)',
                    'rgba(28, 28, 30, 0.85)',
                    'rgba(28, 28, 30, 0.75)'
                  ]}
                  locations={[0, 0.7, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.leaderItemGradient}
                >
                  <View style={styles.leaderItem}>
                    <Text style={styles.rank}>{getMedalEmoji(index)}</Text>
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>{item.user_id}</Text>
                      <Text style={styles.userScore}>{item.score.toFixed(2)} points</Text>
                    </View>
                  </View>
                </LinearGradient>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.divider} />

        <View style={styles.column}>
          <Text style={styles.subheading}>🔄 How can I climb up the leaderboard?</Text>
          <Text style={styles.description}>Replace these products!</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.productsContainer}>
              {harmfulProducts.map((item, index) => {
                const negative = isNegativeScore(Number(item.score));
                return (
                  <LinearGradient
                    key={item.product_name + index}
                    colors={[
                      'rgba(39, 39, 42, 0.95)',
                      'rgba(39, 39, 42, 0.85)',
                      'rgba(39, 39, 42, 0.75)'
                    ]}
                    locations={[0, 0.7, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[
                      styles.productCardGradient,
                      { borderLeftColor: negative ? '#f87171' : '#4ade80' }
                    ]}
                  >
                    <View style={[
                      styles.productCard,
                      { borderLeftColor: negative ? '#f87171' : '#4ade80' }
                    ]}>
                      <Text style={styles.productName}>{item.product_name}</Text>
                      <Text style={styles.productDetails}>🛍️ Brand: {item.brand}  |  🏪 Store: {item.store}</Text>
                      <Text style={[
                        styles.productScore,
                        { color: negative ? '#f87171' : '#4ade80' }
                      ]}>
                        {negative ? '🔻' : '🔼'} Sustainability Score:{' '}
                        <Text style={[
                          styles.scoreValue,
                          { color: negative ? '#ef4444' : '#22c55e' }
                        ]}>
                          {item.score}
                        </Text>
                      </Text>
                    </View>
                  </LinearGradient>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  content: {
    flex: 1,
    flexDirection: isWeb ? 'row' : 'column',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    maxWidth: isWeb ? 1400 : undefined,
    alignSelf: 'center',
    width: '100%',
  },
  column: {
    flex: 1,
    minWidth: isWeb ? 400 : 'auto',
    maxWidth: isWeb ? 800 : undefined,
    alignSelf: 'center',
    width: '100%',
  },
  divider: {
    width: isWeb ? 1 : '100%',
    height: isWeb ? '100%' : 1,
    backgroundColor: '#27272a',
    marginHorizontal: isWeb ? 20 : 0,
    marginVertical: isWeb ? 0 : 20,
  },
  scrollView: {
    flex: 1,
  },
  leaderboardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  productsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#facc15',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#a1a1aa',
    marginBottom: 15,
    textAlign: 'center',
  },
  leaderItemGradient: {
    width: '100%',
    maxWidth: 600,
    marginBottom: 12,
    borderRadius: 14,
    shadowColor: '#4ade80',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  leaderItem: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    fontSize: 24,
    marginRight: 16,
    color: '#ffffff',
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    color: '#f3f4f6',
    fontSize: 18,
    fontWeight: '600',
  },
  userScore: {
    color: '#34d399',
    fontSize: 16,
  },
  productCardGradient: {
    width: '100%',
    maxWidth: 600,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#f87171',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    borderLeftWidth: 4,
  },
  productCard: {
    padding: 15,
    borderLeftWidth: 4,
  },
  productName: {
    color: '#fefefe',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productDetails: {
    color: '#d4d4d8',
    fontSize: 14,
    marginBottom: 4,
  },
  productScore: {
    fontSize: 14,
  },
  scoreValue: {
    fontWeight: 'bold',
  },
});