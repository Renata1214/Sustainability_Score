import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Trophy, Medal } from 'lucide-react-native';

export default function LeaderboardScreen() {
  const leaderboardData = [
    { rank: 1, name: 'Sarah Chen', score: 95, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { rank: 2, name: 'Alex Kim', score: 92, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
    { rank: 3, name: 'Maria Garcia', score: 88, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
    { rank: 4, name: 'David Lee', score: 85, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
    { rank: 5, name: 'Emma Wilson', score: 82, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return '#ffd700';
      case 2: return '#c0c0c0';
      case 3: return '#cd7f32';
      default: return '#666';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return <Medal size={24} color={getRankColor(rank)} />;
    }
    return <Text style={[styles.rank, { color: getRankColor(rank) }]}>{rank}</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Trophy size={32} color="#ffd700" />
          <Text style={styles.title}>Global Rankings</Text>
        </View>

        <ScrollView 
          style={styles.leaderboard}
          contentContainerStyle={styles.leaderboardContent}>
          {leaderboardData.map((user, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.userCard,
                pressed && styles.userCardPressed
              ]}>
              <View style={styles.rankContainer}>
                {getRankIcon(user.rank)}
              </View>
              <Image
                source={{ uri: user.avatar }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userScore}>{user.score} points</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  leaderboard: {
    flex: 1,
  },
  leaderboardContent: {
    paddingBottom: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  userCardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userScore: {
    color: '#4ade80',
    fontSize: 16,
    marginTop: 5,
  },
});