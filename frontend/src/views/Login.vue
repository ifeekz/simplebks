<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form name="form" @submit.prevent="login">
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="seller.seller_id"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="username"
          />
          <div
            v-if="errors.has('seller_id')"
            class="alert alert-danger"
            role="alert"
          >
            Username is required!
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="seller.seller_zip_code_prefix"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="errors.has('seller_zip_code_prefix')"
            class="alert alert-danger"
            role="alert"
          >
            Password is required!
          </div>
        </div>
        <div class="form-group mt-3">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Seller from "../models/Seller";
export default {
  name: "login-page",
  data() {
    return {
      seller: new Seller("", ""),
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    login() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.seller.seller_id && this.seller.seller_zip_code_prefix) {
          this.$store.dispatch("auth/login", this.seller).then(
            () => {
              this.$router
                .push("/order_items")
                .catch((failure) => console.log("failure: ", failure));
            },
            (error) => {
              this.loading = false;
              console.log("error: ", error.response);
              this.message =
                error.response && error.response.data
                  ? error.response.data.message
                  : error.toString();
            }
          );
        }
      });
    },
  },
};
</script>
<style scoped>
label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
