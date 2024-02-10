import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteCabinAPI} from "../../services/apiCabins.js";

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const {isLoading: isDeleting, mutate: deleteCabin} = useMutation({
    mutationFn: (id) => deleteCabinAPI(id),
    onSuccess : () => {
      toast.success("Cabin successfully deleted.");
      // invalidating the cabins data, so it can refresh the UI
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
    },
    onError   : error => toast.error(error.message)
  });

  return {isDeleting, deleteCabin};
}

export default useDeleteCabin;
