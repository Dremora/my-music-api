import { mutationField } from "nexus";

import { getEnvVariable } from "../../config";

export const login = mutationField("login", {
  type: "Boolean",
  args: {
    password: "String",
  },
  resolve(_, { password }) {
    return password === getEnvVariable("USER_PASSWORD");
  },
});
