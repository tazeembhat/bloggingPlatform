import { AuthSignin } from "../components/SigninForm";
import { Quote } from "../components/Quote";

export function Signin(){
    return <div className="md:grid grid-cols-2">
        <div>
            <AuthSignin />    
        </div>
        <div className="hidden md:block">
            <Quote />
        </div>
    </div>
}