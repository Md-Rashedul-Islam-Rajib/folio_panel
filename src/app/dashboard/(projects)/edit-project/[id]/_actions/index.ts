"use server";

import { revalidateTag } from "next/cache";


export const getSingleProjects = async (id:string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER!}/projects/${id}`,
      {
        method: "GET",
        next: {
          tags: ["PROJECTS"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
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
        
        body: payload,
      }
    );

    revalidateTag("PROJECTS");
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
