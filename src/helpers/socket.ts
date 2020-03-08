/**
 * Internal dependencies.
 */
import Echo from 'laravel-echo';
import socketio from 'socket.io-client';

/**
 * Internal dependencies.
 */
import { APP_BASE_URL } from 'react-native-dotenv';

const socket = new Echo({
    host: `${APP_BASE_URL}:6001`,
    broadcaster: 'socket.io',
    client: socketio,
});

export default socket;
