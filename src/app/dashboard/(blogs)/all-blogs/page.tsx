import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react'
import AllBlogsModule from './_components/Module';


const AllBlogsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
  <AllBlogsModule />
    </Suspense>
  );
}

export default AllBlogsPage
