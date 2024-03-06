import z from "zod";

export const userSignup = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string()
})

export const userSignin = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const CreateBlog = z.object({
    title: z.string(),
    content: z.string()
})

export const UpdateBlog = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export type SignupInput = z.infer<typeof userSignup>
export type SigninInput = z.infer<typeof userSignin>
export type CreateBlogInput = z.infer<typeof CreateBlog>
export type UpdateBlogInput = z.infer<typeof UpdateBlog>