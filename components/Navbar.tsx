import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="gap-5 flex justify-center p-3">
            <Link href="/about-me" className='mb-8 text-xl font-bold text-center'>About Me</Link>
            <Link href="/" className='mb-8 text-xl font-bold text-center'>Articles</Link>
        </nav>
    );
};

export default NavBar;
