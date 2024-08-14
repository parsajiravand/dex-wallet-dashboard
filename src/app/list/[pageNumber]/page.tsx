import Link from "next/link";
import WalletTable from "../../components/WalletTable";

const HomePage = ({
  params,
  searchParams,
}: {
  params: { pageNumber: number };
  searchParams: {
    sort: string;
  };
}) => {
  console.log("searchParams", searchParams);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 text-gray-800">
        <h1 className="text-2xl font-bold  mb-6">Crypto Wallets Dashboard</h1>
        <WalletTable page={params.pageNumber} sort={searchParams.sort} />
        <div className="flex flex-row justify-between items-center my-5">
          <Link
            className={
              params.pageNumber == 1
                ? "cursor-not-allowed text-gray-500"
                : "text-blue-500"
            }
            href={{
              pathname:
                params.pageNumber > 1 ? `/list/${params.pageNumber - 1}` : "",
            }}
          >
            Previous
          </Link>
          <span> </span>
          <Link
            className="text-blue-500"
            href={{
              pathname: `/list/${Number(params.pageNumber) + 1}`,
            }}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
