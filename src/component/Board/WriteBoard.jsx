import React, { useState } from 'react';

export default function WriteBoard() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const handleTitle = (e) => {
        setTitle(e.value.target);
    }


    const handleContent = (e) => {
        setContent(e.value.target);
    }
    return (
        <div>
            <form>
                <div>
                    <input type ='text' id ='title_txt' name='title' placeholder='제목' value={title} onChange={handleTitle}/>
                </div>
                <div>
                    <textarea id='content_txt' name='content' placeholder='내용을 입력하세요' onChange={handleContent} value={content}></textarea>
                </div>
                <div>
                    <button type='submit'>
                        저장
                    </button>
                </div>
            </form>
            
        </div>
    );
}

