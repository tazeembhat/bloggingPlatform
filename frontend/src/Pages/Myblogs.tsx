import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Topbar } from "../components/Topbar";
import { useMyBlogs } from "../hooks";

export function MyBlogs(){   
    const {loading, myblogs} = useMyBlogs();
    
    if(loading || !myblogs){
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

    return <div className="flex flex-col gap-y-16">
        <div>
            <Topbar />
        </div>
        <div className="flex flex-col justify-center items-center">
            {myblogs.map(b => 
                <BlogCard key={b.id} title={b.title} content={b.content} authorName={b.author.name} link={`/blog/?id=${b.id}`}
                editLink={`/update/?id=${b.id}`} edit={"y"} publishDate={b.postDate} />
            )}
        </div>
    </div> 
}