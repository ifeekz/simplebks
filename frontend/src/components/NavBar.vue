<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark px-5">
    <router-link :to="{ name: 'order-items' }" class="navbar-brand">SimpleBks</router-link>
    <div class="navbar-nav mr-auto">
      
    </div>
    <div v-if="currentSeller" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/account" class="nav-link">
          <font-awesome-icon icon="user" />
          My Account
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href @click.prevent="logOut">
          <font-awesome-icon icon="sign-out-alt" />LogOut
        </a>
      </li>
    </div>
  </nav>
</template>

<script>
export default {
  name: "nav-bar",
  computed: {
    currentSeller() {
      return this.$store.state.auth.seller;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
