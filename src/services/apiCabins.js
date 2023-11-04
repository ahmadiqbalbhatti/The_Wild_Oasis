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
