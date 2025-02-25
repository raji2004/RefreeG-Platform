import { z } from 'zod';

export const signUpSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    countryOfResidence: z.string().min(2, "Country of residence is required"),
    DOB: z.date(),
    phoneNumber: z.string().min(11, "Phone number must be 11 digits").max(11, "Phone number must be 11 digits"),
    bvn: z.number().refine(value => !isNaN(value), { message: "BVN must be a valid number" }),
    nin: z.number().refine(value => !isNaN(value), { message: "NIN must be a valid number" }),
    pin:z.number().refine(value => !isNaN(value), { message: "NIN must be a valid number" }),
    donationPreference:z.string(),
});

export const compnanySchema = z.object({
    organizatonName: z.string().min(2, "Organization name is required"),
    organizationType: z.string().min(2, "Organization type is required"),
    organizationLocation: z.string().min(2, "Organization location is required"),
    taxIdentificationNumber: z.string().min(2,"invalid tax identification number"),
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email format"),
    phoneNo: z.number().min(11, "Phone number must be 11 digits").max(11, "Phone number must be 11 digits"),
    positon: z.string().min(2, "Position is required"),
})
export const loginSchema = signUpSchema.pick({
    email: true,
    password: true,
});
