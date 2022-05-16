<template>
  <div>
    <div class="row">
      <div class="col-md-10 mx-auto">
        <div class="d-flex justify-content-between">
          <h4>Order Details</h4>
          <div v-if="order" class="mb-3">
            <a
              :href="'/order_items/' + order.order_id + '/edit'"
              class="btn btn-primary mr-2"
            >
              Edit
            </a>
            <button class="btn btn-danger" @click="deleteOrder">Delete</button>
          </div>
        </div>

        <div v-if="order">
          <table class="table borderless">
            <tr>
              <th>Order ID:</th>
              <td>{{ order.order_id }}</td>
            </tr>
            <tr>
              <th>Product Id:</th>
              <td>{{ order.product_id }}</td>
            </tr>
            <tr>
              <th>Price:</th>
              <td>{{ order.price }}</td>
            </tr>
            <tr>
              <th>Freight Value:</th>
              <td>{{ order.freight_value }}</td>
            </tr>
            <tr>
              <th>Shipping Limit Date:</th>
              <td>{{ order.shipping_limit_date }}</td>
            </tr>
          </table>
        </div>
        <div v-else>
          Could not find order with the ID - {{ $route.params.id }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderService from "../services/OrderService";
export default {
  name: "order-details",
  data() {
    return {
      order: null,
      message: "",
    };
  },
  methods: {
    getOrder(id) {
      OrderService.get(id)
        .then((response) => {
          this.order = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteOrder() {
      OrderService.delete(this.order.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "order_items" });
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
      this.getOrder(this.$route.params.id);
    }
  }
};
</script>
