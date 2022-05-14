<template>
  <div>
    <div class="d-flex justify-content-between">
      <h4>Order Details</h4>
      <div>
        <a :href="'/order_items/'+item.order_id+'/edit'" class="btn btn-primary mr-2">
          Edit
        </a>
        <button class="btn btn-danger" @click="deleteTutorial">
          Delete
        </button>
      </div>
    </div>
    <div v-if="order" class="row">
      <table>
        <tr>
          <th>Order ID</th>
          <td>{{ order.order_id }}</td>
        </tr>
      </table>
    </div>
    <div v-else class="row">
      Could not find order with the ID - {{ $route.params.id }}
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
  mounted() {
    this.getOrder(this.$route.params.id);
  },
};
</script>
