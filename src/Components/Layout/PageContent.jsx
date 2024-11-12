const PageContent = ({children, title}) => {
    return(
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-3">{title}</h1>
            { children }
        </div>
    )
}

export default PageContent;