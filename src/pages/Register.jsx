import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../components/context/AuthContext';

const Register = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("VI");
    const [agreed, setAgreed] = useState(false);

    const { registerNewUser } = UserAuth();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!agreed) {
            setError("You must agree to the terms and conditions.");
            return;
        }

        const form = e.target;
        const fullName = form.fullName.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const language = form.language.value;

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);

        if (password !== confirmPassword) {
            setError("Password dan Konfirmasi Password tidak cocok.");
            setLoading(false);
            return;
        }

        try {
            const result = await registerNewUser(fullName, email, password, role, phone, language);

            if (result.success) {
                navigate('/login');
            }
        } catch (error) {
            setError("An error occurred", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-fit lg:h-screen w-screen overflow-hidden flex flex-col md:flex-row items-center bg-gray-50">
            {/* Form Section */}
            <div className="container mx-auto">

            <form onSubmit={handleRegister} className="flex-1 px-8 py-12 space-y-6 w-full md:w-[65%] z-50">
                <Link to="/" className="text-center mb-4">
                    <img src="assets/images/auth/Logo.svg" alt="VisionMate" className="w-16 mx-auto" />
                    <h2 className="text-2xl font-bold text-blue-600">VisionMate</h2>
                </Link>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="fullName" className="text-gray-700 text-sm mb-1">Nama Lengkap</label>
                        <input
                            name="fullName"
                            id="fullName"
                            type="text"
                            placeholder="Nama Lengkap"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700 text-sm mb-1">Alamat Email</label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Alamat Email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-gray-700 text-sm mb-1">Nomor Telepon</label>
                        <input
                            name="phone"
                            id="phone"
                            type="tel"
                            placeholder="Nomor Telepon"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="language" className="text-gray-700 text-sm mb-1">Bahasa</label>
                        <select
                            name="language"
                            id="language"
                            defaultValue="Bahasa Indonesia"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        >
                            <option value="Bahasa Indonesia">Indonesia</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 text-sm mb-1">Password</label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="text-gray-700 text-sm mb-1">Konfirmasi Password</label>
                        <input
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                            placeholder="Konfirmasi Password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            />
                    </div>
                </div>
                <div className="text-sm font-medium text-gray-700 mt-4">Silahkan pilih peran Anda:</div>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="role"
                            value="VI"
                            checked={role === 'VI'}
                            onChange={() => setRole('VI')}
                            className="mr-2"
                            />
                        VI
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="role"
                            value="Guard"
                            checked={role === 'Guard'}
                            onChange={() => setRole('Guard')}
                            className="mr-2"
                        />
                        Penjaga
                    </label>
                </div>
                <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={() => setAgreed(!agreed)}
                        className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Dengan mencentang tombol disamping, anda telah menyetujui syarat dan ketentuan.</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                    Sudah Memiliki akun?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Masuk
                    </Link>
                </p>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-40 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mt-4"
                >
                    {loading ? "Mendaftarkan..." : "Daftar"}
                </button>
                {error && <p className='text-red-700 text-center pt-4'>{error}</p>}
            </form>
            
            </div>
            <img src="assets/images/auth/Group 2683.svg" alt="" className='absolute right-40 bottom-64 z-20 hidden md:block '/>
                <img src="assets/images/auth/Group 2682.svg" alt="" className='absolute right-14 bottom-16 z-20 w-[19rem] hidden md:block '/>
                <img src="assets/images/auth/Group 2654.svg" alt="" className='absolute -right-20 hidden md:block md:w-[30rem] lg:w-[40rem]  xl:w-[50rem]  h-screen z-10' />
            <img src="assets/images/auth/Group 1.svg" alt="" className='z-20 absolute right-8 bg-background p-[15px] rounded-full hidden md:block ' />
        </div>
    );
};

export default Register;
