// components/WalletTable.tsx
import WalletTableRow from "./WalletTableRow";
import { fetchAPI } from "../../lib/api";
import Link from "next/link";

interface Wallet {
  walletAddress: string;
  netProfit: number;
}

interface WalletTableProps {
  page: number;
  sort: string;
}

async function fetchWallets(page = 1): Promise<Wallet[]> {
  console.log(page);
  const response = await fetchAPI(
    `/valuable_wallets?network=eth&page=${page}&limit=5`
  );
  return response;
}

const WalletTable = async ({ page, sort }: WalletTableProps) => {
  const wallets = await fetchWallets(page);

  // sort
  wallets.sort((a, b) => {
    if (sort === "netProfit") {
      return b.netProfit - a.netProfit;
    }
    return 0;
  });

  return (
    <div className="overflow-x-scroll">
      <table className=" table-auto overflow-scroll w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Wallet Address</th>
            <th className="py-2 px-4 border-b flex flex-row items-center gap-2">
              <Link
                href={
                  sort === "netProfit"
                    ? `/list/${page}`
                    : `/list/${page}?sort=netProfit`
                }
              >
                {sort === "netProfit" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="#888888"
                      stroke-linecap="round"
                      stroke-width="1.5"
                    >
                      <path d="M4 8h9m-7 5h7m-5 5h5" />
                      <path stroke-linejoin="round" d="M17 20V4l3 4" />
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="#888888"
                      stroke-linecap="round"
                      stroke-width="1.5"
                    >
                      <path d="M4 16h9m-7-5h7M8 6h5" />
                      <path stroke-linejoin="round" d="M17 4v16l3-4" />
                    </g>
                  </svg>
                )}
              </Link>
              Net Profit
            </th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* empty result */}
          {wallets.length === 0 && (
            <tr>
              <td colSpan={3} className="py-2 px-4 text-center">
                No wallets found
              </td>
            </tr>
          )}
          {wallets.map((wallet) => (
            <WalletTableRow key={wallet.walletAddress} wallet={wallet} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletTable;
