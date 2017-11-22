<template>
    <div>
        <h1>dashboard</h1>
        <h1>{{ name }}</h1>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

