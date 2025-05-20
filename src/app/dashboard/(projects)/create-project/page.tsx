import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react'
import CreateProjectModule from './_components/Module';

const CreateProjectPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
      <CreateProjectModule />
    </Suspense>
  );
}

export default CreateProjectPage
