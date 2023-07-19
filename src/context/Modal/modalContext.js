import React, { useState } from "react";
import { ModalContext } from "./ModalContext";

export default function App() {
  const [modalContent, setModalContent] = useState(null);

  return (
    <View style={{flex: 1}}>
      <ModalContext.Provider value={setModalContent}>
        { /* your other components go here */}
        
        {modalContent && (
          <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}>
            {modalContent}
          </View>
        )}
      </ModalContext.Provider>
    </View>
  );
}
