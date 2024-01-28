import React from "react";

const product = (props) => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                VShop Products List - {props.name}{" "}
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>
          <div className="flex flex-wrap -m-4">
           {props.products?.data?.map((item) => {
            return (
               <div className="xl:w-1/4 md:w-1/2 p-4">
               <div className="bg-gray-100 p-6 rounded-lg">
           
                  <img
                   className="h-40 rounded w-full object-cover object-center mb-6"
                   src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                   alt="content"/>

                 <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                 {item.attributes.category}
                 </h3>
                 <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                 {item.attributes.title}
                 </h2>
                 <p className="leading-relaxed text-base">
                 {item.attributes.description}
                 </p>
               </div>
             </div>
            )
           })}


          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  const headers = { Authorization: 'Bearer 80b4c01be1506ba637dcf5dad5bb514d1795afe5f15ef43ea862b35e17ebece36b3c936102693498e42d55adf8be4fce715b0336629e28ebe2fba66580ba5e1d8e2fd5a2f67f230e2b7a0f87cdbae250b338bf2962e3720dbb255fa01b4275f86b727ab6092f94a2c60fa4ebfe83ec74ec194242d36d1efd94cad4d948aec62b' };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?populate=*`, { headers });
    const products = await response.json();
    console.log(products);
    return { props: { products } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { products: [] } }; // Gracefully handle errors
  }
}
export default product;
