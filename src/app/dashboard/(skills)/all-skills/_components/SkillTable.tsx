import { DataTable, Skill } from "./data-table";




const SkillTable = ({ data }: { data: Skill[] }) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">All Skills</h1>
      <div className="overflow-x-auto">
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default SkillTable;
