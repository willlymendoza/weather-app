<template>
  <v-list class="transparent">
    <v-list-item v-for="item in forecast" :key="item.dt">
      <v-list-item-title>{{ formatDate(item.dt_txt) }}</v-list-item-title>

      <v-list-item-icon>
        <v-img width="70" :src="getIcon(item.weather[0].icon)"></v-img>
      </v-list-item-icon>

      <v-list-item-subtitle class="text-right">
        {{ tempType(item.main.temp) }}&deg;
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import { iconMixin } from '@/mixins/iconMixin'
import { tempMixin } from '@/mixins/tempMixin'

export default {
  mixins: [iconMixin, tempMixin],
  computed: {
    ...mapState(['forecast'])
  },
  methods: {
    formatDate(date) {
      return moment(date).format('LL')
    }
  }
}
</script>
