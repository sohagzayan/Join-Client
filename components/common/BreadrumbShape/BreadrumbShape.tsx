import Image from 'next/image';

const BreadrumbShape = () => {
  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-[9999] w-full">
      <Image
        src="/breadcrumb-shape-1.png"
        alt="Breadcrumb Shape"
        layout="responsive"
        width={1920} // Adjust width based on your image's aspect ratio
        height={1080} // Adjust height accordingly
      />
    </div>
  );
};

export default BreadrumbShape;
