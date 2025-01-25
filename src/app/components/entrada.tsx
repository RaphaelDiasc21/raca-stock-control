"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Entrada() {
    var [isNewProduct,setIsNewProduct] = useState(false)
    var [productName,setProductName] = useState("")
    var [quantity,setQuantity] = useState(0)
    var [initialQUantity,setInitialQUantity] = useState(0)
    var [addInput,setAddInput] = useState('')
    var [minusInput,setMinusInput] = useState('')
    var [newProduct,setNewProduct] = useState<{product:string,quantity:number}>({product: '', quantity: 0})
    var [products,setProducts] = useState<{product:String,quantity:Number}[]>([])
    var [operation,setOperation] = useState("ENTRADA")
  useEffect(() => {
    fetch(`${process.env.HOST_URL}/api/get-products`, {
      headers: new Headers({'Authorization': String(localStorage.getItem("token"))})
    })
    .then(data => {
        data.json().then(resp => {
            console.log(resp)
            setProducts([...resp["products"]])
            setQuantity(Number(resp["products"][0]["quantity"]))
            setProductName(String(resp["products"][0]["product"]))
        })
    })
  },[])

  function reloadToStock() {
    window.location.href = "/estoque"
  }

  function isNew() {
        if(!isNewProduct) {
          setProductName("")
          setQuantity(0)
          setIsNewProduct(true)
        } else {
          setIsNewProduct(false)
          products? setProductName(String(products[0]["product"])) : setProductName("")
          if(products) {
            setQuantity(Number(products[0]["quantity"]))
            setInitialQUantity(Number(products[0]["quantity"]))
          } else {
            setQuantity(0)
            setInitialQUantity(0)
          }
          //
        }
    }

    function handleSelectProduct(productName: String) {
      products?.forEach((product: {product:String,quantity:Number}) => {
         if(product["product"] == productName) {
          setProductName(String(product["product"]))
          setQuantity(Number(product["quantity"]))
          setInitialQUantity(Number(product["quantity"]))
         }
        }) 
    }

    function addProduct(addQuantity: string,operation: string) {
      let product = products.filter(product => product["product"] == productName)
      let quantity;
      if(operation == "-") {
        quantity = Number(product[0].quantity) - Number(addQuantity)
        setMinusInput(addQuantity)
        setOperation("SAÍDA")
      } else {
        quantity = Number(product[0].quantity) + Number(addQuantity)
        setAddInput(addQuantity)
        setOperation("ENTRADA")
      }
      setQuantity(quantity)
      //\yer
    }

    function update() {
      let product = products.filter(product => product["product"] == productName)
      fetch(`${process.env.HOST_URL}/api/update-product`,{
        headers: new Headers({'Authorization': String(localStorage.getItem("token"))}),
        method: "POST",
        body: JSON.stringify({
          product: productName,
          quantity: quantity,
          operation: operation
         })
      }).then(resp => resp.json().then(data => console.log(data)))
      setAddInput('')
      setMinusInput('')
      //
    }


    function insert() {
      fetch(`${process.env.HOST_URL}/api/insert-product`,{
        headers: new Headers({'Authorization': String(localStorage.getItem("token"))}),
        method: "POST",
        body: JSON.stringify(newProduct)
      }).then(resp => resp.json().then(data => console.log(data)))
      setNewProduct({product: '',quantity: 0})
    }

    function handleProduct(productName: string) {
      setNewProduct({...newProduct,product: productName})
    }

    function handleProductQuantity(quantity: string) {
      setNewProduct({...newProduct,quantity: Number(quantity)})
    }
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">Entrada de Produtos</h3>
            <div className="mt-2 px-7 py-3">
                        <label>Produto novo ?</label>
                        <input type="checkbox"  onChange={() => isNew()}/>

                        {isNewProduct ? (
                        <form className="max-w-sm mx-auto" >
                        <div className="mb-5">
                          <label  className="block mb-2 text-sm font-medium">Novo Produto</label>
                          <input type="text" autoComplete="off" value={newProduct['product']} onChange={(e) => handleProduct(e.target.value)} className="bg-green-50 border text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"/>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium">Quantidade</label>
                          <input type="text" autoComplete="off" id="username-error" value={newProduct['quantity']} onChange={(e) => handleProductQuantity(e.target.value)} className="bg-green-50 border text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"/>
                         {  /*  <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p> */}
                        </div>
                        <button type="button" onClick={insert} className="w-full mt-3 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                    Criar produto
                  </button>
                      </form>
                        ) : 
                        <form className="max-w-sm mx-auto">
                        <div className="mb-5">
                          <label  className="block mb-2 text-sm font-medium">Produto</label>
                          <select id="courses" onChange={(e) => handleSelectProduct(e.target.value)} className="bg-green-50 border text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500">
                              {products?.map(product => <option value={products? String(product["product"]) : ""}>{product["product"]}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium">Entrada</label>
                          <input type="text" id="username-error" autoComplete="off" value={addInput} onChange={(e) => addProduct(e.target.value, "+")} className="bg-green-50 border text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"/>
                         {  /*  <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p> */}
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium">Saída</label>
                          <input type="text" id="username-error" autoComplete="off" value={minusInput} onChange={(e) => addProduct(e.target.value, "-")} className="bg-green-50 border text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"/>
                         {  /*  <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p> */}
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium">Quantidade total: {quantity}</label>
                         {/* <input type="text" id="username-error" disabled={true} value={quantity} className="bg-green-50 border text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"/> */}
                         {  /*  <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p> */}
                        </div>
                        <button type="button" onClick={update} className="w-full mt-3 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                    Atualizar
                  </button>
                      </form>
                        }
            </div>
            <div className="flex justify-center mt-4">
  
              {/* Navigates back to the base URL - closing the modal */}
              <div
                onClick={() => reloadToStock()}
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Fechar
              </div>
  
            </div>
          </div>
        </div>
      </div>
    );
  }