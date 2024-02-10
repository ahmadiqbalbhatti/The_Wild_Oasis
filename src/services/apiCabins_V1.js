/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

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
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName    = `${Date.now()}-${newCabin.image?.name}`.replaceAll("/", "");
  const imagePath    = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // console.log(imageName);
  // https://amkrkgrexshfpmnanhhv.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg

  let query = await supabase.from("cabins");

  // 1. Cabins data insertion
  if (!id) {
    query = await query
      .insert([
        {...newCabin, image: imagePath}
      ]);
  }

  // Edit Cabin
  if (id) {
    query = await query
      .update({...newCabin, image: imagePath})
      .eq("id", id);
  }

  const {data, error} = await query
    .select()
    .single();


  if (error) {
    console.error(error);
    throw new Error("Cabins could not created!");
  }


  // 2. uploading image
  const {error: storageError} = await supabase.storage
                                              .from("cabin-images")
                                              .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data?.id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded and the cabin was not created");
  }

  return data;
}


/*
 export async function createCabin(newCabin) {
 const imageName = `${Date.now()}-${newCabin.image.name}`.replaceAll("/", "");
 const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
 // console.log(imageName);
 // https://amkrkgrexshfpmnanhhv.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg


 // 1. Cabins data insertion
 const {data, error} = await supabase
 .from("cabins")
 .insert([
 {...newCabin, image: imagePath}
 ]);

 if (error) {
 console.error(error);
 throw new Error("Cabins could not created!");
 }


 // 2. uploading image
 const {error: storageError} = await supabase.storage
 .from("cabin-images")
 .upload(imageName, newCabin.image);

 // 3. Delete the cabin IF there was an error uplaoding image
 if (storageError) {
 await supabase.from("cabins").delete().eq("id", data?.id);
 console.error(storageError);
 throw new Error(
 "Cabin image could not be uploaded and the cabin was not created"
 );
 }

 return data;
 }
 */

export async function deleteCabinAPI(id) {

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
