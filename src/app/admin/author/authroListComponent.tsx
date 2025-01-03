import { DataTable } from "@/components/ui/data-table";
import { Author } from "../../../../types/product";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

interface AuthorListComponentProps {
  authors: Author[];
}

const AuthorListComponent: React.FC<AuthorListComponentProps> = ({
  authors,
}) => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">List of Authors</h1>
        <Link href="/admin/author/new">
          <Button className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Author
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={authors} />
    </div>
  );
};

export default AuthorListComponent;
