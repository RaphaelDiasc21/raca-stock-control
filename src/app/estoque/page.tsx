"use client"
import Link from "next/link";
import isAuthenticated from "../utils/authentication";
import Entrada from "../components/entrada"
import { useEffect, useLayoutEffect, useState } from "react";
import { redirect } from 'next/navigation';
type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
  };

export default function Estoque() {
    let[show,setShow] = useState(false)
    let[products,setProducts] = useState<{product: String, quantity: Number, updatedDate: String}[]>([])
    
    function deleteProduct(productName: string) {
        let product = products.filter(product => product["product"] == productName)
        
    }

    useLayoutEffect(() =>{
        if(!isAuthenticated()) return redirect("/login")
    })

    useEffect(() => {
        
        console.log("REEE")
        console.log(localStorage.getItem("token"))
        fetch(`${process.env.HOST_URL}/api/get-products`, {
            headers: new Headers({'Authorization': String(localStorage.getItem("token"))})
        })
        .then(data => {
            data.json().then(resp => {
                console.log(resp)
                if(resp["message"] == 'not autenticated') {
                    localStorage.removeItem("isAuthenticated")
                    localStorage.removeItem("token")
                    redirect('/estoque')
                }
                setProducts([...resp["products"]])
            })
        }).catch(err => {
            console.log(err)
        })


        console.log("teste")
    },[])
    
    return (
<div className="relative flex flex-col items-center" style={{width: "90%", margin: '0 auto'}}>
      <div className="m-5">
          <button onClick={() => setShow(true)} className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Atualizar estoque
          </button>
      {show && <Entrada />}
      </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto shadow-md sm:rounded-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Produto
                </th>
                <th scope="col" className="px-2 py-2">
                    Quantidade
                </th>
                <th scope="col" className="px-3 py-2">
                    Ultima atualização
                </th>
            </tr>
        </thead>
        <tbody>
            {products.map(product => {
                return (
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {product["product"]}
                    </th>
                    <td className="px-6 py-4">
                        {String(product["quantity"])}
                    </td>
                    <td className="px-3 py-2">
                      {String(product["updatedDate"])}
                    </td>
                </tr>
                )
            })}

        </tbody>
    </table>
</div>

    )
}