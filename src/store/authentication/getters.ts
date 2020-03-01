/**
 * Internal dependencies.
 */
import { ApplicationState } from '@/store';

export const isLoggedIn = (state: ApplicationState) => state.authentication.isLoggedIn;
