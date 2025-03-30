// app/(tabs)/leaderboard.tsx
import { Printer } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function LeaderboardScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://expert-fiesta-6qq9pwq9694frgj4-5000.app.github.dev/leaderboard')
      .then((res) => res.json())
      .then((json) => {
        console.log("📦 API returned:", json); // 👈 Check this in browser console
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setLoading(false);
      });
  }, []);
  
  const getMedalEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  if (loading) return <ActivityIndicator size="large" color="#4ade80" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Global Rankings</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.user_id}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{getMedalEmoji(index)}</Text>
            <View>
              <Text style={styles.name}>{item.user_id}</Text>
              <Text style={styles.score}>{item.score} points</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  item: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: { fontSize: 24, marginRight: 12 },
  name: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  score: { color: '#4ade80', fontSize: 16 },
});
