import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { CreateBlog, UpdateBlog } from "@tazeembhat/blog-common";

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
      userId: string
    }
}>

blogRouter.use('*', async (c, next)=>{
    const payload = await c.req.header('Authorization') || "";
    
    if(!payload){
      c.status(401);
      return c.json({
        error: "unauthorized user"
      })
    }
  
    const token = payload.split(' ')[1];

    try{
      const verified = await verify(token, c.env.JWT_SECRET);
      if(verified){
        c.set('userId', verified.id);
      }
      else{
        c.status(404);
        return c.json({
          error: "User not found"
        })
      } 
    }
    catch(err){
      c.status(401);
      return c.json({
        error: err
      })
    }
  
    await next();
  });

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const userId = c.get('userId');
  console.log(userId)
  const payload = await c.req.json();
  const {success} = CreateBlog.safeParse(payload);

  if(!success){
    c.status(411);
    return c.json({
      message: "Invalid Input"
    })
  }

  const post = await prisma.post.create({
    data: {
      title: payload.title,
      content: payload.content,
      authorId: userId
    }
  })

  return c.json({
    id: post.id
  })
})

blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const userId = c.get('userId');
  const payload = await c.req.json();

  const {success} = UpdateBlog.safeParse(payload);

  if(!success){
    c.status(411);
    return c.json({
      message: "Input format invalid"
    })
  }
  
  try{
    await prisma.post.update({
      where: {
        id: payload.id,
      },
      data: {
        title: payload.title,
        content: payload.content
      }
    })
    return c.json({
      message: "Post Updated"
    })
  }
  catch(err){
    c.status(401)
    return c.json({
      message: "There was an error while updating the post"
    })
  }
  
});

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL 
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany();
  console.log(posts )
  return c.json(posts);
})

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const postId = c.req.param('id');
  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  })

  return c.json(post)
})


export default blogRouter