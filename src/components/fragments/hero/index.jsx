import { Link } from "react-router-dom"

export default function hero(){
    return (
        <header className="w-screen min-h-screen bg-background  ">
            <div className="flex flex-col-reverse md:flex-row container mx-auto pt-32">
            <main className="w-full flex flex-col gap-6 md:w-1/2">
                <h1 className="font-extrabold text-[4rem] leading-[70px]">Solusi Navigasi Tunanetra</h1>
                <p className="w-[90%]">Temukan Solusi Navigasi Terdepan untuk Tunanetra dengan Teknologi Inovatif kami, didukung oleh Kecerdasan Buatan (AI) yang canggih untuk pengalaman yang lebih aman, cerdas, dan mandiri!</p>
                <div className="flex gap-3 items-center">
                    <Link className="text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-primary focus:outline-none dark:focus:ring-primary-hobg-primary-hover ">Daftar Sekarang</Link>
                    <Link className="text-secondary flex gap-2 items-center  focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none dark:focus:ring-primary-hobg-primary-hover "><img src="assets/images/play.svg" alt="" />Lihat Demo</Link>
                </div>
                <div className="flex w-full mt-14 items-center gap-7">
                    <p className="w-[25%]">Hubungkan <br /> 
                    Sosial Media Kami</p>
                    <Link>
                        <img src="assets/images/x.svg" alt="" />
                    </Link>
                    <Link>
                        <img src="assets/images/instagram.svg" alt="" />
                    </Link>
                    <Link>
                        <img src="assets/images/element2.svg" alt="" />
                    </Link>
                    <Link>
                        <img src="assets/images/element1.svg" alt="" />
                    </Link>
                </div>
            </main>
            <main className="w-full md:w-1/2 relative ">
                <img className="absolute -bottom-10 left-0 z-0"  src="assets/images/Teacher.svg" alt="" />
                <img className="absolute right-0 -top-14 z-0"  src="assets/images/Student.svg" alt="" />
                <p className="absolute top-0 right-64 z-10 rounded-lg rounded-br-none px-4 py-3 shadow-xl font-semibold">Saya tersesat, butuh bantuan!</p>
                <p className="absolute top-12 right-64 z-10 rounded-lg rounded-br-none px-4 py-3 shadow-xl font-semibold">Saya tersesat, butuh bantuan!</p>
                <p className="absolute bg-complementary rounded-lg rounded-br-none px-4 py-3 shadow-xl font-semibold">Saya tersesat, butuh bantuan!</p>
                <p className="absolute bg-complementary rounded-lg rounded-br-none px-4 py-3 shadow-xl font-semibold">Saya tersesat, butuh bantuan!</p>
            </main>
            </div>
        </header>
    )
}