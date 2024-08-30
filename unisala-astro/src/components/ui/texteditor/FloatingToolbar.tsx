import React, { useState } from "react";
import { Plus, Image, SquarePlay, SquareTerminal } from "lucide-react";

const FloatingToolbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="plus-button  z-30 absolute left-0 top-1/2 -translate-x-full -translate-y-1/2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="  bg-transparent border border-gray-200 rounded-full p-1 hover:bg-gray-100 transition-colors"
      >
        <Plus size={25} strokeWidth={1} />
      </button>
      {isOpen ? <Options /> : null}
    </div>
  );
};

export default FloatingToolbar;

const Options = () => {
  return (
    <section className="flex  bg-white bg-opacity-80 top-0 translate-y-0 left-11 absolute gap-3 z-50 items-center justify-start w-fit">
      <Option title="Add Image" Icon={Image}>
        <input type="file" className="absolute inset-0 opacity-0" />
      </Option>
      <Option title="Add Video" Icon={SquarePlay} />
      <Option title="Add Code" Icon={SquareTerminal} />
    </section>
  );
};

const Option = ({ Icon, title, children }: any) => {
  return (
    <button
      title={title}
      className="rounded-full relative size-8 grid place-content-center border border-neutral-600"
    >
      <Icon size={20} />
      {children}
    </button>
  );
};
