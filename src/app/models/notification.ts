export type NotificationType = 'success' | 'error';

export interface INotification {
    message: string;
    type: NotificationType;
}
