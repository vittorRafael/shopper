const Header = () => {
  return (
    <header className="bg-sky-950 px-20 py-5">
      <a
        href="https://landing.shopper.com.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-white text-3xl flex flex-col w-fit justify-end items-end mx-auto"
      >
        Shopper
        <span className="font-normal text-emerald-500 text-base">.com.br</span>
      </a>
    </header>
  );
};

export default Header;
