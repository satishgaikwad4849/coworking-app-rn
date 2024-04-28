import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { Card, Title, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateToDashboard = () => {
    // Navigation logic for Dashboard screen
  };

  const navigateToRoomBookings = () => {
    // Navigation logic for Room Bookings screen
    navigation.navigate('RoomBooking');
  };

  const navigateToNotifications = () => {
    // Navigation logic for Notifications screen
    navigation.navigate('Notifications');
  };

  const navigateToAdmin = () => {
    // Navigation logic for Admin screen
    navigation.navigate('Admin');
  };

  const navigateToMemberships = () => {
    // Navigation logic for Memberships screen
    navigation.navigate("Memberships");
  };

  const navigateToExpenses = () => {
    // Navigation logic for Expenses screen
    navigation.navigate('Expenses');
  };

  const navigateToEvents = () => {
    // Navigation logic for All Cars screen
    navigation.navigate('Events');
  };

  const navigateToLeads = () => {
    // onLeadProps(false);
    navigation.navigate('TabNavigator');
  };

  const cardsData = [
    { title: 'Dashboard', icon: 'view-dashboard', onPress: navigateToDashboard },
    { title: 'Leads', icon: 'account', onPress: navigateToLeads },
    { title: 'Room Bookings', icon: 'calendar-check', onPress: navigateToRoomBookings },
    { title: 'Notifications', icon: 'bell', onPress: navigateToNotifications },
    { title: 'Admin', icon: 'shield', onPress: navigateToAdmin },
    { title: 'Memberships', icon: 'card-account-details', onPress: navigateToMemberships },
    { title: 'Expenses', icon: 'currency-usd', onPress: navigateToExpenses },
    { title: 'Events', icon: 'calendar', onPress: navigateToEvents },
  ];

  // Split the cardsData into two arrays
  const halfLength = Math.ceil(cardsData.length / 2);
  const firstHalf = cardsData.slice(0, halfLength);
  const secondHalf = cardsData.slice(halfLength);

  const renderCard = (data) => (
    <TouchableOpacity key={data.title} onPress={data.onPress}>
      <Card style={styles.card}>
        <View style={styles.cardIcon}>
          <View style={styles.iconShadow}>
            <IconButton icon={data.icon} size={24} color="#024b47" />
          </View>
        </View>
        <View style={styles.cardTitleContainer}>
          <Title style={styles.cardTitle}>{data.title}</Title>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="menu" onPress={toggleMenu} />
        <Text style={styles.headerTitle}>Cowork App</Text>
      </View>
      {isMenuOpen && (
        <View style={styles.sidebar}>
          <TouchableOpacity onPress={closeMenu}>
            <IconButton icon="close" onPress={closeMenu} style={styles.closeButton} />
          </TouchableOpacity>
          {/* Add sidebar menu items here */}
          <TouchableOpacity onPress={() => { /* Implement menu item logic */ }}>
            <Text style={styles.menuItem}>Menu Item 1</Text>
          </TouchableOpacity>
          {/* ... other menu items */}
        </View>
      )}
      <ImageBackground source={{ uri: 'https://img.freepik.com/free-vector/mobile_677411-3170.jpg' }} style={styles.backgroundImage}>
        <View style={styles.content}>
          <View style={styles.cardContainer}>
            {firstHalf.map(renderCard)}
          </View>
          <View style={styles.cardContainer}>
            {secondHalf.map(renderCard)}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Make sidebar full height
    backgroundColor: '#fff',
    zIndex: 10,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  menuItem: {
    fontSize: 16,
    // marginBottom: 10,
  },
  content: {
    flex: 1, // Occupy remaining space after header and sidebar
    marginTop: 50, // Spacing between header and content
    flexDirection: 'row', // Arrange the card containers side by side
  },
  cardContainer: {
    flex: 1, // Equal width for both card containers
    paddingHorizontal: 5, // Add horizontal padding for spacing
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    // backgroundColor: '#fff', // White card background
    padding: 10, // Increase card padding
    borderRadius: 10, // Rounded corners
    shadowColor: '#ccc', // Light shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20, // Spacing between cards
    marginHorizontal: 10,
    height: 120, // Increase card height
  },
  cardTitleContainer: {
    marginBottom: 10, // Add spacing between title and icon
  },
  cardTitle: {
    color: '#024b47',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Center card titles
  },
  cardIcon: {
    alignItems: 'center', // Center icon horizontally
  },
  iconShadow: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default HomeScreen;
