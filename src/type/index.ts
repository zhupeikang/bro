
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
  txId: string;
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

export type NftDetailType = {
  code: number;
  message: string;
  result: Result;
  traceId: string;
}
export type Rights = {
  id: string;
  tokenId: string;
  contractId: string;
  rightsId: string;
  desc: string;
  isUsed: boolean;
  createTime: string;
  modifyTime: string;
}

export type Nft = {
  tokenId: string;
  txId: string;
  contractId: string;
  author: string;
  name: string;
  userAddress: string;
  traits: any[];
  createAt: string;
  isMixed: boolean;
  rights: Rights[];
  no: number;
}

export type Contract = {
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

export type AssetData = {
  nft: Nft;
  contract: Contract;
}
export type User_wallet = {
  uid: number;
  address: string;
}

export type NftContract = {
  contract_id: number;
  chain_contract_id: string;
  name:string
}

export type Data = {
  token_id: string;
  tx_id: string;
  uid: number;
  contract_id: number;
  minted_at: number;
  user_wallet: User_wallet;
  contract: NftContract;
}

export type Links = {
  url?: unknown;
  label: string;
  active: boolean;
}

export type NFTLIST = {
  current_page: number;
  data: Data[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Links[];
  next_page_url: string;
  path: string;
  per_page: string;
  prev_page_url?: string|null;
  to: number;
  total: number;
}
