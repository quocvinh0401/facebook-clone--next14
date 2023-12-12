import { useSelector } from "react-redux";
import HomePage from "~/components/layouts/home/HomePage";
import { RootState } from "~/redux/store";

export default function Home() {
  // const auth = useSelector((state: RootState) => state.auth);
  return <HomePage />;
}
