import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Новости' }} />
      <Tabs.Screen name="favorites" options={{ title: 'Избранное' }} />
    </Tabs>
  );
}
