import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AccountComponent from './Components/Screens/Account/AccountScreen';
import ActivitiesComponent from './Components/Screens/ActivitiesScreen';
import LeadsComponent from './Components/Screens/Lead/LeadsScreen';
import ContentComponent from './Components/Screens/Content/ContentScreen';
import FollowUpsComponent from './Components/Screens/FollowUpsScreen';
import LeadsDetailsStackScreen from './Components/Screens/Lead/leadDetails';
import LeadsEditStackScreen from './Components/Screens/Lead/editDetails';
import messaging from '@react-native-firebase/messaging';
import LeadsAddStackScreen from './Components/Screens/Lead/leadAddDetails';
import ClientAddStackScreen from './Components/Screens/Client/clientAddDetails';
import ClientDetailsStackScreen from './Components/Screens/Client/clientDetails';
import ContentDetailsStackScreen from './Components/Screens/Content/contentDetails';
import { PaperProvider, IconButton } from 'react-native-paper';
import { Button } from 'react-native';
import HomeScreen from './Components/Screens/HomeComponent';
import CustomHeader from './commonComponent/backButton';
import RoomBookingComponent from './Components/Screens/RoomBooking';
import AdminComponent from './Components/Screens/AdminScreen';
import MembershipsComponent from './Components/Screens/Memberships';
import EventsComponent from './Components/Screens/EventScreen';
import NotificationsComponent from './Components/Screens/Notifications';
import ExpensesComponent from './Components/Screens/ExpenseScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const navigation = useNavigation();
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }


  const getFirebaseToken = async () => {
    const firebaseToken = await messaging().getToken();
    console.log(firebaseToken, "firebase tokeeen")
  }


  useEffect(() => {
    requestUserPermission();
    getFirebaseToken();
  })

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Leads"
        component={LeadsComponent}
        options={{
          headerTitle: "",
          tabBarIcon: ({ color, size }) => (
            <Icon name="users" size={size} color={color} />
          ),
          headerLeft: () => (
            // <IconButton icon="arrow-left"  onPress={() => navigation.goBack()} style={{ position: 'absolute',
            // top: 10,
            // left: 10,
            // backgroundColor: 'transparent'}} />
            <CustomHeader title="Leads" backButtonVisible={true} onBackPress={() => navigation.goBack()} />
          ),
        }}
      />
      <Tab.Screen
        name="Content"
        component={ContentComponent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="newspaper" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Activities"
        component={ActivitiesComponent}
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({ color, size }) => (
            <Icon name="chart-bar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FollowUps"
        component={FollowUpsComponent}
        options={{
          tabBarLabel: 'FollowUps',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" size={size} color={color} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountComponent}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const [showHomeComponent, setShowHomeComponent] = useState(true);
  return (
    <PaperProvider>
      <NavigationContainer>

        <Stack.Navigator>
          {showHomeComponent && (
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="RoomBooking"
            component={RoomBookingComponent}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Memberships"
            component={MembershipsComponent}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Admin"
            component={AdminComponent}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Events"
            component={EventsComponent}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Expenses"
            component={ExpensesComponent}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsComponent}
            options={{ headerShown: true }}
          />

          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StackLeadDetails"
            component={LeadsDetailsStackScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StackLeadEdit"
            component={LeadsEditStackScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StackLeadAdd"
            component={LeadsAddStackScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StackClientAdd"
            component={ClientAddStackScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StackClientDetails"
            component={ClientDetailsStackScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StackContentDetails"
            component={ContentDetailsStackScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
