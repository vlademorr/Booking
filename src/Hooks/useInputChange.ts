import { useEffect, useState, ChangeEvent } from "react"

interface IUseInputChange {
    isRequired?: boolean
    minLength?: number
    maxLength?: number
    inputType?: "string" | "number"
}

export const useInputChange = (props: IUseInputChange = {}) => {
    const [value, setValue] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isError, setIsError] = useState<boolean>(!!props.isRequired)

    const onChange = (inputValue: string) => setValue(inputValue)
    const onSetIsError = (isError: boolean) => setIsError(isError)
    const onSetErrorMessage = (message: string) => setErrorMessage(message)

    const {
        isRequired = false,
        minLength = 0,
        maxLength = 9999,
        inputType = "string",
    } = props

    const inputProps = {
        value,
        description: errorMessage,
        onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
        type: inputType,
    }

    useEffect(() => {
        const valueLength = value ? value.toString().length : 0
        const checkRequired = isRequired && !valueLength
        const checkMinLength = valueLength < minLength
        const checkMaxLength = valueLength > maxLength

        if (checkRequired) {
            setIsError(true)
            setErrorMessage("Can't be blank")
        } else if (checkMinLength) {
            setIsError(true)
            setErrorMessage(`Min length is ${minLength}`)
        }  else if (checkMaxLength) {
            setIsError(true)
            setErrorMessage(`Max length is ${maxLength}`)
        } else {
            setIsError(false)
            setErrorMessage("")
        }
    }, [value, isRequired, maxLength, minLength])

    return {
        value,
        isError,
        onChange,
        onSetIsError,
        onSetErrorMessage,
        inputProps,
        errorMessage,
    }
}
