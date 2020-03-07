/**
 * Internal dependencies.
 */
import { UserData } from '@/interfaces/UserData';

export interface StateModel {
    isLoggedIn: boolean,
    authToken: string | null,
    userData: UserData | null
}
