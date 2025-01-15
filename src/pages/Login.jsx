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
        <div className="h-screen w-screen relative overflow-hidden mx-auto flex flex-col md:flex-row items-center bg-gray-50">
            <div className='container mx-auto'>

            <form onSubmit={handleLogin} className="flex-1 px-8 py-12 space-y-6 w-full md:w-[60%] z-50">
                <Link to="/" className="text-center mb-4">
                    <img src="assets/images/auth/Logo.svg" alt="VisionMate" className="w-16 mx-auto" />
                    <h2 className="text-2xl font-bold text-blue-600">VisionMate</h2>
                </Link>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={saveInfo}
                            onChange={() => setSaveInfo(!saveInfo)}
                            className="mr-2"
                        />
                        <span>Simpan Informasi Saya!</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                    Belum Punya akun?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Daftar
                    </Link>
                </p>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-40 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mt-4"
                >
                    {loading ? "Memproses..." : "Masuk"}
                </button>
                {error && <p className='text-red-700 text-center pt-4'>{error}</p>}
            </form>
            </div>
                <img src="assets/images/auth/Group 2683.svg" alt="" className='absolute right-40 hidden md:block  bottom-64 z-20'/>
                <img src="assets/images/auth/Group 2682.svg" alt="" className='absolute right-14 hidden md:block  bottom-16 z-20 w-[19rem]'/>
                <img src="assets/images/auth/Group 2654.svg" alt="" className='absolute -right-20 hidden md:block md:w-[30rem] lg:w-[40rem] xl:w-[50rem]  h-screen z-10' />
            <img src="assets/images/auth/Group 1.svg" alt="" className='z-20 absolute right-8 hidden md:block  bg-background p-[15px] rounded-full ' />
        </div>
    );
};

export default Login;
