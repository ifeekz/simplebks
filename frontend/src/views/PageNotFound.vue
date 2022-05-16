<template>
  <div>
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="d-flex justify-content-between">
          <h4>Page not found</h4>
          <div>
            <router-link :to="{ name: 'order-items' }">Back</router-link>
          </div>
        </div>
        <div class="text-center">
            <h1>404</h1>
            <div>Page not found</div>
        </div>
      </div>
    </div>
  </div>
</template>
