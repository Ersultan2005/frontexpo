// import { Tabs } from 'expo-router';
// import { FavoritesProvider } from '../contexts/FavoritesContext';
// import { Ionicons } from '@expo/vector-icons';

// export default function Layout() {
//   return (
//     <FavoritesProvider>
//       <Tabs screenOptions={{ headerShown: false }}>
//         <Tabs.Screen
//           name="index"
//           options={{
//             title: 'Новости',
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="newspaper-outline" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="favorites"
//           options={{
//             title: 'Избранное',
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="star-outline" color={color} size={size} />
//             ),
//           }}
//         />
//       </Tabs>
//     </FavoritesProvider>
//   );
// }




import { Slot } from 'expo-router';
import { FavoritesProvider } from '../contexts/FavoritesContext';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Slot />
    </FavoritesProvider>
  );
}
