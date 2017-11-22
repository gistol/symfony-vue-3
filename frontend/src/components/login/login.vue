<template>
  <div>
    <div>
      <input type="text" name="username" v-model="form.username">
    </div>
    <div>
      <input type="password" name="password" v-model="form.password">
    </div>
    <div>
      <button @click="handleLogin">log in</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin () {
      this.$store.dispatch('Login', this.form).then(() => {
        this.$router.push({ path: '/' })
      }).catch(() => {
        console.log('error')
      })
    }
  }
}
</script>

