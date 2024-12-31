import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BaseType = {
  label: string;
  placeholder?: string;
  value?: string;
};
type InputType = BaseType & {
  type: "string";
};

type SelectType = BaseType & {
  type: "select";
  options: {
    name: string;
    value: string;
  }[];
};

type DynamicFormType = {
  form: Record<string, InputType | SelectType>;
  onSubmit: (values: any) => void;
};

export default function DynamicForm({ form, onSubmit }: DynamicFormType) {
  console.log(form);
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {Object.entries(form).map(([key, value]) => {
        return (
          <div key={key} className="flex flex-col gap-2">
            {value.type === "string" && (
              <>
                <span className="text-sm text-gray-500">{value.label}</span>
                <Input
                  type={value.type}
                  name={key}
                  defaultValue={value.value}
                />
              </>
            )}
            {value.type === "select" && (
              <>
                <span className="text-sm text-gray-500">{value.label}</span>
                <Select defaultValue={value.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={value.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {value.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        );
      })}
    </form>
  );
}
