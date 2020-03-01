/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */
import { LOG_IN, LOG_OUT } from '../constants';

interface LogInAction {
    type: typeof LOG_IN,
}

interface LogOutAction {
    type: typeof LOG_OUT,
}

type ActionsModel = LogInAction | LogOutAction;

export default ActionsModel;
