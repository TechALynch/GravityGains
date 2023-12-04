import Navbar from './navbar';

export default function Header({ isLoggedIn }) {
  return (
    <div className="header">
      {isLoggedIn && <Navbar />}
    </div>
  );
}
