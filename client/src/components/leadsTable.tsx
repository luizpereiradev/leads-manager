"use client";
import { useQuery } from "react-query";
import { ILeadId } from "../temporary/types";
import LeadItem from "./leadItem";

const getLeads = async () => {
  const res = await fetch("/api/leads");
  const leads = await res.json();

  return leads;
};

function LeadsTable() {
  const { data, isError, isLoading } = useQuery("leads", getLeads);
  if (isError) return <div>Erro ao carregar leads</div>;
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th scope="col" className="relative py-3.5 px-4"></th>
          <th
            scope="col"
            className="py-3.5 px-4 text-sm font-normal text-left  text-gray-500 dark:text-gray-400"
          >
            Nome
          </th>

          <th
            scope="col"
            className="px-12 py-3.5 text-sm font-normal text-left  text-gray-500 dark:text-gray-400"
          >
            E-mail
          </th>

          <th
            scope="col"
            className="px-4 py-3.5 text-sm font-normal text-left  text-gray-500 dark:text-gray-400"
          >
            Telefone
          </th>

          <th
            scope="col"
            className="px-12 py-3.5 text-sm font-normal text-left  text-gray-500 dark:text-gray-400"
          >
            Recebido
          </th>

          <th
            scope="col"
            className="px-12 py-3.5 text-sm font-normal text-left  text-gray-500 dark:text-gray-400"
          >
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
        {isLoading && <td>Carregando...</td>}
        {(data as ILeadId[])
          ?.map((i) => (i.status === "Arquivado" ? null : i))
          .map((item) => item && (
            <LeadItem key={item.id} lead={item} />
          ))}
      </tbody>
    </table>
  );
}

export default LeadsTable;
