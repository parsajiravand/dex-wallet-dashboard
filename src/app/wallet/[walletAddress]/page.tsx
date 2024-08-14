import WalletChart from "../../components/WalletChart";
import { fetchAPI } from "../../../lib/api";

interface WalletDetailPageProps {
  params: {
    walletAddress: string;
  };
}

export interface WalletData {
  walletAddress: string;
  totalOperations: number[];
  profitLossAmounts: number[];
  months: string[];
  backgroundColors: string[];
  totalProfits: { month: Record<string, number> };
  totalBuyAmounts: { month: Record<string, number> };
  totalSellAmounts: { month: Record<string, number> };
  totalBuySellTimes: {
    /* add the required properties here */
  };
}

async function fetchWalletDetails(walletAddress: string): Promise<WalletData> {
  const data = await fetchAPI(`/walletsummary/${walletAddress}?network=eth`);
  console.log(data);
  return data;
}

export default async function WalletDetailPage({
  params,
}: WalletDetailPageProps) {
  const walletData = await fetchWalletDetails(params.walletAddress);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Wallet Details
        </h1>
        <WalletChart walletData={walletData as any} />
      </div>
    </div>
  );
}
