import React from 'react'
import "./loading.css"
function Loading() {
    return (
        <div style={{position:'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)'}} >
            <div class="loadingwrapper">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="shadow"></div>
                <div class="shadow"></div>
                <div class="shadow"></div>
            </div>
        </div>
    )
}

export default Loading
