import {  useMutation, useQuery} from "@apollo/client";
import { client } from "./servers/endpoints";

export const useAstroMutation: typeof useMutation = (query, options) =>
  useMutation(query, {
    ...options,
    client,
  });

export const useAstroQuery: typeof useQuery = (query, options) =>
  useQuery(query, {
    ...options,
    client,
  });