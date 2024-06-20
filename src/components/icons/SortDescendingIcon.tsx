import React from "react"
export {}

export const SortDescendingIcon = ({width, height}: { width?: string, height?: string}) => {
    return (
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <rect fill="none" height={height} width={width}/>
            <path d="M231.4,91a8,8,0,0,1-7.4,5H192v48a8,8,0,0,1-16,0V96H144a8.1,8.1,0,0,1-7.4-4.9,8.4,8.4,0,0,1,1.7-8.8l40-40a8.1,8.1,0,0,1,11.4,0l40,40A8.2,8.2,0,0,1,231.4,91ZM48,136h72a8,8,0,0,0,0-16H48a8,8,0,0,0,0,16Zm0-64h56a8,8,0,0,0,0-16H48a8,8,0,0,0,0,16ZM184,184H48a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16Z"/>
        </svg>
    )
}