import RootNavigator from '@navigators';
import AppProvider from '@providers';

export default function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}
