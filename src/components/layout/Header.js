import React from 'react';
import { FaMoon } from "react-icons/fa";

export const Header = () => {
    const x = 1;

    return (
        <header className="header" data-test-id="header">
            <nav>
                <div className="Stadi">
                    <h1>STADI</h1>
                </div>
                <div className="settings">
                    <ul>
                        <li>+</li>
                        <li>
                            <FaMoon />
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}