"use client";

import { Button } from "./../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "./../../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./../../components/ui/form";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./../../components/ui/dropdown-menu";
import router from "next/router";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, ReactNode } from "react";
import { useFilterStore } from "../../store/store";

const items = [
  {
    id: "ladenAufmachen",
    label: "Laden Aufmachen",
  },
  {
    id: "ladenSchliessen",
    label: "Laden Schliessen",
  },
  {
    id: "transitAufmachen",
    label: "Transit Aufmachen",
  },
  {
    id: "transitSchliessen",
    label: "Transit Schliessen",
  },
  {
    id: "pitstopAufmachen",
    label: "Pitstop Aufmachen",
  },
  {
    id: "pitstopSchliessen",
    label: "Pitstop Schliessen",
  },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function DropdownFilter() {
  //   const filters = useFilterStore((state) => state.filters);
  //   const setFilters = useFilterStore((state) => state.setFilters);
  const setData = useFilterStore((state) => state.setData);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("onSubmit data:", data);
    const params = new URLSearchParams();
    data.items.forEach((item) => params.append("items", item));
    console.log("params: ", params);

    try {
      const response = await fetch(`/api/filter?${params.toString()}`, {
        method: "GET",
      });
      const result = await response.json();
      console.log("Filtered Data:", result);
      setData(result.employees);
      router.refresh();
    } catch (error) {
      console.error("ERROR FETCHING DATA : ", error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">Filter</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Fähigkeiten</FormLabel>
                  </div>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
