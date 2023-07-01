import { toast } from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  // .order("id", { ascending: true });

  if (error) {
    console.log(error);
    // toast.error("Error getting cabins: " + error.message);
    throw "Error getting cabins from database: " + error.message;
  }

  return data;
};

export const addCabin = async (newCabin) => {
  const imageName = `${crypto.randomUUID()}-${newCabin.name}.jpg`;
  const filePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  try {
    const { error: uploadError } = await supabase.storage
      .from("cabins")
      .upload(filePath, newCabin.image);

    if (uploadError) {
      throw new Error("Error uploading image: " + uploadError.message);
    }

    newCabin.image = filePath;

    const { data, error } = await supabase.from("cabins").insert([newCabin]);

    if (error) {
      throw new Error("Error adding cabin: " + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error adding cabin to database: " + error.message);
  }
};

export const updateCabin = async (newCabin) => {
  const { data, error } = await supabase.from("cabins").upsert(newCabin);
  if (error) {
    toast.error("Error updating cabin: " + error.message);
    throw "Error updating cabin in database: " + error.message;
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().match({ id });

  if (error) {
    toast.error("Error deleting cabin: " + error.message);
    throw "Error deleting cabin from database: " + error.message;
  }

  return data;
};
