//ERRORES PASSPORT.CONFIG
export const generateUserErrorInfo = user => {
    return `El usuario ${user.email} ya existe en base de datos`;
}

export const generateAdminErrorInfo = adminEmail => {
    return `Intento de registro con el correo de administrador: ${adminEmail}`;
}

export const generateLoginErrorInfo = () => {
    return `Error al intentar iniciar sesión con las credenciales proporcionadas.`;
}

export const generateGithubErrorInfo = () => {
    return `Error al intentar iniciar sesión con Github.`;
}

//ERRORES DEL PRODUCTS.VIEWS.ROUTER
export const generateProductLoadErrorInfo = () => {
    return `Error al cargar el producto.`;
}

export const generateProductCreateErrorInfo = () => {
    return `Error al intentar crear el producto.`;
}

export const generateProductUpdateErrorInfo = () => {
    return `Error al intentar actualizar el producto.`;
}

export const generateProductDeleteErrorInfo = () => {
    return `Error al intentar eliminar el producto.`;
}

//ERRORES DEL CARTS.ROUTER
export const generateCartNotFoundErrorInfo = () => {
    return `Carrito no encontrado.`;
}

export const generateProductNotFoundErrorInfo = () => {
    return `Producto no encontrado en el carrito.`;
}

export const generateCartAddErrorInfo = () => {
    return `Error al agregar el producto al carrito.`;
}

export const generateCartUpdateErrorInfo = () => {
    return `Error al actualizar el carrito.`;
}

export const generateCartProductUpdateErrorInfo = () => {
    return `Error al actualizar la cantidad del producto en el carrito.`;
}

export const generateCartDeleteErrorInfo = () => {
    return `Error al eliminar el producto del carrito.`;
}

//ERRORES DE APP.JS
export function generateDatabaseConnectionErrorInfo() {
    return 'Hubo un error al intentar conectarse con la base de datos.';
  }
  
export function generateRoutingErrorInfo() {
return 'La ruta solicitada no está definida en la aplicación.';
}