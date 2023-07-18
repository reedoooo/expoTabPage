import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import Tab from '../../components/tab/Tab';
import ToDoList from '../todolistcontainer/ToDoListContainer';
import NotesContainer from '../notesContainer/NotesContainer';
import ChatGpt from '../openAiContainer/OpenAiContainer'; // Import the ChatGpt component
import Tab4ToDoApp from './Tab4ToDoApp';
import EditTabModalButton from '../../components/buttons/EditTabModalButton';
import HabitTracker from '../habitTracker/HabitTracker';

function TabGridContainer({ savedTabsData }) {
  const [selectedTab, setSelectedTab] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [noteDataLoaded, setNoteDataLoaded] = useState(false);

  // Function to handle opening the modal for a specific tab
  const handleOpenModal = (tab) => {
    setSelectedTab(tab);
    setEditModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedTab(null);
    setEditModalOpen(false);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <ToDoList />
        </View>
        <View style={styles.gridItem}>
          <NotesContainer
            noteDataLoaded={noteDataLoaded}
            setNoteDataLoaded={setNoteDataLoaded}
          />
        </View>
        <View style={styles.gridItem}>
          <ChatGpt /> {/* Add the ChatGpt component */}
        </View>
        <View style={styles.gridItem}>
          <HabitTracker /> {/* Add the ChatGpt component */}
        </View>
        {savedTabsData.map((tab, index) => (
          <View key={tab.id} style={styles.gridItem}>
            <Tab
              allTabs={savedTabsData}
              tab={tab}
              onClose={handleCloseModal}
              onOpenModal={() => handleOpenModal(tab)}
            />
            {selectedTab === tab && (
              <EditTabModalButton
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
                selectedTab={selectedTab}
              />
            )}
          </View>
        ))}
        <View style={styles.gridItem}>
          <Tab4ToDoApp allTabs={savedTabsData} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridItem: {
    width: '45%', // This is an example. You should adjust it depending on your needs
    margin: 10,
  },
});

export default TabGridContainer;
