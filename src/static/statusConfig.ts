import { TicketStatusChoicesEnum } from "src/model/status";

export const TICKET_STATUS_PERSIAN: Record<TicketStatusChoicesEnum, string> = {
  UNREAD: "در انتظار تایید ارزیاب",
  ACCEPTED: "در انتظار پیام ارزیاب",
  ANSWERED: "در انتظار پاسخ مشتری",
  PENDING: "در انتظار پاسخ ارزیاب",
  INPROCESS: "در انتظار تامین کننده",
  CLOSED: "بسته شد",
};
