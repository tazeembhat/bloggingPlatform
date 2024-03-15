import { Link } from "react-router-dom";

interface subheading {
    label: string,
    buttonText: string,
    to: string
}

export function SubHeading({label, buttonText, to}: subheading){
    return <div className="flex items-center gap-1">
        <p className="text-md text-slate-700">
            {label}
        </p>
        <Link className="pointer underline pl-1 cursor-pointer" to={to}>
            {buttonText}
        </Link>
    </div>
}