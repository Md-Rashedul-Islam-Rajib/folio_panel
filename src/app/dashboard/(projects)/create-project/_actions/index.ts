'use server'
export const createProject = async (formData: FormData) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER!}/projects`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data;
};
