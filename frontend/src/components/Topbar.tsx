import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useState } from "react";

export function Topbar(){
    const authorName = localStorage.getItem('name');
    const [toggle, setToggle] = useState(false);

    return <div>
     <div className="flex p-4 items-center justify-between h-16 w-full shadow fixed overflow-hidden bg-white">
        <Link to={"/blogs"}>
            <div className="text-2xl font-bold font-serif ml-4">
                PixelPosts
            </div>
        </Link>
        <div className="flex justify-end mr-4">
            <div className="flex items-center gap-x-3">
                <div>
                    <Link to={'/publish'}>
                        <button type="button" className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-full text-md px-4 py-1 text-center inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 me-1 -ms-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Post
                        </button>
                    </Link>
                </div>       
                <div>
                    <button type="button" onClick={()=>{
                        setToggle(prev => !prev)
                    }}>
                        <Avatar authorName={authorName!} />
                    </button>
                </div>         
            </div>
        </div>
    </div>
    <div className="flex justify-end p-6 mr-4">
        { toggle && <DropDown /> }
    </div>
    </div>
}

function DropDown(){
    const navigate = useNavigate();

    return <div className="fixed overflow-hidden z-40 divide-y bg-gray-700 shadow text-slate-200 rounded-lg mt-7">
        <ul className="py-2 m-2 list-none">
            <li className="px-2.5 py-1 hover:bg-gray-600 rounded"> 
                <Link to={"/myblogs"} className="inline-flex items-center">
                    My Blogs
                </Link>
            </li>
            <li className="px-2.5 py-1 hover:bg-gray-600 rounded">
                <button onClick={()=>{                   
                    localStorage.removeItem('token');
                    localStorage.removeItem('name');
                    navigate("/");
                }} className="inline-flex items-center">
                    Logout
                </button>
            </li>
        </ul>
    </div>
}