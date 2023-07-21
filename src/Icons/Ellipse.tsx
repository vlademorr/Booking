import React, {FC} from "react"
import { IEllipseIcon } from "@/types/componentsTypes"

export const EllipseIcon: FC<IEllipseIcon> = ({ ellipseType, isDisabled }) => {
    const fill = isDisabled ? "#EBEBEB" : "#96918B"
    const insideIconPath = ellipseType === "+"
        ? "12ZM12 18C11.4477 18 11 17.5523 11 17V13H7C6.44771 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44771 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18Z"
        : "12ZM7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44771 13 7 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H7Z"

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={`M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 ${insideIconPath}`}
                fill={fill}
            />
        </svg>
    )
}
