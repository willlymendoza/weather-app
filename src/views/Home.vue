<template>
  <v-content class="">
    <v-container class="fill-height">
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-card class="content_gradient" dark>
            <!-- LOADING -->
            <v-overlay
              absolute
              :value="app_loading"
              color="grey darken-4"
              opacity=".7"
            >
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-overlay>

            <!-- SEARCH BY CITY, STATE, COUNTRY ... -->
            <v-expand-transition>
              <div
                v-if="searchCity"
                class="d-flex content_gradient darken-2 v-card-reveal display-3 white--text fill-height"
                style="z-index: 5;"
              >
                <div style="width: 90%;">
                  <v-card-text>
                    <v-text-field
                      v-model="text_to_search"
                      label="Your city name (e.g. city, state, country)"
                    ></v-text-field>

                    <v-expand-transition>
                      <v-list v-if="findList.length" style="opacity: .6">
                        <v-list-item
                          v-for="item in findList"
                          :key="item.id"
                          @click="getSelectedOption(item.id)"
                        >
                          {{ item.name }} - {{ item.sys.country }}
                        </v-list-item>
                      </v-list>
                    </v-expand-transition>
                    <span v-if="searchError">No results</span>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="setSearchCity(false)">
                      cancel
                    </v-btn>
                    <v-btn
                      text
                      @click="find(text_to_search)"
                      :loading="btn_loading"
                      :disabled="btn_loading"
                    >
                      search
                    </v-btn>
                  </v-card-actions>
                </div>
              </div>
            </v-expand-transition>

            <!-- CURRENT WEATHER INFO -->
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline"
                  >{{ currentWeather.name }},
                  {{
                    currentWeather.sys ? currentWeather.sys.country : '---'
                  }}</v-list-item-title
                >
                <v-list-item-subtitle
                  >{{ date }} -
                  {{
                    currentWeather.weather
                      ? currentWeather.weather[0].main
                      : '---'
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-card-text>
              <v-row justify="center">
                <v-col class="display-3 text-center" cols="12">
                  {{
                    currentWeather.main ? currentWeather.main.temp : '---'
                  }}&deg;C
                  <v-avatar tile>
                    <v-img
                      :src="
                        getIcon(
                          currentWeather.weather
                            ? currentWeather.weather[0].icon
                            : '01d'
                        )
                      "
                    ></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card-text>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>fa-wind</v-icon>
              </v-list-item-icon>
              <v-list-item-subtitle
                >{{
                  currentWeather.wind ? currentWeather.wind.speed : '---'
                }}
                m/s</v-list-item-subtitle
              >
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>fa-cloud</v-icon>
              </v-list-item-icon>
              <v-list-item-subtitle
                >{{
                  currentWeather.clouds ? currentWeather.clouds.all : '---'
                }}%</v-list-item-subtitle
              >
            </v-list-item>

            <v-card-subtitle class="headline">Forecast (12:00)</v-card-subtitle>
            <v-divider></v-divider>

            <!-- FORECAST INFO -->
            <v-list class="transparent">
              <v-list-item v-for="item in forecast" :key="item.dt">
                <v-list-item-title>{{
                  formatDate(item.dt_txt)
                }}</v-list-item-title>

                <v-list-item-icon>
                  <v-img
                    width="70"
                    :src="getIcon(item.weather[0].icon)"
                  ></v-img>
                </v-list-item-icon>

                <v-list-item-subtitle class="text-right">
                  {{ item.main.temp }}&deg;
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="getLocation()">My location</v-btn>
              <v-btn text @click="setSearchCity(true)"
                >Search by city name</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
// @ is an alias to /src
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      text_to_search: ''
    }
  },
  computed: {
    ...mapState([
      'searchCity',
      'currentWeather',
      'searchError',
      'btn_loading',
      'app_loading',
      'forecast',
      'findList'
    ])
  },
  methods: {
    ...mapActions([
      'getLocation',
      'getIpData',
      'find',
      'getSelectedOption',
      'setSearchCity'
    ]),
    formatDate(date) {
      return moment(date).format('LL')
    },
    getIcon(icon_name) {
      let icon = ''
      switch (icon_name) {
        case '01d':
          icon = 'sun.png'
          break
        case '01n':
          icon = 'moon.png'
          break
        case '02d':
          icon = 'cloud_sun.png'
          break
        case '02n':
          icon = 'cloud_moon.png'
          break
        case '03d':
        case '03n':
          icon = 'cloud.png'
          break
        case '04d':
        case '04n':
          icon = 'clouds.png'
          break
        case '09d':
        case '09n':
          icon = 'clouds_rain.png'
          break
        case '10d':
          icon = 'sun_raining.png'
          break
        case '10n':
          icon = 'moon_raining.png'
          break
        case '11d':
        case '11n':
          icon = 'storm.png'
          break
        case '13d':
        case '13n':
          icon = 'ice.png'
          break
        case '50d':
        case '50n':
          icon = 'mist.png'
          break
        default:
          break
      }
      return require(`../assets/icons/${icon}`)
    }
  },
  created() {
    this.getIpData()
    this.date = moment().format('LLLL')
  }
}
</script>

<style scoped>
.content_gradient {
  background: rgb(30, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(30, 0, 36, 1) 0%,
    rgba(121, 9, 119, 1) 35%,
    rgba(27, 132, 163, 1) 100%
  );
  color: white;
}

.v-card-reveal {
  align-items: center;
  justify-content: center;
  bottom: 0;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
