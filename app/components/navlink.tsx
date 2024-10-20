

const NavLink = ({ href, children }:{href:string,children:any}) => (
    <a href={href} className="text-gray-400 hover:text-blue-400 transition-colors duration-300 relative group">
        {children}
        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </a>
);

export default NavLink;