import { LoaderCircle } from 'lucide-react'
import React, { Suspense } from 'react'

import { getSingleProjects } from './_actions';
import EditProjectForm from './_components/EditProjectForm';

const EditProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data:project } = await getSingleProjects(id);

  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
      <EditProjectForm project={project} />
    </Suspense>
  );
};

export default EditProjectPage
