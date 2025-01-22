import React from "react"
import {
    List
} from "../../defaults/index"
import "./index.css"
import {ThreadSkeleton} from "./threadSkeleton"

export const FeedSkeleton = () => {
    const skeleton = [0, 1, 2, 3]
    return (

        <List>
            {skeleton.map((item, key) => <ThreadSkeleton key={item} style ={{marginTop: "50px"}} />)}
        </List>

    )
}
