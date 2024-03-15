import { useBlog } from "../hooks"
import { useSearchParams } from "react-router-dom";
import { PostSkeleton } from "./BlogSkeleton";

export function Post(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const {loading, blog} = useBlog({id: id as string});

    if(loading || !blog){
       return <div>
            <PostSkeleton />
        </div>
    }

   const name = blog?.author.name || "";
   const authorName = name.charAt(0).toUpperCase() + name.slice(1);
   const publishDate = new Date(blog.postDate.split('T')[0]);
   const day = publishDate.getDay();
   const month = publishDate.toLocaleString('default', { month: 'short' })
   const year = publishDate.getFullYear();

    return <div className="flex w-full mt-6 p-4">
        <div className="flex flex-col gap-y-3 w-9/12 mx-10">
            <div className="text-4xl font-bold">   
                {blog?.title}
            </div>
            <div className="text-slate-400 text-sm">
                {`Posted on ${month} ${day}, ${year}`}
            </div>
            <div className="text-xl font-serif mt-3 text-wrap">
                {blog?.content}
            </div>
        </div>
        <div className=" flex flex-col w-3/12 p-2 ml-2 gap-y-3">
            <div className="text-sm">
                Author
            </div>
            <div className="flex flex-col items-center gap-x-2 sm:flex-row">
                <div>
                    <Avatar authorName={authorName || ""} />
                </div>
                <div className="text-md font-bold">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </div>
            </div>
        </div>
    </div>
}

function Avatar({authorName}: {authorName: string}){
    return <div className="inline-flex items-center justify-center w-7 h-7 bg-gray-800 rounded-full">
        <span className="text-md text-white">{authorName[0]}</span>
    </div>
}