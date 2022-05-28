<template>
  <Tutorial />
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (!store.getters['auth/access_token']) {
      return redirect('/auth')
    }
    return redirect('/profile')
  },
}
</script>
