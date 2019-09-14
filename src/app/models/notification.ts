export type NotificationType = 'succes' | 'error';

export interface INotification {
    message: string;
    type: NotificationType;
}
