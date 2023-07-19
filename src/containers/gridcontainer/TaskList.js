import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

// Local component imports
import Tab from '../../components/tab/Tab';
import NotesContainerButton from '../notesContainer/NotesContainerButton';
import NotesContainer from '../notesContainer/NotesContainer';

import Tab4ToDoApp from './Tab4ToDoApp';
import EditTabModalButton from '../../components/buttons/EditTabModalButton';
import ToDoList from '../todolistcontainer/ToDoList';
import ToDoListButton from '../todolistcontainer/ToDoListButton';

// The main TaskList component
function TaskList({
  savedTabsData,
  handleOpenModal,
  handleCloseModal,
  selectedTab,
  isEditModalOpen,
  activeComponent,
  handleButtonClick,
	handleResetActiveComponent
}) {
  // const [activeComponent, setActiveComponent] = useState(null);

	// const handleButtonClick = (componentName) => {
	// 	setActiveComponent(componentName || null);
	// };
	const data = [...savedTabsData, { id: 'special', component: <Tab4ToDoApp allTabs={savedTabsData} /> }];


	

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <View style={styles.buttonComponent}>
          {activeComponent !== 'ToDoList' && (
            <ToDoListButton handleButtonClick={handleButtonClick} />
          )}
          {activeComponent === 'ToDoList' && <ToDoList />}
        </View>

				<View style={activeComponent === 'NotesContainer' ? styles.fullWidthComponent : styles.buttonComponent}>
          {activeComponent !== 'NotesContainer' && (
            <NotesContainerButton handleButtonClick={handleButtonClick} handleResetActiveComponent={handleResetActiveComponent} />
          )}
          {activeComponent === 'NotesContainer' && <NotesContainer handleResetActiveComponent={handleResetActiveComponent} />}
        </View>
      </View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        numColumns={3}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={item.id === 'special' ? styles.specialGridItem : styles.gridItem}>
            {item.id === 'special' ? item.component : (
              <>
                <Tab
                  allTabs={savedTabsData}
                  tab={item}
                  onClose={handleCloseModal}
                  onOpenModal={() => handleOpenModal(item)}
                />
                {selectedTab?.id === item.id && (
                  <EditTabModalButton
                    isOpen={isEditModalOpen}
                    onClose={handleCloseModal}
                    onOpen={() => handleOpenModal(item)}
                    selectedTab={selectedTab}
                    allTabs={savedTabsData}
                  />
                )}
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}

// Styling
// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Change this line for translucency
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonComponent: {
    flex: 1,
  },
  listContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    margin: 5,
    width: '30%',
    aspectRatio: 1,
  },
  fullWidthComponent: {
    flex: 1,
    width: '100%',
  },
  specialGridItem: {
    margin: 5,
    width: '30%',
    aspectRatio: 1,
    // add additional styles for your special grid item if needed
  },
});




// Component export
export default TaskList;
