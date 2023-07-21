"use client"
import { DestinationPopover } from "@/Components/Popovers/Destination"
import { RoomsPopover } from "@/Components/Popovers/Rooms"
import { DatePicker } from "@/Components/Popovers/DatePicker"
import { Input as CustomInput } from "@/Components/Input"
import { useInputChange } from "@/Hooks/useInputChange"

export const SearchBar = () => {
    const {
        value: destinationValue,
        onChange: destinationOnChange,
        isError: destinationIsError,
        errorMessage: destinationErrorMessage,
        inputProps: destinationProps,
    } = useInputChange({ isRequired: true })

    const {
        value: datesValue,
        onChange: datesOnChange,
        inputProps: datesProps,
    } = useInputChange()

    const {
        value: roomsValue,
        onChange: roomsOnChange,
        inputProps: roomsProps,
    } = useInputChange()

    const {
        value: binValue,
        isError: binIsError,
        errorMessage: binErrorMessage,
        inputProps: binProps,
    } = useInputChange({ inputType: "number", maxLength: 6 })

    const isDisabled = binIsError || destinationIsError

    const handleSearch = () => {
        const searchData = {
            destinationValue,
            datesValue,
            roomsValue,
            binValue,
        }
        // someRequest(searchData)
    }

    return (
        <div className="flex-between shadow-searchbar searchbar-container bg-white">
            <CustomInput
                width="w-[175px]"
                inputName="Destination"
                placeholder="Where can we take you?"
                inputProps={destinationProps}
                errorMessage={destinationErrorMessage}
                popover={DestinationPopover}
                onChange={destinationOnChange}
            />
            <CustomInput
                inputName="Stay Dates"
                placeholder="What dates should we block?"
                width="w-[216px]"
                isDisabled
                inputProps={datesProps}
                popover={DatePicker}
                onChange={datesOnChange}
            />
            <CustomInput
                inputName="Room & Guests"
                placeholder="How many rooms do you need?"
                width="w-[225px]"
                isDisabled
                inputProps={roomsProps}
                popover={RoomsPopover}
                onChange={roomsOnChange}
            />
            <CustomInput
                inputName="Verify your BIN"
                placeholder="Enter first 6 digits"
                inputProps={binProps}
                errorMessage={binErrorMessage}
                width="w-[134px]"
            />
            <button
                className="button-search"
                disabled={isDisabled}
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    )
}
