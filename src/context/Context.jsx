import { createContext } from 'react';
import {useState} from 'react'
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) =>{

    const[input,setInput]=useState("");   /* use to save input */
    const[recentPrompt, setRecentPrompt] = useState("");  /* when we click on send button recent input data data store into recent prompt*/
    const[prevPrompts, setPrevPrompts] = useState([]); /* declare as array to store all the prev history */
    const[showResult, setShowResult] = useState(false); /* once its true hide the button*/
    const[loading, setLoading] = useState(false); /* true made an loading animation*/
    const[resultData, setResultData] = useState("") /*use to display our result on our web page */

    const delayPara = (index,nextWord)=>{
        setTimeout(function () {
            setResultData(prev=>prev+nextWord)
        }, 75*index)
    }

    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt)=>{

        setResultData("") /*prev result delete from result section */
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt!==undefined){
            response = await run(prompt)
            setRecentPrompt(prompt)
        }else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i=0; i<responseArray.length;i++){
            if(i===0 || i%2!==1){
                newResponse+= responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setResultData(newResponse2)
        setLoading(false)
        setInput("")

    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )


}

export default ContextProvider
