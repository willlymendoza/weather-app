export const tempMixin = {
  methods: {
    tempType(value) {
      if (this.$store.state.format === 'f') {
        let result = (value * 9) / 5 + 32
        return parseFloat(result).toFixed(2)
      }
      return value
    }
  }
}
