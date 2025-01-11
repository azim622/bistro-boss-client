import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import MenuItems from "../../../shared/menuitem/MenuItems";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  const [menu]= useMenu()
  const popular = menu.filter(item => item.category === 'popular')
    
  return (
    <section className="mb-12px">
      <SectionTitle
        heading="From our menu"
        subHeading="Popular item"
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-4">
        {
            popular.map(item=><MenuItems key={item._id} item={item}></MenuItems>)
        }
      </div>
      <button className="btn btn-neutral my-10">View Full Menu</button>
    </section>
  );
};

export default PopularMenu;
