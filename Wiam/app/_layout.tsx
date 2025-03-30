import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function LoadingScreen({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const opacityAnim = new Animated.Value(1);

  useEffect(() => {
    // Initial delay before starting animations
    Animated.sequence([
      // Add initial delay
      Animated.delay(500),
      // Slower fade in and scale up of the logo
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2500, // Increased from 1500
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 15, // Reduced from 20
          friction: 8, // Increased from 7
          useNativeDriver: true,
        }),
      ]),
      // Longer pause before fade out
      Animated.delay(800), // Increased from 500
      // Slower fade out
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 1200, // Increased from 800
        useNativeDriver: true,
      }),
    ]).start(() => {
      onAnimationComplete();
    });
  }, []);

  return (
    <Animated.View
      style={[
        styles.loadingContainer,
        {
          opacity: opacityAnim,
        },
      ]}>
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>🌱</Text>
            <Text style={styles.appName}>Sustainify</Text>
          </View>
          <Text style={styles.tagline}>Track. Improve. Sustain.</Text>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  useFrameworkReady();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
      {isLoading && (
        <LoadingScreen onAnimationComplete={() => setIsLoading(false)} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 96,
    marginBottom: 30,
  },
  appName: {
    fontSize: 200,
    fontWeight: 'bold',
    color: '#4ade80',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 20,
    color: '#666',
    letterSpacing: 3,
    marginTop: 10,
  },
});