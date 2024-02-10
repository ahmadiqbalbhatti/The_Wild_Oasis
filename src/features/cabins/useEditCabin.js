import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();


  const {mutate: editCabin, isLoading: isEditing} = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
    onSuccess : () => {
      toast.success("A cabin successfully Updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
    },

    onError: error => toast.error(error.message)
  });

  return {editCabin, isEditing};

}

export default useEditCabin;
