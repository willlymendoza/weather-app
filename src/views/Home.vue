<template>
  <v-content class="grey lighten-3 ">
    <v-container class="fill-height">
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-card class="content_gradient" dark>
            <!-- TITLE -->
            <v-card-title class="my-0 pb-0 content_gradient" style="opacity: .8"
              ><h3>WeatherApp</h3></v-card-title
            >
            <v-divider class="mx-5"></v-divider>
            <!-- CURRENT WEATHER INFO -->
            <CurrentWeather />

            <!-- LOADING ANIMATION -->
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

            <!-- SEARCH BY CITY, STATE, COUNTRY .... -->
            <SearchByCity />

            <!-- FORECAST INFO -->
            <v-card-subtitle class="headline">Forecast (12:00)</v-card-subtitle>
            <v-divider></v-divider>
            <Forecast />

            <!-- ACTIONS -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="getLocation()">My location</v-btn>
              <v-btn text @click="setSearchCity(true)"
                >Search by city name</v-btn
              >
            </v-card-actions>

            <!-- SNACK BAR -->
            <v-snackbar
              :value="snackBarShow"
              :timeout="timeout"
              absolute
              multi-line
              style="opacity: 0.9; color: black;"
              color="white"
            >
              <div>
                {{ snackBarText }}
                <v-card-actions class="py-0">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="error darken-3"
                    text
                    @click="setSnackBar(false)"
                  >
                    CLOSE
                  </v-btn>
                </v-card-actions>
              </div>
            </v-snackbar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
// @ is an alias to /src
import SearchByCity from '@/components/SearchByCity'
import Forecast from '@/components/Forecast'
import CurrentWeather from '@/components/CurrentWeather'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      timeout: 5000
    }
  },
  components: {
    SearchByCity,
    Forecast,
    CurrentWeather
  },
  computed: {
    ...mapState([
      'currentWeather',
      'app_loading',
      'forecast',
      'snackBarShow',
      'snackBarText'
    ])
  },
  methods: {
    ...mapActions(['getLocation', 'getIpData', 'setSearchCity', 'setSnackBar'])
  },
  created() {
    this.getIpData()
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
