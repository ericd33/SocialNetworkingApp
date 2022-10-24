import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUserAuth } from "../../../../context/UserAuthContext";
import { imageChange, nameChange, presentationChange, webSiteChange } from "../../../../Redux/actions";


export function EditPorofile (){
const dispatch = useDispatch()
const {user} = useUserAuth()
const [image,setImage ] = useState("")
const [name,setName]= useState("")
const [presentation,setPresentation]= useState("")
const [webSite,setWebSite]= useState("")

const handleWebSite = (e)=>{
    setWebSite(e.target.value)
}
const webSites ={
    email:user.email,
    website:webSite
}
const handleImage = (e)=>{
    setImage(e.target.value)
}
const images ={
    email:user.email,
    image:image
}
const handleName = (e)=>{
    setName(e.target.value)
}
const handlePresentation = (e)=>{
    setPresentation(e.target.value)
}
const names ={
    email:user.email,
    name:name
}
const presentations ={
    email:user.email,
    presentation:presentation
}
console.log(image)
let token = user.accessToken
const handleSubmitImage = (e)=>{
    e.preventDefault()
    dispatch(imageChange(images,token))
}
const handleSubmitWebSite = (e)=>{
    e.preventDefault()
    dispatch(webSiteChange(webSites,token))
}
const handleSubmitName = (e)=>{
    e.preventDefault()
    dispatch(nameChange(names,token))
}
const handleSubmitPresentation=(e)=>{
    e.preventDefault()
    dispatch(presentationChange(presentations,token))
}
    return(
        <div>
            <div className="image">
                <span>image change:</span>
                <input type="text" value={image} onChange={handleImage}/>
                <button onClick={handleSubmitImage}>submmit</button>
            </div>
            <div>
                <span>Name change:</span>
                <input type="text" value={name} onChange={handleName} />
                <button onClick={handleSubmitName}>submmit</button>
            </div>
            <div>
                <span>Add presentation:</span>
                <input type="text" value={presentation} onChange={handlePresentation} />
                <button onClick={handleSubmitPresentation}>submmit</button>
            </div>
            <div>
                <span>Add website:</span>
                <input type="text" value={webSite} onChange={handleWebSite} />
                <button onClick={handleSubmitWebSite}>submmit</button>
            </div>
        </div>
    )
}