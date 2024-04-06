import { z } from "zod";


const signupDetails = z.object({

    username: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(5)
})

const signinDetails = z.object({
    username: z.string(),
    password: z.string().min(5)
})

const validateFirstName = z.string();
const validateLastName = z.string();
const validateEmail = z.string().email();
const password = z.string().min(5);

export {
    signupDetails,
    signinDetails,
    validateFirstName,
    validateLastName,
    validateEmail,
    password,
}