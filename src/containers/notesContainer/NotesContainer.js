import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import NotesAccordion from '../../components/notes/NotesAccordion'; // You'll need to create a native version of this component
import Constants from 'expo-constants';

const { REACT_APP_SERVER } = Constants.manifest.extra;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: windowWidth * 0.8,
    maxHeight: windowHeight * 0.8,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // semi-transparent white background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: Platform.OS === 'android' ? 5 : 0,
  },
});

function NotesContainer() {
  const [savedNotesData, setSavedNotesData] = useState([]);
  const [note, setNote] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const loadNoteData = async () => {
      try {
        const requestOptions = {
          method: 'GET',
        };

        const serverResponse = await fetch(
          `${REACT_APP_SERVER}/api/notes`,
          requestOptions,
        );

        const serverData = await serverResponse.json();

        let notesData = [];
        serverData.forEach((noteData) => {
          if (Array.isArray(noteData.contents)) {
            const notes = noteData.contents
              .filter((note) => note.title && note.notes)
              .map((note) => {
                return {
                  title: note.title,
                  notes: note.notes,
                  id: noteData._id,
                };
              });
            notesData = [...notesData, ...notes];
          }
        });

        setSavedNotesData(notesData);
      } catch (error) {
        console.error('Error fetching note data:', error);
      }
    };

    loadNoteData();
  }, []);

  const handleSaveNote = (newNote) => {
    setSavedNotesData((prevNotes) => [...prevNotes, newNote]);
  };

  const handleUpdateNote = (updatedNote) => {
    setSavedNotesData((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote._id ? updatedNote : note,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <NotesAccordion
          note={note}
          setNote={setNote}
          editing={editing}
          allNotes={savedNotesData}
          setAllNotes={setSavedNotesData} 
          setEditing={setEditing}
          handleSaveNote={handleSaveNote}
          handleUpdateNote={handleUpdateNote}
        />
      </View>
    </View>
  );
}

export default NotesContainer;
