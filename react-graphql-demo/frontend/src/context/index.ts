import { createContext } from "react";
import { BookSchema } from "../schemas";

const selectedBookContext = createContext<BookSchema>({ id: undefined });
export { selectedBookContext };
