"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import type { Crop } from "./page";
import { useEffect } from "react";

const cropFormSchema = z.object({
  name: z.string().min(2, { message: "Crop name must be at least 2 characters." }),
  acres: z.coerce.number().positive({ message: "Acres must be a positive number." }),
  status: z.enum(["Growing", "Harvested", "Planting"]),
  plantingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format."}),
});

type CropFormValues = z.infer<typeof cropFormSchema>;

interface CropFormProps {
  onSave: (data: CropFormValues) => void;
  onCancel: () => void;
  crop?: Crop;
}

export default function CropForm({ onSave, onCancel, crop }: CropFormProps) {
  const form = useForm<CropFormValues>({
    resolver: zodResolver(cropFormSchema),
    defaultValues: crop || {
      name: "",
      acres: 0,
      status: "Planting",
      plantingDate: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    form.reset(crop || {
      name: "",
      acres: 0,
      status: "Planting",
      plantingDate: new Date().toISOString().split('T')[0],
    });
  }, [crop, form]);

  const onSubmit = (data: CropFormValues) => {
    onSave(data);
  };
  
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{crop ? "Edit Crop" : "Add New Crop"}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Crop Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Wheat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Acres</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 150" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Planting">Planting</SelectItem>
                    <SelectItem value="Growing">Growing</SelectItem>
                    <SelectItem value="Harvested">Harvested</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="plantingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Planting Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
