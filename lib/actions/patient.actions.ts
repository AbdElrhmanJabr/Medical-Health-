import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
import { databases , users , storage , } from "../appwrite.cofig";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return newUser;
  } catch (error: any) {
    console.log(error);

    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile("676d311a003e256c0e43", ID.unique(), inputFile);
    }    
    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      "676d2fab0023b8369bf8",
      "676d2feb0032a7969458",
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${"https://cloud.appwrite.io/v1/users"}/storage/buckets/${"676d311a003e256c0e43"}/files/${file.$id}/view??project=${"676d2ea700123e1208be"}`
          : null,
        ...patient,
      }
    );    
    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (userId: string) => {
    
    try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};
export const getPatient = async (userId: string) => {
    try {
    const patients = await databases.listDocuments("676d2fab0023b8369bf8" , "676d2feb0032a7969458" , [Query.equal('userId' , userId)] );
    return parseStringify(patients);
  } catch (error) {
    console.log(error);
  }
};
