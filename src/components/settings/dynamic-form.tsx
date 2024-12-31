import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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
  const [dynamicForm, setDynamicForm] = useState(form);
  useEffect(() => {
    setDynamicForm(form);
  }, [form]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(dynamicForm);
      }}
      className="flex flex-col gap-4"
    >
      {Object.entries(dynamicForm).map(([key, value]) => {
        return (
          <div key={key} className="flex flex-col gap-2">
            {value.type === "string" && (
              <>
                <span className="text-sm text-gray-500">{value.label}</span>
                <Input
                  type={value.type}
                  name={key}
                  value={value.value}
                  onChange={(e) => {
                    setDynamicForm({
                      ...dynamicForm,
                      [key]: {
                        ...value,
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </>
            )}
            {value.type === "select" && (
              <>
                <span className="text-sm text-gray-500">{value.label}</span>
                <Select
                  value={value.value}
                  onValueChange={(value) => {
                    setDynamicForm({
                      ...dynamicForm,
                      [key]: {
                        ...dynamicForm[key],
                        value: value,
                      },
                    });
                  }}
                >
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
      <Button type="submit">保存</Button>
    </form>
  );
}
