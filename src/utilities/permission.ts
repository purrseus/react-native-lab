import {
  check,
  checkMultiple,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import { logger } from './logger';
import { platformSelect } from './os';

const ALLOWED_STATUSES: PermissionStatus[] = [RESULTS.GRANTED, RESULTS.LIMITED];

const photoPermissions = platformSelect<Permission[]>(
  [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
  [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY],
);

const cameraPermission = platformSelect(PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.IOS.CAMERA);

const showUnavailablePermissionAlert = (): false => {
  return false;
};

const showBlockedPermissionAlert = (): false => {
  return false;
};

const checkMultiplePermissions = (permissions?: Permission[]) => async (): Promise<boolean> => {
  if (!permissions) return false;

  try {
    const permissionsStatuses = await checkMultiple(permissions);

    const deniedPermissions = Object.entries(permissionsStatuses)
      .filter(([, value]) => value === RESULTS.DENIED)
      .map(([key]) => key as Permission);

    if (deniedPermissions.length) {
      const requestedStatuses = await requestMultiple(deniedPermissions);
      Object.assign(permissionsStatuses, requestedStatuses);
    }

    const statuses = Object.values(permissionsStatuses);

    if (statuses.includes(RESULTS.UNAVAILABLE)) return showUnavailablePermissionAlert();
    if (statuses.includes(RESULTS.BLOCKED)) return showBlockedPermissionAlert();

    const isAllowed = statuses.every(status => ALLOWED_STATUSES.includes(status));
    if (isAllowed) return true;

    return false;
  } catch (error) {
    logger(error);
    return false;
  }
};

const checkPermission = (permission?: Permission) => async (): Promise<boolean> => {
  if (!permission) return false;

  try {
    const permissionStatus = await check(permission);

    switch (permissionStatus) {
      case RESULTS.UNAVAILABLE:
        return showUnavailablePermissionAlert();

      case RESULTS.BLOCKED:
        return showBlockedPermissionAlert();

      case RESULTS.DENIED:
        const requestedStatus = await request(permission);
        if (requestedStatus === RESULTS.BLOCKED) return showBlockedPermissionAlert();
        return ALLOWED_STATUSES.includes(requestedStatus);

      case RESULTS.LIMITED:
      case RESULTS.GRANTED:
        return true;

      default:
        return false;
    }
  } catch (error) {
    logger(error);
    return false;
  }
};

export const checkGalleryPermissions = checkMultiplePermissions(photoPermissions);
export const checkCameraPermission = checkPermission(cameraPermission);
