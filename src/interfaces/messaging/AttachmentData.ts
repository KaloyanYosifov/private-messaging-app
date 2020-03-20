/**
 * Internal dependencies.
 */
import { AttachmentTypes } from '@/constants/AttachmentTypes';

export interface AttachmentData {
    url: string,
    path: string,
    type: AttachmentTypes,
    duration_in_seconds: number
}
