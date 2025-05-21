import { LoaderCircle } from 'lucide-react'
import React, { Suspense } from 'react'
import { getSingleSkill } from './_actions';
import EditSkillForm from './_components/EditSkillForm';


const EditSkillPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data:skill } = await getSingleSkill(id);

  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
      <EditSkillForm skill={skill} />
    </Suspense>
  );
};

export default EditSkillPage
