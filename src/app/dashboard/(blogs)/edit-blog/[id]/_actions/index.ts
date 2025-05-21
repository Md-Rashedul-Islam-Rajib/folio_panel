"use server";

import { revalidateTag } from "next/cache";


export const getSingleBlogs = async (id:string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER!}/blogs/${id}`,
      {
        method: "GET",
        next: {
          tags: ["BLOGS"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateBlog = async (
  id: string,
  payload: FormData
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER!}/blogs/${id}`,
      {
        method: "PUT",
        
        body: payload,
      }
    );

    revalidateTag("BLOGS");
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
