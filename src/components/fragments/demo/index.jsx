import { Link } from "react-router-dom"

export default function Demo(){
    return (    
        <>
        <section className="w-screen overflow-x-hidden min-h-[70vh] bg-[#F4F8FB] flex lg:flex-row flex-col-reverse gap-16 items-center container mx-auto py-10">
            <main className="lg:w-1/2 w-full h-full flex flex-col justify-center items-start gap-5"
            data-aos="slide-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="800"
            data-aos-offset="100">
                <h1 className="font-extrabold text-5xl">Demo Video</h1>
                <p className="font-normal text-lg leading-8">Kami berkomitmen mendukung pengguna tunanetra berpenghasilan rendah dengan menyediakan layanan berkualitas tinggi dengan biaya terjangkau. Visi kami adalah memperluas aksesibilitas bagi mereka yang membutuhkan, sekaligus menginspirasi pengguna lain untuk mencapai potensi terbaik mereka.</p>
            </main>
            <div className="lg:w-1/2 w-full h-full relative flex justify-center items-center" 
            data-aos="slide-left"
            data-aos-easing="ease-in-out"
            data-aos-duration="800"
            data-aos-offset="100">
            <video
                src="assets/videos/demo.mp4"
                className="h-[80%] object-cover rounded-lg shadow-lg shadow-dark-white"
                autoPlay
                loop
                muted
            ></video>
        </div>
        </section>
        <section className="w-screen overflow-x-hidden h-[30vh] md:h-[50vh] overflow-hidden relative flex justify-center items-center gap-3  md:gap-5 flex-col bg-primary text-background">
            <img className="absolute right-0 bottom-0 z-0" src="assets/images/Ellipsekanan.svg" alt="" />
            <img className="absolute left-0 w-[70%] lg:w-auto  -bottom-80 lg:-bottom-50 z-0" src="assets/images/Ellipsekiri.svg" alt="" />
            <h1 className="font-extrabold text-xl md:text-4xl z-10 ">Mulai Perjalanan Anda Bersama Kami!</h1>
            <p className=" text-lg md:text-xl font-light z-10">Segera daftarkan diri anda di VisionMate</p>
            <Link to={"/register"} className="font-bold text-lg py-3 px-7 bg-dark z-10 text-background rounded-lg">Daftar Sekarang</Link>
        </section>
        </>
    )
}