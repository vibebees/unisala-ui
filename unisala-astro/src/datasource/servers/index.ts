// Import the configuration using ESModule syntax
import config from "./config";

// Define a type for the configuration object
type ServiceConfig = {
  messagingServiceAddress: string,
  universityServiceAddress: string,
  messageSocketAddress: string,
  userServiceAddress: string,
  callSocketAddress: string,
  base?: string
};

// The configuration function
export const getServiceConfig = (): ServiceConfig => {
  switch (config.NODE_ENV) {
    case "DEVELOPMENT":
      return {
        messagingServiceAddress: "http://localhost:2222",
        universityServiceAddress: "http://localhost:9999",
        messageSocketAddress: "ws://localhost:2224",
        userServiceAddress: "http://localhost:4444",
        callSocketAddress: "ws://localhost:4445"
      };
    case "TEST":
      return {
        messagingServiceAddress: "http://test.unisala.com/msg",
        universityServiceAddress: "http://test.unisala.com/uni",
        messageSocketAddress: "ws://test.unisala.com",
        userServiceAddress: "http://test.unisala.com/user",
        callSocketAddress: "ws://localhost:4445"
      };
    case "PRODUCTION":
      return {
        messagingServiceAddress: "https://unisala.com/msg",
        universityServiceAddress: "https://unisala.com/uni",
        messageSocketAddress: "wss://unisala.com",
        userServiceAddress: "https://unisala.com/user",
        callSocketAddress: "ws://localhost:4445"
      };
    default:
      return {
        messagingServiceAddress: "",
        universityServiceAddress: "",
        messageSocketAddress: "",
        userServiceAddress: "",
        callSocketAddress: "",
        base: "https://unisala.com"
      };
  }
},
  userServiceAddress = getServiceConfig().userServiceAddress,
  messagingServiceAddress = getServiceConfig().messagingServiceAddress,
  universityServiceAddress = getServiceConfig().universityServiceAddress,
  base = getServiceConfig().base,
  userServiceGql = `${userServiceAddress}/graphql`,
  messagingServiceGql = `${messagingServiceAddress}/graphql`,
  universityServiceGql = `${universityServiceAddress}/graphql`;
