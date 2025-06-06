"use client";
import React from 'react'
import { TProject } from '../../../all-projects/_types';

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
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TGImageUploader from "@/components/ui/TGImageUploader";
import ImagePreviewer from "@/components/ui/TGImageUploader/ImagePreviewer";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/extension/multi-select";
import { technologies } from '../../../create-project/_data';
import { updateProject } from '../_actions';
import { z } from 'zod';


const EditProjectForm = ({
  project
}: {
  
  project: TProject;
}) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  
    const router = useRouter();
  
  const projectSchema = z.object({
    title: z.string().min(3, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    liveUrl: z.string().url("Invalid URL"),
    frontendGithubRepoLink: z.string().url("Invalid URL"),
    backendGithubRepoLink: z.string().url("Invalid URL"),
    techStack: z
    .array(z.string().min(1))
    .min(1, "Select at least one technology"),
  });
  // type TProject = z.infer<typeof projectSchema>;
  React.useEffect(() => {
    if (project.imageUrl?.length) {
      setImagePreview(project.imageUrl);
    }
  }, [project.imageUrl]);
  

    const form = useForm({
      resolver: zodResolver(projectSchema),
      defaultValues: {
        title: project.title,
        description: project.description,
        liveUrl: project.liveUrl,
        frontendGithubRepoLink: project.frontendGithubRepoLink,
        backendGithubRepoLink: project.backendGithubRepoLink,
        techStack: project.techStack ?? [],
      },
    });
  
       const technologyOptions = technologies?.map((tech) => ({
         value: tech,
         label: tech,
       })) as { value: string; label: string }[];
    const {
      formState: { isSubmitting },
    } = form;
  
  const handleProjectSubmit: SubmitHandler<FieldValues> = async (data) => {
      
      // if (imageFiles?.length < 0) {
      //   toast.error("Please select at least 1 image!");
      //   return;
      // }
  
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      for (const file of imageFiles) {
        formData.append("images", file);
      }
  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }
  
      try {
        const res = await updateProject(project.id, formData);
        console.log(res)
        if (res?.success) {
          toast.success("Project updated successfully");
          router.push(`/dashboard/all-projects`);
        } else {
          toast.error(res?.message);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    };
  
    return (
      <div className="p-4 md:p-0">
        <h1 className="text-3xl text-center mb-6">Edit Project</h1>
        <div className="flex justify-center h-screen mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleProjectSubmit)}
              className="space-y-4 w-full md:w-2/3 text-center"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter project title"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description:</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Project description"
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
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project LiveUrl:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter project liveUrl"
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
                name="frontendGithubRepoLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Repo Link:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Client Repository Link"
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
                name="backendGithubRepoLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server Repo Link:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Server Repository Link"
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
                  Images
                </p>

                <div className="flex gap-4">
                  <TGImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Images"
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

              <FormField
                control={form.control}
                name="techStack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TechStacks:</FormLabel>
                    <FormControl>
                      <MultiSelector
                        values={field.value ?? []}
                        onValuesChange={field.onChange}
                        loop={false}
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="Select techStacks" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {technologyOptions?.map((option, i) => (
                              <MultiSelectorItem key={i} value={option.value}>
                                {option.label}
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center gap-4 mt-4 mb-20">
                <Button
                  type="submit"
                >
                  {isSubmitting ? "Updating..." : "Update Project"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
};

export default EditProjectForm
