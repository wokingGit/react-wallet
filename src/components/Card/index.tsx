import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import type { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect";

import { Dispatch, SetStateAction } from "react";
import { getName } from "./utils";
import { Status } from "./Status";
import { Chain } from "./Chain";
import { Accounts } from './Accounts';
import { ConnectWithSelect } from './ConnectWithSelect';


interface Props {
  connector: MetaMask | WalletConnectV2;
  activeChainId: ReturnType<Web3ReactHooks["useChainId"]>;
  chainIds?: ReturnType<Web3ReactHooks["useChainId"]>[];
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  //   setError: (error: Error | undefined) => void;
  setError: Dispatch<SetStateAction<Error | undefined>>;
  ENSNames: ReturnType<Web3ReactHooks["useENSNames"]>;
  provider?: ReturnType<Web3ReactHooks["useProvider"]>;
  accounts?: string[];
}

export function Card({
  connector,
  activeChainId,
  chainIds,
  isActivating,
  isActive,
  error,
  setError,
  ENSNames,
  accounts,
  provider,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "20rem",
        padding: "1rem",
        margin: "1rem",
        overflow: "auto",
        border: "1px solid",
        borderRadius: "1rem",
      }}
    >
      <b>{getName(connector)}</b>
      <div style={{ marginBottom: "1rem" }}>
        <Status isActivating={isActivating} isActive={isActive} error={error} />
      </div>
      <Chain chainId={activeChainId} />

      <div style={{ marginBottom: '1rem' }}>
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>

      <ConnectWithSelect
        connector={connector}
        activeChainId={activeChainId}
        chainIds={chainIds}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      />

    </div>
  );
}
