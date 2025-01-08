import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
const { register, handleSubmit } = useForm();
const axiosPublic = useAxiosPublic();
const onSubmit = async (data) => {
    console.log(data)
    // Image upload to imgbb and then get an url
    const imageFile = {image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
            'content-type' : 'multipart/form-data'
        }
    });
    console.log(res.data);

};
    return (
        <div>
            <SectionTitle heading="add an item" subHeading="What's new?"></SectionTitle>

         <div>

         <form onSubmit={handleSubmit(onSubmit)}>

      <label className="form-control w-full">
  <div className="label">
    <span className="label-text">Recipe Name*</span>
  </div>
  <input type="text" placeholder="Recipe Name" {...register('name', {required: true})} required className="input input-bordered w-full my-4" />
  
</label>


    <div className='flex gap-6'>
        {/* Category */}
        <label className="form-control w-full">
  <div className="label">
    <span className="label-text">Category*</span>
  </div>
  <select defaultValue="default" {...register('category', {required: true})}
      className="select select-bordered w-full ">
        <option disabled value="default">Select a category</option>
        <option value="salad">Salad</option>
        <option value="pizza">Pizza</option>
        <option value="soup">Soup</option>
        <option value="dessert">Dessert</option>
        <option value="drinks">Drinks</option>
      </select>
  
</label>

        {/* Price */}
        <label className="form-control w-full">
  <div className="label">
    <span className="label-text">Price*</span>
  </div>
  <input 
  type="number" 
  step="0.01" 
  placeholder="Price" 
  {...register('price', { 
    required: true, 
    setValueAs: (value) => parseFloat(value) 
  })} 
  className="input input-bordered w-full" 
/>

  
</label>

</div>
{/* Recipe Details */}
<label className="form-control mt-2">
  <div className="label">
    <span className="label-text">Recipe Details*</span>
  </div>
  <textarea {...register('recipe', {required: true})} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
</label>

<div className='form-control w-full my-6'>
<input type="file" {...register('image', {required: true})} className="file-input file-input-bordered" />
</div>

<button className='btn bg-gradient-to-r from-yellow-500 to-yellow-300'>Add Item <FaUtensils className='ml-4'></FaUtensils> </button>
      
        </form>
      </div>
    </div>
    );
};

export default AddItems;