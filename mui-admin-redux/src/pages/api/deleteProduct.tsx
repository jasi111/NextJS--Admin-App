export async function deleteProduct(id : any) {
    console.log(`Deleting product with id: ${id}`);
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Delete response:", result);
      return result; 
    } catch (error) {
      console.error(`Failed to delete product with id ${id}:`, error);
      throw error; 
    }
  }
  