import { Text } from '@components/core';
import { TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';
import { globalStyles } from '@themes';
import { View } from 'react-native';

const Notification: TabScreen<TabScreenName.Notification> = () => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <Text>Notification</Text>
    </View>
  );
};

export default Notification;
