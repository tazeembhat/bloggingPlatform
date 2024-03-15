import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { useState } from "react";
import { UpdateBlogInput } from "@tazeembhat/blog-common";
import axios from "axios";
import { useBlog } from "../hooks";
import { UpdateSkeleton } from "../components/BlogSkeleton";

export function UpdateBlog(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const {loading, blog} = useBlog({id: id as string});
    const title = blog?.title as string;
    const content = blog?.content as string
    
    const [inputs, setInputs] = useState<UpdateBlogInput>({
        id: id as string,
        title,
        content
    })

    const navigate = useNavigate();
    const author = localStorage.getItem('name');

    async function publishHandler() {
        if(inputs.title === "" || inputs.content === ""){
            navigate('/update');
            return;
        }
        
        const response = await axios.put(`${process.env.BACKEND_URL}/api/v1/blog/update`, inputs, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .catch((error)=>{
            const msg = error.response.data.message;
            navigate(`/messagefailure/?msg=${msg}`);
            return;
        })

        if(response){
            navigate('/messagesuccess/?msg=Published')
        }
        else{
            const msg = "Not Published due to error";
            navigate(`/messagefailure/?msg=${msg}`);
        }
    }

    if(loading || !blog){
        return <div>
            <UpdateSkeleton />
        </div>
    }

    return <div className="flex flex-col">
        <div className="flex justify-between my-6 mx-8 p-4">
            <Link to={"/blogs"}>
                <div className="text-2xl font-serif font-semibold">
                    PixelPost
                </div>
            </Link>
            <div className="flex gap-3">
                <div>
                    <button type="button" onClick={publishHandler} className="text-white bg-green-600 hover:bg-green-700 focus:outline-none font-medium rounded-full text-sm px-5 py-2 text-center">
                        Publish
                    </button>
                </div>
                <div>
                    <Avatar authorName={author!} />
                </div>                
            </div>
        </div>
        {/* Editor */}
        <div className="flex flex-col gap-y-3 px-16 py-4">
            <div>
                <input defaultValue={title} type="text" onChange={(e)=>{
                    setInputs(inps => ({
                        ...inps,
                        title: e.target.value
                    }))
                }} className="w-9/12 focus:outline-none focus:ring focus:border-slate-200 rounded-lg p-2 bg-slate-100 text-2xl font-serif "/>
            </div>
            <div>
                <textarea defaultValue={content} onChange={(e)=>{
                    setInputs(inps => ({
                        ...inps,
                        content: e.target.value
                    }))
                }} rows={10}
                className="w-9/12 block bg-slate-100 text-md focus:outline-none focus:ring focus:border-slate-200 rounded-lg p-4 font-serif whitespace-pre" />
            </div>
        </div>
        <div className="flex gap-x-4 items-center">
            <div className="pl-16 py-2">
                <div className="text-lg px-3 py-0.5 hover:bg-gray-900 font-medium text-white bg-gray-800 rounded-md">
                    <Link to={"/myblogs"}>
                        Cancel
                    </Link>
                </div>
            </div>
            <div className="py-2">
                <Delete postId={id!} />
            </div>
        </div>
    </div>
}

function Delete({ postId }: {postId: string}){
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    async function deleteHandler() {
        const response: any = await axios.delete(`${process.env.BACKEND_URL}/api/v1/blog/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
                postId
            }
        }).catch((error)=>{
            const msg = error.response.data.message;
            navigate(`/messagefailure/?msg=${msg}`);
            return;
        })
        
        const msg = response.data.message;
        navigate(`/messagesuccess/?msg=${msg}`);
    }

    return <div>
        <button onClick={deleteHandler} className="text-lg px-3 py-0.5 hover:bg-red-800 font-medium text-white bg-red-700 rounded-md">
            Delete Post
        </button>
    </div> 
}