import React from 'react';
import './faceRe.css';

const FaceRecogination = ({imageUrl, box}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'></img>
            <div className='bounding-box' 
            style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
            </div>
            </div>
        </div>
    );
}

export default FaceRecogination;

                        // leftCol: clairFace.left_col * width,
                        //     topRow: clairFace.top_row * height,
                        //     rightCol: width - (clairFace.right_col * width),
                        //     bottomRow: height - (clairFace.bottom_row * height)