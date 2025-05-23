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
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TGImageUploader from "@/components/ui/TGImageUploader";
import ImagePreviewer from "@/components/ui/TGImageUploader/ImagePreviewer";
import { skillSchema } from "./validation";
import { createSkill } from "../_actions";

const CreateSkillForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(skillSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleSkillSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (imageFiles?.length < 0) {
      toast.error("Please select at least 1 image!");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    for (const file of imageFiles) {
      formData.append("images", file);
    }
// for (const [key, value] of formData.entries()) {
//   console.log(`${key}:`, value);
// }

    try {
      const res = await createSkill(formData);
      if (res?.success) {
        toast.success("Skill created successfully");
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
      <h1 className="text-3xl text-center mb-6">Create Skill</h1>
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
                disabled={isSubmitting || imageFiles?.length < 1}
              >
                {isSubmitting ? "Creating..." : "Create Skill"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateSkillForm;
