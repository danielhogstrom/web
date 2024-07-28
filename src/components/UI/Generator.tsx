import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@core/utils/cn.js";
import { Input } from "@components/UI/Input.js";
import { Button } from "@components/UI/Button.js";
import {  
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@components/UI/Select.js";
import { useState } from "react";

const generatorVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2",
  {
    variants: {
      variant: {
        default:
          "",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        success:
          "bg-green-500 text-white hover:bg-green-600 dark:hover:bg-green-600",
        outline:
          "bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface GeneratorProps
  extends React.BaseHTMLAttributes<HTMLElement>,
    VariantProps<typeof generatorVariants> 
    {
      passwordValue?: string;
      textValue?: string;
    }

const Generator = React.forwardRef<HTMLButtonElement, GeneratorProps>(
  ({ passwordValue, textValue, className, variant, size, ...props }, ref) => {
    const [pass, setPass] = useState<string>("");
    const [bitCount, setBits] = useState<string>("bit256");

    const generate = () => {
      let generated = "thisisapass";
      if (bitCount == "bit8") {
        generated = "8bitpassword"
      }
      if (bitCount == "bit128") {
        generated = "128bitpassword"
      }
      if (bitCount == "bit256") {
        generated = "256bitpassword"
      }
      return generated;
    };

    return (
      <>
      <Input
          type="text"
          id="pskInput"
          value={pass}
      />
      <Select value={bitCount} onValueChange={(value) => {
        setBits(value)
      }}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
            <SelectItem key="bit256" value="bit256">256 bit</SelectItem>
            <SelectItem key="bit128" value="bit128">128 bit</SelectItem>
            <SelectItem key="bit8" value="bit8">8 bit</SelectItem>
        </SelectContent>
      </Select>
      <Button
        type="button"
        variant="success"
        ref={ref}
        {...props}
        onClick={() => {
          setPass(generate());
        }}
      >
        {textValue}
      </Button>
      </>
    );
  },
);
Generator.displayName = "Button";

export { Generator, generatorVariants };
