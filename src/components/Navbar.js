import { Link } from "react-router-dom";
import '../Global.css';
export const Navbar = () => {
    return(
        <>
            <style>
                {`
                    .navbar{
                        background-color: black;
                    }
                    .navbar *{
                        text-decoration: none;
                        color: white;
                        font-size: 20px;
                    }
                    .navbar *:hover{
                        opacity: 80%;
                    }
                `}
            </style>
            <div className="navbar">
                <Link to={'/mangas'}>Mangas | </Link>
                <Link to={'/characters'}>Characters</Link>
            </div>
        </>
    );
}