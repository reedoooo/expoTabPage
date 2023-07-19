import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import Header from '../../containers/header/Header';
import EditModal from '../../components/modals/AddTabFormsModal';
import OpenSettingsModal from '../../components/modals/OpenSettingsModal';
import TabGridContainer from '../../containers/gridcontainer/TabGridContainer';
import Constants from 'expo-constants';

const { REACT_APP_SERVER } = Constants.manifest.extra;
console.log('REACT_APP_SERVER', REACT_APP_SERVER);

function Home() {
  const [savedTabsData, setSavedTabsData] = useState([]);
  const [savedSettingsData, setSavedSettingsData] = useState([]);
  const [isAddTabModalOpen, setAddTabModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  // const [modalVisible, setModalVisible] = useState(false);

  // const handleOpenModal = () => setModalVisible(true);
  // const handleCloseModal = () => setModalVisible(false);
  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const resetActiveComponent = () => {
    setActiveComponent(null);
  };
  useEffect(() => {
    fetchSavedTabsData();
    fetchSavedSettings();
  }, [dataUpdated]); // dataUpdated added to dependency array

  const fetchSavedTabsData = async () => {
    try {
      const response = await axios.get(`${REACT_APP_SERVER}/api/tab`);

      const savedTabsDatax = response.data
        .filter((item) => item)
        .map((item) => ({
          name: item.tab.name,
          size: item.tab.size,
          color: item.tab.color,
          linkUrl: item.tab.linkUrl,
          imgUrl: item.tab.imgUrl,
          id: item._id,
        }));

      setSavedTabsData(savedTabsDatax);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSavedSettings = async () => {
    try {
      const response = await axios.get(`${REACT_APP_SERVER}/api/settings`);
      console.log(response.data);

      const savedSettings = response.data
        .filter((item) => item)
        .map((item) => ({
          name: item.name,
          color: item.color,
          id: item._id,
        }));

      setSavedSettingsData(savedSettings);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTabToServer = async (newLink) => {
    try {
      const response = await axios.post(`${REACT_APP_SERVER}/api/tab`, newLink);
      const savedData = response.data;
      console.log(savedData);

      fetchSavedTabsData();

      // Update state when data is added, triggering data fetch
      setDataUpdated(!dataUpdated);
    } catch (error) {
      console.error(error);
    }
  };

  const saveSettingsChangesToServer = async (newSetting) => {
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER}/api/settings`,
        newSetting
      );
      console.log(response.data);
      const savedSettings = response.data;
      console.log(savedSettings);
      fetchSavedSettings();

      // Update state when data is added, triggering data fetch
      setDataUpdated(!dataUpdated);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    const { name, size, color, linkUrl, imgUrl } = e.target.elements;

    if (
      name.value &&
      size.value &&
      color.value &&
      linkUrl.value &&
      imgUrl.value
    ) {
      const newLink = {
        name: name.value,
        size: size.value,
        color: color.value,
        linkUrl: linkUrl.value,
        imgUrl: imgUrl.value,
      };

      handleAddTabToServer(newLink);
    }

    addTabModalDisclosure.onClose();
  };

  const handleChangeSettings = (e) => {
    e.preventDefault();
    const { name, color } = e.target.elements;

    if (name.value && color.value) {
      const newSetting = {
        name: name.value,
        color: color.value,
      };

      saveSettingsChangesToServer(newSetting);
    }

    settingsModalDisclosure.onClose();
  };

  const addTabModalDisclosure = {
    isOpen: isAddTabModalOpen,
    onOpen: () => setAddTabModalOpen(true),
    onClose: () => setAddTabModalOpen(false),
  };

  const settingsModalDisclosure = {
    isOpen: isSettingsModalOpen,
    onOpen: () => setSettingsModalOpen(true),
    onClose: () => setSettingsModalOpen(false),
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        addTabModalDisclosure={addTabModalDisclosure}
        settingsModalDisclosure={settingsModalDisclosure}
        resetActiveComponent={resetActiveComponent}
      />

      <EditModal
        isOpen={isAddTabModalOpen}
        onClose={addTabModalDisclosure.onClose}
        onSubmit={handleAddLink}
      />

      <OpenSettingsModal
        visible={settingsModalDisclosure.isOpen}
        onClose={settingsModalDisclosure.onClose}
        onSubmit={handleChangeSettings}
      />

      <TabGridContainer
        activeComponent={activeComponent}
        handleButtonClick={handleButtonClick}
        savedTabsData={savedTabsData}
        savedSettingsData={savedSettingsData}
      />
    </View>
  );
}

export default Home;
