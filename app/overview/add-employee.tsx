"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { useRouter } from "next/navigation";

const availability = [
  {
    id: "mo",
    label: "Mo",
  },
  {
    id: "di",
    label: "Di",
  },
  {
    id: "mi",
    label: "Mi",
  },
  {
    id: "do",
    label: "Do",
  },
  {
    id: "fr",
    label: "Fr",
  },
  {
    id: "sa",
    label: "Sa",
  },
  {
    id: "so",
    label: "So",
  },
];
const formSchema = z.object({
  name: z.string().min(2).max(10),
  surname: z.string().min(2).max(10),
  age: z.string().min(1),
  availability: z
    .array(z.string())
    .refine((value) => value.some((item) => item)),
  ladenAufgemacht: z.string().min(1),
  ladenGeschlossen: z.string().min(1),
  transitAufgemacht: z.string().min(1),
  transitGeschlossen: z.string().min(1),
  pitstopAufgemacht: z.string().min(1),
  pitstopGeschlossen: z.string().min(1),
});

export function ProfileForm({ setDialogOpen }: any) {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      availability: ["sa", "so"],
      age: "",
      ladenAufgemacht: "",
      ladenGeschlossen: "",
      transitAufgemacht: "",
      transitGeschlossen: "",
      pitstopAufgemacht: "",
      pitstopGeschlossen: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
    const availabilityMap = {
      Montag: values.availability.includes("mo") ? "green" : "red",
      Dienstag: values.availability.includes("di") ? "green" : "red",
      Mittwoch: values.availability.includes("mi") ? "green" : "red",
      Donnerstag: values.availability.includes("do") ? "green" : "red",
      Freitag: values.availability.includes("fr") ? "green" : "red",
      Samstag: values.availability.includes("sa") ? "green" : "red",
      Sonntag: values.availability.includes("so") ? "green" : "red",
    };

    const dataToSend = {
      name: values.name,
      surname: values.surname,
      age: parseInt(values.age),
      availability: availabilityMap,
      ladenAufgemacht: parseInt(values.ladenAufgemacht),
      ladenAufmachen: parseInt(values.ladenAufgemacht) > 2 ? true : false,
      ladenGeschlossen: parseInt(values.ladenGeschlossen),
      ladenSchliessen: parseInt(values.ladenGeschlossen) > 5 ? true : false,
      transitAufgemacht: parseInt(values.transitAufgemacht),
      transitAufmachen: parseInt(values.transitAufgemacht) > 1 ? true : false,
      transitGeschlossen: parseInt(values.transitGeschlossen),
      transitSchliessen: parseInt(values.transitGeschlossen) > 2 ? true : false,
      pitstopAufgemacht: parseInt(values.pitstopAufgemacht),
      pitstopAufmachen: parseInt(values.pitstopAufgemacht) > 2 ? true : false,
      pitstopGeschlossen: parseInt(values.pitstopGeschlossen),
      pitstopSchliessen: parseInt(values.pitstopGeschlossen) > 5 ? true : false,
    };

    try {
      await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      setDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nachname</FormLabel>
                  <FormControl>
                    <Input placeholder="Nachname" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alter</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      placeholder="Alter"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <FormLabel className="text-base">Wünschzeiten</FormLabel>
          <div className="flex gap-10">
            {availability.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="availability"
                render={({ field }) => {
                  return (
                    <FormItem key={item.id} className="grid">
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
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="ladenAufgemacht"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Laden aufgemacht</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Laden aufgemacht"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="ladenGeschlossen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Laden zugemacht</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Laden zugemacht"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="transitAufgemacht"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transit aufgemacht</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Transit aufgemacht"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="transitGeschlossen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transit zugemacht</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Transit zugemacht"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="pitstopAufgemacht"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pit Stop aufgemacht</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Pit Stop aufgemacht"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="pitstopGeschlossen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pit Stop zugemacht</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Pit Stop zugemacht"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

const AddEmployee = ({ data }: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => console.log("data : ", data)}>
          Mitarbeiter hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mitarbeiter Infos</DialogTitle>
          <DialogDescription>Bitte alle Felder ausfüllen</DialogDescription>
        </DialogHeader>

        <ProfileForm setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployee;
