import dogs from "@/content/cdf-dogs.json";
import bobtails from "@/content/bobtail-dogs.json";

export type Dog = {
  id: string;
  name: string;
  sex: string;
  born: string | null;
  photos: string[];
  sire: string | null;
  dam: string | null;
  pedigree: string | null;
  /** Internal archive page (from the legacy site) with the dog's full story. */
  page?: string;
  retired?: boolean;
  memorial?: boolean;
  /** Past bobtail, shown on the Bobtail pages as a tribute. */
  homage?: boolean;
};

const sortKey = (dog: Dog) => dog.born ? dog.born.split("/").reverse().join("") : "0";

export function getDogs(sex: "male" | "female", status: "current" | "retired" | "memorial" = "current"): Dog[] {
  return (dogs as Dog[])
    .filter((dog) => dog.sex === sex && (
      status === "memorial" ? Boolean(dog.memorial) :
      status === "retired" ? Boolean(dog.retired) && !dog.memorial :
      !dog.retired && !dog.memorial
    ))
    .sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
}

export function getBobtails(sex: "male" | "female", status: "current" | "homage" = "current"): Dog[] {
  return (bobtails as Dog[])
    .filter((dog) => dog.sex === sex && (status === "homage" ? Boolean(dog.homage) : !dog.homage))
    .sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
}
