"use client"
import { useState } from 'react';
import Link from "next/link";
import { WheelSpinner } from './WheelSpinner';

type UserData = {
    id: number, 
    name: string, 
    coins: number
}

type WheelSpinnerClientProps = {
    findUser: (data: FormData) => Promise<UserData>
  };


export function WheelSpinnerClient({findUser}: WheelSpinnerClientProps) {
    "use client"
    const [showFindingUser, setShowFindingUser] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    const findUserAndUpdateUI = async(formData: FormData) => {
        setShowFindingUser(true);
        let newUserData = await findUser(formData);
        setShowFindingUser(false);
        setUserData(newUserData);
    }

    function GetNameForm() {
        return (
            <>
                <form action={findUserAndUpdateUI}>
                    <div className="flex flex-col gap-2">
                        <label>Enter name:</label>
                        <input
                            type="text"
                            name="user_name"
                            className="border border-slate-300
                            bg-transparent rounded px-2 py-1 outline-none
                            focus-within:border-slate-100"
                            />
                        <div className="flex gap-1 justify-end">
                            <Link
                                href=".."
                                className="border border-slate-300 text-slate-300 px-2 py-1 rounded 
                                            hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="border border-slate-300 text-slate-300 px-2 py-1 rounded 
                                        hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
                            >
                                OK
                            </button>
                            </div>
                    </div>
                </form>
            </>
        )
    }

    let display;
    if(showFindingUser) 
        display = (<h1>Finding user...</h1>);
    else if(userData == null)
        display = GetNameForm();
    else
        display = <WheelSpinner userId={userData.id} userName={userData.name} userCoins={userData.coins}/>
    
    return display;
}