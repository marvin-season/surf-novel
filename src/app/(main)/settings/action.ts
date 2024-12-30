import { userConfigApi } from "@/lib/api";

export const getUserConfig = async () => {
  return await userConfigApi.get<any>();
};
