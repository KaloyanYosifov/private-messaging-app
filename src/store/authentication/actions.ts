/**
 * Internal dependencies.
 */
import { Dispatch } from 'redux';
import { LogInAction } from '@/store/authentication/models/actions.model';
import Types from '@/store/authentication/types';

export const logIn = () => (dispatch: Dispatch<LogInAction>) => dispatch({ type: Types.LOG_IN });
