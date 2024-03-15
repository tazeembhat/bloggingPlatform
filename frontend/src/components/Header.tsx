interface headerType{
    headerLabel: string
}

export function Header({ headerLabel }: headerType ){
    return <div>
        <p className="text-3xl md:text-2xl lg:text-3xl font-sans font-bold text-black-700">
            {headerLabel}
        </p>
    </div>
}