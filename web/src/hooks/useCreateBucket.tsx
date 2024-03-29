import { useEthereumConfig } from 'utils/eth.utils';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

const encode = (name: string) => {
  const bytes = []
  for (const letter of name) {
    bytes.push(Number(letter))
  }
  return bytes
}

export const useCreateBucket = (name: string) => {
  const { address } = useEthereumConfig();
  const cfg = useEthereumConfig();
  const encoded = encode(name)
  const { config } = usePrepareContractWrite({
    ...cfg,
    functionName: 'createBucket',
    args: [encoded as any],
  });
  const { writeAsync, isLoading } = useContractWrite(config);
  const createBucket = async () => writeAsync?.();

  return {
    createBucket,
    isLoading
  };
};
