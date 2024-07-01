import {  useMutation } from "@apollo/client";
import { client } from "./servers/endpoints";

export const useAstroMutation: typeof useMutation = (query, options) =>
  useMutation(query, {
    ...options,
    client,
  });
