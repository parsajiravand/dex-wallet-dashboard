

import Link from "next/link";
interface WalletTableRowProps {
  wallet: {
    walletAddress: string;
    netProfit: number;
  };
}

export default function WalletTableRow({ wallet }: WalletTableRowProps) {
  return (
    <tr className="border-b ">
      <td className="py-2 px-4 ">{wallet.walletAddress}</td>
      <td className="py-2 px-4 ">{wallet.netProfit}</td>
      <Link
        className="cursor-pointer text-blue-500 text-sm "
        href={`/wallet/${wallet.walletAddress}`}
      >
        Details
      </Link>
    </tr>
  );
}
