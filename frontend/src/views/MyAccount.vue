<template>
  <div>
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="d-flex justify-content-between">
          <h4>My Account</h4>
          <div>
            <a :href="'/order_items'" class="btn btn-link"> Back </a>
          </div>
        </div>
        <div v-if="currentSeller">
          <form method="post" @submit.prevent="updateAccount">
            <div v-if="message_status !== ''" class="form-group">
              <div v-if="message" :class="'alert alert-'+message_status" role="alert">
                {{ message }}
              </div>
            </div>
            <div class="form-group">
              <label for="price">City</label>
              <input
                type="text"
                class="form-control"
                id="price"
                v-model="currentSeller.seller_city"
              />
            </div>
            <div class="form-group">
              <label for="freight_value">State</label>
              <input
                type="text"
                class="form-control"
                id="freight_value"
                v-model="currentSeller.seller_state"
              />
            </div>
            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-success" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Update</span>
              </button>
            </div>
          </form>
        </div>
        <div v-else>Sorry, we could not retrieve your detail</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "my-account",
  data() {
    return {
      loading: false,
      message: "",
      message_status: "",
    };
  },
  methods: {
    updateAccount() {
      this.loading = true;
      this.message_status = "";
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (
          this.currentSeller.seller_id &&
          this.currentSeller.seller_city &&
          this.currentSeller.seller_state
        ) {
          this.$store.dispatch("auth/update_account", this.currentSeller).then(
            () => {
              this.loading = false;
                this.message_status = "success";
              this.message = "Account updated successfully!";
            },
            (error) => {
                this.loading = false;
                this.message_status = "danger";
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
  computed: {
    currentSeller() {
      return this.$store.state.auth.seller;
    },
  },
  mounted() {
    if (!this.currentSeller) {
      this.$router.push("/login");
    }
  },
};
</script>
