import { TodoItem } from "@/components/TodoItem"
import { WheelSpinner } from "@/components/WheelSpinner"
import Link from "next/link"
import prisma from "./db"

function getTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: {complete} })
}

export default async function Home() {

  return (
   <>
    <h1 className="text-2xl">Samples</h1>
    <br/>
    <Link 
      className="border border-slate-300 text-slate-300 px-2 py-1 rounded 
                hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      href="/wheel-spinner">Wheel Spinner</Link>
    <br/>
    <br/>
    <Link 
      className="border border-slate-300 text-slate-300 px-2 py-1 rounded 
                hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      href="/leaderboard">Leaderboard</Link>
    <br/>
    <br/>
    <Link 
      className="border border-slate-300 text-slate-300 px-2 py-1 rounded 
                hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      href="/todo">Todo List</Link>
    </>
  )
}