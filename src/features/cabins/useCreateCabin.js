import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useCreateCabin() {
    const queryClient = useQueryClient();

    const {mutate: createCabin, isLoading: isCreating} = useMutation({
        mutationFn: createEditCabin, onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
        }, onError: error => toast.error(error.message)
    });

    return {createCabin, isCreating};
}
