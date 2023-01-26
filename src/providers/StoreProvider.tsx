import { ActivityIndicator } from '@components/core';
import { useAuthStore, useCommonStore } from '@stores';
import { globalStyles } from '@themes';
import { PropsWithChildren, useEffect, useState } from 'react';
import { View } from 'react-native';

const StoreProvider = ({ children }: PropsWithChildren) => {
  const [authHydrated, setAuthHydrated] = useState(useAuthStore.persist.hasHydrated);
  const [commonHydrated, setCommonHydrated] = useState(useCommonStore.persist.hasHydrated);

  useEffect(() => {
    const unsubFinishAuthHydration = useAuthStore.persist.onFinishHydration(() =>
      setAuthHydrated(true),
    );
    const unsubFinishCommonHydration = useAuthStore.persist.onFinishHydration(() =>
      setCommonHydrated(true),
    );

    setAuthHydrated(useAuthStore.persist.hasHydrated());
    setCommonHydrated(useCommonStore.persist.hasHydrated());

    return () => {
      unsubFinishAuthHydration();
      unsubFinishCommonHydration();
    };
  }, []);

  if (authHydrated && commonHydrated) return <>{children}</>;

  return (
    <View style={globalStyles.flexFillCenter}>
      <ActivityIndicator />
    </View>
  );
};

export default StoreProvider;
