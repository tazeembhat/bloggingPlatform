import { AuthSignup } from "../components/SignupForm";
import { Quote } from "../components/Quote";

export function Signup(){
    return <div className="md:grid grid-cols-2">
        <div>
            <AuthSignup />    
        </div>
        <div className="hidden md:block">
            <Quote />
        </div>
    </div>
}