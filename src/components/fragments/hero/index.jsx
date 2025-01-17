import { Link } from "react-router-dom"


export default function hero(){
    return (
        <header className="w-screen overflow-x-hidden min-h-screen py-1 lg:py-10 bg-background  ">
            <div className="flex flex-col-reverse gap-10 lg:flex-row container mx-auto pt-32">
            <main className="w-full flex flex-col gap-6 lg:w-1/2 relative"  >
                <img src="assets/images/elementHero4.svg" className="absolute top-14 z-0" alt="" />
                <h1 className="font-extrabold text-[4rem] leading-[70px] z-10" data-aos="fade"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="800"
                    data-aos-offset="250"
                >Solusi Navigasi Tunanetra</h1>
                <p className="w-[90%]" data-aos="fade"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="800"
                    data-aos-offset="250">Temukan Solusi Navigasi Terdepan untuk Tunanetra dengan Teknologi Inovatif kami, didukung oleh Kecerdasan Buatan (AI) yang canggih untuk pengalaman yang lebih aman, cerdas, dan mandiri!</p>
                <div className="flex gap-3 items-center" data-aos="fade"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="800"
                    data-aos-offset="250">
                    <Link className="text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-primary focus:outline-none dark:focus:ring-primary-hobg-primary-hover " to="/register">Daftar Sekarang</Link>
                    <Link className="text-secondary flex gap-2 items-center  focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none dark:focus:ring-primary-hobg-primary-hover "><img src="assets/images/play.svg" alt="" />Lihat Demo</Link>
                </div>
                <div className="flex w-full mt-14 items-center gap-7" data-aos="fade"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="800"
                    data-aos-offset="100">
                    <p className="lg:w-[25%] w-[40%] text-sm text-non-active">Hubungkan <br /> 
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
            <main className="w-full h-[40vh] lg:h-[60vh] lg:w-1/2 relative text-sm font-normal">
                <img className="absolute right-0 -top-14 w-[45%] xl:w-auto"  src="assets/images/Student.svg" alt="" />
                <img className="absolute bottom-0 xl:-bottom-10 left-0 w-[50%] lg:w-[60%] xl:w-auto"  src="assets/images/Teacher.svg" alt="" />
                <div className="absolute flex flex-col -top-5 xl:top-0 left-[25%] overflow-hidden xl:left-40 z-10 gap-2 xl:gap-3 text-[8px] xl:text-sm w-[45%] xl:w-[43%] items-start justify-center">
                    <div className="flex flex-col gap-2 xl:gap-3 w-full items-end justify-center">
                        <p className="bg-background rounded-xl rounded-br-none xl:px-5 xl:py-2 px-2 py-1 shadow-xl animate-[item1_8s_ease_infinite]">Saya tersesat, butuh bantuan!</p>
                        <p className="bg-background rounded-xl rounded-br-none xl:px-5 xl:py-2 px-2 py-1 shadow-xl animate-[item2_8s_ease_infinite]">Tolong Bantu Saya!</p>
                    </div>
                    <p className="bg-complementary rounded-xl rounded-bl-none xl:px-5 xl:py-2 px-2 py-1 shadow-xl text-background animate-[item3_8s_ease_infinite]">Tunggu disana, saya akan datang!</p>
                    <p className="bg-complementary rounded-xl rounded-bl-none xl:px-5 xl:py-2 px-2 py-1 shadow-xl text-background animate-[item4_8s_ease_infinite]">Tetap tenang!</p>
                </div>
                <img className="absolute w-10 lg:w-[10%] xl:w-auto right-2 lg:right-12 bottom-0" src="assets/images/elementHero.svg" alt="" />
                <img className="absolute w-10 lg:w-[10%] xl:w-auto right-2 lg:right-12 bottom-10" src="assets/images/elementHero2.svg" alt="" />
                <img className="absolute w-10 lg:w-[10%] xl:w-auto right-24 lg:right-36 bottom-5" src="assets/images/elementHero3.svg" alt="" />
            </main>
            </div>
        </header>
    )
}