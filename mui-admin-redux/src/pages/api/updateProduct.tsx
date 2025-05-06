// api/updateProduct.ts
export const updateProduct = async (product: { id: number, title: string, price: number }) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: product.title,
          price: product.price
          
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const updatedProduct = await response.json();
      return updatedProduct;
    } catch (error) {
      console.error("Failed to update product:", error);
      throw error;
    }
  };
  