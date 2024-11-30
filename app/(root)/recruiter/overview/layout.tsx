export default function RootLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <main>{children}</main>
    </div>
  );
}
