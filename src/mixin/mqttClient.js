import mqtt from "mqtt";
import toastMixin from "../mixin/toastMixin.js";

const mqttClient = {
  mixins: [toastMixin],
  data() {
    return {
      brokerClient: null,
    };
  },
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
    async getBrokerAuth(isReconnect = false) {
      try {
        if (!isReconnect) {
          await this.$store.dispatch("user/getBrokerAuth");
        } else if (isReconnect) {
          await this.$store.dispatch("user/getBrokerAuthReconnect");
        }
        let credentials = this.$store.getters["user/getBrokerAuth"];
        let brokerOpts = {
          host: "localhost",
          port: 8083,
          endpoint: "/mqtt",
          protocolId: "MQTT",
          protocolVersion: 4,
          clean: true,
          connectTimeout: 15000,
          reconnectPeriod: 15000,
          clientId:
            "frontend/" +
            this.$store.getters["user/getUserInfo"].email +
            "/" +
            this.$store.getters["user/getUserInfo"].id,
          username: "",
          password: "",
        };
        brokerOpts.username = credentials.brokerUser;
        brokerOpts.password = credentials.brokerPass;
        return brokerOpts;
      } catch (error) {
        console.log("Error getting broker auth:", error);
      }
    },
    async beginMqtt() {
      try {
        let options = await this.getBrokerAuth(false);
        // CONNECT TO BROKER
        let topicDevices = `${this.$store.getters["user/getUserInfo"].id}/+/+/sdata`;
        let topicNotifications = `${this.$store.getters["user/getUserInfo"].id}/notifications`;
        var client = mqtt.connect(
          `ws://${options.host}:${options.port}${options.endpoint}`,
          options
        );
        this.brokerClient = client;
        client.on("connect", function () {
          console.log(">>> MQTT client connected successfully.");
          client.subscribe(topicDevices, { qos: 0 }, (error) => {
            if (error) {
              console.log(
                ">>> MQTT client error subscribing to devices topic:",
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
                ">>> MQTT client error subscribing to notifications topic:",
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
        client.on("reconnect", async () => {
          options = await this.getBrokerAuth(true);
          this.brokerClient.options = options;
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
        // CLOSE BROKER CONNECTION
        this.emitter.on("close-broker-conn", () => {
          client.unsubscribe(topicDevices);
          client.unsubscribe(topicNotifications);
          client.end();
        });
      } catch (error) {
        console.log("MQTT client starting error:", error);
      }
    },
  },
};

export default mqttClient;
