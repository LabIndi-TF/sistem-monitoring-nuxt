import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: {
          devices: [],
          selected_device: null,
          temperatures: [],
          latestTemperatures: [],
          latestCurrent: []
        },
        mutations: {
          setDevices(state, devices) {
              state.devices = devices
          },
          mutation_selectDevice(state, device) {
              state.selected_device = device
          },
          setTemperatures(state, temperatures) {
            state.temperatures = temperatures
          },
          setLatestTemperatures(state, temperatures) {
            state.latestTemperatures = temperatures
          },
          updateDevice(state, device) {
            let devices = state.devices
            devices.splice(devices.indexOf(device), 1)
            state.devices = devices
          },
          setLatestCurrent(state, current) {
            state.latestCurrent = current
          }
        },
        actions: {
          initDevices(ctx) {
            return new Promise((resolve, reject) => {
              this.$axios.$get('/Devices').then(res => {
                  ctx.commit("setDevices", res)
                  resolve();
              }).catch(e => {
                reject(e)
              })
            })

          },
          selectDevice(ctx, device) {
            return new Promise((resolve, reject) => {
              ctx.commit("mutation_selectDevice", device);
              if (ctx.state.selected_device == device) {
                resolve();
              }
            })
          },
          fetchTemperatures(ctx) {
            return new Promise((resolve, reject) => {
              const deviceId = ctx.state.selected_device.id;
              this.$axios.$get(`/Devices/${deviceId}/temperatures`).then(res => {
                ctx.commit("setTemperatures", res)
                resolve()
              }).catch(e => {
                reject(e)
              })
            })
          },
          fetchLatestTemperatures(ctx) {
            return new Promise((resolve, reject) => {
              const deviceId = ctx.state.selected_device.id;
              const limit = 20;
              this.$axios.$get(`/Devices/${deviceId}/temperatures?filter[order]=date_added%20DESC&filter[limit]=${limit}`).then(res => {
                ctx.commit("setLatestTemperatures", res)
                resolve()
              }).catch(e => {
                reject(e)
              })
            })
          },
          fetchLatestCurrent(ctx) {
            return new Promise((resolve, reject) => {
              const limit = 20;
              this.$axios.$get(`/Currents?filter[order]=date_added%20DESC&filter[limit]=${limit}`).then(res => {
                ctx.commit("setLatestCurrent", res)
                resolve()
              }).catch(e => {
                reject(e)
              })
            })
          },
          updateDevice(ctx, payload) {
            return new Promise((resolve, reject) => {
              const deviceId = ctx.state.selected_device.id;
              this.$axios.$put(`/Devices/${deviceId}`, payload).then(res => {
                ctx.commit("updateDevice", res)
                resolve()
              }).catch(e => {
                reject(e)
              })
            })
          }
        },
        getters: {

        }
    })
}

export default createStore;