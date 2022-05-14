<template>
  <div class="row">
    <div class="col-md-8 mx-auto">
      <h4>My Orders</h4>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Product Name</th>
              <th>Ship. Limit Date</th>
              <th>Price</th>
              <th>Freight Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orders" :key="index">
              <td>{{ item.order_id }}</td>
              <td></td>
              <td>{{ item.shipping_limit_date }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.freight_value }}</td>
              <td>
                <a :href="'/order_items/' + item.order_id"></a>
              </td>
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
      OrderService.getAll()
        .then((response) => {
          this.orders = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
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
