import React from 'react'
import { getAllProjects } from '../_actions'
import ProjectTable from './ProjectTable';

const AllProjectsModule = async () => {
  const projects = await getAllProjects();
  return (
    <div>
      <ProjectTable data={projects?.data} />
    </div>
  )
}

export default AllProjectsModule
