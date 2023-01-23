export interface NotificationsModel {
  unread_message: number;
  detail: Array<{
    ticket_group: string;
    unread_message: number;
    data: Array<{
      ticket: string;
      unread_message: number;
      file_type: "VOICE" | "IMAGE" | "VIDEO" | "FILE" | null;
      text: string | null;
    }>;
  }>;
}
