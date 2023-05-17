import fetch from "cross-fetch";

import { config } from "../../Config";

export const rpc = {
  notify,
  call,
  getId
};

function notify(method: string, params?: Params): void {
  fetch(`${config.sado.url}/rpc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      params
    })
  });
}

async function call<T>(method: string, id: Id): Promise<T>;
async function call<T>(method: string, params: Params, id: Id): Promise<T>;
async function call<T>(method: string, paramsOrId: Params | Id, id?: Id): Promise<T> {
  let params: Params;
  if (isJsonRpcId(paramsOrId)) {
    id = paramsOrId;
  } else {
    params = paramsOrId;
  }
  const response = await fetch(`${config.sado.url}/rpc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      params,
      id
    })
  });
  if (response.status === 200) {
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error.message);
    }
    return json.result;
  }
  throw new Error(`Failed to fetch ${method} from SADO`);
}

function getId(): number {
  return Math.floor(Math.random() * 100000);
}

function isJsonRpcId(value: unknown): value is Id {
  return isString(value) || isInteger(value) || value === null;
}

function isInteger(value: any): value is number {
  return isNumber(value) && value % 1 === 0;
}

function isNumber(value: any): value is number {
  const type = typeof value;
  return type === "number" && value > Number.NEGATIVE_INFINITY && value < Number.POSITIVE_INFINITY;
}

function isString(value: any): value is string {
  return typeof value === "string";
}

type Id = string | number | null;

export type Params = unknown[] | Record<string, any>;
