"use client";

import React, { useEffect, useState } from "react";
import {
  getAllObjectives,
  updateObjectiveActive,
  Objective,
} from "@/lib/indexedDB";

const ObjectiveList: React.FC = () => {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [visible, setVisible] = useState(false);

  const fetchObjectives = async () => {
    const data = await getAllObjectives();
    // Ordenar: activos primero
    const sorted = data.sort((a, b) => Number(b.active) - Number(a.active));
    setObjectives(sorted);
  };

  const handleMarkAsDone = async (key?: string) => {
    if (!key) return;
    await updateObjectiveActive(key, false);
    await fetchObjectives();
  };

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    fetchObjectives();

    const openEveryMinute = setInterval(() => {
      setVisible(true);

      const autoClose = setTimeout(() => {
        setVisible(false);
      }, 20000);

      return () => clearTimeout(autoClose);
    }, 60000);

    return () => clearInterval(openEveryMinute);
  }, []);

  return (
    <div className="max-w-xl">
      <button
        onClick={toggleVisibility}
        className=" text-white bg-red-800 px-4 py-2 mb-4 hover:scale-105 transition"
      >
        Ver Objetivos
      </button>

      {visible && (
        <div className="w-[380px] scroll-invisible text-center flex flex-col items-center h-screen bg-neutral-800 overflow-y-scroll space-y-4 transition-all duration-500 p-4 shadow-2xs">
          <h2 className="text-lg font-semibold text-red-600">
            Objetivos registrados
          </h2>

          {objectives.length === 0 && (
            <p className="text-gray-500 text-sm">No hay objetivos aún.</p>
          )}

          {objectives.map((obj, index) => (
            <div
              key={index}
              className="pb-3 mb-3 flex justify-between items-center"
            >
              <div>
                <h3
                  className={`font-medium text-base max-w-60 min-w-60 p-5 border-2 flex items-center gap-3 ${
                    obj.active
                      ? "text-red-600 decoration-4"
                      : "line-through text-gray-400 border-gray-400"
                  }`}
                >
                  <span className="text-5xl">!</span>
                  <div>{obj.title}</div>
                </h3>

                {obj.description && (
                  <p className="text-sm border-b h-40 text-gray-500 mt-1 px-2">
                    {obj.description}
                  </p>
                )}
              </div>

              {obj.active && (
                

                <button
                  onClick={() => handleMarkAsDone(obj.key)}
                  className="text-xs border rounded-full h-60 p-1 hover:bg-red-800 text-red-600 hover:underline ml-4"
                >
                  Marcar como hecho
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ObjectiveList;
