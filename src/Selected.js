const Selected = ({item,handleBack}) => {
    return ( 
        <div>
        
            <div >
                <p>{item.name}</p>
                <p>{item.surname}</p>
                <p>{item.descript}</p>
                <button onClick={handleBack}>Back</button>
            </div>

        </div>
     );
}
 
export default Selected;