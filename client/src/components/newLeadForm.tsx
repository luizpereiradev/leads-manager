import { Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import { initTranslation } from "../libs/translation";
import { leadSchema } from "../libs/validations";
import { ILead } from "../temporary/types";
import FormField from "./formField";

initTranslation();
z.setErrorMap(zodI18nMap);

const handleAdd = (newLead: ILead) => {
  return fetch("/api/leads", {
    method: "POST",
    body: JSON.stringify(newLead),
  });
};

const NewLeadForm = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILead>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(leadSchema),
  });

  const { mutate } = useMutation(() => handleAdd(watch()), {
    onSuccess: () => {
      queryClient.invalidateQueries("leads");
      reset();
    }
  });

  const onSubmit = (data: ILead) => {
    mutate()
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
                <FormField
                  label="Nome"
                  name="name"
                  placeholder="Tim"
                  register={register}
                  errors={errors}
                />

                <FormField
                  label="Telefone"
                  name="phone"
                  placeholder="11999999999"
                  register={register}
                  errors={errors}
                  mask="(99) 99999-9999"
                />

                <FormField
                  label="E-mail"
                  name="email"
                  placeholder="email@gmail.com"
                  register={register}
                  errors={errors}
                />

                <FormField
                  label="Descrição"
                  name="description"
                  placeholder="Descrição"
                  register={register}
                  errors={errors}
                />

                <div className="mt-4 flex justify-end">
                  <DialogPrimitive.Close
                    disabled={Object.keys(errors).length > 0}
                    className={clsx(
                      "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                      "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-600",
                      "border border-transparent",
                      "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
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
