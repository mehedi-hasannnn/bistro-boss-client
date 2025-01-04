import React from 'react';

const FoodCard = ({item}) => {
    const {image, price, recipe, name} = item;
    const handleAddToCart = food =>{
      console.log(food);
    }
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