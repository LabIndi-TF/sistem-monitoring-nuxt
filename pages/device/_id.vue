<template>
        <b-container>
          <b-alert variant="success" :show="success">Data sukses disimpan</b-alert>
            <h1 class="text-center">Temperatures</h1>
        <b-row>
            <line-chart :data="tempData" :colors="['#c0392b']" ></line-chart>
        </b-row>
        <b-row>
            <b-col>
                <h5>Statistics</h5>
                <b-list-group>
                  <b-list-group-item>Min Temperature: {{ min }}</b-list-group-item>
                  <b-list-group-item>Max Temperature: {{ max }}</b-list-group-item>
                  <b-list-group-item>Average Temperature: {{ avg }} </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col v-if="this.$store.state.selected_device">

                <b-form @submit.prevent="submitInput">
                      <b-form-group id="exampleInputGroup1"
                                    label="Name:"
                                    label-for="exampleInput1"
                                    >
                        <b-form-input id="exampleInput1"
                                      type="text"
                                      v-model="nameInput"
                                      
                                      >
                        </b-form-input>
                      </b-form-group>
                      <b-form-group id="exampleInputGroup2"
                                    label="Description:"
                                    label-for="exampleInput2">
                        <b-form-input id="exampleInput2"
                                      type="text"
                                      v-model="descriptionInput"
                                      
                                      >
                        </b-form-input>
                      </b-form-group>

                      <b-button type="submit" variant="primary">Submit</b-button>
                    </b-form>

            </b-col>
        </b-row>
    </b-container>
</template>

<script>
let moment = require('moment');

export default {
  data() {
    return {
      nameInput: '',
      descriptionInput: '',
      success: false
    }
  },
  computed: {
    tempData() {
      let result = [];
      this.$store.state.latestTemperatures.map(a => result.push([moment(a.date_added).toDate(), parseFloat(a['value'])]))
      console.log(result)
      return result;
    },
    min() {
        let result = [];
        this.$store.state.latestTemperatures.map(a => result.push(parseFloat(a['value'])));
        return result.reduce((min, val) => val < min ? val : min, result[0]);
    },
    max() {
        let result = [];
        this.$store.state.latestTemperatures.map(a => result.push(parseFloat(a['value'])));
        return result.reduce((max, val) => val > max ? val : max, result[0]);
    },
    avg() {
        let result = [];
        this.$store.state.latestTemperatures.map(a => result.push(parseFloat(a['value'])));
        let avg = result.reduce( ( p, c ) => p + c, 0 ) / result.length
        return Number.parseFloat(avg).toFixed(2);
    }
  },
  // components: {
  //   LineChart
  // },
  async beforeCreate() {
    try {
      await this.$store.dispatch('initDevices')
      await this.$store.dispatch('selectDevice', this.$store.state.devices.find((obj) => { return obj.id == this.$route.params.id}));
      this.nameInput = this.$store.state.selected_device.name;
      this.descriptionInput = this.$store.state.selected_device.description;
      await this.$store.dispatch('fetchLatestTemperatures')
    }
    catch(e) {
      console.log(e)
    }
  },
  created() {
    const vm = this;
    setInterval(function() {
      vm.$store.dispatch('fetchLatestTemperatures')
    }, 180000)
  },
  methods: {
    async submitInput() {
      if (this.nameInput == '' || this.descriptionInput == '') {
        console.log("Error")
      }
      else {
        await this.$store.dispatch('updateDevice', {
          name: this.nameInput,
          description: this.descriptionInput
        })
        this.success = true
      }
    }
  }
}
</script>