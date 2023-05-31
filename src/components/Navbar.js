import { Component } from "react";
import "./css/NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import { Link, useNavigate } from "react-router-dom";

class Navbar extends Component {
    state = { clicked: false };
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    };
    /*navigate = useNavigate();
    navigateLogin = () => {
        this.navigate('/Login');
    };*/

    //<i className="fa-solid fa-tree-deciduous"></i>
    render() {
        return (
            <nav className="NavbarItems">
                <div className="navbar-logo">
                    <h1 > Ovosad </h1>                            
                </div>

                <div className="menu-icons" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-bars" : "fas fa-times"}></i>
                </div>

                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>
                                    <i className={item.icon}></i>
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                    
                    <button >Login</button>
                    <button>Register</button>
                </ul>
            </nav>
        );
    }
}
export default Navbar;