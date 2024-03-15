import { ChangeEvent } from "react"

interface inputBox{
    inputLabel: string,
    phLabel: string,
    inputType: string,
    func: (e: ChangeEvent<HTMLInputElement>) => void
}

export function Inputbox({inputLabel, phLabel, inputType, func}: inputBox){
    return <div className="flex flex-col gap-y-1">
        <div className="text-lg font-semibold">
            {inputLabel}
        </div>
        <input className="border border-slate-400 rounded px-2 py-1" type={inputType} placeholder={phLabel} onChange={func}/>
    </div>
}