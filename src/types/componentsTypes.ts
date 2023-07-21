import { ChangeEvent, FC } from "react"

export type IPopoverOnChange = (item: string, needToClose?: boolean) => void

export interface IPopover {
    onChange: IPopoverOnChange
}

export interface IBed {
    id: number,
    isSelected: boolean
}

export interface IBedIcon {
    isSelected?: boolean
}

export interface IEllipseIcon {
    ellipseType?: string
    isDisabled?: boolean
}

export interface IInputProps {
    value: string | number
    description: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface IRoomGuests {
    numberOfGuests: number
    onChange: (newNumberOfGuests: number) => void
    needMargin?: boolean
    isAdult?: boolean
}

export interface IInput {
    inputName: string
    placeholder: string
    width?: string
    inputProps?: IInputProps
    errorMessage?: string
    isDisabled?: boolean
    popover?: FC<IPopover>
    onChange?: (inputValue: string) => void
}
