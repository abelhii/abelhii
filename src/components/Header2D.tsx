import AbelAvatar2D from "./models/AbelAvatar2D";

export function Header2D() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-none rounded-[6rem]">
        <h1 className="absolute top-[25%] text-7xl md:text-9xl font-bold z-10">
          Salutations
        </h1>
        <AbelAvatar2D className="z-10" />
      </div>
    </div>
  );
}
