<template>
  <section :id="changColor||dark?'header-section-2':'header-section'">
    <VContainer>
      <VToolbar floating>
        <VToolbarTitle class="text-left">
          <RouterLink
            to="/"
            class="form-logo"
          >
            <img
              :src="logo"
              alt="image"
              class="logo"
              height="30"
            >
          </RouterLink>
        </VToolbarTitle>
        <VSpacer/>
        <VIcon size="30" color="white" @click="$router.push('/reservations')">mdi-view-dashboard</VIcon>
      </VToolbar>
    </VContainer>
  </section>
</template>

<script>
import {store} from '@/store'

export default {
  name: 'MainHeader',
  props: {dark: Boolean},
  data() {
    return {
      scrollPosition: null,
      changColor: false,
    }
  },
  computed: {
    logo() {
      return store.state.logo
    },
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY
      if (this.scrollPosition > 400) {
        this.changColor = true
      } else if (this.scrollPosition < 300) {
        this.changColor = false
      }
    },
  },
}
</script>

<style>
@import 'header.scss';

</style>
