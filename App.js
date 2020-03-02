import React, { useState, useEffect, useRef } from 'react';
import {
  Text, TouchableOpacity, View, Platform,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const App = () => {

  const [Permission, setPermission] = useState(null);
  useEffect(() => {
    const getPermissionAsync = async () => {
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setPermission(status === 'granted');
    };
    getPermissionAsync();
  });

 
  const [camera, setCamera] = useState(Camera.Constants.Type.back);

  const handleCameraType = () => {
    const myCamera = camera === Camera.Constants.Type.back
      if (Camera.Constants.Type.front) {
        Camera.Constants.Type.back;
      }
      else{
        setCamera(myCamera);
      }
  };

  const cameraRef = useRef(null);
  const takePicture = async () => {
    if (cameraRef) {
      await cameraRef.current.takePictureAsync();
    }
  };

  const pickImage = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  };

  if (Permission === null) {
    return <View />;
  } 
  else if (Permission === false) {
    return <Text>No access to camera</Text>;
  } 
  else {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={camera}
          ref={cameraRef}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20,
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
              onPress={() => pickImage()}>
              <Ionicons
                name="ios-photos"
                style={{ color: '#fff', fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
              onPress={() => takePicture()}>
              <FontAwesome
                name="camera"
                style={{ color: '#fff', fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
              onPress={() => handleCameraType()}>
              <MaterialCommunityIcons
                name="camera-switch"
                style={{ color: '#fff', fontSize: 40 }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  };
};

export default App;