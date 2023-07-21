import React, { FC } from "react"
import { EllipseIcon } from "@/Icons/Ellipse"
import { IRoomGuests } from "@/types/componentsTypes"

export const RoomGuests: FC<IRoomGuests> = ({ isAdult, numberOfGuests, needMargin, onChange }) => {
    const name = isAdult ? "Adults" : "Children"
    const description = isAdult ? "Ages 17 or above" : "Ages 0 to 17"
    const guestsValidation = isAdult ? 1 : 0
    const isDisabled = numberOfGuests === guestsValidation

    const handleDecrement = () => {
        if (numberOfGuests > guestsValidation) {
            onChange(numberOfGuests - 1)
        }
    }

    const handleIncrement = () => {
        onChange(numberOfGuests + 1)
    }

    return (
        <div className={`flex-between space-x-4 ${needMargin ? "mt-[20px]" : ""}`}>
            <div>
                <p className="text-medium mb-[5px]">
                    {name}
                </p>
                <p className="text-description">
                    {description}
                </p>
            </div>
            <div className="flex items-center">
                <div onClick={handleDecrement}>
                    <EllipseIcon ellipseType="-" isDisabled={isDisabled} />
                </div>
                <p className="text-medium mx-[18px]">
                    {numberOfGuests}
                </p>
                <div onClick={handleIncrement}>
                    <EllipseIcon ellipseType="+" />
                </div>
            </div>
        </div>
    )
}
