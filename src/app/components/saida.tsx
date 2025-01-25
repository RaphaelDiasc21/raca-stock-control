import Link from "next/link";

export default function Saida() {

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">Modal Title</h3>
            <div className="mt-2 px-7 py-3">
              
                        <form className="max-w-sm mx-auto">
                          <div className="mb-5">
                            <label  className="block mb-2 text-sm font-medium">Produto</label>
                            <select id="courses" className="bg-green-50 border text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500">
                                <option value="Java">Energético monster</option>
                                <option value="C++">Cervedjinha</option>
                                <option value="Python">Água</option>  
                            </select>
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium">Quantidade</label>
                            <input type="text" id="username-error" className="bg-green-50 border text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"/>
                           {  /*  <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p> */}
                          </div>
                        </form>

            </div>
            <div className="flex justify-center mt-4">
  
              {/* Navigates back to the base URL - closing the modal */}
              <Link
                href="/estoque"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Fechar
              </Link>
  
            </div>
          </div>
        </div>
      </div>
    );
  }