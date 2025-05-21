"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TGImageUploader from "@/components/ui/TGImageUploader";
import ImagePreviewer from "@/components/ui/TGImageUploader/ImagePreviewer";
import { TSkill } from "../types";
import { z } from "zod";
import { updateSkill } from "../_actions";

const EditSkillForm = ({
  skill
}: {
  
  skill: TSkill;
}) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

    const router = useRouter();
    
    const skillSchema = z.object({
        name: z.string().min(3, "Skill name is required"),
        category: z.string().min(3, "Category is required"),
    })

    useEffect(() => {
        if (skill.icon?.length) {
          setImagePreview(skill.icon);
        }
      }, [skill.icon]);

  const form = useForm({
      resolver: zodResolver(skillSchema),
      defaultValues: {
          name: skill.name ?? "",
          category: skill.category ?? ""
      }
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleSkillSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log({ data });
      if (imageFiles?.length < 0) {
      toast.error("Please select at least 1 image!");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    for (const file of imageFiles) {
      formData.append("images", file);
    }
for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}

    try {
      const res = await updateSkill(skill.id,formData);
console.log({res})
        if (res?.success) {
        toast.success("Skill updated successfully");
        router.push(`/dashboard/all-skills`);
      } else {
        toast.error(res?.message);
      }
    } catch (err){
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  return (
    <div className="p-4 md:p-0">
      <h1 className="text-3xl text-center mb-6">Edit Skill</h1>
      <div className="flex justify-center h-screen mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSkillSubmit)}
            className="space-y-4 w-full md:w-2/3 text-center"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter skill name"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Category"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            

            

            <div>
              <p className="text-primary font-bold text-xl text-center border-t border-b py-3 my-5">
                Icon
              </p>

              <div className="flex gap-4">
                <TGImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Icon"
                  className="w-fit mt-0"
                />
                <ImagePreviewer
                  className="flex flex-wrap gap-4"
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              </div>
            </div>

            

            <div className="flex justify-center gap-4 mt-4 mb-20">
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Editing..." : "Edit Skill"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditSkillForm;
