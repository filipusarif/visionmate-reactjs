import { Link } from "react-router-dom"

export default function Demo(){
    return (    
        <>
        <section className="w-screen h-[70vh] bg-[#F4F8FB] flex gap-16 items-center container mx-auto py-10">
            <main className="w-1/2 h-full flex flex-col justify-center items-start gap-5">
                <h1 className="font-extrabold text-5xl">Demo Video</h1>
                <p className="font-normal text-lg leading-8">Kami berkomitmen mendukung pengguna tunanetra berpenghasilan rendah dengan menyediakan layanan berkualitas tinggi dengan biaya terjangkau. Visi kami adalah memperluas aksesibilitas bagi mereka yang membutuhkan, sekaligus menginspirasi pengguna lain untuk mencapai potensi terbaik mereka.</p>
            </main>
            <div className="w-1/2 h-full relative flex justify-center items-center">
            <video
                src="assets/videos/demo.mkv"
                className="h-[80%] object-cover rounded-lg shadow-lg shadow-dark-white"
                autoPlay
                loop
                muted
            ></video>
        </div>
        </section>
        <section className="w-screen h-[50vh] overflow-hidden relative flex justify-center items-center gap-5 flex-col bg-primary text-background">
            <img className="absolute right-0 bottom-0" src="assets/images/Ellipsekanan.svg" alt="" />
            <img className="absolute left-0 -bottom-80" src="assets/images/Ellipsekiri.svg" alt="" />
            <h1 className="font-extrabold text-4xl">Mulai Perjalanan Anda Bersama Kami!</h1>
            <p className="text-xl font-light">Turpis purus, imperdiet integer amet, eu.</p>
            <Link className="font-bold text-lg py-3 px-7 bg-dark text-background rounded-lg">Daftar Sekarang</Link>
        </section>
        </>
    )
}