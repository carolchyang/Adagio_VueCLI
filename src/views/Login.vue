<template>
  <div class="login">
    <h1 class="logo">Adagio</h1>

    <form class="form-signin">
      <h2 class="mb-4 text-center">登入後台</h2>
      <div class="form-group" name="電子信箱">
        <label for="email">電子信箱</label>
        <input type="email" id="email" class="form-control" placeholder="請輸入電子信箱"
        v-model="auth.email" required>
        <span class="invalid-feedback"></span>
      </div>
      <div class="form-group mb-4" name="密碼">
        <label for="password">密碼</label>
        <input type="password" id="password" class="form-control" placeholder="請輸入密碼"
        v-model="auth.password" required>
        <span class="invalid-feedback"></span>
      </div>
      <button class="btn btn-dark btn-lg btn-block" type="submit">確認</button>
    </form>

    <router-link to="/" class="text-white">
      回到首頁
      <span class="ml-3">
        <i class="fas fa-arrow-alt-circle-right"></i>
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      auth: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/all';
.logo {
  margin-bottom: 2rem;
  font-size: 4rem;
}
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: $dark;
}
.form-signin {
  margin-bottom: 1rem;
  padding: 2em 3rem;
  background-color: $light;
  box-shadow: 0px 0px 4px $light;
  border-radius: 0.25rem;
}
</style>
