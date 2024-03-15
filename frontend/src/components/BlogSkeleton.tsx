export function BlogSkeleton(){
    return <div role="status" className="w-9/12 border-b animate-pulse">
        <div className="flex flex-col mt-8">
            <div className="flex justify-start gap-x-2 items-center">
                <div className="flex flex-col justify-center">
                    <div className="bg-gray-200 rounded-full w-6 h-6"></div>
                </div>
                <div className="flex gap-x-4 justify-center">
                    <div className="bg-gray-200 rounded-full h-2 w-16"></div>
                    <div className="bg-gray-200 rounded-full h-2 w-16"></div>                </div>
                </div>
            </div>
            <div className="bg-gray-200 rounded-full h-2.5 my-2"></div>
            <div>
                <div className="bg-gray-200 rounded-full h-2.5 my-2"></div>
                <div className="bg-gray-200 rounded-full h-2.5 my-2"></div>
                <div className="bg-gray-200 rounded-full h-2.5 my-2"></div>
            </div>
            <div className="my-5">
                <div className="bg-gray-200 rounded-full h-2 w-16"></div>
            </div>
        </div>
}

export function PostSkeleton(){
    return <div role="status" className="flex w-full mt-6 p-4 animate-pulse">
        <div className="flex flex-col gap-y-3 w-9/12 mx-10">
            <div className="text-4xl font-bold">   
                <div className="bg-gray-200 rounded-full h-2.5"></div>
            </div>
            <div className="flex text-slate-400 text-sm items-center gap-x-1">
                <h1>Posted on</h1>
                <div className="bg-gray-200 rounded-full h-2.5 w-16"></div>
            </div>
            <div className="flex flex-col mt-3 gap-y-2">
                <div className="bg-gray-200 rounded-full h-2.5"></div>
                <div className="bg-gray-200 rounded-full h-2.5"></div>
                <div className="bg-gray-200 rounded-full h-2.5"></div>
                <div className="bg-gray-200 rounded-full h-2.5"></div>
            </div>
        </div>
        <div className=" flex flex-col w-3/12 p-2 ml-2 gap-y-3">
            <div className="text-sm">
                Author
            </div>
            <div className="flex flex-col items-center gap-x-2 gap-y-1 sm:flex-row">
                <div>
                    <div className="bg-gray-200 rounded-full w-7 h-7"></div>
                </div>
                <div>
                    <div className="bg-gray-200 rounded-full h-2.5 w-16"></div>
                </div>
            </div>
        </div>
    </div>
}

export function UpdateSkeleton(){
    return <div role="status" className="flex flex-col animate-pulse">
        <div className="flex justify-between my-6 mx-8 p-4">
                <div className="text-2xl font-serif font-semibold">
                    PixelPost
                </div>
            <div className="flex gap-3">
                <div>
                    <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none font-medium rounded-full text-sm px-5 py-2 text-center">
                        Publish
                    </button>
                </div>
                <div>
                    <div className="bg-gray-200 rounded-full w-8 h-8"></div>
                </div>                
            </div>
        </div>
        {/* Editor */}
        <div className="flex flex-col gap-y-3 px-16 py-4">
            <div>
                <div className="w-9/12 bg-slate-200 rounded-lg h-6"></div>
            </div>
            <div>
                <textarea className="w-9/12 bg-slate-200 block rounded-lg p-4" />
            </div>
        </div>
        <div className="px-16 py-2">
            <button className="text-lg px-3 py-1 hover:bg-gray-900 font-medium text-white bg-gray-800 rounded-md">
                Cancel
            </button>
        </div>
    </div>
}