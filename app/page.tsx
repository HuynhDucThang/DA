import { FilterApartment } from "@/components/common";
import { ListApartment } from "@/components/pages/Home";

interface IProps {
  searchParams: {
    skip: string;
    limit: string;
  };
}

export default function Home({}: IProps) {
  return (
    <div className="px-pd-main pt-8">
      <FilterApartment />
      {/* layout carrd */}

      <ListApartment />
      {/* <Suspense fallback={<ProjectSekeleton />}>
       @ts-ignore
        <Projects promise={ProjectsData} page={searchParams.skip} />
      </Suspense> */}
    </div>
  );
}
