<template>
  <div class="row">
    <div class="col-md-10 mx-auto">
      <h4>My Orders</h4>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Product Category</th>
              <th>Price</th>
              <th>Product Id</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orders" :key="index">
              <td>
                <a :href="'/order_items/' + item.id">{{ item.id }}</a>
              </td>
              <td>{{ item.product_category }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.product_id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import OrderService from "../services/OrderService";
export default {
  name: "order-items",
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    getOrderItems() {
      const limit = this.$route.query.limit
      const offset = this.$route.query.offset
      const sort = this.$route.query.sort
      
      OrderService.getAll(limit, offset, sort)
        .then((response) => {
          this.orders = response.data.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log('getOrderItems ERR: ', e);
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
    } else {
      this.getOrderItems();
    }
  },
};
</script>
