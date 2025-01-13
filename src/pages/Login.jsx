import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../components/context/AuthContext';

const Login = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [saveInfo, setSaveInfo] = useState(true);

    const { login } = UserAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!agreed) {
            setError("Anda harus menyetujui syarat dan ketentuan.");
            return;
        }

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setLoading(true);

        try {
            const result = await login(email, password);

            if (result.success) {
                console.log("Login result:", result);
                const userRole = result.data.role; // Assume role is returned in result.data

                if (userRole === 'VI') {
                    navigate('/vi');
                } else if (userRole === 'Guard') {
                    navigate('/guard');
                } else {
                    setError("Anda tidak memiliki izin.");
                }
            }
        } catch (error) {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center bg-gray-50">
            <form onSubmit={handleLogin} className="flex-1 px-8 py-12 space-y-6">
                <div className="text-center mb-4">
                    <img src="/src/assets/images/Logo.svg" alt="VisionMate" className="w-16 mx-auto" />
                    <h2 className="text-2xl font-bold text-blue-600">VisionMate</h2>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                    Belum Punya akun?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700 text-sm mb-1">Alamat Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>                    
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 text-sm mb-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>
                </div>
                <div className="flex items-center mt-4">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={() => setAgreed(!agreed)}
                            className="mr-2"
                        />
                        <span className='text-sm text-gray-700'>I agree to the terms and conditions</span>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={saveInfo}
                            onChange={() => setSaveInfo(!saveInfo)}
                            className="mr-2"
                        />
                        <span>Save my information</span>
                    </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-40 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mt-4"
                >
                    {loading ? "Memproses..." : "Masuk"}
                </button>
                {error && <p className='text-red-700 text-center pt-4'>{error}</p>}
            </form>
            
            {/* Illustration Section */}
            <div className="flex-1 justify-center items-center overflow-y-hidden">
                <img src="/src/assets/images/Rectangle 3.svg" alt="Element 1" className="absolute top-0 right-0 z-0" />
                <img src="/src/assets/images/Rectangle 2.svg" alt="Element 1" className="absolute top-0 right-0 max-h-sm z-1" />
                <img src="/src/assets/images/Rectangle 1.svg" alt="Element 1" className="absolute top-0 right-0 max-h-sm z-2" />
                <img src="/src/assets/images/Rectangle 4.svg" alt="Element 1" className="absolute bottom-0 right-0 z-3" />
            </div>
        </div>
    );
};

export default Login;
