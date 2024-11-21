import z from 'zod';

const email = z.string().email({message:'Invalid format email'});
const fullName = z.string().min(4,{message:'The name is so short'});
const password = z.string().min(6,{message:'The password must have min 6 characters'});
const profilePic = z.string().optional();
const lastConnection = z.date().nullable().default(null);

export const authSchema = z.object({
  email,
  fullName,
  password,
  profilePic,
  lastConnection
});

export const authLoginSchema = z.object({
  email,
  password
})

export const updateProfileSchema = z.object({
  email:z.string().email({message:'Invalid format email'}).optional(),
  fullName:z.string().min(4,{message:'The name is so short'}).optional(),
  profilePic
})

export type AuthSignUp = z.infer<typeof authSchema>;
export type AuthSignIn = Pick<AuthSignUp,'email' | 'password'>;
export type UPDProfile = z.infer<typeof updateProfileSchema>;