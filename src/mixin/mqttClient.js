import mqtt from "mqtt";
import toastMixin from "../mixin/toastMixin.js";

const mqttClient = {
  data() {
    return {
      brokerClient: null,
    };
  },
  mixins: [toastMixin],
  created: function () {
    this.$store.dispatch("device/getAllUserDevices");
    this.$store.dispatch("user/getUserNotifications");
  },
  computed: {
    devicesList: function () {
      return this.$store.getters["device/getDevices"];
    },
  },
  methods: {
    getDeviceNameById: function (id) {
      return this.devicesList?.find((device) => device._id === id).name;
    },
    beginMqtt() {
      try {
        // CONNECT TO BROKER
        var client = this.brokerClient; // "this" not available inside nested methods.
        let options = {
          host: "localhost",
          port: 8083,
          endpoint: "/mqtt",
          protocolId: "MQTT",
          protocolVersion: 4,
          clean: true,
          connectTimeout: 5000,
          reconnectPeriod: 5000,
          clientId:
            "frontend/" +
            this.$store.getters["user/getUserInfo"].email +
            "/" +
            this.$store.getters["user/getUserInfo"].id,
          username: process.env.VUE_APP_EMQX_SUPERUSER, // can send and subscribe to any topic
          password: process.env.VUE_APP_EMQX_SUPERUSER,
        };
        let topicDevices = `${this.$store.getters["user/getUserInfo"].id}/+/+/sdata`;
        let topicNotifications = `${this.$store.getters["user/getUserInfo"].id}/notifications`;
        client = mqtt.connect(
          `ws://${options.host}:${options.port}${options.endpoint}`,
          options
        );
        client.on("connect", function () {
          console.log(">>> MQTT client connected successfully.");
          client.subscribe(topicDevices, { qos: 0 }, (error) => {
            if (error) {
              console.log(
                "> MQTT client error subscribing to devices topic:",
                error
              );
              return;
            }
            console.log(
              "> MQTT client successfully subscribed to devices topic:",
              topicDevices
            );
          });
          client.subscribe(topicNotifications, { qos: 0 }, (error) => {
            if (error) {
              console.log(
                "> MQTT client error subscribing to notifications topic:",
                error
              );
              return;
            }
            console.log(
              "> MQTT client successfully subscribed to notifications topic:",
              topicNotifications
            );
          });
        });
        client.on("reconnect", function () {
          console.log(">>> MQTT client REconnected successfully.");
        });
        client.on("error", function () {
          console.log(">>> MQTT client connection failed.");
        });
        // RECEIVE FROM BROKER
        client.on("message", (topic, message) => {
          console.log(
            "> MQTT client received topic/message:",
            topic,
            message.toString()
          );
          try {
            let splitTopic = topic.split("/");
            let mainTopic = splitTopic.at(-1);
            let variable = splitTopic.at(2);
            let messageObj = JSON.parse(message.toString());
            if (mainTopic === "notifications") {
              this.toast(
                `
                <b>Alert!</b>
                <br/>Device: ${this.getDeviceNameById(messageObj.deviceId)}
                <br/>Variable: ${messageObj.variable}
                <br/>Value: ${messageObj.payload.value}
                <br/>Condition: ${messageObj.condition}
                <br/>Limit: ${messageObj.value}
                <br/><i>${new Date().toLocaleString()}</i>
                `,
                "warning",
                10000
              );
              this.$store.dispatch("user/getUserNotifications");
              return;
            } else if (mainTopic === "sdata") {
              this.toast(
                `${variable} = ${messageObj.value.toString()}`,
                "info"
              );
              // emit topic so widget can capture it and process the data
              this.emitter.emit(topic, messageObj);
              return;
            }
          } catch (error) {
            console.log(error);
          }
        });
        // SEND TO BROKER
        this.emitter.on("publish-mqtt", (data) => {
          client.publish(data.topic, JSON.stringify(data.payload));
        });
      } catch (error) {
        console.log("MQTT client starting error:", error);
      }
    },
  },
};

export default mqttClient;
