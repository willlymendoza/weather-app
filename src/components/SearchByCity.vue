<template>
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
                @click="selectedItem(item.id)"
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
            @click="findLocation(text_to_search)"
            :loading="btn_loading"
            :disabled="btn_loading"
          >
            search
          </v-btn>
        </v-card-actions>
      </div>
    </div>
  </v-expand-transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      text_to_search: ''
    }
  },
  computed: {
    ...mapState(['searchCity', 'findList', 'searchError', 'btn_loading'])
  },
  methods: {
    ...mapActions(['setSearchCity', 'findLocation']),
    selectedItem(id) {
      this.$store.dispatch('getSelectedOption', id).then(() => {
        this.text_to_search = ''
      })
    }
  }
}
</script>
