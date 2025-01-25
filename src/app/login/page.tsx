"use client"
import Link from "next/link";
import Entrada from "../components/entrada"
import Saida from "../components/saida"
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
  };

export default function Estoque({searchParams}: SearchParamProps) {
    const show = searchParams?.show;
    let[username,setUsername] = useState<string>('')
    let[password,setPassword] = useState<string>('')
    let[isUserNotfound,setIsUserNotFound] = useState<Boolean>(false)
    function auhenticateUser(e: any) {
        e.preventDefault()
        console.log(username)

        fetch(`${process.env.HOST_URL}/api/login`, {
            body: JSON.stringify({username: username, password: password}),
            method: "POST"
        }).then((data) => data.json().then(resp => {
                if(!resp["token"]) {
                    console.log("user not found")
                    setIsUserNotFound(true)
                }else {
                    console.log("OK")
                    setIsUserNotFound(false)
                    localStorage.setItem("isAuthenticated", "1")
                    localStorage.setItem("token", resp["token"] )
                    redirect("/estoque")
                }
        }))
        //teste
    }
    return (
        <div className="w-64 flex flex-col m-0 m-auto justify-center align-center  h-screen">
            {isUserNotfound ? (<div className="rounded bg-red-500 p-3 mb-2"> Credenciais erradas, meus Raças</div>): null}
            <form className="bg-gray-200 rounded flex flex-col align-center shadow-md sm:rounded-lg p-5">
                <label>Usuário</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>

                <label>Senha</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}></input>

                <button onClick={(e) => auhenticateUser(e)}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3">
                     Entrar
                </button>
            </form>
        </div>
    )
}