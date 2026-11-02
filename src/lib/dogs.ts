import dogs from "@/content/cdf-dogs.json";

export type Dog = {
  id: string;
  name: string;
  sex: string;
  born: string | null;
  photos: string[];
  sire: string | null;
  dam: string | null;
  pedigree: string;
  retired?: boolean;
  memorial?: boolean;
};

const sortKey = (dog: Dog) => dog.born ? dog.born.split("/").reverse().join("") : "0";

export function getDogs(sex: "male" | "female", status: "current" | "retired" | "memorial" = "current"): Dog[] {
  return dogs
    .filter((dog: Dog) => dog.sex === sex && (
      status === "memorial" ? Boolean(dog.memorial) :
      status === "retired" ? Boolean(dog.retired) && !dog.memorial :
      !dog.retired && !dog.memorial
    ))
    .sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
}