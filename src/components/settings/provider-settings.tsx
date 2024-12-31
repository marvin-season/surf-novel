import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { llmApi } from "@/lib/api";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import DynamicForm from "./dynamic-form";

export default function ProviderSettings({
  providers,
  currentProvider: _currentProvider,
  onSave,
}: {
  providers: any[];
  currentProvider: any;
  onSave: (settings: Record<string, any>) => void;
}) {
  const [currentProvider, setCurrentProvider] = useState<any>(_currentProvider);

  return (
    <>
      <Select
        value={currentProvider.id}
        onValueChange={(id) => {
          setCurrentProvider(providers.find((provider) => provider.id === id));
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={"选择模型提供商"} />
        </SelectTrigger>
        <SelectContent>
          {providers.map((provider) => (
            <SelectItem key={provider.id} value={provider.id}>
              {provider.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DynamicForm
        form={currentProvider.dynamic_params}
        onSubmit={console.log}
      />
    </>
  );
}
