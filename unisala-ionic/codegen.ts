import { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  schema: ["http://test.unisala.com/user/graphql"],
  documents: "./src/datasource/graphql/user",
  generates: {
    "./src/types/gqlTypes/": {
      preset: "client",
    },
  },
};

export default config;
