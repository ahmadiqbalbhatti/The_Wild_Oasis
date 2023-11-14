/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import supabase from "./supabase.js";

export async function getCabins() {

  const {data, error} = await supabase
    .from('cabins')
    .select('*')

  if (error) {
    console.error(error);
    throw new Error("Cabins could not loaded!")
  }

  return data;
}

export async function deleteCabin(id) {

  const {data,  error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not loaded!")
  }

  return data;
}
