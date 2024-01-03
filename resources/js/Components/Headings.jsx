export function H1({ children, className }) {
    return (
        <h1
            className={
                "font-semibold text-2xl text-gray-800 leading-tight " +
                className
            }
        >
            {children}
        </h1>
    );
}

export function H2({ children, className }) {
    return (
        <h2
            className={
                "font-semibold text-xl text-gray-800 leading-tight " + className
            }
        >
            {children}
        </h2>
    );
}

export function H3({ children, className }) {
    return (
        <h3
            className={
                "font-semibold text-lg text-gray-800 leading-tight " + className
            }
        >
            {children}
        </h3>
    );
}
