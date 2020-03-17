/**
 * External dependencies.
 */
import { Platform } from 'react-native';

export const MIN_COMPOSER_HEIGHT = Platform.select({
    ios: 33,
    android: 41,
});
