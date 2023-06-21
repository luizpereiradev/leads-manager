import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import moment from "moment";
import { Fragment, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
import { ILeadId } from "../temporary/types";

const handleArquive = async (id: number) => {
  return await fetch(`/api/leads/${id}`, {
    method: "DELETE",
  });
};

const LeadDetails = ({ lead }: { lead: ILeadId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => handleArquive(lead.id), {
    onSuccess: () => {
      queryClient.invalidateQueries("leads");
    }
  });

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <div className="w-full h-full absolute" />
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className={clsx(
                "fixed z-50",
                "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
                "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                "bg-white dark:bg-gray-800",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              )}
            >
              <DialogPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Detalhes da Lead
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                Aqui você vai ter acesso a todos os detalhes da lead.
              </DialogPrimitive.Description>
              <div className="mt-2 space-y-2">
                <div>
                  <p>nome: {lead.name}</p>
                  <p>email: {lead.email}</p>
                  <p>telefone: {lead.phone}</p>
                  <p>status: {lead.status}</p>
                  <p>
                    createdAt: {moment(lead.createdAt).format("DD/MM/YYYY")}
                  </p>
                  <p>
                    updatedAt: {moment(lead.updatedAt).format("DD/MM/YYYY")}
                  </p>
                  <p>messagem: {lead.description}</p>
                </div>
                <button onClick={() => mutate()}>arquivar</button>
              </div>
              <DialogPrimitive.Close
                className={clsx(
                  "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                  "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                )}
              >
                <IoCloseOutline />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export { LeadDetails };
