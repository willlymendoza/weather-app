<template>
  <v-content class="">
    <v-container class="fill-height">
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-card class="content_gradient" dark>
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
            <v-expand-transition>
              <SearchByCity />
            </v-expand-transition>

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
  components: {
    SearchByCity,
    Forecast,
    CurrentWeather
  },
  computed: {
    ...mapState(['currentWeather', 'app_loading', 'forecast'])
  },
  methods: {
    ...mapActions(['getLocation', 'getIpData', 'setSearchCity'])
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
