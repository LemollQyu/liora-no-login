import Image from "next/image"

export default function Screen () {

    return (

        <>
            <div className="w-full fixed h-screen">
                <div className="w-[172px] h-[114px] absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <Image  className="w-full h-full object-contain"  src={"/logo/Liora-big.png"} priority height={300} width={500} alt="logo" />
                </div>
            </div>
        </>
    )


}