import { useEffect, useState } from "react";
import { metaMask, hooks } from "@connectors/metaMask";
import { Card } from "@components/Card";

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

export default function MetaMaskCard() {
  // 得到当前连接链的Id
  const chainId = useChainId();
  // 得到当前的用户名
  const accounts = useAccounts();
  // 是否是在激活中
  const isActivating = useIsActivating();
  // 是否完成
  const isActive = useIsActive();
  // 签名 重点照顾对象
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    //看你公司的需求 强行弹起这个钱包
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);

  console.log({ metaMask,chainId, accounts, isActivating, isActive, ENSNames });

  return (
    <Card
      connector={metaMask}
      activeChainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
    />
  );
}
