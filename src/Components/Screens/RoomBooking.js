import {View, Text , StyleSheet,Platform,TouchableOpacity ,ScrollView} from 'react-native';
import RoomBookingslots from "../../lib/constant";

const TimeSlot = ({ TimeInHour, TimeInMinute }) => {
    const addZeroes = num => {
        if (num < 10) {
          return '0' + num;
        }
        return num;
      };
    return (
        <TouchableOpacity style={[styles.slotItem, { backgroundColor: '#e5e5e5' }]}>
        <Text style={styles.slotLabel}>
          {addZeroes(TimeInHour)} : {addZeroes(TimeInMinute)}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    contentContainer: {
        display: 'flex',
        flexGrow: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
      },
      slotsContainer: {
        marginTop: 18,
        paddingHorizontal: 8,
        paddingTop: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      },
      slotItem: {
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        margin:8,
        ...Platform.select({
          ios: {
            shadowColor: '#1B1212',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          },
          android: {
            elevation: 10,
            borderRadius: 20,
          },
        }),
      },
      slotLabel: {
        fontWeight: '600',
        fontFamily: 'Mont-SemiBold',
        textAlign: 'center',
        fontSize: 15,
      },
  });

  const AppointmentSlots = ({ slots }) => {
  
    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.slotsContainer}>
          {slots.map((slot, index) => (
            <TimeSlot
              key={slot.applicationId} // Use a unique key for each slot
              TimeInHour={slot.timeSlot.hour}
              TimeInMinute={slot.timeSlot.minute}
              style={[index % 4 === 0 ? { marginRight: 0 } : null]} // Add margin only for the first slot in each row
            />
          ))}
        </View>
      </ScrollView>
    );
  };

  
  const RoomBookingComponent = () => {
    return (
      <View>
        <AppointmentSlots slots={RoomBookingslots} />
      </View>
    );
  };

  export default RoomBookingComponent;
  