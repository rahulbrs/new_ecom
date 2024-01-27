import { useState } from "react";


const UserRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitData = async () => {
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });


            if(response.ok){
                console.log("User successfully registered");
            }else{
                const errorData = await response.json();
                console.error(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error("An error occurred during registration", error);
        }
    }

    return (
        <>
            <form className="container">
                <h1>User Register</h1>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button type="submit" onClick={submitData} className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default UserRegister;