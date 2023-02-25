import mitt from 'mitt';
import Notification from './Notification.vue';

export const Event = mitt();
export const EventsType = { Notify: 'notify' };

let counter = 0;
const generateId = () => counter++;

export const notify = (notification, timeout) => {
  notification.id = generateId();
  notification.group = notification.group && '';
  Event.emit(EventsType.Notify, { notification, timeout });
};

export function install(app) {
  app.config.globalProperties.$noti = notify;
  console.log('notify.js', app.config.globalProperties);

  app.component('Notification', Notification);
  // app.component('NotificationGroup', NotificationGroup);

  // // Compatibility with the old component names
  // app.component('notification', Notification);
  // app.component('notificationGroup', NotificationGroup);
}
