/**
 * Internal dependencies.
 */
import { StateModel } from '@/store/authentication/models/state.model';

export const isLoggedIn = (state: StateModel) => state.isLoggedIn;
