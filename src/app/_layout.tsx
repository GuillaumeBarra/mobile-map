import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { KikiColors, KikiTabBarHeight } from '@/constants/kiki-theme';
import { mockData, unreadMessageCount } from '@/data';

export default function TabLayout() {
  const { app } = mockData;
  const unreadCount = unreadMessageCount(mockData.messages);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: KikiColors.teal,
          tabBarInactiveTintColor: KikiColors.textMuted,
          tabBarStyle: {
            backgroundColor: KikiColors.white,
            borderTopColor: KikiColors.border,
            borderTopWidth: 1,
            paddingTop: 4,
            height: KikiTabBarHeight,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Community',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="trips"
          options={{
            title: 'Trips',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: 'Messages',
            tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
            tabBarBadgeStyle: {
              backgroundColor: KikiColors.teal,
              fontSize: 10,
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <Image
                source={{ uri: app.userAvatar }}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderWidth: focused ? 2 : 0,
                  borderColor: KikiColors.teal,
                }}
                contentFit="cover"
              />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
