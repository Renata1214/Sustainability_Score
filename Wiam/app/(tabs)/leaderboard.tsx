// // app/(tabs)/leaderboard.tsx
// import React from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import leaderboardData from '../data/leaderboard.json'; // 👈 Direct import, no fetch!

// export default function LeaderboardScreen() {
//   const getMedalEmoji = (index: number) => {
//     if (index === 0) return '🥇';
//     if (index === 1) return '🥈';
//     if (index === 2) return '🥉';
//     return `${index + 1}`;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🏆 Global Rankings</Text>
//       <FlatList
//         data={leaderboardData}
//         keyExtractor={(item) => item.user_id}
//         renderItem={({ item, index }) => (
//           <View style={styles.item}>
//             <Text style={styles.rank}>{getMedalEmoji(index)}</Text>
//             <View>
//               <Text style={styles.name}>{item.user_id}</Text>
//               <Text style={styles.score}>{item.score.toFixed(2)} points</Text>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#111', padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', color: 'white', marginBottom: 20 },
//   item: {
//     backgroundColor: '#1e1e1e',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rank: { fontSize: 24, marginRight: 12 },
//   name: { color: 'white', fontWeight: 'bold', fontSize: 18 },
//   score: { color: '#4ade80', fontSize: 16 },
// });
// import React from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import leaderboardJson from '../data/leaderboard.json';

// const leaderboardData = leaderboardJson.leaderboard;
// const harmfulProducts = leaderboardJson.harmful_products_user_001;

// export default function LeaderboardScreen() {
//   const getMedalEmoji = (index: number) => {
//     if (index === 0) return '🥇';
//     if (index === 1) return '🥈';
//     if (index === 2) return '🥉';
//     return `${index + 1}`;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🏆 Global Rankings</Text>
//       <FlatList
//         data={leaderboardData}
//         keyExtractor={(item) => item.user_id}
//         renderItem={({ item, index }) => (
//           <View style={styles.item}>
//             <Text style={styles.rank}>{getMedalEmoji(index)}</Text>
//             <View>
//               <Text style={styles.name}>{item.user_id}</Text>
//               <Text style={styles.score}>{item.score.toFixed(2)} points</Text>
//             </View>
//           </View>
//         )}
//       />

//       {/* Harmful Products Section */}
//       <Text style={styles.subtitle}>How can I climb up the leaderboard? Replace these products!</Text>
//       <FlatList
//         data={harmfulProducts}
//         keyExtractor={(item, index) => item.product_name + index}
//         renderItem={({ item }) => (
//           <View style={styles.productItem}>
//             <Text style={styles.productName}>{item.product_name}</Text>
//             <Text style={styles.productDetail}>Brand: {item.brand} | Store: {item.store}</Text>
//             <Text style={styles.productScore}>Sustainability Score: {item.score}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#111', padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', color: 'white', marginBottom: 20 },
//   subtitle: { fontSize: 18, fontWeight: 'bold', color: '#f87171', marginTop: 30, marginBottom: 10 },
//   item: {
//     backgroundColor: '#1e1e1e',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rank: { fontSize: 24, marginRight: 12 },
//   name: { color: 'white', fontWeight: 'bold', fontSize: 18 },
//   score: { color: '#4ade80', fontSize: 16 },
//   productItem: {
//     backgroundColor: '#27272a',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   productName: { color: 'white', fontWeight: 'bold', fontSize: 16 },
//   productDetail: { color: '#d4d4d8', fontSize: 14 },
//   productScore: { color: '#f87171', fontSize: 14, marginTop: 4 },
// });
import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import leaderboardJson from '../data/leaderboard.json';

const leaderboardData = leaderboardJson.leaderboard;
const harmfulProducts = leaderboardJson.harmful_products_user_001;

export default function LeaderboardScreen() {
  const getMedalEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>🏆 Global Sustainability Leaderboard</Text>

      <View style={styles.centeredSection}>
        {leaderboardData.map((item, index) => (
          <View style={styles.leaderItem} key={item.user_id}>
            <Text style={styles.rank}>{getMedalEmoji(index)}</Text>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.user_id}</Text>
              <Text style={styles.userScore}>{item.score.toFixed(2)} points</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.subheading}>🔄 How can I climb up the leaderboard?</Text>
      <Text style={styles.description}>Replace these products!</Text>

      <View style={styles.centeredSection}>
        {harmfulProducts.map((item, index) => (
          <View style={styles.productCard} key={item.product_name + index}>
            <Text style={styles.productName}>{item.product_name}</Text>
            <Text style={styles.productDetails}>🛍️ Brand: {item.brand}  |  🏪 Store: {item.store}</Text>
            <Text style={styles.productScore}>
              🔻 Sustainability Score: <Text style={styles.lowScore}>{item.score}</Text>
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#101010',
  },
  centeredSection: {
    width: '100%',
    maxWidth: 450, // Ensures it stays centered on wider screens
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
    marginTop: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#a1a1aa',
    marginBottom: 15,
    textAlign: 'center',
  },
  leaderItem: {
    backgroundColor: '#1c1c1e',
    width: '100%',
    padding: 15,
    marginBottom: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
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
  productCard: {
    backgroundColor: '#27272a',
    width: '100%',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f87171',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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
    color: '#f87171',
  },
  lowScore: {
    fontWeight: 'bold',
    color: '#ef4444',
  },
});
