import { useEffect, useState } from 'react';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import { useLoaderData } from 'react-router-dom';

const UpdateItem = () => {
  const item = useLoaderData()
  console.log(item)
  const [update , setUpdate] = useLoaderData(item)
    
  useEffect(()=>{
    if(item){
      setUpdate(item)
    }

  },[item])
  
  return (
    <div>
      <SectionTitle heading="Update Info" subHeading="User Update"></SectionTitle>
    </div>
  );
};

export default UpdateItem;