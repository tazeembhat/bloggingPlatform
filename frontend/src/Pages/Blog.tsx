import { Topbar } from "../components/Topbar";
import { Post } from "../components/Post";
export function Blog(){   

    return <div className="flex flex-col gap-y-16">
        <div>
            <Topbar />
        </div>
        <div>
            <Post />
        </div>
    </div> 
    
}