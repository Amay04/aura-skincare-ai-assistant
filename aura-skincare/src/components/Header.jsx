
function Header() {
  return (
    <header className="border-b border-[#e5e7df] bg-[#fffefa]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#294735] text-xl text-white">
            A
          </div>

          <div>
            <h1 className="text-xl font-semibold tracking-tight text-[#233b2d]">
              Aura Skincare
            </h1>
            <p className="text-xs tracking-wide text-gray-500">
              YOUR DAILY SKINCARE RITUAL
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#dce8dc] bg-[#f0f6ef] px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-[#5b8b63]" />
          <span className="text-sm font-medium text-[#304b38]">
            Aria · AI Support Agent
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
