import { ID, Query } from "node-appwrite";
import { databases } from "../appwrite.cofig";
import { parseStringify } from "../utils";
import { Appointment } from "./appwrite.types";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      "676d2fab0023b8369bf8",
      "676d3086000102b6d8f4",
      ID.unique(),
      appointment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      "676d2fab0023b8369bf8",
      "676d3086000102b6d8f4",
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentsList = async () => {
    try {
        const appointments = await databases.listDocuments(
            "676d2fab0023b8369bf8",
            "676d3086000102b6d8f4",
            [Query.orderDesc("$createdAt")]
          );
        console.log(appointments);
        
          const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
          };
          const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
            if (appointment.status === "scheduled") {
              acc.scheduledCount += 1;
            } else if (appointment.status === "pending") {
              acc.pendingCount += 1;
            } else if (appointment.status === "cancelled") {
              acc.cancelledCount += 1;
            }
            return acc;
          }, initialCounts);

          const data = {
            totalCount : appointments.total,
            ...counts,
            documents : appointments.documents
          }
          return parseStringify(data);
    } catch (error) {
        console.log(error);
    }
   
};

export const updateAppointment = async ({appointmentId , userId , appointment , type} : UpdateAppointmentParams) =>{
  try {
    const updatedAppointment = await databases.updateDocument(
      "676d2fab0023b8369bf8",
      "676d3086000102b6d8f4",
      appointmentId,
      appointment
    )
    console.log(updatedAppointment);
    
    if (!updatedAppointment) {
      throw new Error ("Appointment not found");
    }
    return parseStringify(updatedAppointment)
  } catch (error) {
    console.log(error);
    
  }
}
