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
import { Loader2 } from "lucide-react";

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

export type DynamicParamsType = Record<string, InputType | SelectType>;

type DynamicFormInterface = {
  form: DynamicParamsType;
  onSubmit: (values: DynamicParamsType) => Promise<void>;
};

export default function DynamicForm({ form, onSubmit }: DynamicFormInterface) {
  const [dynamicForm, setDynamicForm] = useState(form);
  useEffect(() => {
    setDynamicForm(form);
  }, [form]);
  const [loading, setLoading] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(dynamicForm);
        setLoading(false);
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
      <Button type="submit">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>保存中...</span>
          </>
        ) : (
          "保存"
        )}
      </Button>
    </form>
  );
}
