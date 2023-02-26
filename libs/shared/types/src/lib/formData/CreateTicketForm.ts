import * as Yup from "yup";

export const createTicketFormSchema = Yup.object().shape({
	task: Yup.string().required("Task is required"),
	firstName: Yup.string().required("First name is required"),
	lastName: Yup.string().required("Last name is required"),
});
