const mixins = {
  methods: {
    mobileNumberRegEx() {
      return /^([+]234|234|0){1}[7-9]{1}[0-1]{1}[0-9]{8}$/;
    },
    emailRegEx() {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    },
  },
};

export default mixins;
