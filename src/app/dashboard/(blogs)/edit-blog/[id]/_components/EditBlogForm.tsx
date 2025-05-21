"use client";
import Code from "@tiptap/extension-code";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import Strike from "@tiptap/extension-strike";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TGImageUploader from "@/components/ui/TGImageUploader";
import ImagePreviewer from "@/components/ui/TGImageUploader/ImagePreviewer";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { blogSchema } from "./validation";
import { updateBlog } from "../_actions";
import { TBlog } from "../types";
import MenuBar from "./menubar";



const EditBlogForm = ({
  blog
}: {
  
  blog: TBlog;
}) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const router = useRouter();

   useEffect(() => {
      if (blog.coverImage?.length) {
        setImagePreview(blog.coverImage);
      }
    }, [blog.coverImage]);
    

  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title:blog.title ?? "",
      content: blog.content ?? "",
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Underline,
      Link,
      Image,
      Code,
      Blockquote,
      Strike,
      HorizontalRule,
      Placeholder.configure({
        placeholder: "Write your blog content here...",
      }),
    ],
    content: form.getValues("content"),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      form.setValue("content", html);
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleBlogSubmit: SubmitHandler<FieldValues> = async (data) => {
    // if (blog?.coverImage?.length! < 1 || imageFiles?.length < 1) {
    //   toast.error("Please select at least 1 image!");
    //   return;
    // }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    for (const file of imageFiles) {
      formData.append("images", file);
    }

    try {

      const res = await updateBlog(blog.id,formData);
      if (res?.success) {
        toast.success("Blog updated successfully");
        router.push(`/dashboard/all-blogs`);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to create blog");
    }
  };

  

  return (
    <div className="p-4 md:p-0">
      <h1 className="text-3xl text-center mb-6">Edit Blog</h1>
      <div className="flex justify-center mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleBlogSubmit)}
            className="space-y-4 w-full md:w-2/3 text-center"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Title:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter blog title"
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content:</FormLabel>
                  <FormControl>
                    <div className="border rounded-md">
                      <MenuBar editor={editor} />
                      <EditorContent
                        editor={editor}
                        className="min-h-[400px] p-4 prose dark:prose-invert max-w-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <p className="text-primary font-bold text-xl text-center border-t border-b py-3 my-5">
                Featured Images
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

            <div className="flex justify-center gap-4 mt-4 mb-20">
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Editing..." : "Edit Blog"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditBlogForm;
