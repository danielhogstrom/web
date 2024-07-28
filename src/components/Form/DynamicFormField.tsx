import {
  GenericInput,
  type InputFieldProps,
} from "@components/Form/FormInput.js";
import {
  type SelectFieldProps,
  SelectInput,
} from "@components/Form/FormSelect.js";
import {
  type ToggleFieldProps,
  ToggleInput,
} from "@components/Form/FormToggle.js";
import {
  type PasswordGeneratorProps,
  PasswordGenerator,
} from "@components/Form/FormPasswordGenerator.js";
import type { Control, FieldValues } from "react-hook-form";

export type FieldProps<T> =
  | InputFieldProps<T>
  | SelectFieldProps<T>
  | ToggleFieldProps<T>
  | PasswordGeneratorProps<T>;

export interface DynamicFormFieldProps<T extends FieldValues> {
  field: FieldProps<T>;
  control: Control<T>;
  disabled?: boolean;
}

export function DynamicFormField<T extends FieldValues>({
  field,
  control,
  disabled,
}: DynamicFormFieldProps<T>) {
  switch (field.type) {
    case "text":
    case "password":
    case "number":
      return (
        <GenericInput field={field} control={control} disabled={disabled} />
      );

    case "toggle":
      return (
        <ToggleInput field={field} control={control} disabled={disabled} />
      );
    case "select":
      return (
        <SelectInput field={field} control={control} disabled={disabled} />
      );
    case "passwordGenerator":
      return (
        <PasswordGenerator field={field} control={control} disabled={disabled} />
      )
    case "multiSelect":
      return <div>tmp</div>;
  }
}
