import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import Header from '../../containers/header/Header';
import EditModal from '../../components/modals/AddTabFormsModal';
import OpenSettingsModal from '../../components/modals/OpenSettingsModal';
import TabGridContainer from '../../containers/gridcontainer/TabGridContainer';
import Constants from 'expo-constants';
import CameraModal from '../../components/camera/Camera';


const { REACT_APP_SERVER } = Constants.manifest.extra;
console.log('REACT_APP_SERVER', REACT_APP_SERVER);

function Home() {
  const [savedTabsData, setSavedTabsData] = useState([]);
  const [savedSettingsData, setSavedSettingsData] = useState([]);
  const [isAddTabModalOpen, setAddTabModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const [isCameraModalOpen, setCameraModalOpen] = useState(false);

  const cameraModalDisclosure = {
    isOpen: isCameraModalOpen,
    onOpen: () => setCameraModalOpen(true),
    onClose: () => setCameraModalOpen(false),
  };

  // Form states
  const [linkFormValues, setLinkFormValues] = useState({
    name: '',
    size: '',
    color: '',
    linkUrl: '',
    imgUrl: '',
  });

  const [settingsFormValues, setSettingsFormValues] = useState({
    name: '',
    color: '',
  });

  const handleAddLink = (e) => {
    e.preventDefault();

    if (
      linkFormValues.name &&
      linkFormValues.size &&
      linkFormValues.color &&
      linkFormValues.linkUrl &&
      linkFormValues.imgUrl
    ) {
      handleAddTabToServer(linkFormValues);
      setLinkFormValues({
        name: '',
        size: '',
        color: '',
        linkUrl: '',
        imgUrl: '',
      });
    }

    addTabModalDisclosure.onClose();
  };

  const handleChangeSettings = (e) => {
    e.preventDefault();

    if (settingsFormValues.name && settingsFormValues.color) {
      saveSettingsChangesToServer(settingsFormValues);
      setSettingsFormValues({
        name: '',
        color: '',
      });
    }

    settingsModalDisclosure.onClose();
  };

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const resetActiveComponent = () => {
    setActiveComponent(null);
  };

  useEffect(() => {
    fetchSavedTabsData();
    fetchSavedSettings();
  }, [dataUpdated]);

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
        cameraModalDisclosure={cameraModalDisclosure} // new camera modal disclosure prop
      />

      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={cameraModalDisclosure.onClose}
      />

      <EditModal
        isOpen={isAddTabModalOpen}
        onClose={addTabModalDisclosure.onClose}
        onSubmit={handleAddLink}
        formValues={linkFormValues}
        setFormValues={setLinkFormValues}
      />

      <OpenSettingsModal
        visible={settingsModalDisclosure.isOpen}
        onClose={settingsModalDisclosure.onClose}
        onSubmit={handleChangeSettings}
        formValues={settingsFormValues}
        setFormValues={setSettingsFormValues}
      />

      <TabGridContainer
        activeComponent={activeComponent}
        handleButtonClick={handleButtonClick}
        handleResetActiveComponent={resetActiveComponent}
        savedTabsData={savedTabsData}
        savedSettingsData={savedSettingsData}
      />
    </View>
  );
}

export default Home;
