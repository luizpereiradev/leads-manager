"use client";

import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import React, { Fragment } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { Ilead } from "@/types";

const HandleAdd = (newLead: Ilead) => {
  fetch("/api/leads", {
    method: "POST",
    body: JSON.stringify(newLead),
  });
};

const NewLeadForm = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ilead>();

  const onSubmit = (data: Ilead) => {
    HandleAdd({ ...data, status: "novo" });
    setIsOpen(false);
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <button>Adicionar Lead</button>
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
                Adicionar nova Lead
              </DialogPrimitive.Title>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-2 space-y-2"
              >
                <fieldset>
                  <label
                    htmlFor="nome"
                    className="text-xs font-medium text-gray-700 dark:text-gray-400"
                  >
                    Nome
                  </label>
                  <input
                    {...register("nome", { required: true })}
                    id="nome"
                    type="text"
                    placeholder="Tim"
                    className={clsx(
                      "mt-1 block w-full rounded-md py-2 px-3",
                      "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600",
                      "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
                      "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
                    )}
                  />
                  {errors.nome && <span>Este campo é obrigatório</span>}
                </fieldset>
                <fieldset>
                  <label
                    htmlFor="mail"
                    className="text-xs font-medium text-gray-700 dark:text-gray-400"
                  >
                    E-mail
                  </label>
                  <input
                    {...register("mail", { required: true })}
                    id="mail"
                    type="text"
                    placeholder="Tim@gmail.com"
                    className={clsx(
                      "mt-1 block w-full rounded-md py-2 px-3",
                      "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600",
                      "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
                      "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
                    )}
                  />
                  {errors.mail && <span>Este campo é obrigatório</span>}
                </fieldset>

                <fieldset>
                  <label
                    htmlFor="telefone"
                    className="text-xs font-medium text-gray-700 dark:text-gray-400"
                  >
                    Telefone
                  </label>
                  <input
                    {...register("telefone", { required: true })}
                    id="telefone"
                    placeholder="(99) 99999-9999"
                    className={clsx(
                      "mt-1 block w-full rounded-md py-2 px-3",
                      "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600",
                      "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
                      "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
                    )}
                  />
                  {errors.telefone && <span>Este campo é obrigatório</span>}
                </fieldset>

                <fieldset>
                  <label
                    htmlFor="descricao"
                    className="text-xs font-medium text-gray-700 dark:text-gray-400"
                  >
                    Mensagem
                  </label>
                  <textarea
                    {...register("descricao", { required: true })}
                    id="descricao"
                    placeholder="Olá, gostaria de saber mais sobre o produto X"
                    className={clsx(
                      "mt-1 block w-full rounded-md py-2 px-3",
                      "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600",
                      "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
                      "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
                    )}
                  />
                  {errors.descricao && <span>Este campo é obrigatório</span>}
                </fieldset>

                <div className="mt-4 flex justify-end">
                  <DialogPrimitive.Close
                    className={clsx(
                      "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                      "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-600",
                      "border border-transparent",
                      "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                    )}
                    type="submit"
                  >
                    Adicionar
                  </DialogPrimitive.Close>
                </div>
              </form>

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

export { NewLeadForm };
