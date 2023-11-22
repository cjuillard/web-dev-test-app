import { getOrCreateUser } from "@/db-api";
import { WheelSpinnerClient } from "../../components/WheelSpinnerClient"


export default async function WheelSpinnerPage() {
    async function findUser(data: FormData) {
        "use server"
        
        const userName = data.get("user_name")?.valueOf();

        if (typeof userName !== "string" || userName.length === 0) {
            throw new Error("Invalid name");
        }

        let user = await getOrCreateUser(userName);

        let strName = user.name == null ? "" : user.name;
        let userData = { id: user.id, name: strName, coins: user.coins };

        return userData;
    }

    return <>
            <WheelSpinnerClient findUser={findUser} />
            </>
}