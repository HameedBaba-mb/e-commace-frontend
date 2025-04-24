<template>
  <div class="page-wrapper">
    <dashboard-banner>
      <template #banner-body>
        <div class="container-lg text-centers mt-2">
          <h1 class="display-1">My Cart</h1>
        </div>
      </template>
    </dashboard-banner>

    <div class="container-lg mt-4">
      <div class="row">
        <div class="col-12">
          <div class="card card-body client-boder">
            <h1>Recent Orders</h1>
            <hr />
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Ttile</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>
                    <div class="dropdown ms-auto">
                      <button
                        class="btn btn-sm btn-primary dropdown-toggles border"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style="border-radius: 5px"
                      >
                        <i class="fa fa-ellipsis-h"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Remove</a></li>
                        <li>
                          <a class="dropdown-item" href="#">Make Payment</a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>
                    <div class="dropdown ms-auto">
                      <button
                        class="btn btn-sm btn-primary dropdown-toggles border"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style="border-radius: 5px"
                      >
                        <i class="fa fa-ellipsis-h"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Remove</a></li>
                        <li>
                          <a class="dropdown-item" href="#">Make Payment</a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>John</td>
                  <td></td>
                  <td>
                    <div class="dropdown ms-auto">
                      <button
                        class="btn btn-sm btn-primary dropdown-toggles border"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style="border-radius: 5px"
                      >
                        <i class="fa fa-ellipsis-h"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Remove</a></li>
                        <li>
                          <a
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#modal"
                            href="#"
                            >Make Payment</a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" id="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-4">
          <!-- <p>Modal body text goes here.</p> -->
          <div class="container-sm">
            <div class="">
              <p class="fw-bold p-title mb-0">Product Name</p>
              <p class="p-value">Product Name</p>
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <p class="fw-bold p-title mb-0">Price</p>
                <p class="p-value"><span>₦</span>{{ price }}</p>
              </div>
              <div>
                <p class="fw-bold p-title mb-0">Amount</p>
                <p class="p-value"><span>₦</span>{{ amount }}</p>
              </div>
            </div>

            <div class="form-group">
              <label for="" class="fw-bold text-dark">Quentity</label>
              <input
                type="text"
                class="form-control client-border"
                placeholder="Quentity"
                name=""
                id=""
                v-model.number="quantity"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Generate Order</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import DashboardBanner from "../../components/client/DashboardBanner.vue";
import ClientCard from "../../components/client/ClientCard.vue";
export default {
  components: {
    DashboardBanner,
    ClientCard,
  },
  name: "ClientDashboard",
  data() {
    return {
      price: 100,
      quantity: 0,
    };
  },

  computed: {
    amount() {
      return this.price * this.quantity;
    },
  },
};
</script>
  
  <style lang="css" scoped>
@import url("../../assets/css/client-style.css");
.display-1 {
  /* font-size: 2.5rem; */
  font-weight: 700;
  color: #fff;
}
.p-title {
  font-size: 30px;
  color: #000;
}
.p-value {
  font-size: 20px;
  color: #000;
}
</style>