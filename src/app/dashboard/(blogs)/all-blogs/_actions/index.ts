"use server";

import { revalidateTag } from "next/cache";


export const getAllBlogs = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER!}/blogs`,
      {
        method: "GET",
        next: {
          tags: ["BLOGS"],
        },
      }
    );

    const data = await res.json();
    
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
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
  } catch (err) {if(err instanceof Error) {
    console.error(err.message);
  }
}
};

export const deleteBlog = async (id: string) => {
  try {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER!}/blogs/${id}`, {
      method: "DELETE",
    });
revalidateTag("BLOGS");
    const data = await res.json();
    return data.data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
