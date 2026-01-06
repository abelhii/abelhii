import AbelAvatar2D from "./models/AbelAvatar2D";

export function Header2D() {
  return (
    <div className="relative flex flex-col items-center justify-center bg-none rounded-[6rem]">
      <h1 className="absolute top-0 text-7xl md:text-9xl font-bold z-10">
        Salutations
      </h1>
      <AbelAvatar2D className="z-10" />
    </div>
  );
}
