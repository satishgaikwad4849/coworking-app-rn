import React from 'react';
import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title, backButtonVisible, onBackPress }) => {
  const navigation = useNavigation();

  return (
    <View style={{flexDirection: 'row',alignItems:'center',position:'relative' }}
    >
        
      {backButtonVisible && (
        <IconButton
          icon="arrow-left"
          onPress={onBackPress || (() => navigation.goBack())}
          
        />
      )}
      
      <View style={{ display:'flex', alignItems:'center', backgroundColor: 'transparent' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold',margin:'auto' }}>{title}</Text>
      </View>
    </View>
  );
};

export default CustomHeader;
