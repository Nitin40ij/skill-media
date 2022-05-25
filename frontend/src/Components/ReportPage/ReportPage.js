import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import "./Report.css"
import axios from 'axios';
import { reportPost } from '../../store/asyncMethods/AuthMethods';
const ReportPage = ({ location }) => {
    const { user } = useSelector(state => state.AuthReducer);
    const { redirect } = useSelector(state => state.PostReducer);
    const { push } = useHistory();
    const dispatch = useDispatch();
    const complaint = {
        A: "It's spam",
        B: "I just dont like it",
        C: "Nudity or sexual activity",
        D: "Hate speech or symbols",
        E: "Violence or dangerous organizations",
        F: "False information",
        G: "Bullying or harassment",
        H: "Scam or fraud",
        I: "Intellctual property violation",
        J: "Suicide or self-injury",
        K: "Sale of illegal or regulated goods",
        L: "Eating disorders",
        M: "Something Else"
    }
    const [state, setState] = useState(
        {
            report: complaint["A"],
            description: "",
        }
    );
    const reportChnage = e => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: complaint[e.target.value] });
    }
    const descriptionChange = e => {
        e.preventDefault();
        setState({ ...state, description: e.target.value });
    }
    useEffect(() => {
        if (redirect) {
            alert("we will surely look into your problem");
            push("/")
            dispatch({ type: 'REDIRECT_FALSE' });
        }
    }, [redirect])
    const reportClick = async e => {
        e.preventDefault();
        console.log(state, location.state);
        dispatch(reportPost(state, location.state));
    }
    return (
        <div className="reportForm">
            <form className='Form' onSubmit={reportClick}>
                <div className="form__control">
                    <label htmlFor="Report-type">
                        Why are you reporting this post?
                    </label>
                    <select name="report" onChange={reportChnage} value={state.report} id="">
                        <option value="A">It's spam</option>
                        <option value="B">I just dont like it</option>
                        <option value="C">Nudity or sexual activity</option>
                        <option value="D">Hate speech or symbols</option>
                        <option value="E">Violence or dangerous organizations</option>
                        <option value="F">False information</option>
                        <option value="G">Bullying or harassment</option>
                        <option value="H">Scam or fraud</option>
                        <option value="I">Intellctual property violation</option>
                        <option value="J">Suicide or self-injury</option>
                        <option value="K">Sale of illegal or regulated goods</option>
                        <option value="L">Eating disorders</option>
                        <option value="M">Something Else</option>
                    </select>
                </div>
                <div className="form__control-1">
                    <label htmlFor="description">
                        Description
                    </label>
                    <input onChange={descriptionChange} type="text" name='description' />
                </div>
                <div className="form__control">
                    <input type="submit" value="Report" className='btn report-btn' />
                </div>
            </form>
        </div>
    )
}

export default ReportPage