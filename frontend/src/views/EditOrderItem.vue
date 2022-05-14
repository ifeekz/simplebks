<template>
  <div>
    <div class="d-flex justify-content-end">
      <h4>Edit Order</h4>
      <div>
        <a :href="'/order_items'" class="btn btn-link"> Back </a>
      </div>
    </div>
    <div v-if="order" class="row">
        <form method="post" @submit.prevent="updateOrder">
            <div class="form-group">
                <label for="shipping_limit_date">Shipping Limit Date</label>
                <input
                    type="text"
                    class="form-control"
                    id="shipping_limit_date"
                    v-model="order.shipping_limit_date"
                />
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input
                    type="text"
                    class="form-control"
                    id="price"
                    v-model="order.price"
                />
            </div>
            <div class="form-group">
                <label for="freight_value">Freight Value</label>
                <input
                    type="text"
                    class="form-control"
                    id="freight_value"
                    v-model="order.freight_value"
                />
            </div>
            <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-success">Update</button>
            </div>
        </form>
    </div>
    <div v-else class="row">
      Could not find order with the ID - {{ $route.params.id }}
    </div>
  </div>
</template>
<script>
import OrderService from "../services/OrderService";
export default {
  name: "edit-order-item",
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
    updateOrder() {
      OrderService.update(this.order.order_id, this.order)
        .then(response => {
          console.log(response.data);
          this.message = 'The order was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getOrder(this.$route.params.id);
  },
};
</script>
