import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { View, Text, StyleSheet, Animated, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function LoadingScreen({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const opacityAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 15,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(800),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 1200,
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
    width: '100%',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Platform.select({ ios: 10, android: 10, default: 20 }),
  },
  logo: {
    fontSize: Platform.select({ ios: 64, android: 64, default: 96 }),
    marginBottom: Platform.select({ ios: 20, android: 20, default: 30 }),
  },
  appName: {
    fontSize: Platform.select({ 
      ios: SCREEN_WIDTH * 0.15,
      android: SCREEN_WIDTH * 0.15,
      default: 200 
    }),
    fontWeight: 'bold',
    color: '#4ade80',
    letterSpacing: 2,
    textAlign: 'center',
  },
  tagline: {
    fontSize: Platform.select({ ios: 16, android: 16, default: 20 }),
    color: '#666',
    letterSpacing: 3,
    marginTop: Platform.select({ ios: 8, android: 8, default: 10 }),
    textAlign: 'center',
  },
});