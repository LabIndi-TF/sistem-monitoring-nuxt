<template>
  <div>
    <b-container class="notification-section">
      <b-alert variant="success" show>Semua alat berjalan dengan baik</b-alert>
    </b-container>
    
    
    <b-container class="main-section" v-if="this.$store.state.devices">
      <h1 class="text-center">Semua alat</h1>
      
        <b-card-group deck>
            <b-card :title="device.name"
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2" v-for="device in devices" :key="device.id">
              <p class="card-text">
                {{ device.description }}
              </p>
              <b-button :to="device | toUrl" variant="primary">Lihat</b-button>
            </b-card>


          </b-card-group>
        
      </b-container>

      <b-container class="main-section" v-if="currentData">
        <h1 class="text-center">Penggunaan Arus Listrik</h1>
        
          <line-chart :data="currentData" :colors="['#f6b93b']"></line-chart>
          
        </b-container>



  </div>

</template>

<script>

  let moment = require('moment');

  export default {
    data() {
      return {
        latestLogs: [],
        chartData: {},
      };
    },
    computed: {
      currentData() {
        let result = [];
        this.$store.state.latestCurrent.map(a => result.push([moment(a.date_added).toDate(), parseFloat(a['value'])]))
        return result;
      },
      devices() {
        return this.$store.state.devices;
      }
    },
    async beforeCreate() {
      try {
        await this.$store.dispatch('initDevices')
        await this.$store.dispatch('fetchLatestCurrent')
      }
      catch(e) {
        console.log(e)
      }
    },
    created() {
      const vm = this;
      setInterval(function() {
        vm.$store.dispatch('fetchLatestCurrent')
      }, 10000)
    },
    filters: {
      toUrl(device) {
        return `/device/${device.id}/`;
      },
    }
  }
</script>

<style>
.notification-section {
  margin-top: 0.5rem;
}

.main-section {
  margin-top: 3rem;
}

.main-section h1 {
  margin-bottom: 3rem;
}
</style>
