import React, {useState, useEffect} from 'react';

function Footer() {
    const [date , setDate] = useState("");
    const getYear = () =>  setDate(new Date().getFullYear())
    useEffect(() => {
        getYear();
    }, [])

    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; {date} Mesto Russia</p>
        </footer>
    );
}
export default Footer;
