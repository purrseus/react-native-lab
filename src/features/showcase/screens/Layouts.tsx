import { Divider, Row, Spacer, StatusBar, Text } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { ProtectedScreen } from '@core/types';

const Layouts: ProtectedScreen<ProtectedScreenName.Layouts> = () => {
  return (
    <StackContainer
      headerTitle={ProtectedScreenName.Layouts}
      wrapperType="scrollView"
      wrapperStyle={{ paddingHorizontal: 16 }}
    >
      <StatusBar backgroundColor="red" barStyle="light-content" />

      <Spacer h={40} />
      <Text>Divider hairlineWidth</Text>
      <Divider />

      <Spacer h={40} />

      <Text>Divider height: 6</Text>
      <Divider height={6} />

      <Spacer h={40} />

      <Text>Row</Text>
      <Row>
        <Text>item0</Text>
        <Text>item1</Text>
      </Row>
    </StackContainer>
  );
};

export default Layouts;
