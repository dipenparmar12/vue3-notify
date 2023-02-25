<script>
export default {
  name: 'Notification',
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup>
import { reactive, onMounted, computed } from 'vue';
import { Event, EventsType } from './notify';

const props = defineProps({
  maxNoti: String,
  // enter: String,
  // enterFrom: String,
  // enterTo: String,
  // leave: String,
  // leaveFrom: String,
  // leaveTo: String,
  // move: String,
  // moveDelay: String,
});
const state = reactive({
  notifications: [],
});
const emits = defineEmits(['close']);

// const sortedNotifications = computed(() => {
//   if (this.context.position === 'bottom') {
//     return [...this.notificationsByGroup].slice(0, this.maxNotifications);
//   }

//   // if not bottom reverse the array
//   return [...this.notificationsByGroup]
//     .reverse()
//     .slice(0, this.maxNotifications);
// });

// const notificationsByGroup = computed(() => {
//   return state.notifications.filter((n) => n.group === state.context.group);
// });

function add({ notification, timeout }) {
  const DEFAULT_TIMEOUT = 50000;
  state.notifications.push(notification);
  setTimeout(() => {
    remove(notification.id);
  }, timeout || DEFAULT_TIMEOUT);
}

function remove(id) {
  // console.log('remove()', id);
  const notiIdx = state.notifications.findIndex((n) => n.id === id);
  state.notifications.splice(notiIdx, 1);
}

function close(id) {
  emits('close'); // TODO
  remove(id);
}

onMounted(() => Event.on(EventsType.Notify, add));
onMounted(() => {
  console.log('onMounted Event.on(EventsType.Notify, add)');
});

// onMounted(() => console.log(props.maxNoti, state.notifications));
</script>

<template>
  <!-- <div>Notification</div> -->

  <slot :notifications="state.notifications" :close="close">
    Default slot
  </slot>
</template>
