import { Link, useLocation } from 'react-router-dom';
import Logo from '/logo.svg';

export default function Nav() {
    const location = useLocation();

    return (
        <nav>
            <Link to="/">
                <img src={Logo} alt="Logo of Louvetoo" className='logoimg' />
            </Link>
            {location.pathname !== '/' || location.pathname == '/register' && (
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/child">Child</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            )}
        </nav>
    );
}
