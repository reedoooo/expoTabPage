import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import NotesAccordion from '../../components/notes/NotesAccordion'; // You'll need to create a native version of this component

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
          `${process.env.REACT_APP_SERVER}/api/notes`,
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
    <View>
      <NotesAccordion
        note={note}
        setNote={setNote}
        editing={editing}
        allNotes={savedNotesData}
        setAllNotes={setSavedNotesData} // Add setAllNotes prop with the setSavedNotesData function
        setEditing={setEditing}
        handleSaveNote={handleSaveNote}
        handleUpdateNote={handleUpdateNote}
      />
    </View>
  );
}

export default NotesContainer;
