
export type Payload = {
  name: string;
  tx_id: string;
  author: string;
  traits: never[];
  token_id: string;
  create_at: string;
  contract_id: string;
  user_address: string;
}

export type TxDetailType = {
  channel_info: string;
  create_time: string;
  modify_time: string;
  is_sent: boolean;
  is_onchain: boolean;
  is_delivered: boolean;
  username: string;
  tx_id: string;
  payload: Payload;
  vastchain_order_id: string;
  receipt_type: string;
  tx_hash: string;
}


export type Account = {
  address: string;
  created_at: number;
}

export type List = {
  createAt: string;
  tokenId: string;
  contractId: string;
  name: string;
}

export type AccountDetailType = {
  account: Account;
  list: List[];
  count: number;
}
export type Result = {
  contract_id: string;
  publisher_address: string;
  service_provider_id: number;
  name: string;
  symbol: string;
  image_url: string;
  description: string;
  external_link: string;
  total_supply: number;
  create_at: string;
}

export type ContractDetailType = {
  code: number;
  message: string;
  result: Result;
  traceId: string;
}
