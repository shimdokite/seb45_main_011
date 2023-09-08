'use client';

import { useQuery } from '@tanstack/react-query';

import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import LeafForm from '@/components/common/LeafForm';

import { getLeaf } from '@/api/leaf';

import { LeafDataInfo } from '@/types/data';

interface EditLeafProps {
  params: { userId: string; leafId: string };
}

export default function EditLeaf({ params }: EditLeafProps) {
  const leafId = Number(params.leafId);
  const userId = Number(params.userId);

  const {
    data: leaf,
    isLoading,
    isError,
  } = useQuery<LeafDataInfo>({
    queryKey: ['leaf', leafId],
    queryFn: () => getLeaf(leafId),
  });

  if (isLoading || leaf === null) return <div>loading</div>;
  if (isError) return <div>error</div>;

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[600px] border-gradient">
        <Screws />
        <div className="p-5 h-full">
          <div className="w-full h-full flex flex-col items-center overflow-y-scroll scrollbar">
            <PageTitle text="식물 카드 수정" className="mb-5" />
            <LeafForm leaf={leaf} leafId={leafId} userId={userId} mode="edit" />
          </div>
        </div>
      </div>
    </div>
  );
}
