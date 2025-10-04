function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="text-center p-3 bg-light mt-4">
            <p>Hecho en React + Vite - {year}</p>
        </footer>
    );
}

export default Footer