// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import "./CircularBar.css"

const CircularBar = ({ value }) => {
    const [counts, setCounts] = React.useState(0)
    // useEffect(() => {
    //     for (let count = counts; count <= value; count++) {
    //         setTimeout(() => {
    //             setCounts(count)
    //         }, 300)
    //     }
    // }, [])
    useEffect(() => {
        let start = 0
        // first three numbers from props
        const end = parseInt(value?.substring(0, 3))
        // if zero, return
        if (start === end) return

        // find duration per increment
        let totalMilSecDur = parseInt(1)
        let incrementTime = (totalMilSecDur / end) * 1000

        // timer increments start counter
        // then updates count
        // ends if start reaches end
        let timer = setInterval(() => {
            start += 1
            setCounts(String(start) + value.substring(3))
            if (start === end) clearInterval(timer)
        }, incrementTime)

        // dependency array
    }, [value])
    return (
        <div className="card">
            <div className="box">
                <div className="percent">
                    <svg>
                        <circle cx="70" cy="70" r="70"></circle>
                        <circle
                            style={{
                                strokeDashoffset: `calc(440 - (440 * ${counts}) / 100)`
                            }}
                            cx="70"
                            cy="70"
                            r="70"
                        ></circle>
                    </svg>
                    <div className="number">
                        <h2>
                            {counts}
                            <span>%</span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CircularBar
