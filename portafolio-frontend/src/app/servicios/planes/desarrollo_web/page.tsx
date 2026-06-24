import dynamic from 'next/dynamic';

const PlanDetalle = dynamic(() => import('@/components/PagPlan'));

export default async function Ser() {

  return (
    <>
      <PlanDetalle plan="desarrollo_web"/>
    </>
  );
}