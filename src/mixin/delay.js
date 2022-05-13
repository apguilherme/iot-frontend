const delay = {
  methods: {
    async delay(ms) {
      await new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
export default delay;
