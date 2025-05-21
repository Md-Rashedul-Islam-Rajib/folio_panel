"use server";

import { revalidateTag } from "next/cache";


export const getAllSkills = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER!}/skills`,
      {
        method: "GET",
        next: {
          tags: ["SKILLS"],
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

export const updateSkill = async (
  id: string,
  payload: FormData
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER!}/skills/${id}`,
      {
        method: "PUT",
        
        body: payload,
      }
    );

    revalidateTag("SKILLS");
    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

export const deleteSkill = async (id: string) => {
  try {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER!}/skills/${id}`, {
      method: "DELETE",
    });
revalidateTag("SKILLS");
    const data = await res.json();
    return data.data;
  } catch (err){
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
