import React, { FC, useEffect, useRef, useState } from "react"
import { IInput } from "@/types/componentsTypes"
import { defaultWidth } from "@/constants/defaultProps"

export const Input: FC<IInput> = ({
    inputName,
    placeholder,
    inputProps,
    errorMessage,
    isDisabled = false,
    width = defaultWidth,
    popover: Popover = null,
    onChange = () => {},
}) => {
    const [popoverVisible, setPopoverVisible] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)

    const handleInputClick = () => setPopoverVisible(true)

    const popoverItemSelect = (item: string, needToClose?: boolean) => {
        onChange(item)
        needToClose && setPopoverVisible(false)
    }

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!popoverRef.current?.contains(event.target as Node)) {
                setPopoverVisible(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick)
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [])

    return (
        <div className="flex flex-col relative mr-2">
            <div
                className={`${width} flex flex-col self-center py-[6px]`}
                onClick={handleInputClick}
            >
                <p className="text-input-name mb-[5px]">
                    {inputName}
                </p>
                <input
                    disabled={isDisabled}
                    className={`${width} text-input focus:outline-none placeholder-[#96918B]::placeholder`}
                    placeholder={placeholder}
                    {...inputProps}
                />
            </div>
            {!!errorMessage && (
                <p className="text-error">
                    {errorMessage}
                </p>
            )}
            <div
                ref={popoverRef}
                className={`popover-parent ${popoverVisible ? "flex" : "hidden"}`}
            >
                {Popover && <Popover onChange={popoverItemSelect} />}
            </div>
        </div>
    )
}
