import { Tabs } from 'expo-router';
import { Leaf, Trophy, MessageSquare } from 'lucide-react-native';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

export default function TabLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Tab Navigation - keeping it minimal with no header */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#4ade80',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: styles.tabBar,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <Leaf size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="achievements"
          options={{
            title: 'Achievements',
            tabBarIcon: ({ color }) => <Trophy size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: 'Community',
            tabBarIcon: ({ color }) => (
              <MessageSquare size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="impact"
          options={{
            title: 'Impact',
            tabBarIcon: ({ color }) => <Leaf size={24} color={color} />,
            href: null, // This makes it accessible only via direct navigation, not via tab
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  tabBar: {
    backgroundColor: '#2a2a2a',
    borderTopColor: '#333',
    paddingTop: 10,
    height: 60,
  },
});
