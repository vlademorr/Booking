import React, {FC, useEffect, useState} from "react"
import { DateRange, DayPicker } from "react-day-picker"
import { format } from "date-fns"
import { IPopover } from "@/types/componentsTypes"
import "react-day-picker/dist/style.css"

export const DatePicker: FC<IPopover> = ({ onChange }) => {
    const [range, setRange] = useState<DateRange>()
    const isDateDisabled = (date: Date) => date < new Date()

    useEffect(() => {
        if (range?.from && range?.to) {
            const fromStr = format(range.from, "MMM d")
            const toStr = format(range.to, "MMM d")
            onChange(`${fromStr} - ${toStr}`)
        } else {
            onChange("")
        }
    }, [onChange, range])

    return (
        <div className="popover-container w-[340px] h-[360px]">
            <div className="popover-box">
                <DayPicker
                    id="DatePicker"
                    mode="range"
                    defaultMonth={new Date()}
                    selected={range}
                    onSelect={setRange}
                    disabled={isDateDisabled}
                />
            </div>
        </div>
    )
}
