import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import InventorySection from "./InventorySection";


export default function Registers() {





  return <>


    <section>

        <section className="flex justify-center items-center  gap-5">


            <section className="w-96 border h-72 rounded-2xl "><IncomeForm/></section>
             <section className="w-1/3 border h-72 rounded-2xl "><ExpenseForm/></section>
             <section className="w-2/3 border h-72 rounded-2xl overflow-hidden "><InventorySection/></section>




        </section>



    </section>



  </>;




}
