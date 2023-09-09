import { Link } from 'react-router-dom';

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
      <nav className="flex gap-4 items-center text-white">
        <Link className="hover:underline" to="/">
          Home
        </Link>
        <Link className="hover:underline" to="/produtos">
          Produtos
        </Link>
      </nav>
    </header>
  );
};

export default Header;
