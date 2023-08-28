import React from 'react';
import Header from '../component/header/Header';
import BoardMain from '../component/Board/BoardMain';
import WriteComment from '../component/Commnent/WriteComment';
import CommentList from '../component/Commnent/CommentList';


export default function BoardDetail() {

   
    return (
        <>
            <BoardMain />
            {/* 여기에서 실제 게시글을 렌더링하거나 API 요청 등을 수행할 수 있습니다 */}
            <WriteComment />
            <CommentList />
        </>
    );
}

