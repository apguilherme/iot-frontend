const toastMixin = {
  methods: {
    toast(message, type, duration = 4000, position = "top-right") {
      this.$toast.show(message, {
        type: type, // success, info, warning, error, default
        position: position, // top, bottom, top-right, bottom-right,top-left, bottom-left
        duration: duration,
        dismissible: false,
        pauseOnHover: true,
      });
    },
  },
};

export default toastMixin;
