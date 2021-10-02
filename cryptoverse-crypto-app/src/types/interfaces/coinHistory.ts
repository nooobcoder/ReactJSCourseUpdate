export interface History {
  price: string;
  timestamp: number;
}

export interface Data {
  change: number;
  history: History[];
}

export interface CoinHistory {
  status: string;
  data: Data;
}
