import { redirect } from "next/navigation";

const HomePage = () => {
  redirect(`list/1?sort=netProfit`);
};

export default HomePage;
