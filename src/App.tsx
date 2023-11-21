import RootStack from '@/navigators';
import AppProvider from '@/providers';

export default function App() {
  return (
    <AppProvider>
      <RootStack />
    </AppProvider>
  );
}
