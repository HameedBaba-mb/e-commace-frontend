<template>
  <div class="flash-messages">
    <transition-group name="slide" tag="div">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="flash-message mb-1"
        :style="{
          backgroundColor: setStatusColor(msg.type).backgroundColor,
          color: setStatusColor(msg.type).color,
          border: setStatusColor(msg.type).border,
        }"
      >
        <div class="body-content">
          <img
            :src="imageToShow(msg.type)"
            alt=""
            style="margin-right: 5px"
            class="mt-1"
          />
          <div>
            <p class="msg-title mt-2">{{ msg.title }}</p>
            <p v-html="msg.text" class="msg-text"></p>
            <!-- <p  class="msg-text">{{ msg.text }}</p> -->
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>
  
  
  <script>
/*
           Message Types: 
    -------------------------------
    success,error,warning,default
    -------------------------------
  */

import waringImg from "../../assets/images/alert.png";
import successImg from "../../assets/images/check-mark.png";
import errorImg from "../../assets/images/close.png";
import defaultImg from "../../assets/images/sign.png";
export default {
  name: "FlashMessage",
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    showMessage(msgTitle = "", msg = "", type = "success") {
      const newMessage = { title: msgTitle, text: msg, type };
      this.messages.push(newMessage);

      setTimeout(() => {
        this.messages.shift();
      }, 3000);
    },
    setStatusColor(status) {
      switch (status) {
        case "success":
          return {
            backgroundColor: "#f6fef9",
            color: "#067647",
            border: "1px solid #067647",
          };
        case "error":
          return {
            backgroundColor: "#fee4e2",
            color: "#f04438",
            border: "1px solid #f04438",
          };
        case "warning":
          return {
            backgroundColor: "#fffcf5",
            color: "#F79009",
            border: "1px solid #F79009",
          };
        default:
          return {
            backgroundColor: "#f4f4f4",
            color: "#23383f",
            border: "1px solid #23383f",
          };
      }
    },
    imageToShow(msType) {
      switch (msType) {
        case "success":
          return successImg;
        case "error":
          return errorImg;
        case "warning":
          return waringImg;
        default:
          return defaultImg;
      }
    },
  },
  expose: ["showMessage"], // Allow parent components to call showMessage
};
</script>
    
    <style scoped>
.flash-messages {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Add spacing between messages */
}

.flash-message {
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

img {
  height: 30px;
  width: 30px;
}

.body-content {
  display: flex;
  /* align-items: center; */
}

.msg-title {
  font-weight: bold;
  margin: 0;
  /* font-family: "font-medium"; */
}

.msg-text {
  margin: 0;
  font-size: 14px;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.3s ease-out;
}
</style>
    