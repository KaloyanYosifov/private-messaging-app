/**
 * External dependencies.
 */
import { IMessage } from 'react-native-gifted-chat';

/**
 * Internal dependencies.
 */
import { AttachmentData } from '@/interfaces/messaging/AttachmentData';

export interface EnhancedIMessage extends IMessage {
    attachment: AttachmentData | null
}
