import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const FoodCard = ({item}) => {
    const {image, price, recipe, name} = item;
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = food =>{
      if(user && user.email){
        // send cart item to the database

      }
      else{
        
        Swal.fire({
          title: "You are not logged in",
          text: "Please login to add to the cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, LOGIN!"
        }).then((result) => {
          if (result.isConfirmed) {
            // send the user to the login page
            navigate('/login')
          }
        });
      }
    };
    

    return (
        <div className="card bg-base-100  shadow-xl">
  <figure>
    <img
      src={image} />
  </figure>
  <p className='bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4'>${price}</p>
  <div className="card-body flex flex-col items-center">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions justify-end">
      <button onClick={()=>handleAddToCart(item)} className="btn btn-outline bg-slate-100 border-0 border-orange-400 border-b-4 mt-2">Add To Cart</button>
    </div>
  </div>
</div>
    );
};

export default FoodCard;