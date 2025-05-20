import { DataTable } from "./data-table";



const ProjectTable = ({ data }: { data: any }) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">All Projects</h1>
      <div className="overflow-x-auto">
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default ProjectTable;
