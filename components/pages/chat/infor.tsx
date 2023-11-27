import Image from "next/image";

export default function Infor() {
  return (
    <div className="bg-white w-[20%] border p-4">
      <div className="flex flex-col justify-center gap-4">
        {/* avatar */}
        <div className="w-[60px] h-[60px] shadow-lg rounded-full overflow-hidden relative">
          <Image src="/avatar.png" alt="" fill />
        </div>

        <h2>Alex Alexssandra</h2>
        <p>island, canada</p>
      </div>

      <div className="mt-6">
        <h4>Recent files</h4>
        <div></div>
      </div>
    </div>
  );
}
