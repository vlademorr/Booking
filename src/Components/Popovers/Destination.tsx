import React, { FC } from "react"
import { IPopover } from "@/types/componentsTypes"
import { destination_data as data } from "@/mock/serverData"

export const DestinationPopover: FC<IPopover> = ({ onChange }) => {
    return (
        <div className="popover-container w-[320px] h-[258px]">
            <div className="popover-box">
                {data.length ? data.map((item, index) => {
                    const needDivider = index !== data.length - 1

                    return (
                        <div key={item.id}>
                            <div
                                className="destination-item"
                                onClick={() => onChange(item.firstLabel, true)}
                            >
                                <p className="font-normal text-base">{item.firstLabel}</p>
                                <p className="text-sm">({item.secondLabel})</p>
                            </div>
                            {needDivider && <div className="w-full h-px bg-gray-300" />}
                        </div>
                    )
                }) : (
                    <p className="pl-4 font-normal text-base">Something went wrong...</p>
                )}
            </div>
        </div>
    )
}
