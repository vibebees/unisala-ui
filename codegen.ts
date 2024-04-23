import { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  schema: [
    "http://test.unisala.com/user/graphql",
    "http://test.unisala.com/uni/graphql",
  ],
  documents: "./src/datasource/graphql/user",
  generates: {
    "./src/types/": {
      preset: "client",
    },
  },
};

export default config;
