<template>
  <div>
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
            currentWeather.weather ? currentWeather.weather[0].main : '---'
          }}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row justify="center">
        <v-col class="display-3 text-center" cols="12">
          {{
            currentWeather.main ? tempType(currentWeather.main.temp) : '0'
          }}&deg;{{ format === 'c' ? 'C' : 'F' }}
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

    <v-list-item>
      <v-btn v-if="format === 'c'" text class="px-0" @click="changeType('f')">
        Pass to &deg;F
      </v-btn>
      <v-btn v-else @click="changeType('c')" text class="px-0">
        Pass to &deg;C
      </v-btn>
    </v-list-item>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { iconMixin } from '@/mixins/iconMixin'
import { tempMixin } from '@/mixins/tempMixin'
import moment from 'moment'
export default {
  mixins: [iconMixin, tempMixin],
  data() {
    return {
      date: moment().format('LLLL')
    }
  },
  computed: {
    ...mapState(['currentWeather', 'format'])
  },
  methods: {
    ...mapActions(['changeTempType']),
    changeType(value) {
      this.$store.dispatch('changeFormat', value)
    }
  }
}
</script>
