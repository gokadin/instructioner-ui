import React, {useEffect} from "react";

export const Exercise = () => {
    useEffect(() => {
        console.log('calling api')
        // testApi().then(x => console.log('response', x))
        console.log('called api')
    })

    return (
        <div>
            Exercise here
        </div>
    )
}
