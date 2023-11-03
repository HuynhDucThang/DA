import Image from "next/image";

interface IProps {

}

export default function CardApartment({} : IProps) {
    return <div className="flex gap-2">
        <div className="w-[30%] relative">
            <Image src="" alt="img apartment" fill className="rounded-lg" />
        </div>
        <div className="w-[70%]">
            <h2>Biệt thự Chao Pao, tầm nhìn ra biển tuyệt đẹp của Bohemian Chic</h2>
        </div>
    </div>
}