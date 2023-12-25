import React from "react";

const Collection = (props) => {
  const { collection } = props;
  return (
    <div className="w-[200px] h-[100px] bg-black rounded-md cursor-pointer column-drag-handle select-none">
      {collection.title}
    </div>
  );
};

export default Collection;
