import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../components/context/AuthContext';

const Login = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const {session, login} = UserAuth();
    const navigate = useNavigate();
    console.log(session);   

    const handleLogin = async (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setLoading(true)
        try {
            const result = await login(email,password)   

            if(result.success) {
                navigate('/assistant')
            };
        } catch (error) {
            setError("an error occured", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
                <p className="text-sm text-gray-600 mb-6">
                Belum Punya akun? <Link to="/register/vi" className="text-blue-500 hover:underline">Register</Link>
                </p>
                <div className="space-y-4">
                <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                    {error && <p className='text-red-700 text-center pt-4'>{error}</p>}
                </div>
            </form>
        </div>
    )
}

export default Login