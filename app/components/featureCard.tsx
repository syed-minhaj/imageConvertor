
const FeatureCard = ({ icon, title, description }:{icon:any,title:string,description:string}) => {
    return (
      <div className="bg-gray-900 p-6 rounded-lg transition duration-300 ease-in-out hover:bg-gray-800 group cursor-pointer border border-gray-800 hover:border-blue-400">
        <div className="text-blue-400 mb-4 transform group-hover:scale-110 transition-transform duration-300 w-fit">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-100 group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
      </div>
    );
};

export default FeatureCard;