import React from "react";

function InputBox({
  placeholder = "Enter the value",
  className = "",
  Label ,
  type = "text",
  labelClass = "",
  onChange,
}) {
  return (
   <>
   <div className=" flex flex-col items-center">
   {Label && <label htmlFor={Label} className={`${labelClass}  w-full`}>
          {Label}
        </label>}
        <input
          type={type}
          id={Label}
          className="font-poppins focus:outline-none mx-14 p-1 px-2 w-full rounded-lg border border-gray-300 font-thin text-black placeholder-slate-600/60"
          placeholder={placeholder}
          onChange={onChange}
        />
   </div>
    
   </>
      
  );
}

export default InputBox;
