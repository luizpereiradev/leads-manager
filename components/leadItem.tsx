import moment from "moment";
import { IleadId } from "@/types";
import { LeadDetails } from "./leadDetails";

function LeadItem({ lead }: { lead: IleadId }) {
  return (
    <tr className="relative">
      <LeadDetails lead={lead} />
      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 className="font-medium text-gray-800 dark:text-white ">
            {lead.nome}
          </h2>
        </div>
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <p className="text-gray-800 dark:text-white">{lead.mail}</p>
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <p className="text-gray-800 dark:text-white">{lead.telefone}</p>
      </td>

      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
        {moment(lead.createdAt).format("DD/MM/YYYY")}
      </td>

      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
        <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
          {lead.status}
        </div>
      </td>
    </tr>
  );
}

export default LeadItem;
