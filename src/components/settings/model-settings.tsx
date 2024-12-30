import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ModelSettings() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{"模型设置"}</h3>
          <p className="text-sm text-muted-foreground">
            {"选择模型提供商，配置模型"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* 模型提供商 */}
          <Select value={modelProviderId} onValueChange={setModelProviderId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={"选择模型提供商"} />
            </SelectTrigger>
            <SelectContent>
              {modelProviderList.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  {provider.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* 模型选择 */}
          <Select value={modelId} onValueChange={setModelId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={"选择模型"} />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
