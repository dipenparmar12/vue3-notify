<script>
export default {
  name: 'CustomName',
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup>
import { notify } from './plugin/noti/notify';

function fireNoti() {
  notify({
    group: 'top',
    title: 'Success',
    text: 'Your account was created 👌',
  });
}
</script>

<template>
  <div>
    <button @click="fireNoti">FireNoti</button>

    <Notification v-slot="{ notifications, close }">
      <h3>Notification.vue H3</h3>
      <!-- {{ notifications }} -->

      <div v-for="item in notifications" :key="item.id">
        <span>{{ item }}</span>
        <button @click="close(item.id)">Close</button>
      </div>
    </Notification>
  </div>
</template>
