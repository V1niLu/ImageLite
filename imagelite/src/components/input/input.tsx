import { on } from "events";
import React from "react";

interface InputProps{
    style ?: string
    onChange ?: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder ?: string
    id ?: string
    value ?: string
}

export const Input: React.FC<InputProps> = ( {style, ...rest} : InputProps) => {
    return(
        <input {...rest}
        type="text"
        className={`${style} border px-3 py-2 rounded-lg text-gray-900`} />

    )
}