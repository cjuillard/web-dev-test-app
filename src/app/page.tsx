import { TodoItem } from "@/components/TodoItem"
import { WheelSpinner } from "@/components/WheelSpinner"
import Link from "next/link"
import prisma from "./db"

function getTodos() {
  return prisma.todo.findMany()
}

async function getUser() {
  let user
  try {
    user = await prisma.user.findFirstOrThrow({
      where: { name: 'Colin' },
    })
  } catch(e) {
    user = await prisma.user.create({
      data: {
        name: 'Colin',
      },
    })
  }
 
  console.log(user)
  return user;
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: {complete} })
}

async function updateCoins(id: number, coins: number) {
  "use server"

  console.log("updateCoins - " + coins)
  await prisma.user.update({ where: { id }, data: { coins } })
}

//prisma.todo.create({data: { title: "test", complete: false }})
export default async function Home() {
  //await prisma.todo.create({data: { title: "test", complete: false }})
  const todos = await getTodos()
  const user = await getUser();
  console.log(user);
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link 
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded 
                    hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new">New</Link>
      </header>
      <ul className="pl-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
      <WheelSpinner userId={user.id} userCoins={user.coins} updateCoins={updateCoins} />
    </>
  )
}