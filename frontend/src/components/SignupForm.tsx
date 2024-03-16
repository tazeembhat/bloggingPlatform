import { useState } from "react";
import { AuthButton } from "./Button";
import { Header } from "./Header";
import { Inputbox } from "./Inputbox";
import { SubHeading } from "./SubHeading";
import { SignupInput } from "@tazeembhat/blog-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const env = import.meta.env;

export function AuthSignup(){
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    async function signupHandler(){
        const response = await axios.post(`${env.VITE_BACKEND_URL}/api/v1/user/signup`, postInputs)
        .catch((error)=>{
            const msg = error.response.data.message;
            navigate(`/messagefailure/?msg=${msg}`);
            return;
        })

        if(response){
            localStorage.setItem("token", response.data.token);
            navigate(`/messagesuccess/?msg=Account created sucessfully`);
        }
    }

    return <div className="flex flex-col h-screen gap-y-8 justify-center item-center">
        <div className="flex flex-col justify-center items-center">
            <div>
                <Header headerLabel="Create an Account"/>
            </div>
            <div>
                <SubHeading label="Already have an account?" buttonText="Login" to="/" />
            </div>
        </div>
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col w-6/12 gap-y-2">
                <Inputbox inputType="text" inputLabel="Name" phLabel="Isaac Newton" func={(e)=>{
                    setPostInputs(c => ({
                        ...c,
                        name: e.target.value
                    }))
                }} />
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
                    <AuthButton buttonLabel="Sign Up" func={signupHandler}/>
                </div>
            </div>
        </div>
    </div>
}