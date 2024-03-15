export function Avatar({authorName}: {authorName: string}){
    const name = authorName.charAt(0).toUpperCase();
    return <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-800 rounded-full">
        <span className="text-lg text-white">{name}</span>
    </div>
}