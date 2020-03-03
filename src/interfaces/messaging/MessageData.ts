export interface MessageData {
    id: number,
    unique_id: string,
    from_user_id: number,
    to_user_id: number,
    text: string,
    read_at: string | null,
    created_at: string,
    updated_at: string | null,
}
