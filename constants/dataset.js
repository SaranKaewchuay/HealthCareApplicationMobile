import React from 'react';
import {Text} from 'react-native';

export const dataset = () => {
  <FlatList
    data={data2}
    renderItem={({item}) => <ListItem item={item} />}
    keyExtractor={item => item.id}
  />;
};
