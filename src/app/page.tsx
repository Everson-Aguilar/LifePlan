import Registers from "@/components/registers";
import MonthlyTracker from "@/components/health";
import SummaryDashboard from "@/components/SummaryDashboard";


export default function Home() {
  return (
    <div className=" p-5 text-center  ">
      <div className=" flex justify-center items-center ">
        <h1 className="text-5xl font-medium border-b-2 w-1/2">LifePlan</h1>
      </div>

      <section className="flex items-center justify-center text-9xl  gap-5">
  <div>$1000</div>
  <div><MonthlyTracker /></div>
  <div className=" bg-neutral-800 rounded-4xl shadow-2xl h-96"><SummaryDashboard/></div>

</section>


      <div>
      
        <Registers />
      </div>

     
    </div>
  );
}



/*

git add .
git commit -m "Descripción de los cambios"
git push



*/