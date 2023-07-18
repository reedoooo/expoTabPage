import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import ScheduleModal from '../../components/modals/ScheduleModal';

const HabitTracker = () => {
  const [habits, setHabits] = useState({
    lifting: [],
    sleep: [],
    brushedTeeth: [],
    noSugar: [],
    screenTime: [],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const handleModalSubmit = (eventData) => {
    setHabits((prev) => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], eventData],
    }));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
          (day) => (
            <TouchableWithoutFeedback key={day} onPress={() => handleDayClick(day)}>
              <View style={styles.dayBox}>
                <Text style={styles.dayText}>{day}</Text>
                {habits[day].map((event, index) => (
                  <Text key={index}>
                    {event.name} at {event.time} in {event.place}
                  </Text>
                ))}
              </View>
            </TouchableWithoutFeedback>
          ),
        )}
      </View>
      <ScheduleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleModalSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  box: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    elevation: 10, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
  },
  dayBox: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dayText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HabitTracker;
