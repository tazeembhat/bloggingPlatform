import { useState } from "react";
import { AuthButton } from "./Button";
import { Header } from "./Header";
import { Inputbox } from "./Inputbox";
import { SubHeading } from "./SubHeading";
import { SigninInput } from "@tazeembhat/blog-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function AuthSignin(){
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: ""
    })

    async function signinHandler(){
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
        .catch((error)=>{
            const msg = error.response.data.message;
            navigate(`/messagefailure/?msg=${msg}`);
            return;
        })

        if(response){
            localStorage.setItem("token", response.data.token);
            localStorage.setItem('name', response.data.name);
            navigate('/blogs')
        }
    }

    return <div className="flex flex-col h-screen gap-y-8 justify-center item-center">
        <div className="flex flex-col justify-center items-center">
            <div>
                <Header headerLabel="Welcome to PixelPost"/>
            </div>
            <div>
                <SubHeading label="Don't have an account?" buttonText="Sign up" to="/signup" />
            </div>
        </div>
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col w-6/12 gap-y-2">
                <Inputbox inputType="email" inputLabel="Email" phLabel="abc@example.xyz" func={(e)=>{
                    setPostInputs(c => ({
                        ...c,
                        email: e.target.value
                    }))
                }} />
                <Inputbox inputType="password" inputLabel="Password" phLabel="***********" func={(e)=>{
                    setPostInputs(c => ({
                        ...c,
                        password: e.target.value
                    }))
                }} />
                <div className="mt-2">
                    <AuthButton buttonLabel="Sign In" func={signinHandler}/>
                </div>
            </div>
        </div>
    </div>
}