import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    geoLocationKey: process.env.VUE_APP_GEO_LOCATION_KEY,
    geoLocationUri: process.env.VUE_APP_GEO_LOCATION_URI,
    weatherKey: process.env.VUE_APP_WEATHER_KEY,
    weatherUri: process.env.VUE_APP_WEATHER_URI,
    searchCity: false,
    currentWeather: [],
    findList: [],
    searchError: false,
    btn_loading: false,
    app_loading: false,
    format: 'c',
    snackBarShow: false,
    snackBarText: '',
    forecast: [
      {
        dt_txt: new Date(),
        weather: [{ icon: '01d' }],
        main: { temp: '--' }
      },
      {
        dt_txt: new Date(),
        weather: [{ icon: '01d' }],
        main: { temp: '--' }
      },
      {
        dt_txt: new Date(),
        weather: [{ icon: '01d' }],
        main: { temp: '--' }
      },
      {
        dt_txt: new Date(),
        weather: [{ icon: '01d' }],
        main: { temp: '--' }
      },
      {
        dt_txt: new Date(),
        weather: [{ icon: '01d' }],
        main: { temp: '--' }
      }
    ]
  },
  mutations: {
    SET_WEATHER(state, weather) {
      state.currentWeather = weather
    },
    SET_FORECAST(state, forecast) {
      state.forecast = forecast
    },
    SET_FIND_LIST(state, findList) {
      state.findList = findList
    },
    SET_SEARCH_ERROR(state, value) {
      state.searchError = value
    },
    SET_BTN_LOADING(state, value) {
      state.btn_loading = value
    },
    SET_APP_LOADING(state, value) {
      state.app_loading = value
    },
    SET_SEARCH_CITY(state, value) {
      state.searchCity = value
    },
    SET_TEMP_TYPE(state, type) {
      state.temp_type = type
    },
    SET_FORMAT(state, value) {
      state.format = value
    },
    SET_SNACK_BAR(state, value) {
      state.snackBarShow = value
    },
    SET_SNACK_BAR_TEXT(state, value) {
      state.snackBarText = value
    }
  },
  actions: {
    getLocation({ dispatch }) {
      dispatch('setSnackBar', false)
      if (!('geolocation' in navigator)) {
        dispatch(
          'setSnackBarText',
          'Geolocation is not available in your browser'
        )
        return
      }

      navigator.geolocation.getCurrentPosition(
        pos => {
          dispatch('getWeather', [pos.coords.latitude, pos.coords.longitude])
        },
        err => {
          dispatch('setSnackBar', false)
          dispatch(
            'setSnackBarText',
            'You need to allow location in your browser to get your local weather'
          )
          console.log(err)
        }
      )
    },
    async getIpData({ dispatch }) {
      try {
        const fields = 'country_name,city,latitude,longitude,country_flag'
        const data = await fetch(
          `${this.state.geoLocationUri}?apiKey=${this.state.geoLocationKey}&fields=${fields}`
        )
        const res = await data.json()
        dispatch('getWeather', [res.latitude, res.longitude])
      } catch (error) {
        console.log(error)
      }
    },
    async getWeather({ commit }, coords) {
      commit('SET_APP_LOADING', true)
      try {
        const weather = await fetch(
          `${this.state.weatherUri}weather?lat=${coords[0]}&lon=${coords[1]}&units=metric&appid=${this.state.weatherKey}`
        )
        const weather_res = await weather.json()

        if (!weather_res.main) return

        const forecast = await fetch(
          `${this.state.weatherUri}forecast?lat=${coords[0]}&lon=${coords[1]}&units=metric&appid=${this.state.weatherKey}`
        )
        const forecast_res = await forecast.json()

        let arrayForecast = []
        for (let i = 2; i <= 39; i += 8) {
          arrayForecast.push(forecast_res.list[i])
        }

        commit('SET_WEATHER', weather_res)
        commit('SET_FORECAST', arrayForecast)
        commit('SET_SEARCH_ERROR', false)
        commit('SET_APP_LOADING', false)
      } catch (error) {
        console.log(error)
        commit('SET_APP_LOADING', false)
      }
    },
    async findLocation({ commit }, text) {
      if (text.trim() === '' || text.length < 3) {
        commit('SET_SEARCH_ERROR', true)
        return
      }
      commit('SET_FIND_LIST', [])
      commit('SET_BTN_LOADING', true)
      try {
        const data = await fetch(
          `${this.state.weatherUri}find?q=${text}&units=metric&appid=${this.state.weatherKey}`
        )
        const res = await data.json()
        if (res.count === 0) {
          commit('SET_SEARCH_ERROR', true)
          commit('SET_BTN_LOADING', false)
          return
        }
        if (res.cod === '400') {
          commit('SET_BTN_LOADING', false)
          commit('SET_SEARCH_ERROR', true)
          return
        }
        commit('SET_FIND_LIST', res.list)
        commit('SET_SEARCH_ERROR', false)
        commit('SET_BTN_LOADING', false)
      } catch (error) {
        commit('SET_BTN_LOADING', false)
        console.log(error)
      }
    },
    getSelectedOption({ commit, dispatch }, id) {
      const data = this.state.findList.find(item => item.id === id)
      dispatch('getWeather', [data.coord.lat, data.coord.lon])
      this.state.findListh = []
      commit('SET_FIND_LIST', [])
      dispatch('setSearchCity', false)
    },
    setSearchCity({ commit }, value) {
      commit('SET_SEARCH_CITY', value)
    },
    changeFormat({ commit }, value) {
      commit('SET_FORMAT', value)
    },
    setSnackBarText({ commit, dispatch }, value) {
      commit('SET_SNACK_BAR_TEXT', value)
      dispatch('setSnackBar', true)
    },
    setSnackBar({ commit }, value) {
      commit('SET_SNACK_BAR', value)
    }
  },
  modules: {}
})
