import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Topbar } from "../components/Topbar";
import { useBlogs } from "../hooks";

export function Blogs(){   
    const {loading, blogs} = useBlogs();

    if(loading || !blogs){
        return <div className="flex flex-col gap-y-16">
            <div>
                <Topbar />
            </div>
            <div className="flex flex-col justify-center items-center">
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div> 
    }

    return <div className="flex flex-col gap-y-10">
        <div>
            <Topbar />
        </div>
        <div className="flex flex-col justify-center items-center">
            {blogs.map(b => 
                <BlogCard key={b.id} title={b.title} content={b.content} authorName={b.author.name} link={`/blog/?id=${b.id}`} editLink={""} edit={""} publishDate={b.postDate} />
            )}
        </div>
    </div> 
}