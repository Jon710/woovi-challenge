import { Variables } from "relay-runtime";

export const fetchGraphQL = async (query: string, variables: Variables) => {
  const response = await fetch(process.env.API_URL as string, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();

  return data;
};
