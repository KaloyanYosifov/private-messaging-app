/**
 * External dependencies.
 */
import { Platform } from 'react-native';

export const MIN_COMPOSER_HEIGHT = Platform.select({
    ios: 41,
    android: 49,
});
