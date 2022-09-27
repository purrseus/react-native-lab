import Alert from '@components/core/Modal/Alert';
import { I18nText } from '@core/types';
import i18n from '@i18n';
import { AlertButton } from 'react-native';
import {
  check,
  checkMultiple,
  openSettings,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import { logger } from './logger';
import { platformSelect } from './os';

const BLOCKED_BUTTONS: AlertButton[] = [
  {
    text: 'common.cancel',
    style: 'cancel',
  },
  {
    text: 'permission.openSettings',
    onPress: () => openSettings().catch(() => logger('[permission] Cannot open settings!')),
    style: 'default',
  },
];

const ALLOWED_STATUSES: PermissionStatus[] = [RESULTS.GRANTED, RESULTS.LIMITED];

const photoGalleryPermissions = platformSelect<Permission[]>(
  [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
  [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY],
);

const cameraPermission = platformSelect(PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.IOS.CAMERA);

const showUnavailablePermissionAlert = (): false => {
  Alert(i18n.t('permission.unavailableTitle'));

  return false;
};

const showBlockedPermissionAlert = (permissionName?: I18nText): false => {
  if (permissionName)
    Alert(
      i18n.t('permission.blockedTitle', { permissionName: `$t(${permissionName})` }),
      i18n.t('permission.blockedMessage'),
      BLOCKED_BUTTONS,
    );

  return false;
};

const checkMultiplePermissions =
  (permissions?: Permission[], permissionName?: I18nText) => async (): Promise<boolean> => {
    if (!permissions) return false;

    try {
      const permissionsStatuses = await checkMultiple(permissions);

      const permissionsStatusValues = Object.values(permissionsStatuses);

      if (permissionsStatusValues.includes(RESULTS.UNAVAILABLE))
        return showUnavailablePermissionAlert();

      if (permissionsStatusValues.includes(RESULTS.BLOCKED))
        return showBlockedPermissionAlert(permissionName);

      const deniedPermissions = Object.entries(permissionsStatuses)
        .filter(([, value]) => value === RESULTS.DENIED)
        .map(([key]) => key as Permission);

      if (deniedPermissions.length) {
        const requestedStatuses = await requestMultiple(deniedPermissions);
        Object.assign(permissionsStatuses, requestedStatuses);
      }

      const statuses = Object.values(permissionsStatuses);

      if (statuses.includes(RESULTS.BLOCKED)) return showBlockedPermissionAlert(permissionName);

      return statuses.every(status => ALLOWED_STATUSES.includes(status));
    } catch (error) {
      logger(error);
      return false;
    }
  };

const checkPermission =
  (permission?: Permission, permissionName?: I18nText) => async (): Promise<boolean> => {
    if (!permission) return false;

    try {
      const permissionStatus = await check(permission);

      switch (permissionStatus) {
        case RESULTS.UNAVAILABLE:
          return showUnavailablePermissionAlert();

        case RESULTS.BLOCKED:
          return showBlockedPermissionAlert(permissionName);

        case RESULTS.DENIED:
          const requestedStatus = await request(permission);
          if (requestedStatus === RESULTS.BLOCKED)
            return showBlockedPermissionAlert(permissionName);
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

export const checkPhotoGalleryPermissions = checkMultiplePermissions(
  photoGalleryPermissions,
  'permission.photoGallery',
);

export const checkCameraPermission = checkPermission(cameraPermission, 'permission.camera');
