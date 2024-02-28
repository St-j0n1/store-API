import userRoutes from "./UserRoutes";
import adminRoutes from "./AdminRoutes";

const appRoutes = [...userRoutes, ...adminRoutes];

export default appRoutes;
