import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import orderImg from "../../../assets/shop/banner2.jpg";
import Cover from "../../../shared/cover/Cover";
import { useState, useEffect } from "react";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();

    // Determine initial index based on the category from the URL
    const initialIndex = categories.indexOf(category) !== -1 ? categories.indexOf(category) : 0;
    const [tabIndex, setTabIndex] = useState(initialIndex);

    const [menu] = useMenu();

    // Filter menu items based on their category
    const menuByCategory = {
        salad: menu.filter(item => item.category === "salad"),
        pizza: menu.filter(item => item.category === "pizza"),
        soup: menu.filter(item => item.category === "soup"),
        dessert: menu.filter(item => item.category === "dessert"),
        drinks: menu.filter(item => item.category === "drinks"),
    };

    // Ensure the tab index updates if the category in the URL changes
    useEffect(() => {
        const newIndex = categories.indexOf(category);
        if (newIndex !== -1) {
            setTabIndex(newIndex);
        }
    }, [category, categories]);

    return (
        <div>
            <Cover img={orderImg} title="Order Food" />
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    {categories.map((cat, idx) => (
                        <Tab key={idx}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Tab>
                    ))}
                </TabList>

                {categories.map((cat, idx) => (
                    <TabPanel key={idx}>
                        <OrderTab items={menuByCategory[cat]} />
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export default Order;
