export interface MessageData {
    id: number,
    unique_id: string,
    user_id: number,
    conversation_id: number,
    text: string,
    read_at: string | null,
    created_at: string,
    updated_at: string | null,
}
