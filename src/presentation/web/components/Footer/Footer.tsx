export function Footer() {
    const currentYear = new Date().getFullYear();

    return(
        <footer className="footer">
            {`Copyright © 2017 - ${ currentYear || "2024"} | LUNO Dev®. All rights reserved.`}
        </footer>
    );
}