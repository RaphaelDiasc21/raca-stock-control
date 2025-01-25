import Link from "next/link";
import Modal from "../components/entrada"

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Atendimentos({searchParams}: SearchParamProps) {
  const show = searchParams?.show;
  return (<div className="flex flex-col items-center pt-5">
      <div className="w-10/12 flex flex-col  items-center bg-white p-2">
        <div className="w-full flex justify-between text-sm">
          <span>Cliente: Raphael Dias</span>
          <span>Serviço: Manutenção</span>
        </div>
        <div className="w-full flex justify-between text-sm">
          <span>Data: 04/12/2024</span>
        </div>
      </div>
      <div className="w-10/12 flex flex-col  items-center mt-5 bg-white p-2">
      <div className="w-full flex flex-col  items-start text-base">
          <span>Adicionais</span>
          <div className="w-full flex flex-col">
             <div className="w-full flex justify-between">
                <span>Energetico Monster</span>
                <span>R$ 10,00</span>
             </div>
             <div className="w-full flex justify-between">
                <span>Energetico Monster</span>
                <span>R$ 10,00</span>
             </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Link href="/atendimentos?show=true">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Adicionar
          </button>
        </Link>
      {show && <Modal />}
      </div>
  </div>)
}