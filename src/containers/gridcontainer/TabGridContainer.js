import React, { useState } from 'react';
import TaskList from './TaskList'; // New Component

function TabGridContainer({ savedTabsData, activeComponent, setActiveComponent, handleButtonClick }) {
  console.log('savedTabsData', savedTabsData);
  const [selectedTab, setSelectedTab] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [noteDataLoaded, setNoteDataLoaded] = useState(false);

  const handleOpenModal = (tab) => {
    setSelectedTab(tab);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTab(null);
    setEditModalOpen(false);
  };

  return (
    <TaskList
      savedTabsData={savedTabsData}
      activeComponent={activeComponent}
      setActiveComponent={setActiveComponent}
      handleButtonClick={handleButtonClick}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      noteDataLoaded={noteDataLoaded}
      setNoteDataLoaded={setNoteDataLoaded}
      selectedTab={selectedTab}
      isEditModalOpen={isEditModalOpen} // Added these two props
    />
  );
}

export default TabGridContainer;

// import React, { useState } from 'react';
// import { ScrollView, View, StyleSheet } from 'react-native';
// import Tab from '../../components/tab/Tab';
// import NotesContainer from '../notesContainer/NotesContainer';
// import ChatGpt from '../openAiContainer/OpenAiContainer';
// import Tab4ToDoApp from './Tab4ToDoApp';
// import EditTabModalButton from '../../components/buttons/EditTabModalButton';
// import { ToDoList } from '../todolistcontainer/ToDoList';

// function TabGridContainer({ savedTabsData }) {
//   const [selectedTab, setSelectedTab] = useState(null);
//   const [isEditModalOpen, setEditModalOpen] = useState(false);
//   const [noteDataLoaded, setNoteDataLoaded] = useState(false);

//   const handleOpenModal = (tab) => {
//     setSelectedTab(tab);
//     setEditModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedTab(null);
//     setEditModalOpen(false);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <ToDoList />
//       <View style={styles.gridItem}>
//         <NotesContainer
//           noteDataLoaded={noteDataLoaded}
//           setNoteDataLoaded={setNoteDataLoaded}
//         />
//       </View>
//       <View style={styles.gridItem}>
//         <ChatGpt />
//       </View>
//       {savedTabsData.map((tab, index) => (
//         <View key={tab.id} style={styles.gridItem}>
//           <Tab
//             allTabs={savedTabsData}
//             tab={tab}
//             onClose={handleCloseModal}
//             onOpenModal={() => handleOpenModal(tab)}
//           />
//           {selectedTab?.id === tab.id && (
//             <EditTabModalButton
//               isOpen={isEditModalOpen}
//               onClose={handleCloseModal}
//               selectedTab={selectedTab}
//             />
//           )}
//         </View>
//       ))}
//       <View style={styles.gridItem}>
//         <Tab4ToDoApp allTabs={savedTabsData} />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//   },
//   gridItem: {
//     width: '45%',
//     margin: 10,
//   },
// });

// export default TabGridContainer;
