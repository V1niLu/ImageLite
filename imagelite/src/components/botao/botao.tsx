import { on } from "events";
import React from "react";

interface ButtonProps{
    color ?: string
    colorHover ?: string
    label ?: string
    onClick ?: (event: any) => void
    type ?: "button" | "submit" | "reset" | undefined
}

export const Button: React.FC<ButtonProps> = ( {onClick, color, colorHover, label, type} : ButtonProps) => {
   return(
    <>
    
        <button
            type={type}
            onClick={onClick}
            className={`${color} px-4 py-4 rounded-lg text-white ${colorHover} cursor-pointer`}>
            {label}
        </button>
    
    </>
   )
}