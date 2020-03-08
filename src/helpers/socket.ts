/**
 * Internal dependencies.
 */
import Echo from 'laravel-echo';
import socketio from 'socket.io-client';

/**
 * Internal dependencies.
 */
import { APP_BASE_URL } from 'react-native-dotenv';

let socket: Echo | null;

export const init = (token: string) => {
    if (socket) {
        return;
    }

    socket = new Echo({
        host: `${APP_BASE_URL}:6001`,
        broadcaster: 'socket.io',
        client: socketio,
        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });
};

export const destroy = () => {
    if (!socket) {
        return;
    }

    socket.disconnect();

    socket = null;
};

export const getSocket = () => {
    return socket;
};
