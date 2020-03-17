import React from 'react';
import './image.css';


const ImageLink = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
            <p className='center f3'>
                {'This magic brain will detect faces in your picture!!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                <input className='f5 pa2 w-70 center' type='text'
                onChange={onInputChange}/>
                <button className='w-30 grow f5 link ph3 pv2 dib white bg-light-purple'
                onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLink;