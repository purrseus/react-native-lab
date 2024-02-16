import { QueryClient } from '@tanstack/react-query';

class AppQueryClient extends QueryClient {
  queryKeys = {
    photos: 'photos',
  };
}

// TODO
export const queryClient = new AppQueryClient();
