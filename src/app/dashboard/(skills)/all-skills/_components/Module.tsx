import React from 'react'
import { getAllSkills } from '../_actions';
import SkillTable from './SkillTable';


const AllSkillsModule = async () => {
  const skills = await getAllSkills();
  return (
    <div>
      <SkillTable data={skills?.data} />
    </div>
  )
}

export default AllSkillsModule
