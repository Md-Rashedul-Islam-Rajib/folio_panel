"use server";

import { revalidateTag } from "next/cache";


export const getAllProjects = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER!}/projects`,
      {
        method: "GET",
        next: {
          tags: ["PROJECTS"],
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

export const updateProject = async (
  id: string,
  payload: FormData
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER!}/projects/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    revalidateTag("PROJECTS");
    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

export const deleteProject = async (id: string) => {
  try {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER!}/projects/${id}`, {
      method: "DELETE",
    });
revalidateTag("PROJECTS");
    const data = await res.json();
    return data.data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
