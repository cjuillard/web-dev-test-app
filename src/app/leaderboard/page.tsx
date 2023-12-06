// import { getTop10 } from "@/db-api";

export const fetchCache = 'force-no-store'
export const dynamic = 'force-dynamic'

import prisma from "../db";

async function getTop10() {
  const top10Users = await prisma.user.findMany({
    orderBy: { coins: "desc" },
    take: 10,
  });

  return top10Users;
}

export default async function Leaderboard() {
  const users = await getTop10();

  const userTableItems = users.map((user, i) => {
    return (
      <tr
        key={i}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <td
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {i + 1}
        </td>
        <td
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {user.name}
        </td>
        <td className="px-6 py-2">💰{user.coins}</td>
      </tr>
    );
  });
  return (
    <>
      <center>
        <h1 className="py-5 text-3xl">🥇Leaderboard🥇</h1>
        <table className="w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 w-2/12">Ranking</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Coins</th>
            </tr>
          </thead>
          <tbody>{userTableItems}</tbody>
        </table>
      </center>
    </>
  );
}
