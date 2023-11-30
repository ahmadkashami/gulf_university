<template>
  <router-view />
</template>

<script setup>
import {store} from "@/store";
import {onUnmounted} from "vue";
import publicStoreModule from "@/views/web/publicStoreModule";

const PUBLIC_APP_STORE_MODULE = 'public'
if (!store.hasModule(PUBLIC_APP_STORE_MODULE)) store.registerModule(PUBLIC_APP_STORE_MODULE, publicStoreModule)
onUnmounted(() => {
  if (store.hasModule(PUBLIC_APP_STORE_MODULE)) store.unregisterModule(PUBLIC_APP_STORE_MODULE)
})
</script>
