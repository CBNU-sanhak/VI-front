import React from 'react';
import { useParams } from 'react-router-dom';

export default function InterviewResult() {
    
    const { interviewId } = useParams();

    /*fetch("https//:{interviewId}").json().() interviewId로 불러옴 */
    const result = {
        name:"최유성",
        

    }
    return (
        <div>
            <h2>Interview Result Page</h2>
            <span>Interview Result ID: {interviewId}</span>
        </div>
    );
}

