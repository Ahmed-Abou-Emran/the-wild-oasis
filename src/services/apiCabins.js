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
  // 1. add a cabin to supabase
  const imageName = `${Math.random()}-${newCabin.image.name}`
    .replaceAll(" ", "-")
    .replaceAll("/", "-");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.log(error);
    throw new Error("Error adding cabin: " + error.message);
  }

  // 2. upload the image to the storage
  const { error: uploadError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  // 3. delete the cabin if there was an error uploading the image

  if (uploadError) {
    if (data) {
      await supabase.from("cabins").delete().eq("id", data.id);
    }
    console.error(uploadError);
    throw new Error(
      "Cabin image could not be uploaded, and the cabin was not created"
    );
  }

  return data;
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
