// eslint-disable-next-line no-use-before-define
import React from "react"

const Heart = ({ color }) => {
    return (
        <svg
            style={{
                fill: color,
                transition: "fill 0.2s ease-in-out"
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
        >
            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-7.163-8.852-9.573-12-2.944z" />
        </svg>
    )
}
export default Heart
