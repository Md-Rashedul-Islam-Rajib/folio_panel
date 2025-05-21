'use server'
export const createBlog = async (formData: FormData) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER!}/blogs`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data;
};
