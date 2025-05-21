import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react'
import AllSkillsModule from './_components/Module';


const AllSkillsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
  <AllSkillsModule />
    </Suspense>
  );
}

export default AllSkillsPage
