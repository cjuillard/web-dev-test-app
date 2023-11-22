"use server"

import prisma from "./app/db"

function getTodos() {
  return prisma.todo.findMany()
}

export async function getOrCreateUser(name: string) {
  let user
  try {
    user = await prisma.user.findFirstOrThrow({
      where: { name },
    })
  } catch(e) {
    user = await prisma.user.create({
      data: {
          name,
      },
    })
  }
 
  console.log(user)
  return user;
}

export async function getUser() {
  return await getOrCreateUser('Colin')
}

export async function updateCoins(id: number, coins: number) {
  console.log("updateCoins - " + coins)
  await prisma.user.update({ where: { id }, data: { coins } })
}