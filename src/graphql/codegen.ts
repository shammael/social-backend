import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: false,
  schema: "http://localhost:3001/graphql",
  generates: {
    "./src/graphql/generated/types.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-operations"],
      config: {
        contextType: "ExpressContext",
      },
    },
  },
};

export default config;
