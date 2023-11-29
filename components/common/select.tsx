import React, { useEffect, useRef, useState } from "react";

export interface IOption {
  key: string;
  value: string;
}

interface IProps {
  title: string;
  options: {
    key: string;
    value: string;
  }[];
  selected: IOption[];
  theme?: "dark" | "light";
  handleOnSelected: (optionsSelected: IOption[]) => void;
}

export default function SelectC({
  title,
  selected,
  theme,
  handleOnSelected,
  options,
}: IProps) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChooseOptions = (option: IOption) => {
    let selectedClone = selected ? [...selected] : [];

    const conditionV = opctionSelected(selectedClone, option);

    if (conditionV) {
      selectedClone = selectedClone.filter(
        (selected) => selected.key !== option.key
      );
    } else {
      selectedClone.push(option);
    }

    handleOnSelected(selectedClone);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const opctionSelected = (options: IOption[], option: IOption) => {
    const isSelected = options.findIndex(
      (optionItem) => optionItem.key === option.key
    );
    return isSelected !== -1 ? true : false;
  };

  return (
    <div ref={dropdownRef} className="relative w-full my-[10px]">
      <div
        className={` rounded-[5px] h-[64px] border-2 p-5 ${
          theme === "dark"
            ? "hover:border-white text-white bg-[#151c2c] border-[#2e374a]"
            : "text-txt-primary border-c-grey"
        }`}
        onClick={() => !menuIsOpen && setMenuIsOpen(true)}
      >
        {selected.length} {title}
      </div>
      <div
        className={`absolute w-full shadow-lg h-[170px] top-[110%] left-0 transition-all origin-top-left duration-300 ${
          theme === "dark"
            ? "bg-[#151c2c] text-white border border-white"
            : "bg-white text-txt-primary"
        } ${menuIsOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      >
        {options?.map((option) => (
          <div
            key={option.value}
            className={`px-4 py-2 ${
              opctionSelected(selected, option) && "bg-slate-600"
            } cursor-pointer`}
            onClick={() => handleChooseOptions(option)}
          >
            <span className="line-clamp-1"> {option.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
