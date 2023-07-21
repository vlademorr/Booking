import React, { FC, useEffect, useState } from "react"
import { RoomGuests } from "@/Components/Popovers/RoomGuests"
import { IPopover, IBed } from "@/types/componentsTypes"
import { BedIcon } from "@/Icons/Bed"
import { rooms_data, room_data } from "@/mock/serverData"

export const RoomsPopover: FC<IPopover> = ({ onChange }) => {
    const [rooms, setRooms] = useState(rooms_data)
    const [roomsOccupancy, setRoomsOccupancy] = useState([room_data])

    const handleSelectRoom = (clickedBed: IBed) => {
        const updatedRooms = rooms.map((room) => ({
            ...room,
            isSelected: room.id <= clickedBed.id,
        }))

        setRooms(updatedRooms)

        const selectedRooms = updatedRooms.filter((room) => room.isSelected)

        setRoomsOccupancy(prev =>
            selectedRooms.map((room) => {
                const findOccupancy = prev.find((occupancy) => occupancy.room === room.id)
                return {
                    room: room.id,
                    adults: findOccupancy?.adults || room_data.adults,
                    children: findOccupancy?.children || room_data.children,
                }
            })
        )
    }

    const handleGuestsChange = (roomIndex: number, isAdult: boolean, newNumberOfGuests: number) => {
        setRoomsOccupancy((prevRoomsOccupancy) =>
            prevRoomsOccupancy.map((room, index) =>
                index === roomIndex
                    ? {
                        ...room,
                        adults: isAdult ? newNumberOfGuests : room.adults,
                        children: !isAdult ? newNumberOfGuests : room.children,
                    }
                    : room
            )
        )
    }

    useEffect(() => {
        const { rooms, adults, children } = roomsOccupancy.reduce((acc, occupancy) => {
            acc.rooms += 1
            acc.adults += occupancy.adults
            acc.children += occupancy.children

            return acc
        }, { rooms: 0, adults: 0, children: 0 })

        const infoParts = []

        if (rooms > 0) {
            infoParts.push(`${rooms} Room${rooms > 1 ? "s" : ""}`)
        }
        if (adults > 0) {
            infoParts.push(`${adults} Adult${adults > 1 ? "s" : ""}`)
        }
        if (children > 0) {
            infoParts.push(`${children} Child${children > 1 ? "ren" : ""}`)
        }

        onChange(infoParts.join(", "))
    }, [onChange, roomsOccupancy])

    return (
        <div className="popover-container w-[320px] min-h-[258px]">
            <div className="popover-box">
                <div className="flex-between items-center mb-[20px] mt-[10px]">
                    <p className="text-medium">
                        Rooms
                    </p>
                    <div className="flex space-x-4">
                        {rooms.map((room) => (
                            <div key={room.id} onClick={() => handleSelectRoom(room)}>
                                <BedIcon isSelected={room.isSelected} />
                            </div>
                        ))}
                    </div>
                </div>
                {roomsOccupancy.map(({ room, adults, children }, index) => (
                    <div key={room}>
                        <div className="w-272 h-[1px] bg-gray-300"></div>
                        <div>
                            <p className="text-room mt-[25px] mb-[15px]">
                                Room {room}
                            </p>
                            <RoomGuests
                                isAdult
                                numberOfGuests={adults}
                                onChange={(newNumberOfGuests: number) => handleGuestsChange(index, true, newNumberOfGuests)}
                            />
                            <RoomGuests
                                needMargin
                                numberOfGuests={children}
                                onChange={(newNumberOfGuests: number) => handleGuestsChange(index, false, newNumberOfGuests)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
