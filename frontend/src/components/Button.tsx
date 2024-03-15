interface authButton {
    buttonLabel: string,
    func: ()=> void
}

export function AuthButton({buttonLabel, func}: authButton){
    return <button onClick={func} className="font-medium pointer py-1 text-lg rounded-md w-full focus:outline-none text-white
     bg-gray-800 dark:hover:bg-gray-900" type="button">
        {buttonLabel}
    </button>
}

export function Button({buttonLabel, func}: authButton){
    return <button onClick={func} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
     focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        {buttonLabel}
    </button>
}