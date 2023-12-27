/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/*eslint-disable no-use-before-define */


import supabase, {supabaseUrl} from "./supabase.js";

export async function getCabins() {

    const {data, error} = await supabase
        .from("cabins")
        .select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not loaded!");
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

    const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', "")
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    let query = supabase.from("cabins")
    // 1. Create cabin

    // Creating a Cabin
    if (!id) {
        query = query.insert([{...newCabin, image: imagePath}])
    }

    // Editing Cabin
    if (id) {
        query = query.update({...newCabin, image: imagePath})
            .eq("id", id)
    }

    const {data, error} = await query.select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Cabins could not created!");
    }

    // 2. Upload image
    if (hasImagePath) return data;
    const {error: storageError} = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin, if there was an error while uploading image.
    if (storageError) {
        const {data, error} = await supabase
            .from("cabins")
            .delete()
            .eq("id", data?.id);

        console.error(storageError);
        throw new Error("Cabins could not uploaded and the cabin was not created!");
    }

    return data;
}

export async function deleteCabin(id) {

    const {data, error} = await supabase
        .from("cabins")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabins could not loaded!");
    }

    return data;
}
