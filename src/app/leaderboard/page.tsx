import { getTop10 } from "@/db-api";

export default async function Leaderboard() {
  const users = await getTop10();

  const userTableItems = users.map((user, i) => {
    return (
      <tr key={i}>
        <td>{user.name}</td>
        <td>{user.coins}</td>
      </tr>
    );
  });
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Leaderboard</th>
          </tr>
        </thead>
        <tbody>{userTableItems}</tbody>
      </table>
    </>
  );
}
