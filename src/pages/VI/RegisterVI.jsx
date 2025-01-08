import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../components/context/AuthContext';

const RegisterVI = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const {session, registerNewUser} = UserAuth();
    const navigate = useNavigate();
    console.log(session);   

    const handleRegister = async (e) => {
        e.preventDefault()
        const form = e.target;

        const fullName = form.fullName.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const language = form.language.value;
        const role = form.role.value;
        setLoading(true)

        if (password !== confirmPassword) {
            setError("Password dan Konfirmasi Password tidak cocok.");
            setLoading(false);
            return;
        }
        
        try {
            const result = await registerNewUser(fullName, email, password, role, phone, language)   

            if(result.success) {
                navigate('/login/vi')
            };
        } catch (error) {
            setError("an error occured", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Register</h2>
                <p className="text-sm text-gray-600 mb-6">
                Sudah punya akun? <Link to="/login/vi" className="text-blue-500 hover:underline">Login</Link>
                </p>
                <div className="space-y-4">
                    <input
                        name="fullName"
                        type="text"
                        placeholder="Nama Lengkap"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        name="phone"
                        type="tel"
                        placeholder="No Telepon"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select
                        name="language"
                        defaultValue="Bahasa Indonesia"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="Bahasa Indonesia">Indonesia</option>
                        <option value="English">English</option>
                    </select>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Konfirmasi Password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        name="role"
                        type="hidden"
                        value="VI"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        {loading ? "Mendaftarkan..." : "Register"}
                    </button>
                    {error && <p className='text-red-700 text-center pt-4'>{error}</p>}
                </div>
            </form>
        </div>
    )
}

export default RegisterVI