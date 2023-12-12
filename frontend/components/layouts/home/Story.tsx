import Image from "next/image";

const Story = () => {
  return (
    <div className="container p-2 shadow">
      <div className="hover:bg-hover flex cursor-pointer items-center space-x-2 rounded-lg p-1">
        <div className="bg-secondary-100 rounded-full p-2">
          <Image src={"/svgs/plus.svg"} alt="plus" width={24} height={24} />
        </div>
        <div>
          <div className="font-semibold">Create Story</div>
          <div className="text-m text-secondary-content">
            Share a photo or write something.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Story;
