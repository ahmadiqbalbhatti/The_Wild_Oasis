import {useQuery} from "@tanstack/react-query";
import {getSettings} from "../../services/apiSettings.js";

export function useSettings() {
  const {isLoading, error, data: settings} = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings
  });

  return {isLoading, error, settings};
}
