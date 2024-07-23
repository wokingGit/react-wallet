import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

// 实际metamask链接
export const [metaMask, hooks] = initializeConnector<MetaMask>(
  actions => new MetaMask({ actions }),
);
