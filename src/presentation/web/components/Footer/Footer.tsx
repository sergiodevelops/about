export function Footer() {
    const currentYear = new Date().getFullYear();

    return(
        <footer className="footer">
         <strong>LUNO⚛Dev ®</strong> <small>{`Copyright © 2017 - ${ currentYear || "2024"}. All rights reserved.`}</small>
        </footer>
    );
}