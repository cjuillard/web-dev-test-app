"use server";

import prisma from "./app/db";

function getTodos() {
  return prisma.todo.findMany();
}

export async function getOrCreateUser(name: string) {
  let user;
  try {
    user = await prisma.user.findFirstOrThrow({
      where: { name },
    });
  } catch (e) {
    user = await prisma.user.create({
      data: {
        name,
      },
    });
  }

  return user;
}

export async function getUser() {
  return await getOrCreateUser("Colin");
}

export async function updateCoins(id: number, coins: number) {
  await prisma.user.update({ where: { id }, data: { coins } });
}

export async function getTop10() {
  const top10Users = await prisma.user.findMany({
    orderBy: { coins: "desc" },
    take: 10,
  });

  return top10Users;
}
