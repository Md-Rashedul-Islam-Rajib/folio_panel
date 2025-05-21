"use server";
export const createSkill = async (formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER!}/skills`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data;
};
