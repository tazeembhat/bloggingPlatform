import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { userSignin, userSignup } from '@tazeembhat/blog-common';

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET: string
	}
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const payload = await c.req.json();
  const {success} = userSignup.safeParse(payload);

  if(!success){
    c.status(411);
    return c.json({
      message: "Invalid input format"
    })
  }

  try{
      const user = await prisma.user.create({
        data: {
          email: payload.email,
          name: payload.name,
          password: payload.password
        },
        select: {
          id: true
        }
      });

    const token = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({token})
  }
  catch(err){
    console.log(err);
    c.status(403);
    return c.json({message: "Error while signing up"});
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const payload = await c.req.json();

  const {success} = userSignin.safeParse(payload);

  if(!success){
    c.status(411);
    return c.json({
      message: "Invalid input format"
    })
  }

  const user = await prisma.user.findFirst({
    where: {
      AND: [{email: payload.email}, {password: payload.password}]
    },
    select: {
      id: true,
      name: true
    }
  });
  
  if(!user){
    c.status(404);
    return c.json({message: "User does not exist"});
  }

  const token = await sign({id: user.id}, c.env.JWT_SECRET);
  return c.json({token, name: user.name});
})

export default userRouter
