import { Redirect } from "react-router-dom";

export default function RedirectToMainPage() {
  return <Redirect to={{ pathname: "/" }} />;
}
