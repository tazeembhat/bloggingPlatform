import { Link } from "react-router-dom"

interface blogCard {
    title: string,
    content: string,
    authorName: string,
    publishDate: string,
    link: string,
    edit: string,
    editLink: string
}

export function BlogCard({title, content, authorName, publishDate, link, edit, editLink}: blogCard){
    const author = authorName.charAt(0).toUpperCase() + authorName.slice(1);
    const contentArray = content.split(' ');
    
    const pd = new Date(publishDate.split('T')[0]);
    const day = pd.getDay();
    const month = pd.toLocaleString('default', { month: 'short' })
    const year = pd.getFullYear();

    return <div className="flex flex-col w-9/12 mt-8 border-b">
        <div className="flex justify-start gap-x-2 items-center">
            <div className="flex flex-col justify-center">
                <Avatar authorName={author} />
            </div>
            <div className="text-sm font-normal">
                {author}
            </div>
            <div className="text-slate-600">
                &#128900;
            </div>
            <div className="text-sm text-slate-500">
                {month} {day}, {year}
            </div>
        </div>
        <Link to={link} className="text-xl font-bold my-1 leading-6 cursor-pointer">
            {title}
        </Link>
        <div className="font-serif mt-1 text-justify">
            {content.length > 150 ? content.slice(0, 150) + "..." : content}
        </div>
        <div className="flex justify-between">
            <div className="text-sm text-slate-500 my-5">
                {Math.ceil(contentArray.length/200) + " mins read"}
            </div>
            <div>
                {edit && <Edit link={editLink} />}
            </div>
        </div>
    </div>
}

function Avatar({authorName}: {authorName: string}){
    return <div className="inline-flex items-center justify-center w-5 h-5 text-white bg-orange-700 rounded-full">
        <span className="text-sm text-white">{authorName[0]}</span>
    </div>
}

function Edit({ link }: {link: string}){
    return <Link to={link}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
    </Link>
}
