import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { useState } from "react";
import { CreateBlogInput } from "@tazeembhat/blog-common";
import axios from "axios";
const env = import.meta.env;

export function Publish(){
    const [inputs, setInputs] = useState<CreateBlogInput>({
        title: "",
        content: ""
    })
    const navigate = useNavigate();
    const author = localStorage.getItem('name');

    async function publishHandler() {
        if(inputs.title === "" || inputs.content === ""){
            navigate('/publish');
            return;
        }
        
        const response = await axios.post(`${env.VITE_BACKEND_URL}/api/v1/blog/publish`, inputs, {
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
                <input type="text" onChange={(e)=>{
                    setInputs(inps => ({
                        ...inps,
                        title: e.target.value
                    }))
                }} placeholder="| Title" className="w-9/12 focus:outline-none focus:ring focus:border-slate-200 rounded-lg p-2 bg-slate-100 text-2xl font-serif "/>
            </div>
            <div>
                <textarea onChange={(e)=>{
                    setInputs(inps => ({
                        ...inps,
                        content: e.target.value
                    }))
                }} rows={10} placeholder="Express your thoughts, opinions and ideas ..."
                className="w-9/12 block bg-slate-100 text-md focus:outline-none focus:ring focus:border-slate-200 rounded-lg p-4 font-serif whitespace-pre" />
            </div>
        </div>
        <div className="px-16 py-2">
            <Link to={"/blogs"} className="text-lg px-3 py-1 hover:bg-gray-900 font-medium text-white bg-gray-800 rounded-md">
                Cancel
            </Link>
        </div>
    </div>
}