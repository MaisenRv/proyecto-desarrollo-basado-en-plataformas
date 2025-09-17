function card ({nombre, descripción, direccion, imagen}) {
return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={imagen} alt={nombre} />
        <div className="py-4">
        <h2 className="text-xl font-bold text-gray-800">{nombre}</h2>
    <p className="text-gray-600 mt-2">{descripción}</p>
    <p className="text-gray-600 mt-2">{direccion}</p>
        </div>
    </div>

);


}
export default card;