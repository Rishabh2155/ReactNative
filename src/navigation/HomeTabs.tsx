import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NearbyPharmacyScreen from 'C:/Users/Acer/Desktop/final happy/FinalHappyApp/src/screens/Home/NearbyPharmacy.tsx';
import ReminderScreen from '../screens/Home/ReminderScreen';


const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      
      <Tab.Screen name="Nearby Pharmacy" component={NearbyPharmacyScreen} />
      <Tab.Screen name="Reminders" component={ReminderScreen} 
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
