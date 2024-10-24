import BottomNav from '@/components/shared/Nav/BottomNav';
export default function RootLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-clip">
      {children}
      <BottomNav />
    </div>
  );
}
