import { LoaderCircle } from 'lucide-react'
import React, { Suspense } from 'react'
import { getSingleBlogs } from './_actions';
import EditBlogForm from './_components/EditBlogForm';

const EditBlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data:blog } = await getSingleBlogs(id);

  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
      <EditBlogForm blog={blog} />
    </Suspense>
  );
};

export default EditBlogPage
