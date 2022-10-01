import Section from "../UI/Section";
import ProductForm from "./ProductForm";
import useHttp from "../../hooks/use-http";

const NewProduct = (props) => {
  const { isLoading, error, sendHttpRequest: sendProduct } = useHttp();

  const createProduct = (productText, productData) => {
    const generatedId = productData.name;
    const createdProduct = { id: generatedId, text: productText };

    props.onAddProduct(createdProduct);
  };

  const enterProductHandler = async (productText) => {
    sendProduct(
      {
        endpoint:
          "https://react-course-http-8220d-default-rtdb.firebaseio.com/products.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: productText },
      },
      createProduct.bind(null, productText)
    );

    // setIsLoading(true);
    // setError(null);
    // try {
    //   const response = await fetch(
    //     "https://react-course-http-8220d-default-rtdb.firebaseio.com/products.json",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({ text: productText }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Ошибка запроса.");
    //   }

    //   const data = await response.json();

    //   // const generatedId = data.name;
    //   // const createdProduct = { id: generatedId, text: productText };

    //   // props.onAddProduct(createdProduct);
    // } catch (e) {
    //   setError(e.message || "Что-то пошло не так...");
    // }
    // setIsLoading(false);
  };

  return (
    <Section>
      <ProductForm onEnterProduct={enterProductHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewProduct;
